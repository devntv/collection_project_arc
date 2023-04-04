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
import InfoIcon from "@material-ui/icons/Info";
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
import { formatDateTime } from "components/global";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import { useState } from "react";
import styles from "./countdown-bar.module.css";

const getURLwithProtocol = (url) => {
    if (url.startsWith("http")) {
        return url;
    }
    return `http://${url}`;
};

function render({ countdownBarList, total }) {
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
            name: "Danh sách countdown bar",
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
    const [selectedCountdownBar, setSelectedCountdownBar] = useState({});
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/countdown-bar",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page: page,
            },
        });
    };

    const handleUpdateActive = async () => {
        try {
            const { isActive, code } = selectedCountdownBar;
            const resp = await getMarketingClient().updateCountdownBar({
                code,
                isActive: !isActive,
            });
            setSelectedCountdownBar({});
            if (resp.status === "OK") {
                toast.success("Thay đổi trạng thái hiển thị thành công");
                router.push({
                    pathname: "/marketing/countdown-bar",
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
            const { code } = selectedCountdownBar;
            const resp = await getMarketingClient().deleteCountdownBar(code);
            setSelectedCountdownBar({});
            if (resp.status === "OK") {
                toast.success("Xóa countdown bar thành công");
                router.push({
                    pathname: "/marketing/countdown-bar",
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
            pathname: "/marketing/countdown-bar",
            query: {
                ...router.query,
                search: searchText,
            },
        });
    };

    const isDisplayOnWeb = (countdownBar, countdownBarList) => {
        if (!countdownBar?.isActive) return false;
        const countdownBarListSorted = countdownBarList
            .filter((item) => item?.isActive)
            .sort((cd1, cd2) => {
                const startDisplayTimeCD1 = new Date(cd1?.startDisplayTime);
                const startDisplayTimeCD2 = new Date(cd2?.startDisplayTime);
                return startDisplayTimeCD2 - startDisplayTimeCD1;
            });

        const countdownBarHalf = countdownBarListSorted.filter(
            (cd) => cd?.imageType === "HALF"
        );

        if (countdownBarHalf.length >= 2)
            return countdownBarHalf
                .slice(0, 2)
                .some((cd) => cd?.code === countdownBar?.code);

        const countdownBarFull = countdownBarListSorted.filter(
            (cd) => cd?.imageType === "FULL"
        );

        if (countdownBarFull.length > 0) {
            return countdownBarFull[0]?.code === countdownBar?.code;
        }

        return false;
    };

    return (
        <AuthorizationScreen>
            <AppMarketing
                select="/marketing/countdown-bar"
                breadcrumb={breadcrumb}
            >
                <Head>
                    <title>Danh sách countdown bar</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={"Danh sách countdown bar"}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <AuthorizationButton
                                requiredAPI={
                                    "POST/marketplace/marketing/v1/countdownbar"
                                }
                            >
                                <Button
                                    onClick={() =>
                                        router.push(
                                            "/marketing/countdown-bar/new"
                                        )
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
                                    router.push(
                                        "/marketing/countdown-bar/history"
                                    )
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
                                            pathname:
                                                "/marketing/countdown-bar",
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
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Hình ảnh</TableCell>
                                        <TableCell>URL</TableCell>
                                        <TableCell>
                                            Thời gian hiển thị{" "}
                                            <Tooltip
                                                title={
                                                    <ul
                                                        style={{
                                                            marginLeft: -20,
                                                        }}
                                                    >
                                                        <li>
                                                            Khi đến thời gian
                                                            hiển thị, countdown
                                                            bar Bật sẽ tự động
                                                            hiển thị lên website
                                                        </li>
                                                        <li>
                                                            Khi hết thời gian
                                                            hiển thị, countdown
                                                            bar Bật sẽ tự động
                                                            ẩn khỏi website
                                                        </li>
                                                    </ul>
                                                }
                                            >
                                                <IconButton>
                                                    <InfoIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            Trạng thái{" "}
                                            <Tooltip
                                                title={
                                                    <div
                                                        style={{
                                                            padding: 10,
                                                        }}
                                                    >
                                                        Dùng để bật/tắt
                                                        countdown bar khẩn cấp:
                                                        <ul
                                                            style={{
                                                                marginLeft: -20,
                                                            }}
                                                        >
                                                            <li>
                                                                Nếu countdown
                                                                bar còn thời
                                                                gian hiển thị
                                                                thì tắt hiển thị
                                                                ngay lập tức
                                                            </li>
                                                            <li>
                                                                Nếu countdown
                                                                bar hết thời
                                                                gian hiển thị
                                                                thì không thể
                                                                bật, để bật được
                                                                thì cần chỉnh
                                                                sửa thời gian
                                                                hiển thị lại cho
                                                                phù hợp
                                                            </li>
                                                        </ul>
                                                    </div>
                                                }
                                            >
                                                <IconButton>
                                                    <InfoIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            Hiển thị{" "}
                                            <Tooltip
                                                title={
                                                    <ul
                                                        style={{
                                                            marginLeft: -20,
                                                        }}
                                                    >
                                                        <li>
                                                            Đang hiển thị:
                                                            Countdown bar đang
                                                            hiển thị trên
                                                            website (Đang bật và
                                                            còn trong thời gian
                                                            hiển thị)
                                                        </li>
                                                        <li>
                                                            Nếu 2 hình ảnh cùng
                                                            có trạng thái Bật và
                                                            Đang hiển thị thì{" "}
                                                            <b>
                                                                <i>
                                                                    hình cũ hơn
                                                                    sẽ nằm vị
                                                                    trí bên trái
                                                                    và hình mới
                                                                    hơn sẽ ở vị
                                                                    trí bên phải
                                                                </i>
                                                            </b>
                                                            <br />
                                                            Lưu ý chọn đúng loại
                                                            hình ảnh Half để
                                                            hiển thị hình ảnh
                                                            như mong muốn
                                                        </li>
                                                    </ul>
                                                }
                                            >
                                                <IconButton>
                                                    <InfoIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {countdownBarList.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                align="center"
                                            >
                                                Không tìm thấy countdown bar nào
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        countdownBarList.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell
                                                    style={{ maxWidth: 200 }}
                                                >
                                                    {item.name}
                                                </TableCell>

                                                <TableCell
                                                    style={{ maxWidth: 500 }}
                                                >
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell
                                                    style={{ maxWidth: 250 }}
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
                                                    <Tooltip
                                                        title={
                                                            new Date(
                                                                item.endDisplayTime
                                                            ) >= new Date()
                                                                ? "Thay đổi trạng thái hiển thị của countdown bar"
                                                                : "Countdown bar không thể bật vì đã hết thời gian hiển thị"
                                                        }
                                                    >
                                                        <Switch
                                                            color="primary"
                                                            checked={
                                                                item.isActive ||
                                                                false
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    new Date(
                                                                        item.endDisplayTime
                                                                    ) <
                                                                    new Date()
                                                                ) {
                                                                    toast.error(
                                                                        "Countdown bar không thể bật vì đã hết thời gian hiển thị"
                                                                    );
                                                                } else {
                                                                    setSelectedCountdownBar(
                                                                        item
                                                                    );
                                                                    setOpenModalEdit(
                                                                        true
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </TableCell>

                                                <TableCell>
                                                    {isDisplayOnWeb(
                                                        item,
                                                        countdownBarList
                                                    ) && (
                                                        <span
                                                            className={
                                                                styles.isDisplayText
                                                            }
                                                        >
                                                            Đang hiển thị
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <AuthorizationButton
                                                        requiredAPI={
                                                            "PUT/marketplace/marketing/v1/countdownbar"
                                                        }
                                                    >
                                                        <Link
                                                            href={`/marketing/countdown-bar/edit?code=${item.code}`}
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
                                                    {/* <br/> */}
                                                    <AuthorizationButton
                                                        requiredAPI={
                                                            "DELETE/marketplace/marketing/v1/countdownbar"
                                                        }
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                setOpenModalDelete(
                                                                    true
                                                                );
                                                                setSelectedCountdownBar(
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
                                    labelUnit="countdown bar"
                                    count={total}
                                    rowsPerPage={limit}
                                    page={page}
                                    onChangePage={handlePageChange}
                                />
                            </Table>
                        </TableContainer>
                    </MyCardContent>
                    <ModalCustom
                        open={openModalEdit}
                        title="Thông báo"
                        primaryText="Đồng ý"
                        onClose={setOpenModalEdit}
                        onExcute={handleUpdateActive}
                    >
                        Bạn có muốn&nbsp;
                        <strong>
                            {!selectedCountdownBar?.isActive ? "Hiện" : "Ẩn"}
                        </strong>
                        &nbsp;countdown bar{" "}
                        <strong>{selectedCountdownBar?.name}</strong> không?
                    </ModalCustom>
                    <ModalCustom
                        open={openModalDelete}
                        title="Thông báo"
                        primaryText="Đồng ý"
                        onClose={setOpenModalDelete}
                        onExcute={handleDelete}
                    >
                        Bạn có muốn&nbsp;
                        <strong>Xóa</strong>
                        &nbsp;countdown bar{" "}
                        <strong>{selectedCountdownBar?.name}</strong> không?
                    </ModalCustom>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen>
    );
}
export default function CountdownBar(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        const props = {
            countdownBarList: [],
            total: 0,
        };
        const marketingClient = getMarketingClient(ctx, {});

        const query = ctx.query;
        const page = parseInt(query.page) || 0;

        const limit = parseInt(query.limit) || 20;
        const q = JSON.parse(query.q ?? "{}");
        const search = query.search || "";
        const offset = page * limit;

        const countdownBarResp = await marketingClient.getCountdownBarList({
            limit,
            q,
            search,
            offset,
        });

        if (countdownBarResp.status == "OK") {
            props.countdownBarList = countdownBarResp?.data;
            props.total = countdownBarResp?.total || null;
        }

        return {
            props: props,
        };
    });
}
