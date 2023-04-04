import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@material-ui/core";
import { Edit as EditIcon, SearchRounded } from "@material-ui/icons";
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
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getMarketingClient } from "client/marketing";
import AuthorizationButton from "components/authorization-button";
import AuthorizationScreen from "components/authorization-screen";
import { formatDateTime } from "components/global";
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
}

function render({ hashtagList, total }) {
    const toast = useToast();
    const router = useRouter();
    const search = router.query?.search || "";
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Hashtag tìm kiếm nhiều nhất",
        },
    ];

    const [searchText, setSearchText] = useState(search);
    const [selectedHashtag, setSelectedHashtag] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/hashtag-search",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page: page,
            },
        });
    };

    const handleUpdateActive = async () => {
        try {
            const { isActive, code } = selectedHashtag;
            const resp = await getMarketingClient().updateHashtagSearch({
                code,
                isActive: !isActive,
            });
            setSelectedHashtag({});
            if (resp.status === "OK") {
                toast.success("Thay đổi trạng thái hiển thị thành công");
                router.push({
                    pathname: "/marketing/hashtag-search",
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
            pathname: "/marketing/hashtag-search",
            query: {
                ...router.query,
                search: searchText,
            },
        });
    };

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/top-search" breadcrumb={breadcrumb}>
                <Head>
                    <title>Hashtag tìm kiếm nhiều nhất</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={"Danh sách Hashtag tìm kiếm nhiều nhất"}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button
                                onClick={() =>
                                    router.push("/marketing/hashtag-search/new")
                                }
                                style={{ marginLeft: "auto", margin: 4 }}
                                variant="contained"
                                color="primary"
                            >
                                + Thêm
                            </Button>
                            <Button
                                style={{ margin: 4 }}
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    router.push("/marketing/hashtag-search/active")
                                }
                            >
                                Danh sách hiển thị
                            </Button>
                        </div>
                    </MyCardHeader>
                    <MyCardContent>
                        <Grid xs md={2} item>
                            <TextField
                                fullWidth
                                placeholder="Nhập từ khoá hashtag"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
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
                    </MyCardContent>
                </MyCard>
                <MyCard>
                    <MyCardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
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
                                        <TableCell>Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {hashtagList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                Không tìm thấy hashtag nào
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        hashtagList.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>

                                                <TableCell>
                                                    {item.hashtag}
                                                </TableCell>

                                                <TableCell>
                                                    <a href={getURLwithProtocol(item.url)} target="_blank">
                                                        {item.url}
                                                    </a>
                                                </TableCell>

                                                <TableCell>
                                                    {formatDateTime(
                                                        item.startDisplayTime
                                                    )}
                                                    {" - "}
                                                    {formatDateTime(
                                                        item.endDisplayTime
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    <Tooltip title={new Date(item.endDisplayTime) >= new Date() ? "Thay đổi trạng thái hiển thị của hashtag" : "Hashtag không thể bật vì đã hết thời gian hiển thị"}>
                                                        <Switch
                                                            color="primary"
                                                            checked={
                                                                item.isActive ||
                                                                false
                                                            }
                                                            onClick={() => {
                                                                if (new Date(item.endDisplayTime) < new Date()) {
                                                                    toast.error("Hashtag không thể bật vì đã hết thời gian hiển thị")
                                                                }
                                                                else {
                                                                    setSelectedHashtag(
                                                                        item
                                                                    );
                                                                    setOpenModal(true);
                                                                }
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </TableCell>

                                                <TableCell>
                                                    <Link
                                                        href={`/marketing/hashtag-search/edit?code=${item.code}`}
                                                    >
                                                        <a>
                                                            <Tooltip title="Cập nhật thông tin">
                                                                <IconButton>
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </a>
                                                    </Link>
                                                    {/* <br/> */}
                                                    <Link
                                                        href={`/marketing/hashtag-search/history?code=${item.code}`}
                                                    >
                                                        <a>
                                                            <Tooltip title="Xem lịch sử thao tác">
                                                                <IconButton>
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faHistory
                                                                        }
                                                                        style={{
                                                                            color: "#777",
                                                                        }}
                                                                        size="sm"
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </a>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>

                                <MyTablePagination
                                    labelUnit="hashtag"
                                    count={total}
                                    rowsPerPage={limit}
                                    page={page}
                                    onChangePage={handlePageChange}
                                />
                            </Table>
                        </TableContainer>
                    </MyCardContent>
                    <AuthorizationButton requiredAPI="PUT/marketplace/marketing/v1/hashtag-search">
                        <ModalCustom
                            open={openModal}
                            title="Thông báo"
                            primaryText="Đồng ý"
                            onClose={setOpenModal}
                            onExcute={handleUpdateActive}
                        >
                            Bạn có muốn&nbsp;
                            <strong>
                                {!selectedHashtag?.isActive ? "Hiện" : "Ẩn"}
                            </strong>
                            &nbsp;hashtag <strong>{selectedHashtag?.hashtag}</strong>{" "}
                            không?
                        </ModalCustom>
                    </AuthorizationButton>
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
            hashtagList: [],
            total: 0,
        };
        const marketingClient = getMarketingClient(ctx, {});

        const query = ctx.query;
        const page = parseInt(query.page) || 0;

        const limit = parseInt(query.limit) || 20;
        const q = JSON.parse(query.q ?? "{}");
        const search = query.search || "";
        const offset = page * limit;

        const hashtagResp = await marketingClient.getHashtagSearchList({
            limit,
            q,
            search,
            offset,
        });

        if (hashtagResp.status == "OK") {
            props.hashtagList = hashtagResp.data;
            props.total = hashtagResp.total;
        }

        return {
            props: props,
        };
    });
}
