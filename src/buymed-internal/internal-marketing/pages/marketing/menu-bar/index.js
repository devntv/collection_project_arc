import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@material-ui/core";
import { Edit as EditIcon, SearchRounded } from "@material-ui/icons";
import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { getActivities } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getMarketingClient } from "client/marketing";
import AuthorizationScreen from "components/authorization-screen";
import { formatDateTime } from "components/global";
import MyActivity from "containers/menu-bar/CustomActivity/my-activity";
import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import { useState } from "react";
import { stringToSlug } from "utils/function";

function render({ menuBar, activities }) {
    const [data, setData] = useState(menuBar);
    const [selectedMenuBar, setSelectedMenuBar] = useState({});

    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const toast = useToast();
    const router = useRouter();

    const search = router.query?.search || "";
    const [searchText, setSearchText] = useState(search);

    const q = JSON.parse(router.query?.q ?? "{}");

    let status = "ALL";
    if (q?.isActive === true) {
        status = "ACTIVE";
    }
    if (q?.isActive === false) {
        status = "INACTIVE";
    }

    const statusTypes = [
        {
            value: "ALL",
            label: "Tất cả",
        },
        {
            value: "ACTIVE",
            label: "Đã kích hoạt",
        },
        {
            value: "INACTIVE",
            label: "Chưa kích hoạt",
        },
    ];

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách menu",
        },
    ];

    const getURLwithProtocol = (url) => {
        if (url.startsWith("http")) {
            return url;
        }
        return `http://${url}`;
    };

    const handleSearch = () => {
        router.push({
            pathname: "/marketing/menu-bar",
            query: {
                ...router.query,
                search: searchText,
            },
        });
    };

    const handleUpdate = async (type) => {
        const { index } = selectedMenuBar;
        const newData = [...data];

        if (type === "UPDATE") {
            newData[index] = {
                ...newData[index],
                isActive: !newData[index]?.isActive || false,
            };
        }

        if (type === "DELETE") {
            newData.splice(index, 1);
        }

        await submit({ items: newData });
        setSelectedMenuBar({});
    };

    const getFilteredData = (data) => {
        return (
            data
                ?.filter((item) => {
                    if (!status || status === "ALL") return true;
                    return status === "ACTIVE"
                        ? item?.isActive
                        : !item?.isActive;
                })
                .filter((item) =>
                    stringToSlug(item.label).includes(stringToSlug(searchText))
                ) || []
        );
    };

    async function submit(data) {
        try {
            const resp = await getMarketingClient().updateMenubar(data);
            if (resp.status === "OK") {
                setData(data?.items || []);
                toast.success("Cập nhật danh sách menu thành công");
                router.push({
                    pathname: "/marketing/menu-bar",
                });
                return;
            }
            if (resp && resp.message) toast.error(resp.message);
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <>
            <Head>
                <title>Danh sách menu</title>
            </Head>
            <AuthorizationScreen>
                <AppMarketing
                    select="/marketing/menu-bar"
                    breadcrumb={breadcrumb}
                >
                    <MyCard>
                        <MyCardHeader title={"Danh sách menu"}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        router.push("/marketing/menu-bar/new")
                                    }
                                    style={{ marginLeft: "auto", margin: 4 }}
                                    variant="contained"
                                    color="primary"
                                >
                                    + Thêm
                                </Button>
                                <Button
                                    onClick={() =>
                                        router.push(
                                            "/marketing/menu-bar/active"
                                        )
                                    }
                                    style={{ marginLeft: "auto", margin: 4 }}
                                    variant="contained"
                                    color="primary"
                                >
                                    Danh sách hiển thị
                                </Button>
                            </div>
                        </MyCardHeader>
                        <MyCardContent>
                            <Grid
                                container
                                spacing={3}
                                style={{ marginTop: 0 }}
                            >
                                <Grid xs md={2} item>
                                    <TextField
                                        label="Từ khóa"
                                        fullWidth
                                        placeholder="Nhập từ khoá"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                        onKeyUp={(e) => {
                                            if (e.key === "Enter") {
                                                handleSearch();
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        variant="contained"
                                                        onClick={handleSearch}
                                                    >
                                                        <SearchRounded color="action" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid xs md={2} item>
                                    <TextField
                                        label="Trạng thái"
                                        fullWidth
                                        placeholder="Chọn trạng thái"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        defaultValue={status}
                                        onChange={(e) => {
                                            const status =
                                                e?.target?.value || "ALL";
                                            const q = {
                                                isActive: status === "ACTIVE",
                                            };
                                            if (status === "ALL")
                                                delete q?.isActive;
                                            router.push({
                                                pathname: "/marketing/menu-bar",
                                                query: {
                                                    ...router.query,
                                                    search: searchText,
                                                    q: JSON.stringify(q),
                                                },
                                            });
                                        }}
                                        select
                                    >
                                        {statusTypes?.map((item) => (
                                            <MenuItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </MyCardContent>
                    </MyCard>
                    <MyCard>
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
                                            <TableCell>Thao tác</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getFilteredData(data).length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={7}
                                                    align="center"
                                                >
                                                    Không tìm thấy menu phù hợp
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            <>
                                                {getFilteredData(data).map(
                                                    (item, index) => (
                                                        <TableRow>
                                                            <TableCell
                                                                align="left"
                                                                width="5%"
                                                            >
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell
                                                                align="left"
                                                                width="10%"
                                                            >
                                                                <img
                                                                    src={
                                                                        item.iconUrl
                                                                    }
                                                                    title="image"
                                                                    alt="image"
                                                                    width={60}
                                                                    height={60}
                                                                />
                                                            </TableCell>
                                                            <TableCell
                                                                scope="row"
                                                                width="20%"
                                                            >
                                                                {item.label}
                                                            </TableCell>

                                                            <TableCell
                                                                align="left"
                                                                width="35%"
                                                            >
                                                                <a
                                                                    href={getURLwithProtocol(
                                                                        item.url
                                                                    )}
                                                                    target="_blank"
                                                                >
                                                                    {item.url}
                                                                </a>
                                                            </TableCell>

                                                            <TableCell width="20%">
                                                                <Switch
                                                                    color="primary"
                                                                    checked={
                                                                        item.isActive ||
                                                                        false
                                                                    }
                                                                    onClick={() => {
                                                                        setSelectedMenuBar(
                                                                            {
                                                                                ...item,
                                                                                index,
                                                                            }
                                                                        );
                                                                        setOpenModalEdit(
                                                                            true
                                                                        );
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell
                                                                align="left"
                                                                style={{
                                                                    minWidth:
                                                                        "20%",
                                                                }}
                                                            >
                                                                <IconButton
                                                                    onClick={() => {
                                                                        router.push(
                                                                            {
                                                                                pathname:
                                                                                    "/marketing/menu-bar/edit",
                                                                                query: {
                                                                                    index: index,
                                                                                },
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                                <IconButton
                                                                    onClick={() => {
                                                                        setSelectedMenuBar(
                                                                            {
                                                                                ...item,
                                                                                index,
                                                                            }
                                                                        );
                                                                        setOpenModalDelete(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faTrash
                                                                        }
                                                                        style={{
                                                                            color: "#777",
                                                                        }}
                                                                        size="sm"
                                                                    />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MyCardContent>
                    </MyCard>
                    <ModalCustom
                        open={openModalDelete}
                        title="Thông báo"
                        primaryText="Đồng ý"
                        onClose={setOpenModalDelete}
                        onExcute={() => handleUpdate("DELETE")}
                    >
                        Bạn có muốn <b>xóa</b> tab menu{" "}
                        <strong>{selectedMenuBar?.label}</strong> không?
                    </ModalCustom>
                    <ModalCustom
                        open={openModalEdit}
                        title="Thông báo"
                        primaryText="Đồng ý"
                        onClose={setOpenModalEdit}
                        onExcute={() => handleUpdate("UPDATE")}
                    >
                        Bạn có muốn{" "}
                        <b>{selectedMenuBar?.isActive ? "tắt" : "mở"}</b>
                        &nbsp;tab menu <strong>
                            {selectedMenuBar?.label}
                        </strong>{" "}
                        không?
                    </ModalCustom>
                    <MyCard>
                        <MyCardHeader title="Lịch sử cài đặt danh sách menu" />
                        <MyCardContent>
                            <MyActivity
                                data={activities?.data || []}
                                message="Chưa ghi nhận thao tác nào"
                            ></MyActivity>
                        </MyCardContent>
                    </MyCard>
                </AppMarketing>
            </AuthorizationScreen>
        </>
    );
}

export default function MenuBar(props) {
    return renderWithLoggedInUser(props, render);
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        const props = {
            menuBar: [],
            activities: {},
        };
        const marketingClient = getMarketingClient(ctx, {});
        const menuBarResp = await marketingClient.getMenubar();

        if (menuBarResp.status == "OK") {
            props.menuBar = menuBarResp?.data[0]?.items || [];
        }

        let dict = {
            startDisplayTime: function (values) {
                return formatDateTime(values);
            },
            endDisplayTime: function (values) {
                return formatDateTime(values);
            },
            isActive: function (value) {
                return value ? "Bật" : "Tắt";
            },
        };
        registerTranslatorMap({
            "menu-bar-update": dict,
        });

        props.activities = await getActivities(
            ctx,
            {},
            {
                target: "menu-bar",
            }
        );

        return {
            props: props,
        };
    });
}
