import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React, { useState } from 'react';
import Head from 'next/head';
import AppMarketing from 'pages/_layout';
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import {
    Button, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip
} from "@material-ui/core";
import { useRouter } from "next/router";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getAccountClient } from "client/account";
import { getSaleCampaignClient } from "client/saleCampaign";
import { formatDateTime, formatNumber } from "components/global";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckFulfillmentStatusButton } from "containers/sale-campaign/check-fulfillment/CheckFulfillmentStatusButton";
import { CheckFulfillmentFilter } from "containers/sale-campaign/check-fulfillment/CheckFulfillmentFilter";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Authorization from "@thuocsi/nextjs-components/authorization/authorization";
import AuthorizationScreen from "components/authorization-screen";
import Link from "next/link";

function startDate(time) {
    const start = new Date(time);
    // start.setHours(0, 0, 0, 0)
    start.setTime(start.getTime() - (7 * 60 * 60 * 1000)) // local bi lech 7h
    return start.toISOString()
}

function endDate(time) {
    const end = new Date(time);
    // end.setHours(23, 59, 59, 999);
    end.setTime(end.getTime() - (7 * 60 * 60 * 1000))
    return end.toISOString()
}

export async function loadData(ctx) {
    const props = {
        filterData: {},
        listResult: [],
        accountMap: {},
        totalResult: 0,
        saleCampaignMap: {},
        saleCampaignOpts: []
    };

    let data = { props };
    let query = ctx.query;
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query?.q || "{}");

    const filterData = q;
    props.filterData = filterData

    if (filterData.createdTimeFrom) filterData.createdTimeFrom = startDate(filterData.createdTimeFrom)
    if (filterData.createdTimeTo) filterData.createdTimeTo = endDate(filterData.createdTimeTo)

    const campaignClient = getSaleCampaignClient(ctx, {})

    const saleCampaignResp = await campaignClient.getListSaleCampaign(0, 20, {})
    if (saleCampaignResp.status === "OK") {
        props.saleCampaignOpts = saleCampaignResp.data?.map(item => ({
            label: item.campaignName ?? "",
            value: item.campaignCode ?? ""
        }))
    }

    const resultResp = await campaignClient.getListCheckProductFulfillmentLog(offset, limit, filterData)
    if (resultResp.status === "OK") {
        props.totalResult = resultResp.total
        props.listResult = resultResp.data
    }
    else {
        props.totalResult = 0
        props.listResult = []
    }

    const accountIds = []
    const campaignCodes = []

    resultResp.data?.forEach(item => {
        accountIds.push(item.accountID)
        campaignCodes.push(item.campaignCode)
    })

    const accountResp = await getAccountClient(ctx, data).getAccountByIds([... new Set(accountIds)])
    if (accountResp.status === "OK") {
        accountResp.data.forEach(acc => {
            props.accountMap[acc.accountId] = acc.email && acc.email !== "" ? acc.email : acc.username;
        })
    }

    const campaignResp = await campaignClient.getSaleCampaignByCodes([...new Set(campaignCodes)])
    if (campaignResp.status === "OK") {
        campaignResp.data?.forEach(campaign => {
            props.saleCampaignMap[campaign.campaignCode] = campaign
        })
    }

    return data
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

function render(props) {
    // console.log(props)
    const { accountMap, listResult, saleCampaignMap, totalResult, saleCampaignOpts, filterData } = props

    const router = useRouter();
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);

    const toast = useToast()
    const [open, setOpen] = useState(false)

    const handleApplyFilter = async (data) => {

        router.push({
            pathname: "/marketing/check-product-fulfillment",
            query: {
                q: JSON.stringify(data),
                page: 0,
                limit: limit
            }
        });
    };

    const handlePageChange = async (event, page, rowsPerPage) => {
        await router.push({
            pathname: "/marketing/check-product-fulfillment",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage,
            },
        });
    };

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
            link: "/marketing/sale-campaign"
        },
        {
            name: "Lịch sử kiểm tra tỉ lệ fulfill của sản phẩm",
        }
    ]

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/gamification" breadcrumb={breadcrumb}>
                <Head>
                    <title>Lịch sử kiểm tra tỉ lệ fulfill của sản phẩm</title>
                </Head>

                <MyCard>
                    <MyCardHeader title="Lịch sử kiểm tra tỉ lệ fulfill của sản phẩm">
                        <Authorization requiredAPI="POST/marketplace/promotion/v1/campaign/check-fulfillment">
                            <Button style={{ marginRight: 8 }} variant="contained" color="primary" onClick={() => setOpen(true)}>
                                Kiểm tra tỉ lệ fulfill
                            </Button>
                        </Authorization>
                    </MyCardHeader>

                    <CheckFulfillmentFilter
                        filterData={filterData} open={true} onFilterChange={handleApplyFilter} saleCampaignOpts={saleCampaignOpts}

                    />

                    <TableContainer>
                        <Table>
                            <colgroup>
                                <col width="5%" />
                                <col width="5%" />
                                <col />
                                <col width="20%" />
                            </colgroup>
                            <TableHead>
                                <TableCell>STT</TableCell>
                                <TableCell>Mã</TableCell>
                                <TableCell>Banner</TableCell>
                                <TableCell>Tên CTKM</TableCell>
                                <TableCell>Loại</TableCell>
                                <TableCell>Thời gian chạy</TableCell>
                                <TableCell>Số sản phẩm đạt  <Tooltip title="Số sản phẩm đạt là số sản phẩm có tỉ lệ fulfill thỏa mãn tỉ lệ fulfill tối thiểu của CTKM. Nếu sản phẩm không có tỉ lệ fulfill sẽ được xem là đạt">
                                    <HelpOutlineIcon style={{ transform: "translateY(3px)", fontSize: "1.2rem" }} />
                                </Tooltip> /
                                    <br />
                                    Số sản phẩm kiểm tra <Tooltip title="Số sản phẩm kiểm tra là tất cả sản phẩm của seller ngoài đang hiển thị và có trạng thái đang bán trong CTKM">
                                        <HelpOutlineIcon style={{ transform: "translateY(3px)", fontSize: "1.2rem" }} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Người thực hiện</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableHead>

                            <TableBody>
                                {
                                    listResult?.length > 0 && listResult.map((row, index) => (
                                        <TableRow>
                                            <TableCell>{page * limit + index + 1}</TableCell>
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell>
                                                {saleCampaignMap[row.campaignCode]?.banner && (
                                                    <img src={saleCampaignMap[row.campaignCode]?.banner} alt={saleCampaignMap[row.campaignCode]?.campaignName} width={130}
                                                        height={70} />
                                                )}
                                            </TableCell>
                                            <TableCell>{saleCampaignMap[row.campaignCode]?.campaignName ?? " - "}</TableCell>
                                            <TableCell>{row.type === "MANUAL" ? "Thủ công" : "Hệ thống"}</TableCell>
                                            <TableCell>
                                                Từ: {formatDateTime(row.startTime)}
                                                <br />
                                                Đến: {formatDateTime(row.endTime)}
                                            </TableCell>
                                            <TableCell>{formatNumber(row.numberOfActiveCampaignProduct ?? 0)}/{formatNumber(row.total ?? 0)}</TableCell>
                                            <TableCell>
                                                <CheckFulfillmentStatusButton status={row.status} />
                                            </TableCell>
                                            <TableCell>{accountMap[row.accountID] ?? "Hệ thống"}</TableCell>
                                            <TableCell>

                                                <Authorization requiredAPI="GET/marketplace/promotion/v1/campaign/check-fulfillment-detail/list">
                                                    <Link href={`/marketing/check-product-fulfillment/detail?code=${row.code}`}>
                                                        <a>
                                                            <Tooltip title="Xem chi tiết các sản phẩm kiểm tra">
                                                                <IconButton>
                                                                    <FontAwesomeIcon icon={faEye} size="sm" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </a>
                                                    </Link>
                                                </Authorization>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                {
                                    listResult?.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} align="left">
                                                Không tìm thấy kiểm tra tỉ lệ fulfill của sản phẩm
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>

                            <MyTablePagination
                                labelUnit="lịch sử kiểm tra"
                                count={totalResult}
                                rowsPerPage={limit}
                                page={page}
                                onChangePage={handlePageChange}
                            />
                        </Table>
                    </TableContainer>

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
                </MyCard>

            </AppMarketing>
        </AuthorizationScreen>
    )

};

export default function CheckProductFulfillmentListPage(props) {
    return renderWithLoggedInUser(props, render);
}
