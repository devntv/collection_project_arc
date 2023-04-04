import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { getDealClient } from "client/deal";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import React from "react";
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { ImportHistoryFilter } from "containers/import-history-deal/ImportHistoryFilter";
import { ImportStatusButton } from "containers/import-history-deal/ImportStatusButton";
import { parseQ } from "components/global";
import { getAccountClient } from "client/account";
import { formatDateTime } from 'components/global'
import AuthorizationScreen from "components/authorization-screen"
import Authorization from "@thuocsi/nextjs-components/authorization/authorization"

function startDate(time) {
    const start = new Date(time);
    start.setHours(-7, 0, 0, 0)
    return start.toISOString()
}

function endDate(time) {
    const end = new Date(time);
    end.setHours(16, 59, 59, 999);
    return end.toISOString()
}

export async function loadData(ctx) {
    const props = {
        importResults: [],
        count: 0,
        filterData: {},
        employeeOpts: [],
    };

    const data = { props }

    const query = ctx.query;
    const q = parseQ(query.q);
    const page = +(query.page || 0);
    const limit = +(query.limit || 20);
    const offset = page * limit;
    const filterData = q;

    if (filterData.createdTimeFrom) filterData.createdTimeFrom = startDate(filterData.createdTimeFrom)
    if (filterData.createdTimeTo) filterData.createdTimeTo = endDate(filterData.createdTimeTo)
    if (filterData.createdBy) filterData.createdBy = Number(filterData.createdBy)

    props.filterData = filterData
    const client = getDealClient(ctx, data);
    const res = await client.getListImportDeal({ offset, limit, q: { ...q, modelName: "deal" } });
    if (res.status === "OK") {
        props.importResults = res.data || []
        props.count = res.total || 0
    }

    const employeeResp = await getAccountClient(ctx, data).getListEmployee(0, 20, "")
    if (employeeResp.status === "OK" && employeeResp.data) {
        props.employeeOpts = employeeResp.data?.map(item => ({
            label: item.username ?? "",
            value: item.accountId ?? 0
        }))
    }

    return { props }
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, () => loadData(ctx));
}

function render({ filterData, employeeOpts, importResults, count }) {

    const router = useRouter();
    const limit = +(router.query.limit || 20);
    const page = +(router.query.page || 0);

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách deal",
            link: "/marketing/deal"
        },
        {
            name: "Danh sách lịch sử import deal hàng loạt",
        },
    ];

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/import-history-deal",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
    };

    const handleApplyFilter = async (data) => {
        router.push({
            pathname: "/marketing/import-history-deal",
            query: {
                q: JSON.stringify(data),
                page: 0,
                limit: limit
            }
        });
    };

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/import-history-deal" breadcrumb={breadcrumb}>
                <Head>
                    <title>Lịch sử import deal hàng loạt</title>
                </Head>
                <MyCard>
                    <MyCardHeader title="Danh sách lịch sử import deal hàng loạt"></MyCardHeader>
                    <ImportHistoryFilter filterData={filterData} employeeOpts={employeeOpts} onFilterChange={handleApplyFilter} />
                </MyCard>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Mã</TableCell>
                                <TableCell align="left">Người tạo</TableCell>
                                <TableCell align="left">Ngày tạo</TableCell>
                                <TableCell align="left">
                                    Số deal thành công /
                                    <br />
                                    Số deal xử lý
                                </TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <Authorization requiredAPI="GET/marketplace/product/v2/import-result-detail/list" style={{ display: "contents" }}>
                                    <TableCell align="center">Thao tác</TableCell>
                                </Authorization>
                            </TableRow>
                        </TableHead>
                        {count <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="left">Không tìm thấy lịch sử import deal hàng loạt</TableCell>
                            </TableRow>
                        ) : (
                            <TableBody>
                                {importResults.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">{row.code}</TableCell>
                                        <TableCell align="left">{row.username || row.accountID}</TableCell>
                                        <TableCell align="left">{formatDateTime(row.createdTime)}</TableCell>
                                        <TableCell align="left">{row.succeed || 0} / {row.total || 0}</TableCell>
                                        <TableCell align="center">
                                            <ImportStatusButton status={row.status} />
                                        </TableCell>
                                        <Authorization requiredAPI="GET/marketplace/product/v2/import-result-detail/list" style={{ display: "contents" }}>
                                            <TableCell align="center">
                                                <Link href={`/marketing/import-history-deal/detail?code=${row.code}`}>
                                                    <a>
                                                        <Tooltip title="Xem chi tiết import">
                                                            <IconButton>
                                                                <FontAwesomeIcon icon={faEye} size="xs" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </a>
                                                </Link>
                                            </TableCell>
                                        </Authorization>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                        {count > 0 ? (
                            <MyTablePagination
                                labelUnit="Import"
                                count={count}
                                rowsPerPage={limit}
                                page={page}
                                onChangePage={handlePageChange}
                            />
                        ) : (
                            <div />
                        )}
                    </Table>
                </TableContainer>
            </AppMarketing>
        </AuthorizationScreen>
    );
}

export default function ImportHistoryPage(props) {
    return renderWithLoggedInUser(props, render);
}
