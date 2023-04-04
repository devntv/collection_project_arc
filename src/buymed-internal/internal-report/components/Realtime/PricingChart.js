import { Box, Grid, Paper } from '@material-ui/core';
import { formatNumber } from 'components/utils';
import { CommonChart } from 'containers/common/chart';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function PricingChart({
    data = [],
    span = 'DAY',
    t = function (str) {
        return str;
    }
}) {
    const linesColor = [
        { name: t('realtime:retail_price'), color: '#1877F2' },
        { name: t('realtime:purchase_price'), color: '#000' },
        { name: t('realtime:current_gmv'), color: '#FFA1D0' },
    ]

    const [subAxis, setSubAxis] = useState(null)
    const [renderLines,setRenderLines] = useState([
        { name: t('realtime:retail_price'), valueField: 'value', color: '#1877F2' },
        { name: t('realtime:purchase_price'), valueField: 'purchasePrice', color: '#000' },
        {
            name: t('realtime:current_gmv'),
            valueField: 'todayGMV',
            color: '#FFA1D0',
            scaleName: 'todayGMV'
        }
    ]);

    useEffect(() => {
        let max = 0;
        const gmvList = data.map((item) => item?.todayGMV || 0) || [];
        max = Math.max(...gmvList);
        
        setSubAxis({
            max,
            scaleName: 'todayGMV',
            showGrid: false
        })
        // reload filters if no lines are display
        if (renderLines?.every(item => item.color === "rgba(0,0,0,0)")) {
            let newRenderLines = renderLines?.map(line => {
                let newColor = linesColor?.find(item => item?.name === line?.name)?.color

                return {...line, color: newColor}
            })

            setRenderLines(newRenderLines)
        }
    }, [data]);

    return (
        <Grid container>
            <Grid item xs={12} container justifyContent="space-between">
                <span style={{ color: '#BEBDBD' }}>{t('realtime:retail_purchase_price')} (VNĐ)</span>
                <span style={{ paddingRight: '150px', color: '#BEBDBD' }}>
                    {t('realtime:gmv_value')} (VNĐ)
                </span>
            </Grid>
            <Grid item xs={12}>
                <CommonChart
                    key={uuidv4()}
                    data={data}
                    t={t}
                    span={span}
                    config={{
                        linesColor,
                        subScale: {
                            name: 'todayGMV'
                        },
                        subAxis,
                        lines: renderLines,
                        tooltipContent: ({
                            typeItem = '',
                            pointData,
                            span = 'DAY',
                            t = (str) => str
                        }) => {
                            const isGMVLine =
                                typeItem === t('realtime:current_gmv');

                            if (isGMVLine) {
                                return (
                                    <Paper
                                        style={{
                                            padding: '14px 8px',
                                            width: 284
                                        }}
                                    >
                                        <p style={{padding: 0, margin: 0}}>{t('realtime:update_change')} {pointData?.label}</p>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: 5
                                            }}
                                        >
                                            <span>
                                                {t('realtime:date_gmv')}{' '}
                                                {pointData?.label}:
                                            </span>
                                            <b>
                                                {formatNumber(
                                                    pointData?.todayGMV || 0
                                                )}
                                            </b>
                                        </Box>
                                    </Paper>
                                );
                            }

                            return (
                                <Paper
                                    style={{ padding: '14px 8px', width: 284 }}
                                >
                                    <p style={{padding: 0, margin: 0}}>{t('realtime:update_change')} {pointData?.label}</p>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginTop: 5
                                        }}
                                    >
                                        <span>{t('realtime:purchase_price')}:</span>
                                        <b>
                                            {formatNumber(
                                                pointData?.purchasePrice || 0
                                            )}
                                        </b>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginTop: 5
                                        }}
                                    >
                                        <span>{t('realtime:retail_price')}:</span>
                                        <b>{formatNumber(pointData?.value)}</b>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginTop: 5
                                        }}
                                    >
                                        <span>{t('realtime:diff_value')}:</span>
                                        <b
                                            style={{
                                                color: '#FF0000',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {formatNumber(
                                                Math.floor(pointData?.diffAmountAVG14 || 0)
                                            )}
                                        </b>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginTop: 5
                                        }}
                                    >
                                        <span>% {t('realtime:diff')}:</span>
                                        <b>
                                            {formatNumber(
                                                pointData?.diffPercentAVG14?.toFixed(2) || 0
                                            )}
                                            %
                                        </b>
                                    </Box>
                                </Paper>
                            );
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
}
