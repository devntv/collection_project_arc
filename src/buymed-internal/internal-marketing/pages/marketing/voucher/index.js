import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    DialogTitle,
    Typography,
    DialogContent,
    DialogActions,
    Dialog,
    Tabs,
    Tab,
} from "@material-ui/core";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { getPromoClient } from "../../../client/promo";
import {
    displayUsage,
    formatTime,
    limitText,
} from "../../../components/promotion-voucher/util";
import Switch from "@material-ui/core/Switch";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { getVoucherClient } from "../../../client/voucher";
import {
    defaultPromotionStatus,
} from "components/promotion-voucher/constant";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import { VoucherFilter } from "containers/voucher/VoucherFilter";
import { formatErrorMessage, parseQ } from "components/global";
import { Edit as EditIcon } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faChevronDown, faChevronUp, faList } from "@fortawesome/free-solid-svg-icons";
import Authorization from "@thuocsi/nextjs-components/authorization/authorization";
import AuthorizationScreen from "components/authorization-screen";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { isAuthorizationAPI } from "utils/function";
import AuthorizationButton from "components/authorization-button";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return loadPromoData(ctx);
    });
}

export async function loadPromoData(ctx) {
    const props = {
        voucher: [],
        voucherCount: 0,
        promotionMap: {},
        count: {},
        tabIndex: 0,
    };
    const query = ctx.query;
    const page = +(query.page || 0);
    const limit = +(query.limit || 20);
    const offset = page * limit;
    const search = query.search?.toUpperCase();
    const typeTab = query.type;
    const sortField = query.sortField;
    const sortType = query.sortType;
    const q = parseQ(query.q);
    if (q.code) q.code = q.code.toUpperCase()

    const params = { search, q, limit, offset, type: typeTab, sortField, sortType }

    if (!q.status && typeTab === "HIDE") {
        params.type = ""
        params.q = { ...params.q, status: typeTab }
    }

    const _voucherClient = getVoucherClient(ctx, {});
    const voucherResp = await _voucherClient.getVoucherList(params);
    props.voucher = voucherResp.data ?? [];
    props.voucherCount = voucherResp.total ?? 0;

    if (q.status && typeTab === "HIDE" && q.status !== typeTab) {
        props.voucher = []
        props.voucherCount = 0
    }

    const promotionIds = props.voucher?.map(v => v.promotionId);
    const promotionResp = await getPromoClient(ctx, {}).getPromotion("", query.limit, 0, true, [], promotionIds)
    promotionResp.data?.forEach(element => {
        props.promotionMap[element.promotionId] = element.promotionName || ""
    })

    const types = ["", "NOT_USED", "USED", "HIDE"]
    for (let index = 0; index < types.length; index++) {
        if (types[index] === typeTab) props.tabIndex = index

        const paramsQ = { search, q, limit: 1, offset, type: types[index] }
        if (!paramsQ.q.status && types[index] === "HIDE") {
            paramsQ.type = ""
            paramsQ.q = { ...paramsQ.q, status: types[index] }
        }

        const res = await _voucherClient.getVoucherList(paramsQ);
        props.count[types[index]?.toLocaleLowerCase() || "all"] = res.total || 0

        if (q.status && types[index] === "HIDE" && q.status !== types[index]) {
            props.count[types[index]?.toLocaleLowerCase()] = 0
        }
    }

    return { props }
}

export default function VoucherPage(props) {
    return renderWithLoggedInUser(props, render);
}

export function formatNumber(num) {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

async function updateVoucher(voucherId, status) {
    return getVoucherClient().updateVoucherStatus(voucherId, status);
}

function cleanData(data) {
    for (let key in data) {
        !data[key] && delete data[key]
    }
    return JSON.stringify(data)
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
]

function render(props) {

    const toast = useToast();
    let router = useRouter();
    let page = +(router.query?.page || 0);
    let limit = +(router.query?.limit || 20);
    let prioritySort = router.query?.sortField === "priority" ? (router.query?.sortType || null) : null

    let sortTitle = prioritySort !== "DESC" ? "Nhấn để sắp xếp voucher theo số điểm ưu tiên từ cao đến thấp" : "Nhấn để sắp xếp voucher theo số điểm ưu tiên từ thấp đến cao"

    let hasPermission = isAuthorizationAPI(["PUT/marketplace/promotion/v1/voucher/status"])

    const [vouchers, setVouchers] = useState(props.voucher || [])
    const [total, setTotal] = useState(props.voucherCount || 0)
    const [countTotal, setCountTotal] = useState(props.count || {})
    const [promotionMap, setPromotionMap] = useState(props.promotionMap || [])

    let [openModal, setOpenModal] = useState({
        open: false,
        voucherId: 0,
        code: "",
        checked: false,
        voucherStatus: "",
    });

    useEffect(() => {
        setVouchers(props.voucher || [])
        setTotal(props.voucherCount || 0)
        setCountTotal(props.count || {})
        setPromotionMap(props.promotionMap || [])
    }, [router.query])

    const handlePageChange = async (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/voucher",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage
            }
        });
    };

    const handleConfirm = (voucherId, checked, open, code, status) => {
        setOpenModal({
            open: open,
            voucherId: voucherId,
            code: code,
            checked: checked,
            voucherStatus: status,
        });
    };


    const handleActiveVoucher = async () => {
        let { checked, voucherId } = openModal;
        if (checked) {
            let voucherResponse = await updateVoucher(
                voucherId,
                defaultPromotionStatus.ACTIVE
            );
            if (!voucherResponse || voucherResponse.status !== "OK") {
                setOpenModal({ ...openModal, open: false });
                return toast.error(formatErrorMessage(voucherResponse));
            } else {
                toast.success("Cập nhật thành công");
                vouchers.forEach((d) => {
                    if (d.voucherId === voucherId) {
                        return (d.status = defaultPromotionStatus.ACTIVE);
                    }
                });
                setOpenModal({ ...openModal, open: false });
                router.push({
                    pathname: "/marketing/voucher",
                    query: {
                        ...router.query,
                    }
                });
            }
        } else {
            let voucherResponse = await updateVoucher(voucherId,
                defaultPromotionStatus.HIDE
            );
            if (!voucherResponse || voucherResponse.status !== "OK") {
                setOpenModal({ ...openModal, open: false });
                return toast.error(formatErrorMessage(voucherResponse));
            } else {
                toast.success("Cập nhật thành công");
                vouchers.forEach((d) => {
                    if (d.voucherId === voucherId) {
                        return (d.status = defaultPromotionStatus.HIDE);
                    }
                });
                setOpenModal({ ...openModal, open: false });
                router.push({
                    pathname: "/marketing/voucher",
                    query: {
                        ...router.query,
                    }
                });
            }
        }
    };

    const handleTabChange = async (type) => {
        const q = router.query.q || "{}";
        router.push({
            pathname: `/marketing/voucher`,
            query: {
                ...router.query,
                page: 0,
                q: cleanData(JSON.parse(q)),
                type,
            }
        })
    };

    const handleSort = async (sortField, sortType) => {
        router.push({
            pathname: "/marketing/voucher",
            query: {
                ...router.query,
                sortField,
                sortType
            }
        });
    };

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/voucher" breadcrumb={breadcrumb}>
                <Head>
                    <title>Danh sách mã khuyến mãi</title>
                </Head>
                <MyCard>
                    <MyCardHeader title="Danh sách mã khuyến mãi">
                        <Authorization requiredAPI="POST/marketplace/promotion/v1/voucher">
                            <Link href={`/marketing/voucher/new`}>
                                <Button variant="contained" color="primary">
                                    Thêm mới
                                </Button>
                            </Link>
                        </Authorization>
                    </MyCardHeader>
                    <VoucherFilter />
                </MyCard>
                <Tabs
                    value={props.tabIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                >
                    <Tab
                        index={0}
                        label={`Tất cả (${countTotal.all || 0})`}
                        onClick={() => handleTabChange("")}
                    />
                    <Tab
                        index={1}
                        label={`Chưa sử dụng (${countTotal.not_used || 0})`}
                        onClick={() => handleTabChange("NOT_USED")}
                    />
                    <Tab
                        index={2}
                        label={`Đã sử dụng (${countTotal.used || 0})`}
                        onClick={() => handleTabChange("USED")}
                    />
                    <Tab
                        index={3}
                        label={`Đã tắt (${countTotal.hide || 0})`}
                        onClick={() => handleTabChange("HIDE")}
                    />
                </Tabs>
                <MyCard>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <colgroup>
                                <col width="15%" />
                                <col width="15%" />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Mã khuyến mãi</TableCell>
                                    <TableCell align="left">Nội dung mã</TableCell>
                                    {/* <TableCell align="left">Tên mã</TableCell>
                                    <TableCell align="left">Chương trình</TableCell> */}
                                    <TableCell align="left">Loại mã/
                                        <br />
                                        Loại áp dụng
                                    </TableCell>
                                    <TableCell align="center">Số lần đã sử dụng/
                                        <br />
                                        Toàn hệ thống
                                    </TableCell>
                                    <TableCell align="center">
                                        Khách được sử dụng tối đa
                                    </TableCell>
                                    <TableCell align="center" style={{
                                        cursor: "pointer"
                                    }}>
                                        <Tooltip title={sortTitle}>
                                            <div onClick={() => handleSort("priority", (!prioritySort || prioritySort === "ASC") ? "DESC" : "ASC")}>

                                                {prioritySort ? (
                                                    <span>
                                                        <FontAwesomeIcon icon={(!prioritySort || prioritySort === "ASC") ? faChevronUp : faChevronDown} size="1x" />
                                                    </span>
                                                ) : <SwapVertIcon style={{ transform: "translateY(3px)", fontSize: "1.2rem" }} />}
                                                &nbsp;Số điểm ưu tiên
                                            </div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">Hạn sử dụng</TableCell>
                                    <TableCell align="left">
                                        Thời gian hiển thị
                                    </TableCell>
                                    <TableCell align="center">Trạng thái</TableCell>
                                    <TableCell align="center">Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vouchers?.length > 0 ? (
                                    vouchers.map((row, index) => (
                                        <TableRow key={row.voucherId + "_" + index}>
                                            <TableCell align="left">
                                                <div>{row.code}</div>
                                            </TableCell>
                                            <TableCell align="left" style={{ wordBreak: "break-word" }}>
                                                <strong>Tên mã: </strong>{row.displayName}
                                                <br />
                                                <strong>Chương trình: </strong> {promotionMap?.[row?.promotionId] ? (
                                                    <Link
                                                        href={`/marketing/promotion/edit?promotionId=${row.promotionId}`}
                                                        prefetch={false}
                                                    >
                                                        <a color="primary" target="_blank" style={{
                                                            textDecoration: "none",
                                                            cursor: "pointer",
                                                            color: "#00b46e"
                                                        }}>
                                                            {limitText(promotionMap[row.promotionId] || "", 50)}
                                                        </a>
                                                    </Link>
                                                ) : "-"}
                                            </TableCell>
                                            {/* <TableCell align="left" style={{ wordBreak: "break-word" }}>
                                                {row.displayName}
                                            </TableCell>
                                            <TableCell align="left" style={{ wordBreak: "break-word" }}>

                                                {promotionMap?.[row?.promotionId] ? (
                                                    <Link
                                                        href={`/marketing/promotion/edit?promotionId=${row.promotionId}`}
                                                        prefetch={false}
                                                    >
                                                        <a color="primary" target="_blank" style={{
                                                            textDecoration: "none",
                                                            cursor: "pointer",
                                                            color: "#00b46e"
                                                        }}>
                                                            {limitText(promotionMap[row.promotionId] || "", 50)}
                                                        </a>
                                                    </Link>
                                                ) : "-"}

                                            </TableCell> */}
                                            <TableCell align="left">{row.type}/
                                                <br />
                                                {row.applyType === "AUTO" ? "Tự động" : "Thủ công"}
                                            </TableCell>

                                            <TableCell align="center">
                                                <div>{row?.usageTotal || "0"}/{displayUsage(row.maxUsage)}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div>{displayUsage(row.maxUsagePerCustomer)}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.priority ? formatNumber(row.priority) : "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                <div>Từ : {formatTime(row.startTime)}</div>
                                                <div>Đến : {formatTime(row.endTime)}</div>
                                            </TableCell>
                                            <TableCell align="left">
                                                {formatTime(row.publicTime)}
                                            </TableCell>
                                            <TableCell align="center">

                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <Tooltip
                                                        title={
                                                            row.status === "ACTIVE"
                                                                ? "Đang hoạt động"
                                                                : "Ngưng hoạt động"
                                                        }
                                                    >
                                                        <div>
                                                            <Switch
                                                                onChange={(event) => {
                                                                    handleConfirm(
                                                                        row.voucherId,
                                                                        event.target.checked,
                                                                        true,
                                                                        row.code,
                                                                        row.status,
                                                                    );
                                                                }}
                                                                disabled={!hasPermission}
                                                                checked={row.status === "ACTIVE"}
                                                                color="primary"
                                                            />
                                                        </div>
                                                    </Tooltip>
                                                </div>

                                            </TableCell>
                                            <TableCell align="center">
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <Authorization requiredAPI="GET/marketplace/promotion/v1/view-voucher">
                                                        <Link href={`/marketing/voucher/edit?voucherId=${row.voucherId}&tab=CUSTOMER-USED`}>
                                                            <Tooltip title="Xem danh sách khách hàng đã sử dụng mã">
                                                                <IconButton>
                                                                    <FontAwesomeIcon icon={faList} style={{ color: "#777" }} size="sm" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Link>
                                                    </Authorization>

                                                    <Authorization requiredAPI="GET/marketplace/promotion/v1/view-voucher">
                                                        <Link href={`/marketing/voucher/edit?voucherId=${row.voucherId}`}>
                                                            <Tooltip title="Cập nhật thông tin">
                                                                <IconButton>
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Link>
                                                    </Authorization>


                                                    <Authorization requiredAPI="GET/marketplace/promotion/v1/view-voucher-history">
                                                        <Link href={`/marketing/voucher/history?voucherId=${row.voucherId}`}>
                                                            <a>
                                                                <Tooltip title="Xem lịch sử thao tác">
                                                                    <IconButton>
                                                                        <FontAwesomeIcon icon={faHistory} style={{ color: "#777" }} size="sm" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </a>
                                                        </Link>
                                                    </Authorization>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align="left" colSpan={11}>
                                            Không tìm thấy thông tin
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            {total > 0 && (
                                <MyTablePagination
                                    labelUnit="khuyến mãi"
                                    count={total}
                                    rowsPerPage={limit}
                                    page={page}
                                    onChangePage={handlePageChange}
                                />
                            )}
                        </Table>
                    </TableContainer>
                    <Dialog open={openModal.open} scroll="body" fullWidth={true}>
                        <DialogTitle
                            id={"modal" + "-dialog-title"}
                            onClose={() => setOpenModal({ ...openModal, open: false })}
                        >
                            <Typography variant="h6">Thông báo</Typography>
                            <IconButton
                                aria-label="close"
                                onClick={() => setOpenModal({ ...openModal, open: false })}
                                style={{ position: "absolute", top: "1px", right: "1px" }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            {openModal.voucherStatus == defaultPromotionStatus.EXPIRED ? (
                                <b>Mã khuyến mãi đã hết hạn</b>
                            ) : (
                                <div>
                                    Bạn muốn thay đổi trạng thái của khuyến mãi này hay không?
                                </div>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setOpenModal({ ...openModal, open: false })}
                                variant={"contained"}
                            >
                                Thoát
                            </Button>
                            {openModal.voucherStatus != defaultPromotionStatus.EXPIRED && (
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant={"contained"}
                                    onClick={handleActiveVoucher}
                                >
                                    Đồng ý
                                </Button>
                            )}
                        </DialogActions>
                    </Dialog>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen>
    );
}
