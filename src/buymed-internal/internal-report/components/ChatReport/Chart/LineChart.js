import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Line, CartesianGrid } from 'recharts';
import { Box } from '@material-ui/core';

const dateLabelDefault = "Ngày"
const ratingLabelDefault = "Rating TB khách đánh giá"
const ratingCountLabelDefault = "SL hội thoại được khách hàng đánh giá"


const CustomTooltip = ({ active, payload, label, dateLabel=dateLabelDefault, ratingCountLabel=ratingLabelDefault, ratingLabel=ratingCountLabelDefault}) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{padding: "10px", backgroundColor: "#fff", zIndex: 999999}}>
          <p className="label"><span style={{display: "flex"}}><span style={{flex: 1}}>{dateLabel}</span><span style={{fontWeight: "bold"}}>{label}</span></span></p>
          <p className="intro"><span style={{display: "flex"}}><span style={{flex: 1}}>{ratingLabel}</span><span style={{fontWeight: "bold"}}>{payload[0].payload?.value}*</span></span></p>
          <p className="desc"><span style={{display: "flex"}}><span style={{flex: 1}}>{ratingCountLabel}</span><span style={{fontWeight: "bold"}}>{payload[0].payload?.count}</span></span></p>
        </div>
      );
    }
  
    return null;
  };

function LineChartCustom({data, label, dateLabel, ratingCountLabel, ratingLabel }) {

  return (
      <Box
          sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              "& > div > div > svg": {
                  overflow: "visible"
              },
              padding: "30px 0",
              "& > div > div > svg > g > text": {
                transform: "translateY(-25px)"
              }
          }}

      >
          <Grid item
              sx={{
                  transform: "rotate(180deg)",
                  alignSelf: "flex-start",
                  textAlign: "right",
                  writingMode: "vertical-rl",

              }}
          >
              <Typography
                  fontWeight={500}
                  style={{
                      width: "max-content",
                      textAlign: "right"
                  }}
              >
              </Typography>
          </Grid>
          <ResponsiveContainer width={"100%"} height={500}>
              <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                      top: 0,
                      right: 10,
                      left: 0,
                      bottom: 0,
                  }}
              >
                  <CartesianGrid vertical={false} strokeDasharray="5 0" />
                  <XAxis dataKey="name" minTickGap={0} tick={{fontSize: "11px"}} />
                  <YAxis type="number" yAxisId="left" label={{ value: label, angle: 0, position: "insideTopLeft" }} domain={[0,5]} tickCount={6} />
                  <Tooltip content={<CustomTooltip  dateLabel={dateLabel} ratingLabel={ratingLabel} ratingCountLabel={ratingCountLabel} />}  labelFormatter={(label)=>{return (<span style={{display: "flex"}}><span style={{flex: 1}}>Ngày</span><span style={{fontWeight: "bold"}}>{label}</span></span>)}} cursor={false} isAnimationActive={false} itemStyle={{color: "black", display: "flex", justifyContent: "space-between", fontWeight: "bold", }} separator="" wrapperStyle={{width: "300px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"}} />
                  <Line isAnimationActive={false} yAxisId="left"  dot={false} type="basic" dataKey="value" strokeWidth={3} stroke="#EB8207" activeDot={{ r: 0 }} />
              </LineChart>
          </ResponsiveContainer>

      </Box>
  )
}

export default LineChartCustom