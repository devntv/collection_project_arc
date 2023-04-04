import { getActivities, MyActivity } from '@thuocsi/nextjs-components/my-activity/my-activity'
import { registerTranslatorMap } from '@thuocsi/nextjs-components/my-activity/value-translator'
import { MyCard, MyCardContent, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card'
import { UserPromotionStatusValue } from 'components/promotion-voucher/constant'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CircularProgress, Table } from '@material-ui/core'
import MyTablePagination from '@thuocsi/nextjs-components/my-pagination/my-pagination'


export const statusLabel = {
    [UserPromotionStatusValue.ACTIVE]: "Được sử dụng",
    [UserPromotionStatusValue.DELETED]: "Đã xóa",
    [UserPromotionStatusValue.INACTIVE]: "Không được sử dụng"
  }

export default function LogUserVoucherActivity({ voucher }) {
    const [activities, setActivites] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)


    const getListActivities = async (offset, limit) => {
        setIsLoading(true)
        let dict = {
            status: function (value) {
                return statusLabel[value] ?? "Không xác định"
            },
            customerIds: function (value) {
                return JSON.parse(value)?.map(item => item)?.join(", ") || ""
            },
            prevStatus: function (value) {
                return statusLabel[value] ?? "Không xác định"
            },
            isUpdateAll: function (value) {
                return JSON.parse(value) ? "Có" : "Không"
            }
        }
        registerTranslatorMap({
            "create-user-voucher": dict,
            "update-user-voucher": dict
        })

        const resp = await getActivities(null, {}, {
            target: "user-voucher",
            primaryKey: voucher.code
        }, offset, limit)
        if (resp.status === "OK") {
            setActivites(resp.data)
            setTotal(resp.total)
        }
        else {
            setActivites([])
            setTotal([])
        }
        setIsLoading(false)
    }

    const handleChangePage = (page, rowsPerPage) => {
        setPage(page)
        setLimit(rowsPerPage)
        getListActivities(page * rowsPerPage, rowsPerPage)
    }

    useEffect(() => {
        getListActivities(page * limit, limit)
    }, [])

    return (
        <MyCard>
            <MyCardHeader title={`Lịch sử cài đặt khách hàng`} style={{
                textTransform: "uppercase",
                alignItems: "center"
            }} small />
            <MyCardContent>
                {isLoading ? (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <MyActivity
                        data={activities}
                        message="Chưa ghi nhận thao tác nào"
                    >
                    </MyActivity>
                )}
                <Table>
                    <MyTablePagination
                        labelUnit="thao tác"
                        count={total}
                        rowsPerPage={limit}
                        page={page}
                        onChangePage={(_, page, rowsPerPage) => {
                            handleChangePage(page, rowsPerPage)
                        }}
                    />
                </Table>
            </MyCardContent>
        </MyCard>
    )
}
