import React from 'react';
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@material-ui/core";
import { useRouter } from "next/router";
import { formatDateTime, formatEllipsisText, formatNumber } from 'components/global';
import { SyncResultButton } from './SyncResultButton';
import styles from 'pages/marketing/gamification/gamification.module.css';
import Link from "next/link";

export default function HistorySyncGamification(props) {

    const router = useRouter();
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);

    const { listResult, accountMap, totalResult, gamificationMap } = props;

    const handlePageChange = async (event, page, rowsPerPage) => {
        await router.push({
            pathname: "/marketing/sync-gamification",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage,
            },
        });
    };


    return (

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">STT</TableCell>
                        <TableCell align="left">Chương trình thưởng</TableCell>
                        <TableCell align="left">Loại</TableCell>
                        <TableCell align="left">Thời gian chạy</TableCell>
                        <TableCell align="left">Số KH tham gia</TableCell>
                        <TableCell align="left"> Số KH hoàn tất</TableCell>
                        <TableCell align="left">Trạng thái</TableCell>
                        <TableCell align="left">Người thực hiện</TableCell>
                        <TableCell align="left">Lỗi</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {listResult?.length > 0 && listResult?.map((item, index) => (
                        <TableRow key={item}>
                            <TableCell align="left">{page * limit + index + 1}</TableCell>
                            <TableCell align="left">
                                <Link
                                    href={`/marketing/gamification/detail?code=${item.gamificationCode ?? ""}`}
                                    prefetch={false}>
                                    <Tooltip
                                        title={`Nhấn để xem kết quả trả thưởng của chương trình ${item?.gamificationCode || ""}`}>
                                        <a color="primary" className={styles.cartLink}>
                                        {item.gamificationCode} - {formatEllipsisText(gamificationMap[item.gamificationCode]?.name || "", 40)}
                                        </a>
                                    </Tooltip>
                                </Link>

                            </TableCell>
                            <TableCell align="left">{item.type === "MANUAL" ? "Thủ công" : "Hệ thống"}</TableCell>
                            <TableCell align="left">
                                Từ: {formatDateTime(item.startTime)}
                                <br />
                                Đến: {formatDateTime(item.endTime)}
                            </TableCell>
                            <TableCell align="left">{formatNumber(item.numberOfJoinedCustomer ?? 0)}</TableCell>
                            <TableCell align="left">{formatNumber(item.numberOfCompletedCustomer ?? 0)}</TableCell>
                            <TableCell align="left">
                                <SyncResultButton status={item.status} />
                            </TableCell>

                            <TableCell align='left'>
                                {accountMap[item.accountID] ?? "Hệ thống"}
                            </TableCell>

                            <TableCell align='left'>
                                {item.failReason ?? " - "}
                            </TableCell>
                        </TableRow>
                    ))}

                    {listResult.length === 0 && (

                        <TableRow>
                            <TableCell colSpan={4} align="left">
                                Không tìm thấy lịch sử cập nhật chương trình thưởng
                            </TableCell>
                        </TableRow>

                    )}
                </TableBody>

                <MyTablePagination
                    labelUnit="lịch sử cập nhật"
                    count={totalResult}
                    rowsPerPage={limit}
                    page={page}
                    onChangePage={handlePageChange}
                />

            </Table>
        </TableContainer>
    )
}
