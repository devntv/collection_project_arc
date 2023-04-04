import { doWithLoggedInUser, renderWithLoggedInUser } from '@thuocsi/nextjs-components/lib/login';
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import { useRouter } from 'next/router';
import AppMarketing from '../../_layout';
import React, { useState } from 'react';
import {
    MyCard,
    MyCardActions,
    MyCardContent,
    MyCardHeader,
} from '@thuocsi/nextjs-components/my-card/my-card';
import { Button, ButtonGroup, Grid, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as FileSaver from 'file-saver';
import XLSX from 'xlsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { getPromoClient } from '../../../client/promo';
import VoucherCodeBody from 'components/promotion-voucher/form/voucher-code-body';
import { getVoucherClient } from '../../../client/voucher';
import { getCustomerClient } from '../../../client/customer';
import { formatUTCTime } from '../../../components/promotion-voucher/util';
import { defaultPromotionStatus } from '../../../components/promotion-voucher/constant';
import Head from 'next/head';
import { CustomerTable } from '../../../containers/voucher/customer-table';
import ModalCustom from '../../../containers/voucher/modal-custom';
import './voucher.module.css';
import moment from 'moment';
import AuthorizationScreen from 'components/authorization-screen';
import { formatErrorMessage } from 'components/global';
import VoucherForm from './form-v2';
import { getAreaClient } from 'client/area';
import { getMasterDataClient } from 'client/master-data';
import { loadDataBefore } from '../promotion/edit';
import { getScopeData } from 'containers/voucher/VoucherScope';

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
        return loadDataPromotion(ctx);
    });
}

export async function loadDataPromotion(ctx) {
    let returnObject = { props: {} };
    let promotionId = ctx.query.promotionId ?? "";


    let { levelOpts, areaOpts } = await getScopeData(ctx)
    returnObject.props.levelOpts = levelOpts
    returnObject.props.areaOpts = areaOpts

    let listCustomerDefaultReponse = await getCustomerClient(ctx, {}).getCustomer(0, 20, {});
    if (listCustomerDefaultReponse && listCustomerDefaultReponse.status === 'OK') {
        returnObject.props.listCustomerDefault = listCustomerDefaultReponse.data?.map(item => ({
            ...item,
            label: item.customerID + " - " + item.name + " - " + item.phone,
            value: item.customerID
        }));
    }

    let promotionDefaultResponse = await getPromoClient(ctx, {}).getPromotion('', 5, 0, false, [
        defaultPromotionStatus.ACTIVE,
        defaultPromotionStatus.WAITING,
    ]);

    if (promotionDefaultResponse && promotionDefaultResponse.status === 'OK') {
        returnObject.props.listPromotionDefault = promotionDefaultResponse.data.map(item => ({
            ...item,
            label: item.promotionName,
            value: item.promotionId
        }));
    }

    if (promotionId && promotionId !== "") {
        const resp = await loadDataBefore(ctx)
        if(resp.props.promotionRes && resp.props.promotionRes.promotionId){
            returnObject.props.promotionData = {...resp.props.promotionRes, label: resp.props.promotionRes.promotionName, value: resp.props.promotionRes.promotionId}
        }
        
    }

    return returnObject;
}

export default function NewPage(props) {
    return renderWithLoggedInUser(props, renderV2);
}

function renderV2(props) {
    return VoucherForm(props, "");
}

export async function createVoucherCode(
    code,
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
    let data = { code, promotionId, type, maxUsage, maxUsagePerCustomer, status };
    if (appliedCustomers && appliedCustomers.length > 0) {
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
    return getVoucherClient().createVoucher(data);
}

function render(props) {
    const classes = useStyles();
    const toast = useToast();
    const router = useRouter();
    const customerClient = getCustomerClient();

    const [open, setOpen] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [isInsert, setIsInsert] = useState(false);

    const { register, getValues, handleSubmit, setError, setValue, reset, errors, control } =
        useForm({
            defaultValues: {
                startTime: router.query.promotionId
                    ? formatUTCTime(props.promotion[0].startTime)
                    : '',
                endTime: router.query.promotionId ? formatUTCTime(props.promotion[0].endTime) : '',
                publicTime: router.query.promotionId
                    ? formatUTCTime(props.promotion[0].publicTime)
                    : '',
                promotionId: !!router.query.promotionId
                    ? props.promotion?.map((item) => {
                        return { label: item.promotionName, value: item.promotionId };
                    })[0]
                    : '',
            },
            defaultChecked: {
                status: true,
            },
            mode: 'onChange',
        });

    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [isErrorExcel, setIsErrorExcel] = useState(false);
    const [listError, setListError] = useState([]);
    const [listPromotionSearch, setListPromotionSearch] = useState([]);
    const [datasFromExcel, setDatasFromExcel] = useState([]);
    const [dataProps, setDataprops] = useState({
        customerIds: [],
        type: 'PUBLIC',
    });

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
        let createVoucherResponse = await createVoucherCode(
            code,
            parseInt(promotionId.value),
            startTime,
            endTime,
            publicTime,
            type,
            parseInt(maxUsage),
            parseInt(maxUsagePerCustomer),
            customerIds,
            status === true ? defaultPromotionStatus.ACTIVE : defaultPromotionStatus.WAITING
        );
        if (createVoucherResponse && createVoucherResponse.status === 'OK') {
            toast.success("Tạo mã khuyến mãi thành công");
            router.push(`/marketing/voucher`);
        } else {
            toast.error(formatErrorMessage(createVoucherResponse));
        }
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
                                toast.error("File chứa id bị lỗi");
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
            name: "Tạo mã khuyến mãi",
        },
    ]


    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/voucher" breadcrumb={breadcrumb}>
                <Head>
                    <title>Tạo mã khuyến mãi</title>
                </Head>
                <MyCard>
                    <MyCardHeader title="Tạo mã khuyến mãi" small />
                    <MyCardContent>
                        <VoucherCodeBody
                            errors={errors}
                            control={control}
                            setValue={setValue}
                            getValue={getValues}
                            defaultStatus={true}
                            listPromotionDefault={props.listPromotionDefault || []}
                            onChangeCustomer={handleChangeCustomer}
                            showPromotionPublic={!!router.query.promotionId}
                            promotion={props.promotion || []}
                            dataProps={dataProps}
                            listCustomerDefault={props.listCustomerDefault || []}
                            handleChangeType={handleChangeType}
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
                                        //onClick={handleDownloadErrorFile}
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
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: 8 }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Thêm
                    </Button>
                </ButtonGroup>
            </AppMarketing>
        </AuthorizationScreen>
    );
}
