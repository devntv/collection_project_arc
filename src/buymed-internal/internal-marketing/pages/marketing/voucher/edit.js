import makeStyles from '@material-ui/core/styles/makeStyles';
import { doWithLoggedInUser, renderWithLoggedInUser } from '@thuocsi/nextjs-components/lib/login';
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import { useRouter } from 'next/router';
import AppMarketing from '../../_layout';
import React, { useState, useEffect } from 'react';
import { MyCard, MyCardContent, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card';
import XLSX from 'xlsx';
import moment from 'moment';
import * as FileSaver from 'file-saver';
import { Button, Grid, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import VoucherCodeBody from 'components/promotion-voucher/form/voucher-code-body';
import ModalCustom from 'containers/voucher/modal-custom';
import { getVoucherClient } from 'client/voucher';
import { getPromoClient } from 'client/promo';
import { getCustomerClient } from 'client/customer';
import { compareTime, formatUTCTime } from 'components/promotion-voucher/util';
import Head from 'next/head';
import { defaultPromotionStatus, defaultReward } from 'components/promotion-voucher/constant';
import { CustomerTable } from 'containers/voucher/customer-table';
import { CustomerUsedTable } from 'containers/voucher/ListCustomerUsed';
import NotFound from '@thuocsi/nextjs-components/not-found/not-found';
import AuthorizationScreen from 'components/authorization-screen';
import { formatErrorMessage } from 'components/global';
import VoucherForm from './form-v2';
import { getProductClient } from 'client/product';
import { getSellerClient } from 'client/seller';
import { handleReward } from 'containers/voucher/VoucherReward';
import { handleCondition } from 'containers/voucher/VoucherCondition';
import { getMasterDataClient } from 'client/master-data';
import { getAreaClient } from 'client/area';
import { getScopeData, handleScope } from 'containers/voucher/VoucherScope';
import { customerScopeOpts } from 'view-model/customer';

const useStyles = makeStyles((theme) => ({
    root: {
        ' .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    '.MuiInputBase-input': {
        fontWeight: 'bold',
    },
}));

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return loadVoucherCode(ctx);
    });
}

export async function loadVoucherCode(ctx) {
    let returnObject = { props: {} };
    let voucherId = ctx.query.voucherId ?? null;
    let voucherCode = ctx.query.voucherCode ?? null;

    let { levelOpts, areaOpts } = await getScopeData(ctx)
    returnObject.props.levelOpts = levelOpts
    returnObject.props.areaOpts = areaOpts

    let listCustomerDefaultReponse = await getCustomerClient(ctx, {}).getCustomer(0, 20);
    if (listCustomerDefaultReponse && listCustomerDefaultReponse.status === 'OK') {
        returnObject.props.listCustomerDefault = listCustomerDefaultReponse.data?.map(item => ({
            ...item,
            label: item.customerID + " - " + item.name + " - " + item.phone,
            value: item.customerID
        }));
    }
    const voucherClient = getVoucherClient(ctx, {})
    if (!voucherCode && !voucherId) return returnObject

    let voucherResponse = voucherId ? await voucherClient.getVoucherById({ voucherId: parseInt(voucherId), voucherCode }) : await voucherClient.getListVouchersByCodes([voucherCode]);
    if (voucherResponse.data?.length > 0 && voucherResponse.status === 'OK') {
        // get voucher info
        let data = await handleReward(ctx, voucherResponse.data[0] ?? {})
        data = await handleCondition(ctx, data)
        data = handleScope(data, returnObject.props.levelOpts, returnObject.props.areaOpts, customerScopeOpts)

        returnObject.props.voucher = data;

        // get promotion info
        if (voucherResponse.data[0].promotionId && voucherResponse.data[0].promotionId !== 0) {
            let promotionResponse = await getPromoClient(ctx, {}).getPromotionByID(
                parseInt(voucherResponse.data[0].promotionId)
            );
            if (promotionResponse && promotionResponse.status === 'OK' && promotionResponse.data[0]) {
                let promotion = await handleReward(ctx, promotionResponse.data[0] ?? {})
                promotion = handleScope(promotion, returnObject.props.levelOpts, returnObject.props.areaOpts, customerScopeOpts)

                returnObject.props.promotionData = {
                    ...promotion,
                    label: promotion.promotionName,
                    value: promotion.promotionId
                }

            }
        }
    }

    return returnObject;
}

export default function NewPage(props) {
    return renderWithLoggedInUser(props, renderV2);
}

function renderV2(props) {
    return VoucherForm(props, "edit")
}

export async function updateVoucher(
    voucherId,
    promotionId,
    startTime,
    endTime,
    publicTime,
    type,
    maxUsage,
    maxUsagePerCustomer,
    appliedCustomers,
    status
) {
    let data = {
        voucherId,
        promotionId,
        type,
        maxUsage,
        maxUsagePerCustomer,
        status,
    };
    if (appliedCustomers && appliedCustomers.length >= 0) {
        data.appliedCustomers = appliedCustomers;
    }
    if (startTime) {
        data.startTime = new Date(startTime).toISOString();
    }
    if (endTime) {
        data.endTime = new Date(endTime).toISOString();
    }
    if (publicTime) {
        data.publicTime = new Date(publicTime).toISOString();
    }
    return getVoucherClient().updateVoucher(data);
}

function render(props) {
    const classes = useStyles();
    const toast = useToast();
    const router = useRouter();
    const customerClient = getCustomerClient();
    const voucherClient = getVoucherClient();
    const promoClient = getPromoClient();

    let voucher = props.voucher;

    if (!voucher?.code || voucher?.code === "") {
        return <AppMarketing>
            <NotFound />
        </AppMarketing>
    }

    let startTime = '';
    let endTime = '';
    let publicTime = '';

    let compareTimeFlag = false;

    if (voucher.startTime) {
        startTime = formatUTCTime(voucher.startTime);
        compareTimeFlag = compareTime(new Date(), new Date(startTime)) === 1;
    }
    if (voucher.endTime) {
        endTime = formatUTCTime(voucher.endTime);
    }
    if (voucher.publicTime) {
        publicTime = formatUTCTime(voucher.publicTime);
    }

    const { register, getValues, handleSubmit, setError, setValue, reset, errors, control } =
        useForm({
            defaultValues: {
                ...voucher,
                status: props.voucher.status === 'ACTIVE' ? true : false,
                startTime: startTime,
                endTime: endTime,
                publicTime: publicTime,
                promotionId: props.promotion.map((item) => {
                    return { label: item.promotionName, value: item.promotionId };
                })[0],
            },
            mode: 'onChange',
        });

    const [open, setOpen] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [isErrorExcel, setIsErrorExcel] = useState(false);
    const [listError, setListError] = useState([]);
    const [listPromotionSearch, setListPromotionSearch] = useState([]);
    const [isInsert, setIsInsert] = useState(false);
    const [datasFromExcel, setDatasFromExcel] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [dataProps, setDataprops] = useState({
        customerIds: voucher.appliedCustomers ? voucher.appliedCustomers : [],
        type: voucher.type,
    });

    useEffect(() => {
        const getData = async () => {
            const listCustomerResponse = await getCustomerClient().getCustomerByIDs(voucher.appliedCustomers?.slice(0, 5));
            setCustomers(listCustomerResponse?.data || [])
        }
        getData()
    }, [voucher])

    const onSubmit = async () => {
        let value = getValues();
        let {
            code,
            maxUsage,
            maxUsagePerCustomer,
            promotionId,
            startTime,
            endTime,
            publicTime,
            status,
        } = value;

        let { type, customerIds } = dataProps;
        let createVoucherResponse = await updateVoucher(
            voucher.voucherId,
            parseInt(promotionId.value),
            startTime,
            endTime,
            publicTime,
            type,
            parseInt(maxUsage),
            parseInt(maxUsagePerCustomer),
            customerIds,
            status ? defaultPromotionStatus.ACTIVE : defaultPromotionStatus.HIDE
        );
        if (createVoucherResponse && createVoucherResponse.status === 'OK') {
            toast.success("Cập nhật thành công");
        } else {
            return toast.error(formatErrorMessage(createVoucherResponse));
        }
        await router.push('/marketing/voucher');
    };

    const handleDownloadErrorFile = () => {
        const excelData = Array.from(new Set(listError)).map((id) => {
            let obj = {
                ID: id,
            };
            return obj;
        });

        let wb = XLSX.utils.book_new();
        wb.SheetNames.push(`data`);

        let ws = XLSX.utils.json_to_sheet(excelData);
        wb.Sheets[`data`] = ws;

        let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        const data = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
        FileSaver.saveAs(data, `Danh sách id lỗi - ${moment().format('DD-MM-YYYY')}.xlsx`);
    };

    const s2ab = (s) => {
        let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        let view = new Uint8Array(buf); //create uint8array as viewer
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff; //convert to octet
        }
        return buf;
    };

    const handleFileRead = (e) => {
        let oFile = e.target.files[0];
        const fileNameExtension = oFile.name.split('.').pop();
        if (
            fileNameExtension !== 'xlsx' &&
            fileNameExtension !== 'xls' &&
            fileNameExtension !== 'csv'
        ) {
            toast.error("File được chọn phải có định dạng là xlsx, xls, csv");
        } else {
            let reader = new FileReader();
            reader.onload = function (e) {
                let fileData = e.target.result;
                let cfb = XLSX.read(fileData, { type: 'binary' });
                let manyError = false;
                setIsInsert(true);
                // get data from csv/xls
                const getArrayData = (cfb) => {
                    let data = [];
                    let sheet = cfb.Sheets[cfb.SheetNames[0]];

                    if (!sheet) {
                        manyError = true;
                        toast.error("Không tìm thấy sheet");
                    } else if (sheet.A1.v !== 'ID') {
                        manyError = true;
                        toast.error("Không tìm thấy header tên ID");
                    } else {
                        let sheetData = XLSX.utils.sheet_to_json(sheet, {});
                        sheetData.forEach((element, index) => {
                            data.push(
                                element['ID'] && !isNaN(parseInt(element['ID']))
                                    ? parseInt(element['ID'])
                                    : element['ID']
                            );
                        });
                        return data;
                    }
                };

                let datas = Array.from(new Set(getArrayData(cfb)));
                if (datas) {
                    let numbersFromExcel = [];
                    let listIdFromExcel = [];
                    let validDatas = [];
                    let inValidDatas = [];
                    let errors = listError.slice();
                    let listUserID = dataProps.customerIds.slice();

                    var pattern = /^\d+$/;
                    //Get numbers only
                    datas.map((id) => {
                        if (!pattern.test(id)) {
                            errors.push(id);
                        } else {
                            validDatas.push(id);
                            numbersFromExcel.push(id);
                        }
                    });

                    const handleValidCusRes = async () => {
                        const validCusRes = await customerClient.getListByCustomerIds(
                            numbersFromExcel
                        );
                        if (validCusRes.status === 'OK') {
                            inValidDatas = await numbersFromExcel.filter(
                                (number) =>
                                    !validCusRes.data.some(
                                        ({ customerID: customerID }) => customerID === number
                                    )
                            );
                            return inValidDatas;
                        } else if (validCusRes.status === 'NOT_FOUND') {
                            numbersFromExcel.map((id) => {
                                errors.push(id);
                            });
                        }
                    };

                    handleValidCusRes().then((result) => {
                        if (result) {
                            result.forEach((invalidId) => {
                                errors.push(invalidId);
                            });

                            if (errors.length > listError.length) {
                                setListError(errors);
                                setIsErrorExcel(true);
                            }

                            validDatas.map((newId) => {
                                listIdFromExcel.push(newId);
                            });

                            const dataImport = [...new Set(listIdFromExcel)]

                            setDatasFromExcel(dataImport);
                            setDataprops({
                                ...dataProps,
                                customerIds: [...new Set(dataImport.concat(listUserID))],
                            });
                            toast.success("Import file thành công");
                        } else {
                            if (!manyError) {
                                toast.error("Không tìm thấy khách hàng");
                            }

                            if (errors.length > listError.length) {
                                setListError(errors);
                                setIsErrorExcel(true);
                            }
                        }
                    });
                }
            };
            // Tell JS To Start Reading The File.. You could delay this if desired
            reader.readAsBinaryString(oFile);
        }
    };

    const handleRemoveCustomer = (customerID) => {
        let customerIds = dataProps.customerIds.filter((id) => id !== customerID);
        setDataprops({ ...dataProps, customerIds: customerIds || [] });
    };

    const handleChangePromotion = (e, promotion) => {
        setDataprops({ ...dataProps, promotionId: promotion.promotionId });
    };

    const handleChangeCustomer = (e, customers) => {
        let customerIds = [];
        customers.forEach((c) => customerIds.push(c.customerID));
        setDataprops({
            ...dataProps,
            customerIds: Array.from(new Set(dataProps.customerIds.concat(customerIds))) || [],
        });
    };

    const handleChangeType = (value) => {
        setDataprops({ ...dataProps, type: value });
    };

    const handleDeleteAll = async () => {
        if (voucher.appliedCustomers && voucher.appliedCustomers.length > 0) {
            const res = await voucherClient.deleteAppliedCustomers(voucher.voucherId)
            if (res.status === 'OK') {
                toast.success("Xóa tất cả khách hàng thành công")
                router.reload()
                return
            }
            toast.error("Xóa tất cả khách hàng thất bại")
            return
        }
        setDataprops({ ...dataProps, customerIds: [] })
        setIsErrorExcel(false)
        toast.success("Xóa tất cả khách hàng thành công")
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách mã khuyến mãi",
            link: "/marketing/voucher"
        },
        {
            name: "Chỉnh sửa mã khuyến mãi",
        },
    ]

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/voucher" breadcrumb={breadcrumb}>
                <Head>
                    <title>Chỉnh sửa mã khuyến mãi</title>
                </Head>
                <MyCard>
                    <MyCardHeader title="Chỉnh sửa mã khuyến mãi" small />
                    <MyCardContent>
                        <VoucherCodeBody
                            errors={errors}
                            setValue={setValue}
                            getValue={getValues}
                            defaultStatus={props.voucher.status === 'ACTIVE'}
                            voucher={voucher}
                            promotion={props.promotion}
                            listPromotionDefault={props.listPromotionDefault || []}
                            control={control}
                            handleChangeType={handleChangeType}
                            dataProps={dataProps}
                            edit={true}
                            compareTime={compareTimeFlag}
                            showPromotionPublic={true}
                            listCustomerDefault={props.listCustomerDefault || []}
                            appliedCustomers={customers}
                            onChangeCustomer={handleChangeCustomer}
                            onChangePromotion={handleChangePromotion}
                            listPromotionSearch={listPromotionSearch}
                            showAutoComplete={showAutoComplete}
                            setListPromotionSearch={setListPromotionSearch}
                            register={register}
                        />
                    </MyCardContent>
                </MyCard>
                <MyCard>
                    <MyCardHeader
                        title="Khách hàng được sử dụng"
                        style={{ alignItems: 'center' }}
                        small
                        children={
                            <>
                                {dataProps.customerIds.length > 0 &&
                                    <>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            component="label"
                                            style={{ marginRight: '8px' }}
                                            onClick={() => setOpenModalDelete(!openModalDelete)}
                                        >
                                            Xóa tất cả
                                        </Button>
                                        <ModalCustom
                                            title="Thông báo"
                                            primaryText="Đồng ý"
                                            open={openModalDelete}
                                            onClose={() => setOpenModalDelete(!openModalDelete)}
                                            onExcute={handleDeleteAll}
                                        >
                                            <Typography>Bạn có chắc chắn muốn xóa tất cả khách hàng không?</Typography>
                                        </ModalCustom>
                                    </>
                                }
                                {isErrorExcel && (
                                    <>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            component="label"
                                            style={{ marginRight: '8px' }}
                                            onClick={() => setOpen(!open)}
                                        // onClick={handleDownloadErrorFile}
                                        >
                                            Xuất file lỗi
                                        </Button>
                                        <ModalCustom
                                            title="Thông báo"
                                            primaryText="Đồng ý"
                                            open={open}
                                            onClose={() => setOpen(!open)}
                                            onExcute={handleDownloadErrorFile}
                                        >
                                            <Typography>Bạn có chắc muốn tải file về</Typography>
                                        </ModalCustom>
                                    </>
                                )}
                                <Button size="small" variant="contained" component="label">
                                    Chọn file
                                    <input
                                        type="file"
                                        onClick={(e) => (e.target.value = '')}
                                        onChange={handleFileRead}
                                        hidden
                                    />
                                </Button>
                            </>
                        }
                    />
                    <MyCardContent>
                        <CustomerTable
                            isInsert={isInsert}
                            setIsInsert={setIsInsert}
                            onRemoveCustomer={handleRemoveCustomer}
                            dataProps={dataProps}
                            datasFromExcel={datasFromExcel}
                        />
                    </MyCardContent>
                </MyCard>
                <MyCard>
                    <MyCardHeader
                        title="Khách hàng đã sử dụng"
                        style={{ alignItems: 'center' }}
                        small
                    />
                    <MyCardContent>
                        <CustomerUsedTable
                            code={voucher.code}
                            promotion={props.promotion}
                            voucher={voucher}
                        />
                    </MyCardContent>
                </MyCard>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                            Cập nhật
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => router.push('/marketing/voucher')}
                        >
                            Quay lại
                        </Button>
                    </Grid>
                </Grid>
            </AppMarketing>
        </AuthorizationScreen>
    );
}
