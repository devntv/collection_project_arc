import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React, { useState } from 'react';
import Head from 'next/head';
import AppCS from 'pages/_layout';
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import {
    Button, Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Tooltip,
    Checkbox
} from "@material-ui/core";
import { useRouter } from "next/router";
import { SellerTicketFilter } from "containers/seller-ticket/SellerTicketFilter";
import ModalConfirm from "containers/seller-ticket/ModalConfirm";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { isValid, formatShortDateTime } from "components/global";
import { getSellerTicketClient } from "client/sellerTicket";
import { getSaleCampaignClient } from "client/saleCampaign";
import { getSellerClient } from "client/seller";
import { getProductClient } from "client/product";
import { getAccountClient } from "client/account";
import { listTimeSlot } from "components/component/constant"
import SellerTicketItem from "containers/seller-ticket/SellerTicketItem"
import { sellerTicketStatus } from "view-model/sellerTicket";

export async function loadRequestData(ctx) {
    const props = {
        filterData: {},
        data: [],
        count: {
            all: 0,
        },
        total: 0,
        accountMap: {},
        productMap: {},
        sellerMap: {},
        campaignMap: {},
        sellerOpts: [],
        campaignOpts: [],
        productOpts: [],
    };

    let data = { props };
    let query = ctx.query;
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query.q ?? "{}");

    const filterData = q;

    props.filterData = filterData;

    const sellerClient = getSellerClient(ctx, data);
    const productClient = getProductClient(ctx, data);
    const sellerTicketClient = getSellerTicketClient(ctx, {})
    const campaignClient = getSaleCampaignClient(ctx, {})

    // get data
    const resp = await sellerTicketClient.getListSellerTicket(offset, limit, filterData)

    if (resp.status === "OK") {
        props.data = resp.data;
        props.total = resp.total;
    } else {
        props.data = [];
        props.total = 0
    }

    let accountIds = [];
    let sellerCodes = [];
    let productIDs = [];
    let campaignIds = [];
    // map list id
    resp.data?.map(item => {
        if (item.updatedBy) accountIds.push(item.updatedBy)
        if (item.sellerCode) sellerCodes.push(item.sellerCode)
        if (item.productID) productIDs.push(item.productID)
        if (item.campaignID) campaignIds.push(item.campaignID)
    });
    // 

    const [accountResp, sellerResp, prdResp, sellerSearchResp, campaignResp, campaignOptionResp] = await Promise.all([
        getAccountClient(ctx, data).getAccountByIds(accountIds),
        sellerClient.getSellerBySellerCodes(sellerCodes),
        productClient.getListProductByIds([... new Set(productIDs)]),
        sellerClient.getSellerByName(''),
        sellerTicketClient.getCampaignByIds(campaignIds),
        campaignClient.getListSaleCampaign(0, 20, {}),
    ])

    if (accountResp.status === "OK") {
        accountResp.data.forEach(acc => {
            props.accountMap[acc.accountId] = acc.fullname || "";
        })
    }

    if (sellerResp.status === "OK") {
        sellerResp.data?.forEach(item => {
            props.sellerMap[item.code] = {
                label: item.name ?? "",
                id: item.sellerID ?? 0,
                value: item.code ?? ""
            }
        }) ?? []
    }

    if (prdResp.status === "OK") {
        prdResp.data?.forEach(item => {
            if (item.productID) props.productMap[item.productID] = item.name ?? ""
        })
    }

    if (campaignResp.status === "OK") {
        campaignResp.data.forEach(acc => {
            props.campaignMap[acc.campaignID] = acc;
        })
    }

    let statusList = ["", "WAIT_APPROVE", "APPROVED", "REJECTED"];

    if (!filterData.status || filterData.status === "") {
        props.count.all = resp?.total || 0
        statusList.splice(0, 1)
    } else {
        props.count[filterData.status.toLowerCase()] = resp?.total || 0
        statusList.splice(statusList.indexOf(filterData.status), 1)
    }

    let results = await Promise.all(statusList.map(status => {
        return sellerTicketClient.getListSellerTicket(offset, limit, { ...filterData, status })
    }))

    for (let i = 0; i < statusList.length; i++) {
        if (statusList[i] == "") {
            props.count.all = results[i]?.total || 0
        } else {
            props.count[statusList[i].toLowerCase()] = results[i]?.total || 0
        }
    }

    let flag = false
    if (campaignOptionResp.status === "OK") {
        campaignOptionResp.data?.map(item => {
            props.campaignOpts.push({
                label: item.campaignName ?? "",
                value: item.campaignID ?? ""
            })
        }) ?? []
    }

    if (filterData.campaignID) {
        const campaignDetail = await campaignClient.getSaleCampaign({ campaignID: +filterData.campaignID })
        if (campaignDetail.status === "OK" && campaignDetail.data[0]) {
            props.campaignOpts.push({
                label: campaignDetail.data[0].campaignName ?? "",
                value: campaignDetail.data[0].campaignID ?? ""
            })
        }
    }

    if (sellerSearchResp.status === "OK") {

        sellerSearchResp.data?.map(item => {
            props.sellerOpts.push({
                label: (item.sellerID ?? "0") + " - " + (item.name ?? ""),
                value: item.code ?? ""
            })
            if (filterData.sellerCode && filterData.sellerCode === item.code) flag = flag || true
        }) ?? []
    }

    if (!flag && filterData.sellerCode) {
        const assignResp = await sellerClient.getSellerBySellerCode(filterData.sellerCode)
        if (assignResp.status === "OK" && assignResp.data[0]) {
            props.sellerOpts.push({
                label: (assignResp.data[0].sellerID ?? "0") + " - " + (assignResp.data[0].name ?? ""),
                value: assignResp.data[0].code ?? ""
            })
        }
    }

    // 168 - 247 -> CHECK AGAIN
    //productOpts

    let listProductCodes = []
    let listMapProductSku = {}
    const productResp = await productClient.getListProduct({}, 0, 50)

    if (productResp.status == "OK") {
        productResp.data?.forEach((product) => {
            listProductCodes.push(product.code)
            listMapProductSku[product.code] = product
        })
    }
    let productFlag = false

    if (listProductCodes.length > 0) {
        let skusRes = await productClient.getSkuList({
            q: "",
            productCodes: listProductCodes,
        })

        if (skusRes.status !== "OK") {
            if (skusResp.status === "NOT_FOUND") {
                return [];
            } else {
                toast.error(skusRes.message ?? unknownErrorText);
            }
            return [];
        }

        // Map data to options
        let listSellerCode = [];
        skusRes.data?.map(({ sellerCode }) => {
            if (sellerCode) listSellerCode.push(sellerCode)
        })


        const sellerRes = await sellerClient.getSellerBySellerCodes([...new Set(listSellerCode)]);
        const sellerMap = await sellerRes?.data?.reduce((acc, seller) => {
            acc[seller.code] = seller;
            return acc
        }, {}) || {};

        let lstOptions = []

        skusRes.data?.forEach((item) => {
            let label = item.productID + " - " + listMapProductSku[item.productCode]?.name ?? item.code;
            if (item.sellerCode && sellerMap[item.sellerCode]?.name) {
                label += ` - ${sellerMap[item.sellerCode]?.name || ""}`
            }
            else { return; }
            if (item.code) {
                if (filterData.sku && filterData.sku === item.code) productFlag = productFlag || true
                lstOptions.push({
                    value: item.code ?? "",
                    label,
                })
            }
        })

        props.productOpts = lstOptions
    }

    if (!productFlag && filterData.sku) {
        const skuRes = await productClient.getProductListBySKUs([filterData.sku])
        props.c = skuRes
        if (skuRes.status === "OK") {
            const product = skuRes.data[0]
            let label = product.product.productID + " - " + product.product.name
            let value = product.sku.code

            const res = await sellerClient.getSellerBySellerCodes([product.sku.sellerCode]);
            if (res.status === "OK" && res.data[0]) {
                label += `- ${res.data[0].name ?? ""}`
            }

            props.productOpts.push({
                label,
                value
            })
        }
    }

    return { props }
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadRequestData(cbCtx));
}

function cleanData(data) {
    for (let key in data) {
        !data[key] && delete data[key]
    }
    return JSON.stringify(data)
}


function SellerTicketPage(props) {

    const toast = useToast()
    let router = useRouter();
    const q = JSON.parse(router.query.q || "{}")
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const count = props.count || {};
    const total = props.total
    const data = props.data || [];

    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [isChooseAll, setIsChooseAll] = useState(false)

    const [selectedTicket, setSelectedTicket] = useState({})
    const [codes, setCodes] = useState([]);
    const [status, setStatus] = useState(false)
    const [ticketCodes, setTicketCodes] = useState([])

    const mapListTime = {}
    listTimeSlot?.forEach(item => mapListTime[item.value] = item.label)

    let valueTab = 0

    switch (q.status) {
        case "":
            valueTab = 0;
            break;
        case "WAIT_APPROVE":
            valueTab = 1;
            break;
        case "APPROVED":
            valueTab = 2;
            break;
        case "REJECTED":
            valueTab = 3;
            break;
        default:
            valueTab = 0;
            break;
    }


    const handleTabChange = (tab, obj = {}) => {
        try {
            const q = router.query.q || "{}"
            let query = JSON.parse(q)
            for (let k in obj) {
                query[k] = obj[k]
            }
            setCodes([])
            setIsChooseAll(false)
            router.push({
                pathname: `/marketing/seller-ticket`,
                query: {
                    q: cleanData(query),
                }
            }).then()
        } catch (error) {
            console.log(error)
        }
    };

    const handleApplyFilter = async (data) => {

        router.push({
            pathname: "/marketing/seller-ticket",
            query: {
                q: JSON.stringify(data),
                page: 0,
                limit: limit
            }
        });
    };

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/seller-ticket",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
    };

    const handleUpdateTicketStatus = async (status, data) => {
        const params = {
            ticketID: selectedTicket.ticketID,
            sellerCode: selectedTicket.sellerCode,
            status
        }

        if (status === "REJECTED") params.note = data?.note
        const resp = await getSellerTicketClient().updateStatusTicket(params)

        if (resp.status === "OK") {
            toast.success(`${status === "APPROVED" ? "Duyệt" : "Từ chối"} sản phẩm thành công`)
            setSelectedTicket({})
            setTimeout(() => {
                router.push({
                    pathname: "/marketing/seller-ticket",
                    query: {
                        ...router.query
                    },
                });
            }, 2000);
        }
        else {
            let message = resp.message || "Vui lòng thử lại sau"
            if (resp.errorCode === "PRODUCT_NOT_MATCH") {
                message = "Sản phẩm không đủ điều kiện tham gia vào chương trình khuyến mãi"
            } else if (resp.errorCode === "PRODUCT_CATEGORY_NOT_MATCH") {
                message = "Sản phẩm có danh mục không đủ điều kiện tham gia vào chương trình khuyến mãi"
            }
            toast.error(message)
        }
        setOpenDialog(false)
    }

    const getTimeFlashsale = (campaign, flashSaleTime) => {
        let arr = []
        const objFlashSale = {}
        campaign?.flashSaleTimes?.forEach(item => {
            item?.detail?.forEach(el => {
                objFlashSale[el.ref] = {
                    time: mapListTime[el.code] || el.code,
                    dateTime: `${formatShortDateTime(item.startTime)} - ${formatShortDateTime(item.endTime)}`
                }
            })
        })

        flashSaleTime?.forEach(item => {
            arr = arr.concat(objFlashSale[item])
        })
        return arr
    }

    const batchUpdateTicketStatus = async (data) => {
        const respError = [];
        const respSuccess = [];
        let message = "";
        let listReq = codes;

        if (status === "APPROVED" || status === "REJECTED") {
            listReq = codes?.filter(item => item.status === "WAIT_APPROVE")
        }

        if (!listReq.length) {
            toast.error("Không có yêu cầu ở trạng thái chờ duyệt để thay đổi trạng thái")
            return
        }

        const productMap = {}
        const campaignMap = {}

        if (status === "APPROVED") {
            const campaignIDs = listReq?.map(item => item.campaignID)
            const campaignResp = await getSaleCampaignClient().getListSaleCampaignByCampaignIDs(campaignIDs)

            if (campaignResp.status === "OK" && campaignResp.data?.length > 0) {
                campaignResp.data?.map(item => {
                    campaignMap[item.campaignID] = item
                    return item
                })
            }

            const skus = listReq?.map(item => item.sku)
            const skuResp = await getProductClient().getProductListBySKUs([... new Set(skus)])
            if (skuResp.status === "OK" && skuResp.data?.length > 0) {
                skuResp.data?.map(({ sku }) => {
                    productMap[sku.code] = sku
                })
            }
        }

        for (let index in listReq) {
            let params = {
                ticketID: listReq[index].ticketID,
                sellerCode: listReq[index].sellerCode,
                status
            }

            if (status === "REJECTED") params.note = data?.note

            const res = await getSellerTicketClient().updateStatusTicket(params)
            if (!isValid(res)) {
                if(listReq.length === 1) {
                    message = res.message
                }
                respError.push(`#${listReq[index].ticketID}`)
            } else {
                respSuccess.push(`#${listReq[index].ticketID}`)
            }
        }

        setOpen(false)
        if (respError.length) {
            if(listReq.length === 1) {
                toast.error(message)
            } else {
                toast.error(`Đã xảy ra lỗi với các ticket ${respError?.length > 3
                    ? respError.slice(0, 3)?.join(", ") + " và n ticket khác"
                    : respError?.join(", ")}`)
            }
        
            if (!respSuccess.length) {
                setStatus("")
                setTimeout(() => {
                    router.reload()
                }, 2000);
                return
            }
        }

        if (respSuccess.length) {
            setTimeout(() => {
                toast.success(`${status === "APPROVED" ? "Duyệt" : "Từ chối"} ticket ${respSuccess?.length > 3
                    ? respSuccess.slice(0, 3)?.join(", ") + " và n ticket khác"
                    : respSuccess?.join(", ")} thành công`)
                setStatus("")
            }, 1500);
            setTimeout(() => {
                router.reload()
            }, 3000);
            return
        }

    }

    const getData = (resp) => {
        const array = []
        if (!isValid(resp)) return []
        resp?.data?.forEach((item) => {
            if (item.status === "WAIT_APPROVE") {
                array.push({
                    ...item,
                    ticketCode: item.ticketCode,
                    ticketID: item.ticketID,
                    sellerCode: item.sellerCode,
                    status: item.status,
                })
            }
        })
        return array
    };

    const handleCheckAll = async (e) => {
        const flag = e.target.checked
        setIsChooseAll(flag)

        const totalPageSize = Math.ceil(total / limit);
        const requestGetAllData = [];
        let listTicketCode = []
        for (let page = 0; page < totalPageSize; ++page) {
            requestGetAllData.push(
                getSellerTicketClient().getListSellerTicket(page * limit, limit, props.filterData)
            );
        }

        const arrayResult = await Promise.all(requestGetAllData);

        arrayResult.forEach(res => { listTicketCode = listTicketCode.concat(getData(res)) })

        setTicketCodes(listTicketCode)

        if (flag === true) {
            setCodes(listTicketCode)
        }
        else {
            setCodes([])
        }
    }


    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách yêu cầu"
        },
    ]

    return (
        <AppCS select="/marketing/seller-ticket" breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách yêu cầu</title>
            </Head>

            <MyCard>
                <MyCardHeader title={"Danh sách yêu cầu"}>
                </MyCardHeader>

                {/* filter */}
                <SellerTicketFilter
                    open={true}
                    onFilterChange={handleApplyFilter}
                    filterData={props.filterData}
                    router={router}
                    campaignOpts={props.campaignOpts}
                    sellerOpts={props.sellerOpts}
                    productOpts={props.productOpts}
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
                    label={`Chờ duyệt(${count.wait_approve || "0"}) `}
                    onClick={() => handleTabChange(1, { status: "WAIT_APPROVE" })}
                />
                <Tab
                    index={2}
                    label={`Đã duyệt(${count.approved || "0"}) `}
                    onClick={() => handleTabChange(1, { status: "APPROVED" })}
                />
                <Tab
                    index={3}
                    label={`Từ chối(${count.rejected || "0"})`}
                    onClick={() => handleTabChange(2, { status: "REJECTED" })}
                />
                {/* {codes.length > 0 && (
                    <div style={{ marginLeft: "100px", position: "absolute", right: "0" }}>
                        <Tooltip title="Thay đổi trạng thái các yêu cầu đang chọn thành Duyệt">
                            <Button style={{ marginRight: "16px" }} variant="contained" color="primary" onClick={() => {
                                setStatus("APPROVED")
                                setOpen(true)
                            }}>Duyệt</Button>
                        </Tooltip>

                        <Tooltip title="Thay đổi trạng thái các yêu cầu đang chọn thành Từ chối">
                            <Button style={{ marginRight: "32px" }} variant="contained" color="secondary" onClick={() => {
                                setStatus("REJECTED")
                                setOpen(true)
                            }}>Từ chối</Button>
                        </Tooltip>
                    </div>
                )} */}
            </Tabs>

            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col width="5%" />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                {/* {props.filterData?.status !== "APPROVED" && props.filterData?.status !== "REJECTED" &&
                                    <TableCell align="center">
                                        <Tooltip title={`Chọn tất cả yêu cầu(${total})`}>
                                            <Checkbox checked={isChooseAll} onChange={handleCheckAll} />
                                        </Tooltip>
                                    </TableCell>
                                } */}
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">BANNER</TableCell>
                                <TableCell align="left">TÊN CTKM</TableCell>
                                <TableCell align="left">TÊN SẢN PHẨM</TableCell>
                                <TableCell align="left">GIÁ TRƯỚC <br /> KHUYẾN MÃI</TableCell>
                                <TableCell align="left">GIÁ SAU KM
                                    <br />
                                    hoặc GIÁ ĐÃ DUYỆT
                                </TableCell>
                                <TableCell align="left">GIẢM GIÁ
                                </TableCell>
                                <TableCell align="left">GIẢM TỐI ĐA</TableCell>
                                <TableCell align="left">SỐ LƯỢNG/
                                    <br />
                                    GIỚI HẠN MUA
                                </TableCell>
                                <TableCell align="left">THỜI GIAN ĐĂNG KÝ
                                </TableCell>
                                <TableCell align="left">THỜI GIAN DUYỆT/
                                    <br />
                                    NGƯỜI DUYỆT
                                </TableCell>
                                <TableCell align="left">KHUNG GIỜ KM</TableCell>
                                <TableCell align="left">TRẠNG THÁI</TableCell>
                                <TableCell align="center" width={215}>THAO TÁC</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data?.length > 0 && data.map(row => (
                                <SellerTicketItem
                                    isChooseAll={isChooseAll}
                                    setIsChooseAll={setIsChooseAll}
                                    setCodes={setCodes}
                                    codes={codes}
                                    ticketCodes={ticketCodes}
                                    row={row}
                                    {...props}
                                    getTimeFlashsale={getTimeFlashsale}
                                    handleApprove={(row) => {
                                        setOpenDialog(true)
                                        setStatus("APPROVED")
                                        setSelectedTicket(row)
                                    }}
                                    handleReject={(row) => {
                                        setOpenDialog(true)
                                        setSelectedTicket(row)
                                        setStatus("REJECTED")
                                    }}
                                />
                            ))}

                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={13} align="left">
                                        Không tìm thấy yêu cầu nào
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <MyTablePagination
                            labelUnit="yêu cầu"
                            count={total}
                            rowsPerPage={limit}
                            page={page}
                            onChangePage={handlePageChange}
                        />
                    </Table>
                </TableContainer>
                <ModalConfirm
                    open={open}
                    onClose={() => {
                        setStatus("")
                        setOpen(false)
                        setCodes([])
                        setIsChooseAll(false)
                    }}
                    type={status}
                    onExcute={(data) => batchUpdateTicketStatus(data)}
                    label={
                        <React.Fragment>
                            Bạn có chắc muốn thay đổi trạng thái các yêu cầu đã chọn thành
                            <strong> {sellerTicketStatus?.filter(item => item.value === status)[0]?.label ?? status}</strong> ?
                        </React.Fragment>
                    }
                />

                <ModalConfirm
                    open={selectedTicket && openDialog}
                    onClose={() => {
                        setStatus("")
                        setSelectedTicket({})
                        setOpenDialog(false)
                    }}
                    type={status}
                    onExcute={(data) => handleUpdateTicketStatus(status, data)}
                    label={
                        <React.Fragment>
                            Bạn muốn&nbsp;
                            <strong>{status === "APPROVED" ? "duyệt" : "từ chối"}</strong>
                            &nbsp;sản phẩm: {props.productMap[selectedTicket?.productID] ?? " - "} cho chương trình khuyến mãi: <strong>{props.campaignMap[selectedTicket?.campaignID]?.campaignName ?? " - "}</strong> không?
                        </React.Fragment>
                    }
                />
            </MyCard>
        </AppCS>
    )

};

export default function SellerTicket(props) {
    return renderWithLoggedInUser(props, SellerTicketPage);
}