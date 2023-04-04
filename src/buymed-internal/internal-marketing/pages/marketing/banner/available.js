import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,

    DialogContentText,
} from "@material-ui/core";
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getBannerClient } from "client/banner";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { formatErrorMessage, formatUrlSearch } from "components/global";
import { formatTime } from "components/common-global";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import AuthorizationScreen from "components/authorization-screen";
import UserContext from "@thuocsi/nextjs-components/my-context/my-context";

export function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (ctx) => {
        return loadBannerData(ctx);
    });
}

export async function loadBannerData(ctx) {
    let data = { props: {} };
    let query = ctx.query;
    let q = typeof query.q === "undefined" ? "" : query.q;
    let page = query.page || 0;
    let limit = query.limit || 20;
    let offset = page * limit;

    let bannerClient = getBannerClient(ctx, data);
    let resp = await bannerClient.getListBannerAvailable();
    if (resp.status !== "OK") {
        return { props: { data: [], count: 0, message: "Không tìm thấy thông tin banner" } };
    }

    return { props: { data: resp.data, count: resp.data.length } };
}

export default function CollectionPage(props) {
    return renderWithLoggedInUser(props, render);
}

const SortableItem = SortableElement(({ value, setOpenModal, setCurrentStatus }) => {
    const { loggedInUserInfo } = useContext(UserContext);

    return (
        <TableRow>
            <TableCell scope="row">{value.name}</TableCell>
            <TableCell align="left">
                <img src={value.imgURL} title="image" alt="image" width={120} height={70} />
            </TableCell>
            <TableCell align="left">
                <Switch
                    onChange={() => {
                        setOpenModal(true);
                        setCurrentStatus({
                            id: value._id,
                            isVisible: value.isVisible,
                            name: value.name,
                        });
                    }}
                    color="primary"
                    checked={value.isVisible}
                    name="checked"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    disabled={!loggedInUserInfo?.apis?.includes("ALL/") && !loggedInUserInfo?.apis?.includes("PUT/marketplace/marketing/v1/update-banner-status")}
                />
            </TableCell>

            <TableCell style={{ overflowWrap: "anywhere" }} align="left">{value.description}</TableCell>
            <TableCell align="left">{formatTime(value.createdTime)}</TableCell>
        </TableRow>
    );
});

const SortableList = SortableContainer(({ items, setOpenModal, setCurrentStatus }) => {
    return (
        <TableBody>
            {items.map((value, index) => (
                <SortableItem key={`item-${value._id}`} index={index} value={value} setOpenModal={setOpenModal} setCurrentStatus={setCurrentStatus} />
            ))}
        </TableBody>
    );
});

function render(props) {
    let router = useRouter();
    let q = router.query.q || "";
    const [search, setSearch] = useState(formatUrlSearch(q));
    const [openModal, setOpenModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState({});
    const { error, success } = useToast();
    const [rows, setRows] = useState(props.data);

    let breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách banner",
            link: "/marketing/banner",
        },
        {
            name: "Danh sách banner đang hiển thị",
        },
    ];

    async function reloadBanner() {
        let bannerClient = getBannerClient();
        let resp = await bannerClient.getListBannerAvailableClient();
        if (resp.status === "OK") {
            setRows(resp.data);
            success("Cập nhật danh sách banner thành công");
        } else {
            error(formatErrorMessage(resp));
        }
    }

    function searchCollection() {
        let q = formatUrlSearch(search);
        Router.push(`/marketing/banner?q=${q}`);
    }

    async function handleChange(event) {
        const target = event.target;
        const value = target.value;
        setSearch(value);
    }

    function onSearch() {
        try {
            searchCollection();
        } catch (error) {
            console.log(error);
        }
    }

    async function updateAvailableList(list) {
        let bannerClient = getBannerClient();
        let resp = await bannerClient.updateListBannerAvailable(list);
        if (resp.status === "OK") {
            success("Cập nhật danh sách banner thành công");
        } else {
            error(formatErrorMessage(resp));
        }
    }
    function onSearch() {
        try {
            searchCollection();
        } catch (error) {
            console.log(error);
        }
    }

    const updateStatus = async () => {
        try {
            let _client = getBannerClient();
            const { id, isVisible } = currentStatus;

            if (!isVisible) {
                const res = await _client.updateBannerVisible(id);
                if (res.status === "OK") {
                    rows.filter((row) => row._id === id)[0].isVisible = !isVisible ? true : false;
                    success("Bật trạng thái thành công");
                } else {
                    error(formatErrorMessage(res));
                }
            } else {
                const res = await _client.updateBannerInvisible(id);
                if (res.status === "OK") {
                    rows.filter((row) => row._id === id)[0].isVisible = !isVisible ? true : false;
                    reloadBanner();
                    success("Tắt trạng thái thành công");
                } else {
                    error(formatErrorMessage(res));
                }
            }
        } catch (err) {
            error(err);
        }
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex != newIndex) {
            const newRows = arrayMove(rows, oldIndex, newIndex);
            setRows(newRows);
            const list = newRows.map((row) => row._id);
            updateAvailableList(list);
        }
    };

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/banner" breadcrumb={breadcrumb}>
                <Head>
                    <title>Danh sách banner</title>
                </Head>

                <MyCard>
                    <MyCardHeader title="Danh sách hiển thị"></MyCardHeader>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <colgroup>
                                <col width="15%"></col>
                                <col width="25%"></col>
                                <col width="10%"></col>
                                <col width="30%"></col>
                                <col width="20%"></col>
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Tên banner</TableCell>
                                    <TableCell align="left">Hình ảnh</TableCell>
                                    <TableCell align="left">Trạng thái</TableCell>
                                    <TableCell align="left">Mô tả</TableCell>
                                    <TableCell align="left">Ngày tạo</TableCell>
                                </TableRow>
                            </TableHead>
                            {rows?.length > 0 ? (
                                <SortableList items={rows} onSortEnd={onSortEnd} setOpenModal={setOpenModal} setCurrentStatus={setCurrentStatus} lockOffset='100%' />
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={3} align="left">
                                            Không tìm thấy thông tin banner
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                    <ModalCustom
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        onExcute={() => updateStatus()}
                        title="Thay đổi trạng thái hiển thị"
                        primaryText="Có"
                        closeText="Không"
                    >
                        <DialogContentText>{`Bạn có muốn ${currentStatus.isVisible ? "ẩn" : "hiển thị"} banner `} <strong>{currentStatus.name} </strong>
                            không
                            ?</DialogContentText>
                    </ModalCustom>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen>
    );
}
