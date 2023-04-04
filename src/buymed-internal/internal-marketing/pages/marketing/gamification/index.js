import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React, { useState } from 'react';
import Head from 'next/head';
import AppMarketing from 'pages/_layout';
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { faPlus, faHistory } from "@fortawesome/free-solid-svg-icons";
import {
    Button, Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tabs, Tooltip, IconButton, Switch, Typography
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { formatDateTime, formatEllipsisText, formatNumber, gamificationTypeMap } from "components/global";
import Link from "next/link";
import { Edit as EditIcon } from "@material-ui/icons";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getAccountClient } from "client/account";
import { getGamificationClient } from "client/gamification";
import { GamificationFilter } from "containers/gamification/GamificationFilter";
import ListIcon from '@material-ui/icons/List';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getSellerClient } from "client/seller";

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
        total: 0,
        sellerMap: {},
        sellerOptions: []
    };

    let data = { props };
    let query = ctx.query;
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query?.q || "{}");

    const filterData = q;

    if (filterData.createdTimeFrom) filterData.createdTimeFrom = startDate(filterData.createdTimeFrom)
    if (filterData.createdTimeTo) filterData.createdTimeTo = endDate(filterData.createdTimeTo)
    if (filterData.processingTimeFrom) filterData.processingTimeFrom = startDate(filterData.processingTimeFrom)
    if (filterData.processingTimeTo) filterData.processingTimeTo = endDate(filterData.processingTimeTo)

    props.filterData = filterData

    const gamificationClient = getGamificationClient(ctx, {})
    const resp = await gamificationClient.getListGamification(offset, limit, filterData, filterData?.search || "")

    // console.log("resp=", resp)

    if (resp.status === "OK") {
        props.data = resp.data ?? [];
        props.total = resp.total ?? 0;
    } else {
        props.data = [];
        props.total = 0
    }

    const sellerCodes = []

    resp.data?.map(item => {
        if (item.sellerCode) sellerCodes.push(item.sellerCode)
    })

    if (filterData.sellerCode && filterData.sellerCode !== "") sellerCodes.push(filterData.sellerCode)
    const sellerResp = await getSellerClient(ctx, data).getSellerBySellerCodes([...new Set(sellerCodes)])
    if (sellerResp.status === "OK") {
        sellerResp.data?.forEach(seller => {
            props.sellerMap[seller.code] = `${seller.code} - ${seller.name}`
            if (seller.code === filterData.sellerCode) props.sellerOptions.push({
                label: `${seller.code} - ${seller.name}`,
                value: seller.code
            })
        })

    }

    const sellerOptsResp = await getSellerClient(ctx, data).getListSeller(0, 20, {})
    if (sellerOptsResp.status === "OK") {
        sellerOptsResp.data?.forEach(seller => {
            if (!filterData.sellerCode || filterData.sellerCode === "" || seller.code !== filterData?.sellerCode) props.sellerOptions.push({
                label: `${seller.code} - ${seller.name}`,
                value: seller.code
            })
        })
    }


    let statusList = ["", "UPCOMING", "PROCESSING", "EXPIRED", "SCORING"];

    if (!filterData.status || filterData.status === "") {
        props.count.all = resp?.total || 0
        statusList.splice(0, 1)
    } else {
        props.count[filterData.status.toLowerCase()] = resp?.total || 0
        statusList.splice(statusList.indexOf(filterData.status), 1)
    }

    let results = await Promise.all(statusList.map(status => {
        return gamificationClient.getListGamification(0, 1, { ...filterData, status }, filterData?.search || "")
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


function GamificationPage(props) {

    let router = useRouter();
    const q = JSON.parse(router.query.q || "{}")
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const count = props.count ?? {};
    const toast = useToast()
    const total = props.total ?? 0;
    const data = props.data ?? [];

    const [selectGamification, setSelectGamification] = useState({})
    const [openModal, setOpenModal] = useState(false)
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
        case "SCORING":
            valueTab = 4;
            break;
    }


    const handleTabChange = (obj = {}) => {
        try {
            props.filterData.status = obj.status

            router.push({
                pathname: `/marketing/gamification`,
                query: {
                    ...router.query,
                    q: JSON.stringify(props.filterData),
                    page: 0
                }
            }).then()
        } catch (error) {
            console.log(error)
        }
    };


    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/gamification",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
    };


    const handleApplyFilter = async (data) => {

        router.push({
            pathname: "/marketing/gamification",
            query: {
                q: JSON.stringify(data),
                page: 0,
                limit: limit
            }
        });
    };

    const handleUpdateActive = async () => {
        try {
            const { isActive, gamificationCode } = selectGamification;
            const resp = await getGamificationClient().updateGamification({ gamificationCode, isActive: !isActive })
            setSelectGamification({})
            if (resp.status === "OK") {
                toast.success("Thay đổi trạng thái hiển thị thành công")
                router.push({
                    pathname: "/marketing/gamification",
                    query: {
                        ...router.query,
                    }
                });
            }
            else {
                toast.error(resp?.message || "Có lỗi xảy ra, vui lòng thử lại sau.")
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleUpdateCustomer = async () => {
        setOpen(false)
        const resp = await getGamificationClient().syncGamification()
        if (resp.status === "OK") {
            toast.success(resp?.message || "Đang tiến hàng cập nhật kết quả chương trình trả thưởng")
        }
        else {
            toast.error(resp?.message || "Có lỗi xảy ra, vui lòng thử lại sau")
        }
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách chương trình thưởng",
        }
    ]

    return (
        <AppMarketing select="/marketing/gamification" breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách chương trình thưởng theo nhiệm vụ</title>
            </Head>

            <MyCard>
                <MyCardHeader title="Danh sách chương trình thưởng">
                    <Button style={{ marginRight: 8 }} variant="contained" color="primary" onClick={() => {
                        setOpen(true)
                    }}>
                        Cập nhật kết quả chương trình
                    </Button>


                    <Button variant="contained" color="primary" onClick={() => router.push("/marketing/gamification/new")}>
                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
                        Thêm mới
                    </Button>
                </MyCardHeader>

                <GamificationFilter
                    open={true}
                    onFilterChange={handleApplyFilter}
                    filterData={props.filterData}
                    router={router}
                    sellerOptions={props.sellerOptions}
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
                    onClick={() => handleTabChange({ status: "" })}
                />
                <Tab
                    index={1}
                    label={`Sắp diễn ra(${count.upcoming || "0"}) `}
                    onClick={() => handleTabChange({ status: "UPCOMING" })}
                />
                <Tab
                    index={2}
                    label={`Đang hoạt động(${count.processing || "0"}) `}
                    onClick={() => handleTabChange({ status: "PROCESSING" })}
                />
                <Tab
                    index={3}
                    label={`Đã hết hạn(${count.expired || "0"})`}
                    onClick={() => handleTabChange({ status: "EXPIRED" })}
                />
                <Tab
                    index={4}
                    label={`Đang trong thời gian tính điểm(${count.scoring || "0"}) `}
                    onClick={() => handleTabChange({ status: "SCORING" })}
                    style={{ maxWidth: "300px" }}
                />

                {/* <span style={{ position: 'absolute', padding: '15px', right: '15px' }}>
                    (Đơn vị tiền tệ: Việt Nam Đồng - VND)
                </span> */}

            </Tabs>

            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col width="5%" />
                            <col width="15%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col />
                            <col />
                            <col />
                        </colgroup>

                        <TableHead>
                            <TableRow>
                                <TableCell align="left">MÃ</TableCell>
                                <TableCell align="left">TÊN CHƯƠNG TRÌNH</TableCell>
                                <TableCell align="left">LOẠI NHIỆM VỤ</TableCell>
                                <TableCell align="left">ĐƠN VỊ TỔ CHỨC</TableCell>
                                <TableCell align="right">TIÊU CHÍ NHIỆM VỤ </TableCell>
                                <TableCell align="left">SỐ KH ĐÃ THAM GIA/
                                    <br />
                                    SỐ KH ĐÃ HOÀN TẤT </TableCell>
                                <TableCell align="left">THỜI GIAN TẠO/
                                    <br />
                                    THỜI GIAN HIỂN THỊ </TableCell>
                                <TableCell align="left">THỜI GIAN DIỄN RA </TableCell>
                                <TableCell align="center">TRẠNG THÁI</TableCell>
                                <TableCell align="center">THAO TÁC</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data?.length > 0 && data.map(row => (
                                <TableRow key={row.gamificationCode}>
                                    <TableCell align="left">{row.gamificationCode}</TableCell>
                                    <TableCell align="left">
                                        <Tooltip title={row.name}>
                                            <Typography>
                                                {formatEllipsisText(row.name, 80)}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">{gamificationTypeMap[row.details?.[0]?.condition?.type] ?? "Chương trình theo doanh số"}</TableCell>
                                    <TableCell align="left">
                                        {row.sellerCode && row.sellerCode !== "" ? (props?.sellerMap?.[row.sellerCode] || "Không xác định") : "Thuocsi"}
                                    </TableCell>
                                    <TableCell align="right">{formatNumber(row.details?.[0]?.condition?.target) || 0}</TableCell>
                                    <TableCell align="center">{formatNumber(row.numberOfJoinedCustomer ?? 0)}/{formatNumber(row.numberOfCompletedCustomer ?? 0)}</TableCell>
                                    <TableCell align="left">{formatDateTime(row.createdTime)}/

                                        <br />{formatDateTime(row.publicTime)}</TableCell>
                                    <TableCell align="left">
                                        Từ: {formatDateTime(row.startTime)}
                                        <br />
                                        Đến: {formatDateTime(row.endTime)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Switch
                                            color="primary"
                                            checked={row.isActive || false}
                                            onClick={() => {
                                                if (row.sellerCode && row.sellerCode !== "") return toast.error("Không thể cập nhật chương trình trả thưởng của seller ngoài")
                                                setSelectGamification({
                                                    ...row,
                                                    isActive: row.isActive || false
                                                })
                                                setOpenModal(true);
                                            }}
                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Link
                                            href={`/marketing/gamification/detail?code=${row.gamificationCode}`}
                                        >
                                            <Tooltip title="Danh sách khách hàng tham gia">
                                                <IconButton>
                                                    <ListIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Link>

                                        <Link
                                            href={`/marketing/gamification/edit?code=${row.gamificationCode}`}
                                        >
                                            <Tooltip title="Xem thông tin">
                                                <IconButton>
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Link>
                                        <Link href={`/marketing/gamification/history?code=${row.gamificationCode}`}>
                                            <a>
                                                <Tooltip title="Xem lịch sử thao tác">
                                                    <IconButton>
                                                        <FontAwesomeIcon icon={faHistory} style={{ color: "#777" }} size="sm" />
                                                    </IconButton>
                                                </Tooltip>
                                            </a>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}


                            {data.length === 0 && (

                                <TableRow>
                                    <TableCell colSpan={4} align="left">
                                        Không tìm thấy chương trình thưởng nào
                                    </TableCell>
                                </TableRow>

                            )}
                        </TableBody>

                        <MyTablePagination
                            labelUnit="chương trình thưởng"
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
                    <strong>{!selectGamification?.isActive ? "hiện" : "ẩn"}</strong>
                    &nbsp;chương trình thưởng: <strong>{selectGamification?.name}</strong> không?
                </ModalCustom>

                <ModalCustom
                    open={open}
                    title="Thông báo"
                    primaryText="Đồng ý"
                    onClose={setOpen}
                    onExcute={handleUpdateCustomer}
                >
                    <strong>Thao tác này sẽ thực hiện tính điểm cho tất cả chương trình của Thuocsi có trạng thái đang diễn ra hoặc đã kết thúc nhưng còn trong thời gian tính điểm.</strong>
                    <br />
                    Bạn có chắc muốn thực hiện thao tác này?
                </ModalCustom>

            </MyCard>

        </AppMarketing>
    )

};

export default function Gamification(props) {
    return renderWithLoggedInUser(props, GamificationPage);
}
