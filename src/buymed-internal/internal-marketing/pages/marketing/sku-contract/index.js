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
    TableRow, Tabs, Tooltip, IconButton, Switch, Grid
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { SkuContractFilter } from "containers/sku-contract/SkuContractFilter";
import { formatDateTime, formatNumber } from "components/global";
import Link from "next/link";
import { Edit as EditIcon } from "@material-ui/icons";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getSkuContractClient } from "client/skuContract";
import { getCustomerClient } from "client/customer";
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';

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
        count: { all: 0 },
        total: 0,
        customerMap: {},
    };

    const data = { props };
    const query = ctx.query;
    const page = parseInt(query.page) || 0;
    const limit = parseInt(query.limit) || 20;
    const offset = page * limit;
    const q = JSON.parse(query.q ?? "{}");

    const filterData = q;

    if (filterData.startTime) filterData.startTime = startDate(filterData.startTime)
    if (filterData.endTime) filterData.endTime = endDate(filterData.endTime)

    props.filterData = filterData;

    const skuContractClient = getSkuContractClient(ctx, {})
    const resp = await skuContractClient.getListSkuContract(offset, limit, filterData)

    if (resp.status === "OK") {
        props.data = resp.data;
        props.total = resp.total;
    } else {
        props.data = [];
        props.total = 0
    }

    const ids = props.data?.map(item => item.customerID)
    const customerClient = getCustomerClient(ctx, {})
    const customerResp = await customerClient.getCustomerByIDs(ids)
    customerResp?.data?.forEach(element => {
        props.customerMap[element.customerID] = element.code
    });

    const statusList = ["", "UPCOMING", "PROCESSING", "EXPIRED"];

    if (!filterData.status || filterData.status === "") {
        props.count.all = resp?.total || 0
        statusList.splice(0, 1)
    } else {
        props.count[filterData.status.toLowerCase()] = resp?.total || 0
        statusList.splice(statusList.indexOf(filterData.status), 1)
    }

    let results = await Promise.all(statusList.map(status => {
        return skuContractClient.getListSkuContract(offset, limit, { ...filterData, status })
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


function SkuContractPage(props) {

    let router = useRouter();
    const q = JSON.parse(router.query.q || "{}")
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const count = props.count || {};
    const toast = useToast()
    const total = props.total || 0;
    const data = props.data || [];

    console.log("props: ", props);

    const [selectSkuContract, setSelectSkuContract] = useState({})
    const [openModal, setOpenModal] = useState(false)

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
                pathname: `/marketing/sku-contract`,
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
            pathname: "/marketing/sku-contract",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
    };


    const handleApplyFilter = async (data) => {

        router.push({
            pathname: "/marketing/sku-contract",
            query: {
                q: JSON.stringify(data),
                page: 0,
                limit: limit
            }
        });
    };

    const handleUpdateStatus = async () => {
        try {
            const { isActive, code } = selectSkuContract;
            const resp = await getSkuContractClient().changeStatusSkuContract({ code, isActive: !isActive })
            setSelectSkuContract({})
            if (resp.status === "OK") {
                toast.success("Thay đổi trạng thái thành công")
                setSelectSkuContract(null);
                router.push({
                    pathname: "/marketing/sku-contract",
                    query: {
                        ...router.query,
                    }
                });
            }
            else {
                toast.error(resp.message)
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách Cài đặt giá theo hợp đồng",
        }
    ]

    return (
        <AppMarketing select="/marketing/sku-contract" breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách Cài đặt giá theo hợp đồng</title>
            </Head>

            <MyCard>
                <MyCardHeader title="Danh sách Cài đặt giá theo hợp đồng">
                    <Authorization requiredScreen="/marketing/new-sku-contract">
                        <Button variant="contained" color="primary" onClick={() => router.push("/marketing/new-sku-contract")}>
                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
                            Thêm mới
                        </Button>
                    </Authorization>
                </MyCardHeader>
                <SkuContractFilter
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
                    label={`Đang hoạt động(${count.processing || "0"}) `}
                    onClick={() => handleTabChange(1, { status: "PROCESSING" })}
                />
                <Tab
                    index={3}
                    label={`Đã hết hạn(${count.expired || "0"})`}
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
                                <TableCell align="center">Mã hợp đồng</TableCell>
                                <TableCell align="center">Mã khách hàng</TableCell>
                                <TableCell align="left">Tên khách hàng</TableCell>
                                <TableCell align="center">SL sản phẩm</TableCell>
                                <TableCell align="center">Thời gian sử dụng</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data?.length > 0 && data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        <Authorization requiredScreen="/marketing/edit-sku-contract">
                                            <Link href={`/marketing/edit-sku-contract?code=${row.code}`} prefetch={false}>
                                                <a target="_blank" style={{ textDecoration: 'none', color: 'green' }}>
                                                    {row.code}
                                                </a>
                                            </Link>
                                        </Authorization>
                                    </TableCell>
                                    <TableCell align="center">{row.contractNumber}</TableCell>
                                    <TableCell align="center">
                                        <Link href={`/crm/customer/detail?customerCode=${props.customerMap[row.customerID] || ""}&customerId=${row.customerID}`} prefetch={false}>
                                            <a target="_blank" style={{ textDecoration: 'none', color: 'green' }}>
                                                {row.customerID}
                                            </a>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.customerName}</TableCell>
                                    <TableCell align="center">{formatNumber(row.quantity ?? 0)}</TableCell>
                                    <TableCell align="center">
                                        {formatDateTime(row.startTime)}
                                        <br />
                                        {formatDateTime(row.endTime)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Thay đổi trạng thái hợp đồng">
                                            <Switch
                                                color="primary"
                                                checked={row.isActive || false}
                                                onClick={() => {
                                                    if (row.status === "EXPIRED") {
                                                        toast.error("Không thể thay đổi trạng thái cho hợp đồng đã hết hạn")
                                                        return
                                                    }
                                                    setSelectSkuContract({
                                                        ...row,
                                                        isActive: row.isActive || false
                                                    })
                                                    setOpenModal(true);
                                                }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Grid container justifyContent="center" alignItems="center">
                                            <Authorization requiredScreen="/marketing/edit-sku-contract">
                                                <Link href={`/marketing/edit-sku-contract?code=${row.code}`} >
                                                    <Tooltip title="Cập nhật thông tin">
                                                        <IconButton>
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                            </Authorization>
                                            <Authorization requiredScreen="/marketing/history-sku-contract">
                                                <Link href={`/marketing/history-sku-contract?code=${row.code}`}>
                                                    <a>
                                                        <Tooltip title="Xem lịch sử thao tác">
                                                            <IconButton>
                                                                <FontAwesomeIcon icon={faHistory} style={{ color: "#777" }} size="sm" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </a>
                                                </Link>
                                            </Authorization>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {data.length === 0 && (

                                <TableRow>
                                    <TableCell colSpan={3} align="left">
                                        Không tìm thấy Cài đặt giá theo hợp đồng nào
                                    </TableCell>
                                </TableRow>

                            )}
                        </TableBody>
                        <MyTablePagination
                            labelUnit="hợp đồng"
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
                    onExcute={() => handleUpdateStatus()}
                >
                    Bạn có muốn&nbsp;
                    <strong>{!selectSkuContract?.isActive ? "Hiện" : "Ẩn"}</strong>
                    &nbsp;cài đặt giá hợp đồng này không?
                </ModalCustom>
            </MyCard>
        </AppMarketing>
    )
};

export default function SkuContract(props) {
    return renderWithLoggedInUser(props, SkuContractPage);
}
