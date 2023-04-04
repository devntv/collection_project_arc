import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import AppCMS from "pages/_layout";
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { getAccountClient } from "client/account";
import { getSaleCampaignClient } from "client/saleCampaign";
import { TableContainer, TableBody, Table, TableHead, TableCell, TableRow, IconButton, Tooltip } from "@material-ui/core";
import { formatDateTime, formatNumber } from "components/global";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { ImportStatusButton } from "containers/sale-campaign/import-result/ImportStatusButton";
import { ImportResultFilter } from "containers/sale-campaign/import-result/ImportResultFilter";
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData);
}

export default function HistoryPage(props) {
    return renderWithLoggedInUser(props, render)
}

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

// load history of
async function loadData(ctx) {

    let props = {
        data: [],
        total: 0,
        employeeOpts: [],
        filterData: {},
        accountMap: {},
        campaignMap: {},
        saleCampaignOpts: []
    }
    let data = { props };
    let query = ctx.query;
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query.q ?? "{}");

    const filterData = q;

    if (filterData.createdTimeFrom) filterData.createdTimeFrom = startDate(filterData.createdTimeFrom)
    if (filterData.createdTimeTo) filterData.createdTimeTo = endDate(filterData.createdTimeTo)
    if (filterData.createdBy) filterData.createdBy = Number(filterData.createdBy)

    props.filterData = filterData

    const saleCampaignResp = await getSaleCampaignClient(ctx, data).getListSaleCampaign(0, 10, {})
    if (saleCampaignResp.status === "OK") {
        props.saleCampaignOpts = saleCampaignResp.data?.map(item => ({
            label: item.campaignName ?? "",
            value: item.campaignCode ?? ""
        }))
    }

    const resp = await getSaleCampaignClient(ctx, data).getListImportResult(offset, limit, q)
    if (resp.status === "OK") {
        props.data = resp.data ?? []
        props.total = resp.total ?? 0
    }

    if (props.data?.length > 0) {
        const campaignCodes = []
        const accountIds = []
        props.data?.map(item => {
            accountIds.push(item.createdBy)
            campaignCodes.push(item.campaignCode)
            return item
        })
        const accountResp = await getAccountClient(ctx, data).getAccountByIds(accountIds)
        if (accountResp.status === "OK" && accountResp.data) {
            accountResp.data?.map(item => {
                props.accountMap[item.accountId] = item
                return item
            })
        }

        //Map campaign
        const campaignResp = await getSaleCampaignClient(ctx, data).getSaleCampaignByCodes(campaignCodes)
        if (campaignResp.status === "OK") {
            campaignResp.data.map(item => {
                props.campaignMap[item.campaignCode] = item
            })
        }
    }

    const employeeResp = await getAccountClient(ctx, data).getListEmployee(0, 20, {})
    if (employeeResp.status === "OK" && employeeResp.data) {
        props.employeeOpts = employeeResp.data?.map(item => ({
            label: item.username ?? "",
            value: item.accountId ?? 0
        }))
    }

    return data
}

function render(props) {
    const router = useRouter()
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);

    const { total, employeeOpts, filterData, accountMap, campaignMap, saleCampaignOpts, data } = props

    let breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Lịch sử import sản phẩm hàng loạt",
        },
    ]

    const handleApplyFilter = async (data) => {

        router.push({
            pathname: "/marketing/import-result-sale-campaign",
            query: {
                q: JSON.stringify(data),
                page: 0,
                limit: limit
            }
        });
    };

    const handlePageChange = async (event, page, rowsPerPage) => {
        await router.push({
            pathname: "/marketing/import-result-sale-campaign",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage
            }
        });
    };

    return (<AppCMS breadcrumb={breadcrumb}>
        <Head>
            <title>Lịch sử import sản phẩm hàng loạt</title>
        </Head>
        <MyCard>
            <MyCardHeader title={`Danh sách lịch sử import sản phẩm hàng loạt`} />
            <ImportResultFilter filterData={filterData} employeeOpts={employeeOpts} open={true} onFilterChange={handleApplyFilter} saleCampaignOpts={saleCampaignOpts} />
        </MyCard>

        <MyCard>
            <TableContainer>

                <Table>
                    <colgroup>
                        <col width="5%" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">MÃ</TableCell>
                            <TableCell align="left">BANNER</TableCell>
                            <TableCell align="left">TÊN CTKM</TableCell>
                            <TableCell align="left">SỐ SẢN PHẨM
                                <br />
                                XỬ LÝ
                            </TableCell>
                            <TableCell align="left">SỐ SẢN PHẨM
                                <br />
                                THÀNH CÔNG
                            </TableCell>
                            <TableCell align="left">NGƯỜI TẠO</TableCell>
                            <TableCell align="left">NGÀY TẠO</TableCell>
                            <TableCell align="left">TRẠNG THÁI</TableCell>
                            <TableCell align="left">THAO TÁC</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data?.length > 0 && data?.map(row => (
                            <TableRow key={row.code}>
                                <TableCell align="left">{row.code}</TableCell>
                                <TableCell align="left">
                                    {campaignMap[row.campaignCode]?.banner && (
                                        <img src={campaignMap[row.campaignCode]?.banner} alt={campaignMap[row.campaignCode]?.campaignName} width={130}
                                            height={70} />
                                    )}
                                </TableCell>

                                <TableCell align="left"> {campaignMap[row.campaignCode]?.campaignName ?? " - "}</TableCell>
                                <TableCell align="left">{formatNumber(row.total ?? 0)}</TableCell>
                                <TableCell align="left">{formatNumber(row.success ?? 0)}</TableCell>
                                <TableCell align="left">{accountMap[row.createdBy]?.username || " Không xác định "}</TableCell>
                                <TableCell align="left">{formatDateTime(row.createdTime)}</TableCell>
                                <TableCell align="left">
                                    <ImportStatusButton status={row.status} />
                                </TableCell>
                                <TableCell align="left">
                                    <Authorization requiredScreen="/marketing/view-detail-page-only">
                                        <Tooltip title="Xem chi tiết import">
                                            <IconButton onClick={() => {
                                                router.push({
                                                    pathname: "/marketing/detail-import-result-sale-campaign",
                                                    query: {
                                                        code: row.code
                                                    }
                                                });
                                            }}>
                                                <FontAwesomeIcon icon={faEye} size="sm" />
                                            </IconButton>
                                        </Tooltip>
                                    </Authorization>
                                </TableCell>
                            </TableRow>
                        ))}

                        {data?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="left">Không có lịch sử import</TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                    <MyTablePagination
                        labelUnit="import"
                        count={total}
                        rowsPerPage={limit}
                        page={page}
                        onChangePage={handlePageChange}
                    />
                </Table>
            </TableContainer>
        </MyCard>

    </AppCMS >)
}