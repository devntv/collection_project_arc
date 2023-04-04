import React, { useState } from "react";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { MyCard, MyCardActions, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import Link from "next/link";
import {
    Button,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Switch
} from "@material-ui/core";
import { /*Search as SearchIcon,*/ Edit as EditIcon, Visibility as VisibilityIcon, AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
// import styles from "./deal.module.css";
import { formatDateTime, getData, getFirst, isValid, formatNumber, formatErrorMessage } from "components/global";
import AppMarketing from "pages/_layout";
import { getLoyaltyClient } from "client/loyalty";
import { getPromoClient } from "client/promo";
import Head from "next/head";
import { LoyaltyStatus } from 'view-model/loyalty';
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import Router from "next/router";
import Authorization from "@thuocsi/nextjs-components/authorization/authorization";

async function loadDealData(ctx) {
    const props = {
        loyaltys: [],
        count: 0,
        message: "",
    };

    const query = ctx.query;
    const page = +query.page ?? 0;
    const limit = +query.limit ?? 20;
    const offset = page * limit;

    const loyaltyClient = getLoyaltyClient(ctx, {});
    const promoClient = getPromoClient(ctx, {});

    const loyaltysResp = await loyaltyClient.getLoyaltyList({ limit, offset, getTotal: true });
    if (!isValid(loyaltysResp)) {
        props.message = loyaltysResp.message;
        return {
            props,
        };
    }
    const loyaltys = getData(loyaltysResp);
    const loyaltyList = await Promise.all(
        loyaltys.map(async (loyalty) => {
            if (!loyalty?.promotionId) return loyalty;
            const promo = await promoClient.getPromotionByID(loyalty.promotionId);
            return { ...loyalty, promo: getFirst(promo) };
        })
    );

    props.loyaltys = loyaltyList;
    props.count = loyaltyList.length ?? 0;

    return {
        props,
    };
}

export function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, loadDealData);
}




const render = (props) => {

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách đổi điểm",
        },
    ];
    const { loyaltys, message } = props;
    const toast = useToast();
    const [openStatusChangeDialog, setOpenStatusChangeDialog] = useState(false);
    const [selectedLoyalty, setSelectedLoyalty] = useState({});
    const loyaltyClient = getLoyaltyClient();

    const handleChangeStatus = async () => {
        const status = selectedLoyalty.status === LoyaltyStatus.ACTIVE ? LoyaltyStatus.INACTIVE : LoyaltyStatus.ACTIVE;
        try {
            const res = await loyaltyClient.updateLoyalty({ code: selectedLoyalty.code, status });
            if (!isValid(res)) throw Error(formatErrorMessage(res));
            toast.success("Cập nhật trạng thái thành công");
            Router.push(Router.pathname);
        } catch (error) {
            toast.error(formatErrorMessage(error));
        }
    }

    return (
        <AppMarketing breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách đổi điểm</title>
            </Head>
            <MyCard>
                <MyCardHeader title="Danh sách đổi điểm">
                    <Authorization requiredAPI="POST/marketplace/customer/v1/loyalty">
                        <Link href="/marketing/loyalty/new">
                            <Button variant="contained" color="primary">
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
                                Thêm mới
                            </Button>
                        </Link>
                    </Authorization>
                </MyCardHeader>
            </MyCard>
            <MyCard>
                <TableContainer>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Mã</TableCell>
                                <TableCell align="left">Chương trình khuyến mãi</TableCell>
                                <TableCell align="left">Điểm đổi</TableCell>
                                <TableCell align="left">Giá trị</TableCell>
                                <TableCell align="left">Ngày hết hạn</TableCell>
                                <TableCell align="left">Người tạo</TableCell>
                                <TableCell align="left">Người cập nhật</TableCell>
                                <TableCell align="right">Ngày tạo</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        {loyaltys.length > 0 ? (
                            <TableBody>
                                {loyaltys.map((row) => {
                                    let value = 0;
                                    if (row && row.promo && row.promo?.rewards?.length > 0) {
                                        value = row.promo?.rewards?.[0].absoluteDiscount || 0;
                                    }
                                    return (
                                        <TableRow key={`tr_${row.code}`} row={row}>
                                            <TableCell style={{ color: '#2C73D2' }}><b>{row.code} </b></TableCell>
                                            <TableCell>{row.promo?.promotionName || ""}</TableCell>
                                            <TableCell>{formatNumber(row.point)}</TableCell>
                                            <TableCell>{formatNumber(value)}</TableCell>
                                            <TableCell>{formatDateTime(row.promo?.endTime || Date.now())}</TableCell>
                                            <TableCell>{row.createdBy}</TableCell>
                                            <TableCell>{row.updatedBy}</TableCell>
                                            <TableCell align="right">{formatDateTime(row.createdTime)}</TableCell>
                                            <TableCell align="right">
                                                <Authorization requiredAPI="PUT/marketplace/customer/v1/loyalty">
                                                    <Switch color="primary" checked={row.status === LoyaltyStatus.ACTIVE} onChange={() => {
                                                        setSelectedLoyalty(row);
                                                        setOpenStatusChangeDialog(true);
                                                    }} />
                                                </Authorization>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Authorization requiredAPI="PUT/marketplace/customer/v1/loyalty">
                                                    <Link href={`/marketing/loyalty/edit?code=${row.code}`}>
                                                        <Tooltip title="Cập nhật thông tin">
                                                            <IconButton>
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                </Authorization>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3} align="left">
                                        Không tìm thấy thông tin
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                <ModalCustom
                    open={openStatusChangeDialog}
                    title="Thông báo"
                    primaryText="Đồng ý"
                    closeText="Đóng"
                    onClose={setOpenStatusChangeDialog}
                    onExcute={handleChangeStatus}
                >
                    <div dangerouslySetInnerHTML={{ __html: `Bạn có muốn <strong>${selectedLoyalty?.status === LoyaltyStatus.ACTIVE ? "Tắt" : "Bật"}</strong> trạng thái của <strong>${selectedLoyalty?.code}</strong> không?` }}
                    />
                    {/* Bạn có muốn&nbsp;
                    <strong>{selectedLoyalty?.status === LoyaltyStatus.ACTIVE ? "Tắt" : "Bật"}</strong>
                    &nbsp;trạng thái của <strong>{selectedLoyalty?.code}</strong> không? */}
                </ModalCustom>
            </MyCard>
        </AppMarketing>
    );
};

export default function ListDealPage(props) {
    return renderWithLoggedInUser(props, render);
}
