import { Box, Grid, Paper } from '@material-ui/core';
import { formatNumber } from 'components/utils';
import { CommonChart } from 'containers/common/chart';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function GMVChart({
    data = [],
    span = 'DAY',
    t = function (str) {
        return str;
    },
    forecastGMV = null
}) {
    const renderLines = [
        {
            name: t('realtime:current_gmv'),
            valueField: 'value',
            color: '#FFA1D0',
            scaleName: ''
        }
    ];
    const [maxValue, setMaxValue] = useState(-1);

    useEffect(() => {
        let max = 0;
        const gmvList = data?.map((item) => item?.value || 0) || [];

        max = Math.max(...gmvList, forecastGMV?.forecastAmountGMV || 0);
        setMaxValue(max);
    }, [data, forecastGMV]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <span style={{ color: '#BEBDBD' }}>
                    {t('realtime:value')} (VNĐ)
                </span>
            </Grid>
            <Grid item xs={12}>
                <CommonChart
                    key={uuidv4()}
                    data={data}
                    t={t}
                    span={span}
                    config={{
                        // subAxis: {
                        //     ratio:  1,
                        //     max: 1
                        // },
                        maxValue,
                        hideTooltip: true,
                        scatter: [
                            {
                                name: 'Forecast GMV',
                                valueField: 'forecastAmountGMV',
                                color: '#FF0000'
                            }
                        ],
                        lines: renderLines,
                        tooltipContent: ({
                            pointData,
                            span = 'DAY',
                            t = (str) => str
                        }) => {
                            if (pointData?.forecastAmountGMV) {
                                return (
                                    <Grid item xs={3}>
                                        <Paper
                                            style={{
                                                padding: '14px 8px',
                                                width: 284
                                            }}
                                        >
                                            <p
                                                style={{
                                                    padding: 0,
                                                    margin: 0
                                                }}
                                            >
                                                {t('realtime:update_change')}{' '}
                                                {pointData?.label}
                                            </p>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    marginTop: 5
                                                }}
                                            >
                                                <span>
                                                    {t('realtime:diff_value')}:
                                                </span>
                                                <b
                                                    style={{
                                                        color: '#FF0000',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {formatNumber(
                                                        Math.floor(
                                                            forecastGMV?.forecastDiffAmountEndDayByCurrent ||
                                                                0
                                                        )
                                                    )}
                                                </b>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    marginTop: 5
                                                }}
                                            >
                                                <span>
                                                    % {t('realtime:diff')}:
                                                </span>
                                                <b>
                                                    {formatNumber(
                                                        (
                                                            forecastGMV?.forecastDiffPercentEndDayByCurrent *
                                                            100
                                                        )?.toFixed(2)
                                                    ) || 0}
                                                    %
                                                </b>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    marginTop: 5
                                                }}
                                            >
                                                <span>GMV forecast:</span>
                                                <b>
                                                    {' '}
                                                    {formatNumber(
                                                        Math.floor(
                                                            forecastGMV?.forecastAmountGMV
                                                        ) || 0
                                                    )}
                                                </b>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    marginTop: 5
                                                }}
                                            >
                                                <span>
                                                    {t('realtime:today_gmv')}:
                                                </span>
                                                <b>
                                                    {formatNumber(
                                                        forecastGMV?.todayGMV ||
                                                            0
                                                    )}
                                                </b>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                );
                            }

                            return (
                                <Paper
                                    style={{ padding: '14px 8px', width: 284 }}
                                >
                                    <p style={{ padding: 0, margin: 0 }}>
                                        {t('realtime:update_change')}{' '}
                                        {pointData?.label}
                                    </p>
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
                                                pointData?.diffAmountAVG14 || 0
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
                                                pointData?.diffPercentAVG14?.toFixed(
                                                    2
                                                ) || 0
                                            )}
                                            %
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
                                        <span>
                                            {t('realtime:date_gmv')}{' '}
                                            {pointData?.label}:
                                        </span>
                                        <b>{formatNumber(pointData?.value)}</b>
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
