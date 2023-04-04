import React, { useEffect, useRef, useState } from "react";
import {
	XAxis,
	YAxis,
	Bar,
	ResponsiveContainer,
	Label,
	Tooltip,
	Line,
	CartesianGrid,
	Legend,
	ComposedChart,
} from "recharts";
import { completedTimeLabel, dateLabel, numberByDateLabel, waitTimeLabel } from "constants/chat";
import { Box } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";

export function firstDigit(x) {
	let y = 1;
	while (x > 9) {
		x /= 10;
		y *= 10;
	}
	return Math.ceil(x) * y;
}

function LineBarChartCustom({ data, leftLabel, rightLabel }) {
	const { t } = useTranslation();
	const [showWaitTime, setShowWaitTime] = useState(true);
	const [showCompleted, setShowCompleted] = useState(true);
	const [showCountDate, setShowCountDate] = useState(true);
	const maxValueTime = useRef(0);
	const maxValueCount = useRef(0);

	const handleLegendClick = (value) => {
		if (value.value == numberByDateLabel) {
			setShowCountDate(!showCountDate);
		} else if (value.value == waitTimeLabel) {
			setShowWaitTime(!showWaitTime);
		} else if (value.value == completedTimeLabel) {
			setShowCompleted(!showCompleted);
		}
	};

	useEffect(() => {
		maxValueTime.current = 0;
		maxValueCount.current = 0;
		for (let i of data) {
			if (
				i[waitTimeLabel] > i[completedTimeLabel] &&
				i[waitTimeLabel] > maxValueTime.current
			) {
				maxValueTime.current = i[waitTimeLabel];
			} else if (
				i[completedTimeLabel] > i[waitTimeLabel] &&
				i[completedTimeLabel] > maxValueTime.current
			) {
				maxValueTime.current = i[completedTimeLabel];
			}
			if (i[numberByDateLabel] > maxValueCount.current) {
				maxValueCount.current = i[numberByDateLabel];
			}
		}
	}, [data]);
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "nowrap",
				"& > div > div > svg": {
					overflow: "visible",
				},
				padding: "30px 0",
				"& > div > div > svg > g > text": {
					transform: "translateY(-25px)",
				},
				marginTop: "20px",
			}}
		>
			<ResponsiveContainer width={"100%"} height={500}>
				<ComposedChart
					height={300}
					data={data}
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis dataKey={t(dateLabel)} minTickGap={0} tick={{ fontSize: "11px" }} />
					<YAxis
						yAxisId="left"
						label={{ value: t(leftLabel), angle: 0, position: "insideTopLeft" }}
						name="abc"
						domain={[0, firstDigit(maxValueCount.current)]}
						tickCount={6}
					/>
					<YAxis
						yAxisId="right"
						lang="en"
						label={{
							value: t(rightLabel),
							angle: 0,
							position: "insideTopRight",
						}}
						name="xyz"
						orientation="right"
						domain={[0, firstDigit(maxValueTime.current)]}
						tickCount={6}
					/>
					<Tooltip
						labelFormatter={(label) => {
							return (
								<span style={{ display: "flex" }}>
									<span style={{ flex: 1 }}>{t("common:time.day")}</span>
									<span style={{ fontWeight: "bold" }}>{t(label)}</span>
								</span>
							);
						}}
						cursor={false}
						isAnimationActive={false}
						itemStyle={{
							color: "black",
							display: "flex",
							justifyContent: "space-between",
							fontWeight: "bold",
							width: "100%",
						}}
						separator=""
						wrapperStyle={{
							width: "300px",
							boxShadow:
								"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
						}}
					/>
					<Legend wrapperStyle={{ cursor: "pointer" }} onClick={handleLegendClick} />
					<Bar
						isAnimationActive={false}
						hide={!showCountDate}
						yAxisId="left"
						maxBarSize={40}
						dataKey={numberByDateLabel}
						name={t(numberByDateLabel)}
						fill="#B5E6CF"
						minPointSize={2}
					></Bar>
					<Line
						isAnimationActive={false}
						hide={!showWaitTime}
						dot={false}
						yAxisId="right"
						type="basic"
						dataKey={waitTimeLabel}
						name={t(waitTimeLabel)}
						strokeWidth={3}
						stroke="#1A73B8"
						activeDot={{ r: 0 }}
					/>
					<Line
						isAnimationActive={false}
						hide={!showCompleted}
						dot={false}
						yAxisId="right"
						type="basic"
						dataKey={completedTimeLabel}
						name={t(completedTimeLabel)}
						strokeWidth={3}
						stroke="#15A959"
						activeDot={{ r: 0 }}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</Box>
	);
}

export default LineBarChartCustom;
