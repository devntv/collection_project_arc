import {
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import arrayMove from "array-move";
import { getMarketingClient } from "client/marketing";
import AuthorizationScreen from "components/authorization-screen";
import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

function render({ menuBar }) {
    const [data, setData] = useState(
        menuBar.filter((item) => item?.isActive) || []
    );

    const [selectedMenuBar, setSelectedMenuBar] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách menu",
            link: "/marketing/menu-bar",
        },
        {
            name: "Danh sách hiển thị",
        },
    ];

    const toast = useToast();
    const router = useRouter();

    const handleUpdateActive = async () => {
        const { index } = selectedMenuBar;
        const newData = [...data];

        const newMenuBarItem = { ...newData[index] };

        newData[index] = {
            ...newMenuBarItem,
            isActive: !newMenuBarItem?.isActive || false,
        };

        await submit({
            items: [
                ...newData,
                ...menuBar.filter(
                    (item) =>
                        item?.iconUrl !== newMenuBarItem?.iconUrl &&
                        !item?.isActive
                ),
            ],
        });

        setData(newData.filter((item) => item?.isActive));
        setSelectedMenuBar({});
    };

    async function submit(data) {
        try {
            const resp = await getMarketingClient().updateMenubar(data);
            if (resp.status === "OK") {
                setData(data?.items.filter((item) => item?.isActive) || []);
                toast.success("Cập nhật danh sách menu thành công");
                router.push({
                    pathname: "/marketing/menu-bar/active",
                });
                return;
            }
            if (resp && resp.message) toast.error(resp.message);
        } catch (e) {
            toast.error(e.message);
        }
    }

    const onSortEnd = async ({ oldIndex, newIndex }) => {
        if (oldIndex == newIndex) return;
        let items = arrayMove(data, oldIndex, newIndex);
        setData(items.filter((item) => item?.isActive));
        await submit({
            items: [...items, ...menuBar.filter((item) => !item?.isActive)],
        });
    };

    return (
        <>
            <Head>
                <title>Danh sách hiển thị menu</title>
            </Head>
            <AuthorizationScreen>
                <AppMarketing
                    select="/marketing/menu-bar"
                    breadcrumb={breadcrumb}
                >
                    <MyCard>
                        <MyCardHeader title={"Danh sách hiển thị menu"} />
                        <MyCardContent>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Icon</TableCell>
                                            <TableCell>Tên</TableCell>
                                            <TableCell>URL</TableCell>
                                            <TableCell>Trạng thái</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {data.length === 0 ? (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    colSpan={7}
                                                    align="center"
                                                >
                                                    Không có tab menu đang hiển
                                                    thị nào
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ) : (
                                        <SortableList
                                            items={data}
                                            onSortEnd={onSortEnd}
                                            onCheckItem={(item) => {
                                                setSelectedMenuBar(item);
                                                setOpenModal(true);
                                            }}
                                            lockOffset="100%"
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
                        Bạn có muốn tắt menubar{" "}
                        <strong>{selectedMenuBar?.label}</strong> không?
                    </ModalCustom>
                </AppMarketing>
            </AuthorizationScreen>
        </>
    );
}

const SortableItem = SortableElement(({ value: item, onCheck = () => {} }) => {
    return (
        <TableRow>
            <TableCell scope="row" width="5%">
                {item.index + 1}
            </TableCell>

            <TableCell align="left" width="15%">
                <img
                    src={item.iconUrl}
                    title="image"
                    alt="image"
                    width={60}
                    height={60}
                />
            </TableCell>

            <TableCell scope="row" width="25%">
                {item.label}
            </TableCell>

            <TableCell align="left" width="50%">
                {item.url}
            </TableCell>

            <TableCell width="20%">
                <Switch
                    color="primary"
                    checked={item.isActive || false}
                    onClick={() => {
                        onCheck?.(item);
                    }}
                />
            </TableCell>
        </TableRow>
    );
});

const SortableList = SortableContainer(
    ({ items, onCheckItem = () => {}, disabled = false }) => {
        return (
            <TableBody>
                {items.map((value, index) => (
                    <SortableItem
                        disabled={disabled}
                        key={`item-${value}`}
                        index={index}
                        value={{ ...value, index }}
                        onCheck={(item) => onCheckItem?.(item)}
                    />
                ))}
            </TableBody>
        );
    }
);

export default function MenuBarList(props) {
    return renderWithLoggedInUser(props, render);
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        const props = {
            menuBar: [],
        };

        const marketingClient = getMarketingClient(ctx, {});
        const menuBarResp = await marketingClient.getMenubar();

        if (menuBarResp.status == "OK") {
            props.menuBar = menuBarResp?.data[0]?.items || [];
        }

        return {
            props: props,
        };
    });
}
