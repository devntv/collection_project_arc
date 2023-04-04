import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Box from '@material-ui/core/Box';
import CustomTableHead from './CustomTableHead';
import CustomTableBody from './CustomTableBody';

const columns = [
    { id: '#', label: '#', minWidth: 170, hasSort: false, },
    { id: 'customer', label: 'Khách hàng', minWidth: 100, hasSort: false, },
    {
        id: 'region',
        label: 'Khu vực',
        minWidth: 170,
        align: 'left',
        hasSort: false,
    },
    {
        id: 'employee',
        label: 'Nhân viên hỗ trợ',
        minWidth: 170,
        align: 'left',
        hasSort: false,
    },
    {
        id: 'createdTime',
        label: 'Thời gian tạo',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
        hasSort: true,
    },
    {
        id: 'updatedTime',
        label: 'Thời gian tiếp nhận',
        minWidth: 170,
        align: 'left',
        hasSort: false,
        format: (value) => value.toFixed(2),
    },
    {
        id: 'status',
        label: 'Trạng thái',
        minWidth: 170,
        align: 'center',
        hasSort: false,
    },
];

const rows = [
    {
        id: "TBH12",
        customer: "Nguyễn Văn A",
        region: "Miền Nam",
        cs: "Trần Kỳ",
        createdTime: "20/07/2022 10:12",
        updatedTime: "20/07/2022 10:12",
        status: "Hoàn tất",
    },
    {
        id: "TBH11",
        customer: "Nguyễn Văn B",
        region: "Miền Bắc",
        cs: "Trần Kỳ",
        createdTime: "20/07/2022 10:12",
        updatedTime: "20/07/2022 10:12",
        status: "Hoàn tất",
    },
    {
        id: "TBH14",
        customer: "Nguyễn Văn E",
        region: "Miền Nam",
        cs: "Trần Kỳ",
        createdTime: "20/07/2022 10:12",
        updatedTime: "20/07/2022 10:12",
        status: "Hoàn tất"
    },
    {
        id: "TBH15",
        customer: "Nguyễn Văn Anh",
        region: "Miền Nam",
        cs: "Trần Kỳ",
        createdTime: "10/07/2022 10:12",
        updatedTime: "20/07/2022 10:12",
        status: "Hoàn tất"
    }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function DataTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <CustomTableHead
                            columns={columns}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <CustomTableBody
                            stableSort={stableSort}
                            getComparator={getComparator}
                            emptyRows={emptyRows}
                            rows={rows}
                            order={order}
                            orderBy={orderBy}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
