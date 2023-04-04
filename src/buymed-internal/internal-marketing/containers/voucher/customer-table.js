import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, CircularProgress, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import { useState, useEffect } from "react";
import { getCustomerClient } from 'client/customer';
import Link from "next/link";
import styles from "./voucher.module.css";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";

export function CustomerTable(props) {
    const { dataProps, datasFromExcel, isInsert, setIsInsert, onRemoveCustomer } = props

    const [isLoading, setIsLoading] = useState(false)
    const [listUser, setListUser] = useState(dataProps && dataProps.customerIds ? dataProps.customerIds : [])
    const [listRender, setListRender] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [total, setTotal] = useState(0)
    const [userMap, setUserMap] = useState({})

    const customerClient = getCustomerClient();

    const removeCustomer = (customerID) => {
        if (customerID === listUser[listUser.length - 1] && ((listUser.length - 1 ) % limit === 0)) {
            setPage(page > 0 ? page - 1 : 0)
        }
        setIsLoading(true)
        onRemoveCustomer(customerID)
        setListUser(listUser.filter(id => id !== customerID))
    }

    const handleChangePage = (page, rowsPerPage) => {
        setPage(page)
        setLimit(rowsPerPage)
    }

    useEffect(() => {
        if (!listUser?.length) return
        const getCustomerListByID = async () => {
            const customerResp = await customerClient.getListByCustomerIds(listUser?.slice(page*limit, limit + page*limit))
            setListRender(customerResp?.data || [])
            setTotal(listUser.length)
        }
        getCustomerListByID()
        const dataMap = {}
        listUser?.forEach(element => {
            dataMap[element] = element
        });
        setUserMap(dataMap)
    }, [listUser, limit, page])

    useEffect(() => {
        setIsLoading(true)
        if (isInsert) {
            const handleImportExcel = async () => {
                const customerResp = await customerClient.getListByCustomerIds(datasFromExcel)
                let listTemp = [...listUser]
                if ( customerResp.status === "OK" ) {
                    datasFromExcel.map(id => {
                        customerResp.data.map(cusResp => {
                            if (id === cusResp.customerID && !userMap[cusResp.customerID]) {
                                listTemp.push(cusResp.customerID)
                            }
                        })
                    })
                }

                setTotal(listTemp.length)
                setListUser(listTemp)
                setIsInsert(false)
            }
            handleImportExcel()
        } else {
            setListUser(dataProps.customerIds)
            setTotal(dataProps.customerIds.length)
        }
        setIsLoading(false)
    }, [dataProps.customerIds])

    return (
        <Grid container>
            <Grid item xs={12}>
                <TableContainer>
                    {
                            listUser && listUser.length > 0
                        ?
                                    isLoading
                                ?
                                    <Table>
                                        <colgroup>
                                            <col width="5%"/>
                                            <col width="20%"/>
                                        </colgroup>
                                        <TableHead >
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">Đang lấy dữ liệu</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center">
                                                        <CircularProgress/>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                    </Table>
                                :
                                    <Table>
                                        <colgroup>
                                            <col width="5%"/>
                                            <col width="20%"/>
                                        </colgroup>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">STT</TableCell>
                                                <TableCell align="left">Id</TableCell>
                                                <TableCell align="left">Tên khách hàng</TableCell>
                                                <TableCell align="left">Số điện thoại</TableCell>
                                                <TableCell align="left">Thao tác</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                listRender.map((user, index) => {
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell align="left">
                                                                { index + 1 + (page * limit) }
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <Link
                                                                    href={`/crm/customer/detail?customerCode=${user.code}&customerId=${user.customerID}`}
                                                                    prefetch={false}>
                                                                    <Tooltip title="Xem thông tin khách hàng">
                                                                        <a color="primary" className={styles.cartLink} >
                                                                            { user.customerID }
                                                                        </a>
                                                                    </Tooltip>
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                { user.name }
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                { user.phone }
                                                            </TableCell>
                                                            <TableCell>
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    onClick={() => removeCustomer(user.customerID)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                        <MyTablePagination
                                            labelUnit="khách hàng"
                                            count={total}
                                            rowsPerPage={limit}
                                            page={page}
                                            onChangePage={(e, page, rowsPerPage) => {
                                                handleChangePage(page, rowsPerPage)
                                            }}
                                        />
                                    </Table>
                            :
                                <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Danh sách khách hàng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">Tất cả khách hàng thuộc đối tượng áp dụng</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                    }
                </TableContainer>
            </Grid>
        </Grid>
    )
}
