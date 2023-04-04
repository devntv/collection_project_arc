import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from "@material-ui/core";
import { Edit as EditIcon, SearchRounded } from "@material-ui/icons";
import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getMarketingClient } from "client/marketing";
import AuthorizationButton from "components/authorization-button";
import AuthorizationScreen from "components/authorization-screen";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import { useState } from "react";

const getURLwithProtocol = (url) => {
    if (url.startsWith("http")) {
        return url;
    }
    return `http://${url}`;
};

function render({ thumbnailList, total }) {
    const toast = useToast();
    const router = useRouter();
    const search = router.query?.search || "";
    const q = JSON.parse(router.query?.q ?? "{}");
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);

    let status = "ALL";
    if (q?.isActive === true) {
        status = "ACTIVE";
    }
    if (q?.isActive === false) {
        status = "INACTIVE";
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách thumbnail",
        },
    ];

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

    const [searchText, setSearchText] = useState(search);
    const [selectedThumbnail, setSelectedThumbnail] = useState({});
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/seo",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page: page,
            },
        });
    };

    const handleUpdateActive = async () => {
        try {
            const { isActive, code } = selectedThumbnail;
            const resp = await getMarketingClient().updateThumbnail({
                code,
                isActive: !isActive,
            });
            setSelectedThumbnail({});
            if (resp.status === "OK") {
                toast.success("Thay đổi trạng thái hiển thị thành công");
                router.push({
                    pathname: "/marketing/seo",
                    query: {
                        ...router.query,
                    },
                });
                return;
            }
            if (resp && resp.message) toast.error(resp.message);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleDelete = async () => {
        try {
            const { code } = selectedThumbnail;
            const resp = await getMarketingClient().deleteThumbnail(code);
            setSelectedThumbnail({});
            if (resp.status === "OK") {
                toast.success("Xóa thumbnail thành công");
                router.push({
                    pathname: "/marketing/seo",
                    query: {
                        ...router.query,
                    },
                });
                return;
            }
            if (resp && resp.message) toast.error(resp.message);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleSearch = () => {
        router.push({
            pathname: "/marketing/seo",
            query: {
                ...router.query,
                search: searchText,
            },
        });
    };

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/seo" breadcrumb={breadcrumb}>
                <Head>
                    <title>Danh sách thumbnail</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={"Danh sách thumbnail"}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <AuthorizationButton
                                requiredAPI={
                                    "POST/marketplace/marketing/v1/meta-thumbnail"
                                }
                            >
                                <Button
                                    onClick={() =>
                                        router.push("/marketing/seo/new")
                                    }
                                    style={{ marginLeft: "auto", margin: 4 }}
                                    variant="contained"
                                    color="primary"
                                >
                                    + Thêm
                                </Button>
                            </AuthorizationButton>
                            <Button
                                    style={{ margin: 4 }}
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        router.push("/marketing/seo/history")
                                    }
                                >
                                    Lịch sử cài đặt
                            </Button>
                        </div>
                    </MyCardHeader>
                    <MyCardContent>
                        <Grid container spacing={3} style={{ marginTop: 0 }}>
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
                                            pathname: "/marketing/seo",
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
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Tiêu đề SEO</TableCell>
                                        <TableCell>Tiêu đề trang</TableCell>
                                        <TableCell>URL</TableCell>
                                        <TableCell>
                                            Hình ảnh thumbnail
                                        </TableCell>
                                        <TableCell>Trạng thái</TableCell>
                                        <TableCell>Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {thumbnailList.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                align="center"
                                            >
                                                Không tìm thấy thumbnail nào
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        thumbnailList.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell
                                                    style={{ maxWidth: 200 }}
                                                >
                                                    {item.title}
                                                </TableCell>
                                                <TableCell
                                                    style={{ maxWidth: 200 }}
                                                >
                                                    {item.pageTitle}
                                                </TableCell>
                                                <TableCell
                                                    style={{ maxWidth: 300 }}
                                                >
                                                    <a
                                                        style={{
                                                            wordBreak:
                                                                "break-word",
                                                        }}
                                                        href={getURLwithProtocol(
                                                            item.url
                                                        )}
                                                        target="_blank"
                                                    >
                                                        {item.url}
                                                    </a>
                                                </TableCell>

                                                <TableCell
                                                    style={{ width: 200 }}
                                                >
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        style={{
                                                            width: "100%",
                                                            objectFit:'contain'
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Switch
                                                        color="primary"
                                                        checked={
                                                            item.isActive ||
                                                            false
                                                        }
                                                        onClick={() => {
                                                            setSelectedThumbnail(
                                                                item
                                                            );
                                                            setOpenModalEdit(
                                                                true
                                                            );
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <AuthorizationButton
                                                        requiredAPI={
                                                            "PUT/marketplace/marketing/v1/meta-thumbnail"
                                                        }
                                                    >
                                                        <Link
                                                            href={`/marketing/seo/edit?code=${item.code}`}
                                                        >
                                                            <a>
                                                                <Tooltip title="Cập nhật thông tin">
                                                                    <IconButton>
                                                                        <EditIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </a>
                                                        </Link>
                                                    </AuthorizationButton>
                                                    <AuthorizationButton
                                                        requiredAPI={
                                                            "DELETE/marketplace/marketing/v1/meta-thumbnail"
                                                        }
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                setOpenModalDelete(
                                                                    true
                                                                );
                                                                setSelectedThumbnail(
                                                                    item
                                                                );
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                style={{
                                                                    color: "#777",
                                                                }}
                                                                size="sm"
                                                            />
                                                        </IconButton>
                                                    </AuthorizationButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>

                                <MyTablePagination
                                    labelUnit="thumbnail"
                                    count={total}
                                    rowsPerPage={limit}
                                    page={page}
                                    onChangePage={handlePageChange}
                                />
                            </Table>
                        </TableContainer>
                    </MyCardContent>
                    <AuthorizationButton requiredAPI={"PUT/marketplace/marketing/v1/meta-thumbnail"}>
                        <ModalCustom
                            open={openModalEdit}
                            title="Thông báo"
                            primaryText="Đồng ý"
                            onClose={setOpenModalEdit}
                            onExcute={handleUpdateActive}
                        >
                            Bạn có muốn&nbsp;
                            <strong>
                                {!selectedThumbnail?.isActive ? "Hiện" : "Ẩn"}
                            </strong>
                            &nbsp;thumbnail{" "}
                            <strong>{selectedThumbnail?.title}</strong> không?
                        </ModalCustom>
                    </AuthorizationButton>
                    <ModalCustom
                        open={openModalDelete}
                        title="Thông báo"
                        primaryText="Đồng ý"
                        onClose={setOpenModalDelete}
                        onExcute={handleDelete}
                    >
                        Bạn có muốn&nbsp;
                        <strong>Xóa</strong>
                        &nbsp;thumbnail{" "}
                        <strong>{selectedThumbnail?.title}</strong> không?
                    </ModalCustom>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen>
    );
}
export default function TopSearch(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        const props = {
            thumbnailList: [],
            total: 0,
        };
        const marketingClient = getMarketingClient(ctx, {});

        const query = ctx.query;
        const page = parseInt(query.page) || 0;

        const limit = parseInt(query.limit) || 20;
        const q = JSON.parse(query.q ?? "{}");
        const search = query.search || "";
        const offset = page * limit;

        const thumbnailResp = await marketingClient.getThumbnailList({
            limit,
            q,
            search,
            offset,
        });

        if (thumbnailResp.status == "OK") {
            props.thumbnailList = thumbnailResp?.data;
            props.total = thumbnailResp?.total || null;
        }

        return {
            props: props,
        };
    });
}
