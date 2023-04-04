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
    Grid,
    Box,
    Tabs,
    Tab,
} from "@material-ui/core";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { getPromoClient } from "../../../client/promo";
import {
    displayUsage,
    formatTime,
    getPromotionOrganizer,
    displayPromotionType,
} from "../../../components/promotion-voucher/util";
import Switch from "@material-ui/core/Switch";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
    MyCardActions,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { getVoucherClient } from "../../../client/voucher";
import { defaultPromotionStatus } from "components/promotion-voucher/constant";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import { VoucherFilter } from "containers/promotion/VoucherFilter";
import { formatErrorMessage, parseQ } from "components/global";
import { Edit as EditIcon } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import styles from './promotion.module.css'
import { PromotionStatus } from "containers/promotion/PromotionStatus"
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import AuthorizationScreen from "components/authorization-screen"
import Authorization from "@thuocsi/nextjs-components/authorization/authorization";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return loadPromoData(ctx);
    });
}

export async function loadPromoData(ctx) {
    const props = {
        voucher: [],
        voucherCount: 0,
        promotion: {},
        count: {},
        tabIndex: 0,
    };
    const query = ctx.query;
    const page = +(query.page || 0);
    const limit = +(query.limit || 20);
    const offset = page * limit;
    const search = query.search?.toUpperCase();
    const q = parseQ(query.q);
    if (q.code) q.code = q.code.toUpperCase()
    const promotionId = +query.promotionId
    const typeTab = query.type;

    const promotionResp = await getPromoClient(ctx, {}).getPromotionByID(promotionId)
    props.promotion = promotionResp.data ? promotionResp.data[0] : {};

    const _voucherClient = getVoucherClient(ctx, {});
    const params = { search, q: { promotionId, ...q }, limit, offset, type: typeTab }

    if (!q.status && typeTab === "HIDE") {
        params.type = ""
        params.q = { ...params.q, status: typeTab }
    }

    const voucherResp = await _voucherClient.getVoucherList(params);
    props.voucher = voucherResp.data ?? [];
    props.voucherCount = voucherResp.total ?? 0;

    if (q.status && typeTab === "HIDE" && q.status !== typeTab) {
        props.voucher = []
        props.voucherCount = 0
    }

    const types = ["", "NOT_USED", "USED", "HIDE"]
    for (let index = 0; index < types.length; index++) {
        if (types[index] === typeTab) props.tabIndex = index

        const paramsQ = { search, q: { promotionId, ...q }, limit: 1, offset, type: types[index] }
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

function InfoLine({ label, val, type }) {
    if (type === "status") {
        return (
            <Box className={styles.infoLine}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>
                    <PromotionStatus promotionStatus={val} />
                </span>
            </Box>
        )
    }
    return (
        <Box className={styles.infoLine}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{val}</span>
        </Box>
    )
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
        name: "Danh sách chương trình",
        link: "/marketing/promotion"
    },
    {
        name: "Danh sách mã khuyến mãi của chương trình",
    },
]

function render(props) {
    const toast = useToast();
    let router = useRouter();
    let page = +(router.query?.page || 0);
    let limit = +(router.query?.limit || 20);
    // console.log(props)
    const { voucher, voucherCount, promotion, count } = props

    const [vouchers, setVouchers] = useState(voucher || [])
    const [total, setTotal] = useState(voucherCount || 0)
    const [countTotal, setCountTotal] = useState(count || {})

    let [openModal, setOpenModal] = useState({
        open: false,
        voucherId: 0,
        code: "",
        checked: false,
        voucherStatus: "",
    });

    useEffect(() => {
        setVouchers(voucher || [])
        setTotal(voucherCount || 0)
        setCountTotal(count || {})
    }, [router.query])

    const handlePageChange = async (_, page, rowsPerPage) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage
            }
        });
    };

    const handleConfirm = (voucherId, checked, open, code, status, voucherData) => {
        setOpenModal({
            open: open,
            voucherId: voucherId,
            code: code,
            checked: checked,
            voucherStatus: status,
            voucherData: voucherData
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
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                    }
                });
            }
        } else {
            let voucherResponse = await updateVoucher(
                voucherId,
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
                    pathname: router.pathname,
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
            pathname: router.pathname,
            query: {
                ...router.query,
                q: cleanData(JSON.parse(q)),
                type,
            }
        })
    };

    if (!promotion?.promotionId || promotion?.promotionId === "") {
        return (
            <NotFound/>
        )
    }

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/voucher" breadcrumb={breadcrumb}>
                <Head>
                    <title>Danh sách mã khuyến mãi</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={"Chương trình khuyến mãi"}></MyCardHeader>
                    <MyCardActions>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={5}>
                                <InfoLine label="ID chương trình" val={promotion.promotionId} />
                                <InfoLine label="Tên chương trình" val={promotion.promotionName} />
                                <InfoLine label="Trạng thái" val={promotion.status} type="status" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={5}>
                                <InfoLine label="Bên tổ chức" val={getPromotionOrganizer(promotion.promotionOrganizer)} />
                                <InfoLine label="Hình thức áp dụng" val={displayPromotionType(promotion.promotionType)} />
                                <InfoLine label="Thời gian áp dụng" val={`${formatTime(promotion.startTime)} - ${formatTime(promotion.endTime)}`} />
                            </Grid>
                        </Grid>
                    </MyCardActions>
                </MyCard>
                <MyCard>
                    <MyCardHeader title="Danh sách mã khuyến mãi">
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
                    <MyCardContent>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <colgroup>
                                    <col width="10%" />
                                    <col width="5%" />
                                    <col width="8%" />
                                    <col width="12%" />
                                    <col width="10%" />
                                    <col width="12%" />
                                    <col width="10%" />
                                    <col width="10%" />
                                    <col width="5%" />
                                    <col width="5%" />
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Mã khuyến mãi</TableCell>
                                        <TableCell align="left">Loại mã</TableCell>
                                        <TableCell align="center">Số lần đã sử dụng</TableCell>
                                        <TableCell align="center">Tổng số lần sử dụng toàn hệ thống</TableCell>
                                        <TableCell align="center">Khách được sử dụng tối đa</TableCell>
                                        <TableCell align="left">Hạn sử dụng</TableCell>
                                        <TableCell align="left">Thời gian hiển thị</TableCell>
                                        <TableCell align="left">Ngày tạo</TableCell>
                                        <TableCell align="left">Trạng thái</TableCell>
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
                                                <TableCell align="left">{row.type}</TableCell>
                                                <TableCell align="center">
                                                    <div>{row.usageTotal}</div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div>{displayUsage(row.maxUsage)}</div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div>{displayUsage(row.maxUsagePerCustomer)}</div>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <div>Từ : {formatTime(row.startTime)}</div>
                                                    <div>Đến : {formatTime(row.endTime)}</div>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <div>{formatTime(row.publicTime)}</div>
                                                </TableCell>
                                                <TableCell align="left">{formatTime(row.createdTime)}</TableCell>
                                                <TableCell align="left">

                                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                                        <Authorization requiredAPI="PUT/marketplace/promotion/v1/status/voucher">
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
                                                                        checked={row.status === "ACTIVE"}
                                                                        color="primary"
                                                                    />
                                                                </div>
                                                            </Tooltip>
                                                        </Authorization>
                                                    </div>

                                                </TableCell>
                                                <TableCell align="center">

                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        <Authorization requiredAPI="PUT/marketplace/promotion/v1/voucher">
                                                            <Link href={`/marketing/voucher/edit?voucherId=${row.voucherId}`}>
                                                                <Tooltip title="Cập nhật thông tin">
                                                                    <IconButton>
                                                                        <EditIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Link>
                                                        </Authorization>

                                                        <Authorization requiredScreen="/marketing/history/voucher">
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
                                            <TableCell align="left" colSpan={10}>
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
                                        Bạn muốn thay đổi trạng thái của mã khuyến mãi này hay không?
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
                    </MyCardContent>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen>
    );
}
