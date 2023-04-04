import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React, { useState } from 'react';
import Head from 'next/head';
import AppMarketing from 'pages/_layout';
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { faHistory, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    Button, Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tabs, Tooltip, IconButton, Switch
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { SaleCampaignFilter } from "containers/sale-campaign/SaleCampaignFilter";
import { formatDateTime, formatNumber, isValid } from "components/global";
import Link from "next/link";
import { Edit as EditIcon } from "@material-ui/icons";
import ListIcon from '@material-ui/icons/List';
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getSaleCampaignClient } from "client/saleCampaign";
import { getAccountClient } from "client/account";
import { SaleCampaignButton } from "containers/sale-campaign/SaleCampaignStatus";
import { getProducerClient } from "client/producer";
import { getProductClient } from "client/product";
import CheckDuplicateDialog from "containers/sale-campaign/CheckDuplicateDialog"
import ModalLoading from "containers/sale-campaign/ModalLoading";
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';
import { getAreaClient } from "client/area";
import { getMasterDataClient } from "client/master-data";
import styles from './sale-campaign.module.css';

function startDate(time) {
    const start = new Date(time);
    start.setHours(0, 0, 0, 0)
    return start.toISOString()
}

function endDate(time) {
    const end = new Date(time);
    end.setHours(23, 59, 59, 999);
    return end.toISOString()
}

export async function loadData(ctx) {
    const props = {
        filterData: {},
        data: [],
        count: {
            all: 0,
        },
        accountMap: {},
        total: 0,
        areaMap: {},
        regionMap: {}
    };

    let data = { props };
    let query = ctx.query;
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query.q ?? "{}");

    const filterData = q;

    if (filterData.processingTimeFrom) filterData.processingTimeFrom = startDate(filterData.processingTimeFrom)
    if (filterData.processingTimeTo) filterData.processingTimeTo = endDate(filterData.processingTimeTo)

    props.filterData = filterData;

    const saleCampaignClient = getSaleCampaignClient(ctx, {})
    const resp = await saleCampaignClient.getListSaleCampaign(offset, limit, filterData)

    // console.log("resp=", resp)

    if (resp.status === "OK") {
        props.data = resp.data;
        props.total = resp.total;
    } else {
        props.data = [];
        props.total = 0
    }

    props.areaMap["00"] = "Tất cả"
    const resArea = await getAreaClient(ctx, {}).getListArea();
    if (resArea.status == "OK") {
        resArea.data?.forEach(element => {
            props.areaMap[element.code] = element.name ?? ""
            props.regionMap[element.code] = element.provinceCodes ?? []
        });
    }

    const resProvince = await getMasterDataClient(ctx, {}).getProvince(0, 100, '', [], true);
    if (resProvince.status == "OK") {
        resProvince.data?.forEach(element => {
            props.areaMap[element.code] = element.name ?? ""
        });
    }

    // const accountIds = resp.data?.map(item => (item.createdBy ?? null));
    // // const ids = accountIds?.filter(item => !!item)

    // const accountResp = await getAccountClient(ctx, data).getAccountByIds([... new Set(accountIds)])
    // if (accountResp.status === "OK") {
    //     accountResp.data.forEach(acc => {
    //         props.accountMap[acc.accountId] = acc.email || "";
    //     })
    // }

    let statusList = ["", "UPCOMING", "PROCESSING", "EXPIRED"];

    if (!filterData.status || filterData.status === "") {
        props.count.all = resp?.total || 0
        statusList.splice(0, 1)
    } else {
        props.count[filterData.status.toLowerCase()] = resp?.total || 0
        statusList.splice(statusList.indexOf(filterData.status), 1)
    }

    let results = await Promise.all(statusList.map(status => {
        return saleCampaignClient.getListSaleCampaign(offset, limit, { ...filterData, status })
    }))

    for (let i = 0; i < statusList.length; i++) {
        if (statusList[i] == "") {
            props.count.all = results[i]?.total || 0
        } else {
            props.count[statusList[i].toLowerCase()] = results[i]?.total || 0
        }
    }

    return data
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

function cleanData(data) {
    for (let key in data) {
        !data[key] && delete data[key]
    }
    return JSON.stringify(data)
}


function SaleCampaignPage(props) {
    // console.log(props)
    let router = useRouter();
    const q = JSON.parse(router.query.q || "{}")
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const count = props.count || {};
    const toast = useToast()
    const total = props.total || 0;
    const data = props.data || [];

    const [selectCampaign, setSelectCampaign] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [listError, setListError] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [open, setOpen] = useState(false)

    let valueTab = 0

    switch (q.status) {
        case "":
            valueTab = 0;
            break;
        case "UPCOMING":
            valueTab = 1;
            break;
        case "PROCESSING":
            valueTab = 2;
            break;
        case "EXPIRED":
            valueTab = 3;
            break;
    }


    const handleTabChange = (tab, obj = {}) => {

        try {
            const q = router.query.q || "{}"
            let query = JSON.parse(q)
            for (let k in obj) {
                query[k] = obj[k]
            }

            router.push({
                pathname: `/marketing/sale-campaign`,
                query: {
                    q: cleanData(query),
                }
            }).then()
        } catch (error) {
            console.log(error)
        }
    };


    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/sale-campaign",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
    };


    const handleApplyFilter = async (data) => {

        router.push({
            pathname: "/marketing/sale-campaign",
            query: {
                q: JSON.stringify(data),
                page: 0,
                limit: limit
            }
        });
    };

    const showDataError = async (dataError) => {
        if (!dataError.length) return
        setLoading(true)
        const productMap = {}
        const skus = dataError.map(element => element.sku) || []

        const skuResp = await getProductClient().getProductListBySKUs(skus)
        if (skuResp.status === "OK") {
            skuResp.data?.map(item => {
                if (item.sku.code) productMap[item.sku.code] = item.product
            })
        }

        dataError.map(item => {
            item.product = productMap[item.sku]
            return item
        })

        setListError(dataError)
        setLoading(false)
    }

    const handleUpdateActive = async () => {
        try {
            const { isActive, campaignID } = selectCampaign;
            const resp = await getSaleCampaignClient().updateSaleCampaign({ campaignID, isActive: !isActive })
            setSelectCampaign({})
            if (resp.status === "OK") {
                toast.success("Thay đổi trạng thái hiển thị thành công")
                router.push({
                    pathname: "/marketing/sale-campaign",
                    query: {
                        ...router.query,
                    }
                });
                return
            }
            if (resp && resp.message) {
                if (resp.errorCode === "CONFLICT_CAMPAIGN" && resp.data && resp.data.length) {
                    toast.error("Chương trình có sản phẩm không hợp lệ")
                    await showDataError(resp.data)
                    setOpenDialog(true)
                    return
                }
                toast.error(resp.message)
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleCheckProductFulfillment = async () => {
        try {
            const resp = await getSaleCampaignClient().checkProductFulfillment()
            resp.status === "OK" ? toast.success(resp.message) : toast.error(resp.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách chương trình khuyến mãi",
        }
    ]

    return (
        <AppMarketing select="/marketing/sale-campaign" breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách chương trình khuyến mãi</title>
            </Head>

            <MyCard>
                <MyCardHeader title={"Danh sách chương trình khuyến mãi"}>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Authorization requiredAPI="POST/marketplace/promotion/v1/campaign/check-fulfillment">
                            <Button style={{ marginRight: 8 }} variant="contained" color="primary" onClick={() => setOpen(true)}>
                                Kiểm tra tỉ lệ fulfill
                            </Button>
                        </Authorization>

                        <Button variant="contained" color="primary" onClick={() => router.push("/marketing/sale-campaign/new")}>
                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
                            Thêm mới
                        </Button>
                    </div>
                </MyCardHeader>


                <SaleCampaignFilter
                    open={true}
                    onFilterChange={handleApplyFilter}
                    filterData={props.filterData}
                    router={router}

                />
            </MyCard>



            <Tabs
                value={valueTab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
            >
                <Tab
                    index={0}
                    label={`Tất cả(${count.all || "0"}) `}
                    onClick={() => handleTabChange(0, { status: "" })}
                />
                <Tab
                    index={1}
                    label={`Sắp diễn ra(${count.upcoming || "0"}) `}
                    onClick={() => handleTabChange(1, { status: "UPCOMING" })}
                />
                <Tab
                    index={2}
                    label={`Đang diễn ra(${count.processing || "0"}) `}
                    onClick={() => handleTabChange(1, { status: "PROCESSING" })}
                />
                <Tab
                    index={3}
                    label={`Đã kết thúc(${count.expired || "0"})`}
                    onClick={() => handleTabChange(2, { status: "EXPIRED" })}
                />
            </Tabs>

            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col width="5%" />
                        </colgroup>

                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">BANNER</TableCell>

                                <TableCell align="left">TÊN CTKM</TableCell>
                                <TableCell align="left">LOẠI CT</TableCell>
                                <TableCell align="left">KHU VỰC ÁP DỤNG</TableCell>
                                <TableCell align="left">SL NHÀ BÁN HÀNG
                                </TableCell>
                                <TableCell align="left">SL SẢN PHẨM</TableCell>
                                <TableCell align="left">GIẢM GIÁ
                                    <br />
                                    KHUYẾN MÃI
                                </TableCell>
                                <TableCell align="center">THỜI GIAN
                                    <br />
                                    DIỄN RA
                                </TableCell>
                                {/* <TableCell align="left">NGƯỜI TẠO</TableCell> */}
                                <TableCell align="center">TRẠNG THÁI</TableCell>
                                <TableCell align="center">THAO TÁC</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data?.length > 0 && data.map(row => (
                                <TableRow key={row.campaignID}>
                                    <TableCell align="left">{row.campaignID}</TableCell>
                                    <TableCell align="left">
                                        {row.banner && (
                                            <img
                                                src={row.banner}
                                                alt={row.campaignName}
                                                style={{ objectFit: "contain" }}
                                                width={130}
                                                height={70}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell align="left">{row.campaignName}</TableCell>
                                    <TableCell align="left">{row.campaignType === "NORMAL" ? "Chương trình khuyến mãi" : "Flash sale"}</TableCell>
                                    <Tooltip title={row.regions?.length > 0 ? row.regions?.map(item => props.areaMap?.[item] ?? item).join(", ") : "Tất cả"}>
                                        <TableCell align="left">
                                            <span className={styles.valueLocation}>{row.regions?.length > 0 ? row.regions?.map(item => props?.areaMap[item] ?? item).join(", ") : "Tất cả"}</span>
                                        </TableCell>
                                    </Tooltip>
                                    <TableCell align="left">{formatNumber(row.totalSeller ?? 0)}</TableCell>
                                    <TableCell align="left">{formatNumber(row.totalProduct ?? 0)}</TableCell>
                                    <TableCell align="left">
                                        {row.saleType === "ABSOLUTE" ? formatNumber(row.reward?.absoluteDiscount ?? 0) : (row.reward?.percentageDiscount ? (row.reward?.percentageDiscount + "%") : " - ")}</TableCell>
                                    <TableCell align="left">

                                        Từ: {formatDateTime(row.startTime)}
                                        <br />
                                        Đến: {formatDateTime(row.endTime)}
                                    </TableCell>
                                    {/* <TableCell align="left">{props.accountMap[row.createdBy] || row.createdBy}</TableCell> */}
                                    <TableCell align="center">
                                        <SaleCampaignButton status={row.status} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Tooltip title="Thay đổi trạng thái hiển thị của chương trình">
                                                <Switch
                                                    color="primary"
                                                    checked={row.isActive || false}
                                                    onClick={() => {
                                                        setSelectCampaign({
                                                            ...row,
                                                            isActive: row.isActive || false
                                                        })
                                                        setOpenModal(true);
                                                    }}
                                                />
                                            </Tooltip>
                                            {/* <br/> */}

                                            <Authorization requiredScreen="/marketing/detail-sale-campaign">
                                                <Link
                                                    href={`/marketing/detail-sale-campaign?code=${row.campaignCode}`}
                                                >
                                                    <a>
                                                        <Tooltip title="Danh sách nhà bán hàng tham gia">
                                                            <IconButton>
                                                                <ListIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </a>

                                                </Link>
                                            </Authorization>

                                            <Link
                                                href={`/marketing/sale-campaign/edit?code=${row.campaignCode}`}
                                            >
                                                <a>
                                                    <Tooltip title="Cập nhật thông tin">
                                                        <IconButton>
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </a>
                                            </Link>
                                            {/* <br/> */}
                                            <Link href={`/marketing/sale-campaign/history?code=${row.campaignCode}`}>
                                                <a>
                                                    <Tooltip title="Xem lịch sử thao tác">
                                                        <IconButton>
                                                            <FontAwesomeIcon icon={faHistory} style={{ color: "#777" }} size="sm" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </a>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}


                            {data.length === 0 && (

                                <TableRow>
                                    <TableCell colSpan={3} align="left">
                                        Không tìm thấy chương trình khuyến mãi nào
                                    </TableCell>
                                </TableRow>

                            )}
                        </TableBody>

                        <MyTablePagination
                            labelUnit="chương trình khuyến mãi"
                            count={total}
                            rowsPerPage={limit}
                            page={page}
                            onChangePage={handlePageChange}
                        />

                    </Table>
                </TableContainer>

                <ModalCustom
                    open={openModal}
                    title="Thông báo"
                    primaryText="Đồng ý"
                    onClose={setOpenModal}
                    onExcute={handleUpdateActive}
                >
                    Bạn có muốn&nbsp;
                    <strong>{!selectCampaign?.isActive ? "Hiện" : "Ẩn"}</strong>
                    &nbsp;chương trình khuyến mãi: <strong>{selectCampaign?.campaignName}</strong> không?
                </ModalCustom>

                <ModalLoading
                    open={loading}
                    onClose={() => {
                        setLoading(false)
                    }}
                />

                <ModalCustom
                    open={open}
                    title="Thông báo"
                    primaryText="Đồng ý"
                    onClose={setOpen}
                    onExcute={() => handleCheckProductFulfillment()}
                >
                    Thao tác này sẽ thực hiện kiểm tra tỉ lệ fulfill cho tất cả sản phẩm của <b>seller ngoài</b> đã được duyệt và đang ở trạng thái hiển thị trong CTKM (CTKM đang hiển thị và đang diễn ra)
                    <br />

                    <strong>  Nếu sản phẩm có tỉ lệ fulfill và tỉ lệ fulfill không đạt tỉ lệ fulfill tối thiểu của CTKM yêu cầu sẽ bị tắt hiển thị</strong>
                    <br />
                    Bạn có chắc muốn thực hiện thao tác này?
                </ModalCustom>

                <CheckDuplicateDialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(false)
                        setListError([])
                    }}
                    list={listError}
                />
            </MyCard>

        </AppMarketing>
    )

};

export default function SaleCampaign(props) {
    return renderWithLoggedInUser(props, SaleCampaignPage);
}
