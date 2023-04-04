import { FormControlLabel, Switch } from '@material-ui/core';
import { Box } from '@mui/system'
import React from 'react'

function TableColumnFilter() {
    const headCells = [
        {
          numeric: false,
          disablePadding: true,
          label: '#',
        },
        {
          numeric: false,
          disablePadding: true,
          label: 'KHÁCH HÀNG',
        },
        {
          numeric: false,
          disablePadding: false,
          label: 'NHÂN VIÊN HỖ TRỢ',
        },
        {
          id: 'created_time',
          numeric: false,
          disablePadding: false,
          label: 'THỜI GIAN TẠO',
        },
        {
          numeric: false,
          disablePadding: false,
          label: 'THỜI GIAN TIẾP NHẬN',
        },
        {
          numeric: false,
          disablePadding: false,
          label: 'TRẠNG THÁI',
        },
        {
          numeric: false,
          disablePadding: false,
          label: 'LIÊN QUAN',
        },
        {
          numeric: false,
          disablePadding: false,
          label: 'HÀNH ĐỘNG',
        },
      ];
  return (
    <Box>a</Box>
  )
}

export default TableColumnFilter