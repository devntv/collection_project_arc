import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { formatNumber } from 'components/utils'
import Loader from "@thuocsi/nextjs-components/loader/loader";
import React, { memo, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import MyTablePagination from '@thuocsi/nextjs-components/my-pagination/my-pagination'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import { calForeCastGMV, LIMIT_PER_PAGE, MarkFluctuation, PURCHASER_CODE, ratioGMVForeCast, RATIO_PER_HOUR, REGION_LIST, SORT_OPTIONS, TIME_TO_ASYNC } from 'utilities/realtime-constants';
import { convertParameter, replaceChangeParameter } from 'utilities/router';
import { getRealtimeClient } from 'clients/realtime';
import { getAccountClient } from 'clients/account';
import { getProductClient } from 'clients/product';
import { yyyymmdd } from 'utilities/datetime';
import useTranslation from 'next-translate/useTranslation';
import PollRoundedIcon from '@material-ui/icons/PollRounded';

const fetchData = async (ctx, page = 0, limit, sort, location, skuCode = null, picID = null, cicValue = null, getTotal = false) => {
    const ratio = ratioGMVForeCast()
    if (ratio < 0) {
        return { error: true, message: 'INVALID HOUR', expectedData: [], totalGMV: 0 }
    }

    const FETCH_SUPPLY = getRealtimeClient(ctx, {})
    const FETCH_ORDER = getProductClient(ctx, {})
    const FETCH_ACCOUNT = getAccountClient(ctx, {})
    const nowFormatted = yyyymmdd(new Date())

    const params = {
        dayStr: nowFormatted,
        locationCodeIn: convertParameter(location),
        ratio: ratio,
        sku: skuCode,
        categoryInChargeAccountID: cicValue,
        categoryManagement: picID 
    }
    const offset = limit * page
    const { data: dataGMV = [], total: totalGMV = 0 } = await FETCH_SUPPLY.getGMVFluctuation({
        q: JSON.stringify(params, (_, value) => {
            if (value) return value
        }),
        getTotal: getTotal,
        offset,
        limit,
        sort
    })
    const productIDs = []
    const accIDs = []
    dataGMV.forEach(item => {
        productIDs.push(item.productID),
            accIDs.push(item.categoryInChargeAccountID)
    })

    const { data: skuList = [] } = await FETCH_ORDER.getProductList({ ids: productIDs.filter(item => !!item) || [] })
    const { data: accList = [] } = await FETCH_ACCOUNT.getListAccountByIds(accIDs.filter(item => !!item) || [])

    const skuListsByID = skuList.reduce((prev, currentSku) => {
        return { ...prev, [currentSku?.productID]: currentSku }
    }, {})
    const accListByAccId = accList.reduce((prev, current) => {
        return { ...prev, [current?.accountId]: current }
    }, {})

    // data when combine fmv & account & sku
    const expectedData = dataGMV.map(item => ({
        ...item,
        ...skuListsByID?.[item?.productID],
        ...accListByAccId?.[item?.categoryInChargeAccountID]
    }))

    return { error: false, expectedData, totalGMV, message: '' }
}

const SyncComp = memo((props) => {
    const { t, location, page, limit, sku, sortState, loadingCli = false, cicValue, picID, setGmvInfo, rows = null } = props
    const [timeSync, setTimeSync] = useState(TIME_TO_ASYNC)

    useEffect(() => {
        setTimeSync(TIME_TO_ASYNC) // reset time sync
        const interval = setInterval(() => {
            setTimeSync((prevTime) => {
                if (loadingCli) return prevTime

                if (prevTime < 1) {
                    // shallow fetch realtime
                    (async () => {
                        const res = await fetchData(
                            undefined,
                            page,
                            limit,
                            sortState,
                            location,
                            sku?.value,
                            picID,
                            cicValue,
                            !rows
                        )
                        setGmvInfo(res)
                    })()
                    return TIME_TO_ASYNC
                }

                return prevTime - 1
            })
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [location, page, limit, sku?.value, sortState, cicValue, picID, loadingCli])

    return (
        props.showCountdown && <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginBottom: "15px" }}>
            <Box style={{ display: "flex", alignItems: "center", gap: '8px' }}>
                <WatchLaterRoundedIcon fontSize="small" htmlColor='#219653' />
                <Typography className={styles.asyncSignal}>{`Đồng bộ sau: ${timeSync} s`}</Typography>
            </Box>
        </Box>
    )
})

const GMVTable = (props) => {
    const {
        rows = null,
        page = 0,
        limit = LIMIT_PER_PAGE,
        location = "",
        sku = "",
        sort = SORT_OPTIONS.PERCENT.DESC,
        pic = "",
        cic = "",
        showCountdown = false,
    } = props
    const { t } = useTranslation()

    const [gmvInfo, setGmvInfo] = useState({})
    const [sortState, setSortState] = useState(sort)
    const [loadingCli, setLoadingCli] = useState(false)
    const [pageRoute, setPageRoute] = useState(page)
    const [limitRoute, setLimitRoute] = useState(rows || limit)
    const oldSortState = useRef(sortState)

    const { value: cicValue = null } = cic
    const { value: picID = null } = pic

    useEffect(() => {
        let isAvailable = true
            ; (async () => {
                setLoadingCli(true)
                const res = await fetchData(
                    undefined,
                    pageRoute,
                    limitRoute,
                    sortState,
                    location,
                    sku?.value,
                    picID,
                    cicValue,
                    !rows
                )
                setLoadingCli(false)
                if (isAvailable) {
                    setGmvInfo(res)
                }
            })()

        oldSortState.current = sortState

        return () => {
            isAvailable = false // mark refreshing data  was staled -> can't be updated
        }

    }, [location, pageRoute, limitRoute, sku?.value, sortState, cicValue, picID])

    if (gmvInfo?.error) {
        return <Box>{gmvInfo?.message}</Box>
    }
    return (
        <>
            <SyncComp
                t={t}
                location={location}
                page={pageRoute}
                limit={limitRoute}
                sku={sku}
                sortState={sortState}
                cicValue={cicValue}
                picID={picID}
                loadingCli={loadingCli}
                setLoadingCli={setLoadingCli}
                setGmvInfo={setGmvInfo}
                rows={rows}
                showCountdown={showCountdown}
            />
            {loadingCli && <Loader show={true} />}
            <TableContainer style={{ overflow: 'hidden' }} component={Paper} >
                <Table size="small">
                    <TableHead classes={{ root: styles.headTable }}>
                        <TableRow>
                            <TableCell
                                variant="head"
                                align="left"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                                width="150px"
                            >
                                {t('realtime:seller_location')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="left"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.product')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="center"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.category')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="center"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.manager')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="right"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.order_quantity')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="right"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.sum_item_quantity')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="right"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.current_gmv')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="right"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.forecast_gmv')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="right"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.average_gmv_7days')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="right"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                {t('realtime:gmv_table.head.average_gmv_14days')}
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="right"
                                classes={{
                                    root: styles.rightBorder,
                                    head: styles.textHead
                                }}
                            >
                                <Box style={{ display: 'flex', gap: '7px', alignItems: 'center', justifyContent: "flex-end" }}>
                                    <Box> {t('realtime:gmv_table.head.diff_fluctuation_amount_14days')}</Box>
                                    <Box>
                                        {sortState === SORT_OPTIONS.AMOUNT.ASC &&
                                            <FontAwesomeIcon
                                                icon={faChevronUp}
                                                style={{ cursor: 'pointer', color: "#00B46E" }}
                                                onClick={() => { setSortState(SORT_OPTIONS.AMOUNT.DESC) }}
                                            />
                                        }
                                        {sortState === SORT_OPTIONS.AMOUNT.DESC &&
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{ cursor: 'pointer', color: "#00B46E" }}
                                                onClick={() => { setSortState(SORT_OPTIONS.AMOUNT.ASC) }}
                                            />}
                                        {sortState !== SORT_OPTIONS.AMOUNT.DESC && sortState !== SORT_OPTIONS.AMOUNT.ASC &&
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => { setSortState(SORT_OPTIONS.AMOUNT.ASC) }}
                                            />}
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell
                                variant="head"
                                align="right"
                                classes={{
                                    head: styles.textHead
                                }}
                            >
                                <Box style={{ display: 'flex', gap: '7px', alignItems: 'center', justifyContent: "flex-end" }}>
                                    <Box> {t('realtime:gmv_table.head.diff_fluctuation_percent_14days')}</Box>
                                    <Box>
                                        {sortState === SORT_OPTIONS.PERCENT.ASC &&
                                            <FontAwesomeIcon
                                                icon={faChevronUp}
                                                style={{ cursor: 'pointer', color: "#00B46E" }}
                                                onClick={() => { setSortState(SORT_OPTIONS.PERCENT.DESC) }}
                                            />
                                        }
                                        {sortState === SORT_OPTIONS.PERCENT.DESC &&
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{ cursor: 'pointer', color: "#00B46E" }}
                                                onClick={() => { setSortState(SORT_OPTIONS.PERCENT.ASC) }}
                                            />}
                                        {sortState !== SORT_OPTIONS.PERCENT.DESC && sortState !== SORT_OPTIONS.PERCENT.ASC &&
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => { setSortState(SORT_OPTIONS.PERCENT.ASC) }}
                                            />}
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(!gmvInfo?.expectedData || gmvInfo?.expectedData?.length <= 0) && <TableRow><TableCell colSpan="100%">  {t('common:not_found')}</TableCell></TableRow>}
                        {gmvInfo?.expectedData && gmvInfo?.expectedData?.length > 0
                            && gmvInfo?.expectedData?.map((recordGMV, index) => {
                                const order = (index + 1) + (limit * pageRoute)
                                const {
                                    avg7days = 0,
                                    avg14days = 0,
                                    todayItemQuantity = 0,
                                    todayOrderQuantity = 0,
                                    todayGMV = 0,
                                    name = "-",
                                    productID = "-",
                                    locationCode = "-",
                                    forecastDiffAmountEndDayByCurrent = 0,
                                    forecastDiffPercentEndDayByCurrent = 0,
                                    categoryManagement = "-",
                                    fullname = "-",
                                    sku = "-",
                                    sellerCode = "-",
                                    itemCode = ""
                                } = recordGMV || {}

                                const forecastAmountEndDay = calForeCastGMV(todayGMV)

                                return (
                                    <TableRow key={order}>
                                        <TableCell align="left" className={styles.rightBorder} >
                                            <span>{sellerCode || "-"}</span> <br />
                                            <span style={{ fontStyle: 'italic' }}>{REGION_LIST[locationCode]?.label}</span>
                                        </TableCell>
                                        <TableCell align="left" className={styles.rightBorder} style={{ position: 'relative' }}>
                                            <Link
                                                target="_blank" style={{ color: "#219653" }}
                                                href={`/internal-seller/${sellerCode}/${PURCHASER_CODE?.[locationCode]}/sku/edit?code=${itemCode}`}
                                            >
                                                <a rel="noopener noreferrer" >
                                                    <span>{productID} -</span><span> {name} </span>
                                                </a>
                                            </Link>
                                            <div style={{ position: 'absolute', right: 0, bottom: "-5px" }}>
                                                <Link target="_blank" href={`/report/realtime/gmv/chart?sku=${sku}&locationCode=${locationCode}`}>
                                                    <a>
                                                        <PollRoundedIcon htmlColor="#000000" fontSize="small" />
                                                    </a>
                                                </Link>
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className={styles.rightBorder} >{`${categoryManagement || " - "}`}</TableCell>
                                        <TableCell align="center" className={styles.rightBorder} >{`${fullname || " - "}`}</TableCell>
                                        <TableCell align="right" className={styles.rightBorder} >{formatNumber(parseInt(todayOrderQuantity) ?? "-")}</TableCell>
                                        <TableCell align="right" className={styles.rightBorder} >{formatNumber(parseInt(todayItemQuantity) ?? "-")}</TableCell>
                                        <TableCell align="right" className={styles.rightBorder} >{formatNumber(parseInt(todayGMV) ?? "-")}</TableCell>
                                        <TableCell align="right" className={styles.rightBorder} >{formatNumber(parseInt(forecastAmountEndDay) ?? "-")}</TableCell>
                                        <TableCell align="right" className={styles.rightBorder} >{formatNumber(parseInt(avg7days) ?? "-")}</TableCell>
                                        <TableCell align="right" className={styles.rightBorder} >{formatNumber(parseInt(avg14days) ?? "-")}</TableCell>
                                        <TableCell align="right" className={styles.rightBorder} >
                                            <Box style={{ display: 'flex', alignItems: "center", justifyContent: 'flex-end' }}>
                                                <span style={{ color: Math.abs(forecastDiffAmountEndDayByCurrent) > MarkFluctuation.amountGMV ? "#FF0000" : "unset" }} >
                                                    {formatNumber(parseInt(forecastDiffAmountEndDayByCurrent) ?? " - ")}
                                                </span>
                                            </Box>
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                color: Math.abs(forecastDiffPercentEndDayByCurrent * 100) > MarkFluctuation.percentGMV ? "red" : "unset"
                                            }}
                                            align="right">
                                            {formatNumber(parseInt((forecastDiffPercentEndDayByCurrent * 100)) ?? "-")}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                    {(gmvInfo?.totalGMV > 0 && !rows) && (
                        <MyTablePagination
                            count={gmvInfo?.totalGMV}
                            rowsPerPage={limitRoute}
                            page={pageRoute}
                            onChangePage={(_, newPage, rowsPerPage) => {
                                setPageRoute(newPage)
                                setLimitRoute(rowsPerPage)
                                replaceChangeParameter('page', newPage)
                                replaceChangeParameter('limit', rowsPerPage)
                            }}
                        />)
                    }

                </Table>
            </TableContainer>
        </>
    )
}

export default GMVTable
