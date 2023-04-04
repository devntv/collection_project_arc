import {
    IconButton, Switch, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import {
    doWithLoggedInUser,
    renderWithLoggedInUser
} from "@thuocsi/nextjs-components/lib/login";
import {
    MyCard,
    MyCardContent,
    MyCardHeader
} from "@thuocsi/nextjs-components/my-card/my-card";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import arrayMove from 'array-move';
import { getMarketingClient } from "client/marketing";
import AuthorizationScreen from "components/authorization-screen";
import { formatDateTime } from "components/global";
import Head from "next/head";
import router from "next/router";
import AppMarketing from "pages/_layout";
import { useEffect, useState } from "react";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const getURLwithProtocol = (url) => {
    if (url.startsWith("http")) {
        return url;
    }
    return `http://${url}`;
}

function render({ hashtagList = [] }) {
    const [data, setData] = useState(hashtagList)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [selectedHashtag, setSelectedHashtag] = useState(null);
    const toast = useToast();
    useEffect(() => { setData(hashtagList) }, [hashtagList])
    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách hashtag",
            link: "/marketing/hashtag-search",
        },
        {
            name: "Danh sách hiển thị",
        },
    ];
    const handleUpdateActive = async () => {
        try {
            const { code } = selectedHashtag;
            const resp = await getMarketingClient().updateHashtagSearch({
                code,
                isActive: false,
            });
            setSelectedHashtag({});
            if (resp.status === "OK") {
                toast.success("Thay đổi trạng thái hiển thị thành công");
                router.push({
                    pathname: "/marketing/hashtag-search/active",
                });
                return;
            }
            if (resp && resp.message) toast.error(resp.message);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const updateItem = async (item, index) => {
        let resp = await getMarketingClient().updateHashtagSearch({
            code: item.code,
            ordinalNumber: index + 1
        })
        if (resp?.status == "OK") {
            return true
        } else {
            return false
        }
    }
    const onSortEnd = async ({ oldIndex, newIndex }) => {
        if (oldIndex == newIndex) return
        setLoading(true)
        let items = arrayMove(data, oldIndex, newIndex)
        setData(items)
        let promises = items.map((item, index) => updateItem(item, index))
        const results = await Promise.all([...promises])
        let result = results.reduce((acc, cur) => acc && cur, true)
        if (result) {
            toast.success("Thay đổi thứ tự hiển thị thành công")
        } else {
            toast.error("Có lỗi xảy ra");
        }
        setLoading(false)
        router.push({
            pathname: "/marketing/hashtag-search/active",
        })
    };
    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/top-search" breadcrumb={breadcrumb}>
                <Head>
                    <title>Danh sách hiển thị</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={"Danh sách hiển thị"} />
                    <MyCardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Hashtag</TableCell>
                                        <TableCell>URL</TableCell>
                                        <TableCell>
                                            Thời gian hiển thị{" "}
                                            <Tooltip
                                                title={
                                                    <ul style={{ marginLeft: -20 }}>
                                                        <li>
                                                            Chỉ áp dụng với Hashtag
                                                            trạng thái bật
                                                        </li>
                                                        <li>
                                                            Khi đến Thời gian hiển
                                                            thị, hashtag Bật sẽ tự
                                                            động hiển thị lên
                                                            website
                                                        </li>
                                                        <li>
                                                            Khi hết Thời gian hiển
                                                            thị, hashtag Bật sẽ tự
                                                            động ẩn khỏi website
                                                        </li>
                                                    </ul>
                                                }
                                            >
                                                <IconButton>
                                                    <InfoIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>{" "}
                                        </TableCell>
                                        <TableCell>Trạng thái</TableCell>
                                        <TableCell>Ngày tạo</TableCell>
                                    </TableRow>
                                </TableHead>
                                {data.length === 0 ? (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                Không tìm thấy hashtag nào
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ) : (
                                    <SortableList
                                        disabled={loading}
                                        items={data}
                                        onSortEnd={onSortEnd}
                                        onCheckItem={(item) => {
                                            setSelectedHashtag(item);
                                            setOpenModal(true);
                                        }}
                                    />
                                )}
                            </Table>
                        </TableContainer>
                    </MyCardContent>
                </MyCard>
                <ModalCustom
                    open={openModal}
                    title="Thông báo"
                    primaryText="Đồng ý"
                    onClose={setOpenModal}
                    onExcute={handleUpdateActive}
                >
                    Bạn có muốn&nbsp;
                    <strong>{!selectedHashtag?.isActive ? "Hiện" : "Ẩn"}</strong>
                    &nbsp;hashtag <strong>{selectedHashtag?.hashtag}</strong> không?
                </ModalCustom>
            </AppMarketing>
        </AuthorizationScreen>
    );
}

const SortableItem = SortableElement(({ value: item, onCheck = () => { } }) => {
    const toast = useToast();
    return (
        <TableRow style={{ minWidth: "100%!important" }}>
            <TableCell style={{ padding: 16 }} width="10%">
                {item.hashtag}
            </TableCell>

            <TableCell style={{ padding: 16 }} width="30%">
                <a href={getURLwithProtocol(item.url)} target="_blank">
                    {item.url}
                </a>
            </TableCell>

            <TableCell style={{ padding: 16 }} width="20%">
                Từ {formatDateTime(item.startDisplayTime)}
                <br />
                đến {formatDateTime(item.endDisplayTime)}
            </TableCell>

            <TableCell style={{ padding: 16 }} width="20%">
                <Tooltip
                    title={
                        new Date(item.endDisplayTime) >= new Date()
                            ? "Thay đổi trạng thái hiển thị của hashtag"
                            : "Hashtag không thể bật vì đã hết thời gian hiển thị"
                    }
                >
                    <Switch
                        color="primary"
                        checked={item.isActive || false}
                        onClick={() => {
                            if (new Date(item.endDisplayTime) < new Date()) {
                                toast.error(
                                    "Hashtag không thể bật vì đã hết thời gian hiển thị"
                                );
                            } else {
                                onCheck?.(item);
                            }
                        }}
                    />
                </Tooltip>
            </TableCell>

            <TableCell style={{ padding: 16 }} width="20%">
                {formatDateTime(item.createdTime)}
            </TableCell>
        </TableRow>
    );
});
const SortableList = SortableContainer(({ items, onCheckItem = () => { }, disabled = false }) => {
    return (
        <TableBody>
            {items.map((value, index) => (
                <SortableItem disabled={disabled} key={`item-${value}`} index={index} value={value} onCheck={(item) => onCheckItem?.(item)} />
            ))}
        </TableBody>
    );
});
export default function TopSearch(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        let props = {
            hashtagList: [],
        };
        let marketingClient = getMarketingClient(ctx, {});
        let { offset, limit } = ctx.query;
        let hashtagResp = await marketingClient.getHashtagSearchList({
            limit,
            q: { isActive: true },
            offset,
        });

        if (hashtagResp.status == "OK") {
            props.hashtagList = hashtagResp.data;
        }
        return {
            props: props,
        };
    });
}
