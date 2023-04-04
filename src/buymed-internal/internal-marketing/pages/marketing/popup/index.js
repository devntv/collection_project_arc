import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Delete } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import {
  MyCard,
  MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { getPopupClient } from "client/popup";
import Chip from "@material-ui/core/Chip";
import styles from "./popup.module.css";
import { formatEllipsisText, formatErrorMessage } from "components/global";
import { formatTime } from "components/common-global";
import ModalCustom from "components/modal/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import AuthorizationScreen from "components/authorization-screen";
import Authorization from "@thuocsi/nextjs-components/authorization/authorization";
import { isAuthorizationAPI } from "utils/function";

export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx, (ctx) => {
    return loadPopupData(ctx);
  });
}

export async function loadPopupData(ctx) {
  // setup data
  let data = { props: {} };
  // Fetch data from external API
  let query = ctx.query;
  let q = typeof query.q === "undefined" ? "" : query.q;
  let page = query.page || 0;
  let limit = query.limit || 20;
  let offset = page * limit;
  let getTotal = true;

  let _client = getPopupClient(ctx, {});
  data.props = await _client.getPopupLists({ offset, limit, getTotal });

  if (data.props.status !== "OK") {
    return { props: { data: [], count: 0, message: data.props.message } };
  }

  data.props.count = data.props.total;

  return data;
}

export default function NewPage(props) {
  return renderWithLoggedInUser(props, render);
}

function render(props) {
  const { error, success } = useToast();
  let router = useRouter();
  let [data, setData] = useState(props);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deletePopupId, setDeletePopupId] = useState();
  let page = parseInt(router.query.page) || 0;
  let limit = parseInt(router.query.limit) || 20;
  let q = router.query.q || "";

  const APIs = ["DELETE/marketplace/marketing/v1/popup", "PUT/marketplace/marketing/v1/popup"]
  const isAuthorization = isAuthorizationAPI(APIs)

  let breadcrumb = [
    {
      name: "Trang chủ",
      link: "/marketing",
    },
    {
      name: "Danh sách popup marketing",
    },
  ];

  useEffect(() => {
    setData(props);
  }, [props]);

  const handleDeletePopupById = async () => {
    setDeletePopup(false);
    let _client = getPopupClient();
    const result = await _client.removePopup(deletePopupId);
    if (result.status === "OK") {
      success("Xóa popup thành công");
      router.push(`/marketing/popup`);
    } else {
      error(formatErrorMessage(result));
    }
  };

  return (
    <AuthorizationScreen>
      <AppMarketing select="/marketing/popup" breadcrumb={breadcrumb}>
        <Head>
          <title>{"Danh sách popup marketing"}</title>
        </Head>
        <MyCard>
          <MyCardHeader title={"Danh sách popup marketing"}>
            <Authorization requiredAPI="POST/marketplace/marketing/v1/popup">
              <Link href="/marketing/popup/new">
                <Button variant="contained" color="primary">
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} /> Thêm popup
                </Button>
              </Link>
            </Authorization>
          </MyCardHeader>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Tiêu đề</TableCell>
                  <TableCell align="left">Loại</TableCell>
                  <TableCell align="left">Ngày tạo</TableCell>
                  <TableCell align="left">Trạng thái</TableCell>
                  {isAuthorization && (<TableCell align="right">Thao tác</TableCell>)}
                </TableRow>
              </TableHead>
              {data.count > 0 ? (
                <TableBody>
                  {data.data.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell align="left" className={styles.overflowWrap}>
                        {formatEllipsisText(row.name)}
                      </TableCell>
                      <TableCell align="left" className={styles.overflowWrap}>
                        {row.type === "image" ? "Hình ảnh" : "Video"}
                      </TableCell>
                      <TableCell align="left" className={styles.overflowWrap}>
                        {formatTime(row.createdTime)}
                      </TableCell>
                      <TableCell align="left">
                        <Chip
                          size="small"
                          label={"Chưa kích hoạt"}
                        />
                      </TableCell>
                      {isAuthorization && (
                        <TableCell align="right">
                          <div style={{ display: "flex", justifyContent: "end" }}>
                            <Authorization requiredAPI="PUT/marketplace/marketing/v1/popup">
                              <Link href={`/marketing/popup/edit?id=${row.id}`}>
                                <a>
                                  <Tooltip title="Cập nhật popup">
                                    <IconButton>
                                      <Edit fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </a>
                              </Link>
                            </Authorization>

                            <Authorization requiredAPI="DELETE/marketplace/marketing/v1/popup">
                              <Tooltip title="Xóa popup">
                                <IconButton
                                  onClick={() => {
                                    setDeletePopup(true), setDeletePopupId(row.id);
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Authorization>
                          </div>

                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} align="left">
                      Không tìm thấy thông tin popup
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              <MyTablePagination
                labelUnit="popup"
                count={data.count}
                rowsPerPage={limit}
                page={page}
                q={q}
                onChangePage={(event, page, rowsPerPage) => {
                  router.push(`/marketing/popup?page=${page}&limit=${rowsPerPage}`);
                }}
              />
            </Table>
          </TableContainer>
        </MyCard>
        <ModalCustom
          open={deletePopup}
          onClose={setDeletePopup}
          closeText="Hủy bỏ"
          primaryText="Đồng ý"
          title="Xóa popup"
          variant="secondary"
          onExcute={handleDeletePopupById}
        >
          Bạn có chắc muốn xóa popup này?
        </ModalCustom>
      </AppMarketing>
    </AuthorizationScreen>
  );
}
