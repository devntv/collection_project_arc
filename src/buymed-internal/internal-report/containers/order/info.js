import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { FlexContainer, FlexContent } from "containers/common/flex";
import { Box } from "@material-ui/core";
import { InfoLine } from "../common/info";
import { getAnalyticsClient } from "client/integration-analytics";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { APIStatus } from "lib/common";

export async function getOrderReportData(ctx, data) {
	let client = getAnalyticsClient(ctx, data);
	let startOfWeek = new Date();
	if (startOfWeek.getDay() !== 1) {
		if (startOfWeek.getDay() === 0) {
			startOfWeek.setDate(startOfWeek.getDate() - 6);
		} else {
			startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() - 1));
		}
	}
	let startOfLastWeek = new Date(startOfWeek);
	startOfLastWeek.setDate(startOfWeek.getDate() - 7);
	let endOfLastWeek = new Date(startOfWeek);
	endOfLastWeek.setDate(startOfWeek.getDate() - 1);
	let lastMonth = new Date();
	lastMonth.setDate(-1);
	let thisDay = new Date();
	thisDay.setHours(0, 0, 0, 1);
	let query = {
		lastWeekOrderCount: {
			metric: "ORDER_COUNT",
			span: "DAY",
			from: startOfLastWeek,
			to: endOfLastWeek,
		},
		lastWeekFirstOrderCount: {
			metric: "FIRST_ORDER_COUNT",
			span: "DAY",
			from: startOfLastWeek,
			to: endOfLastWeek,
		},
		lastWeekDiscountedCount: {
			metric: "DISCOUNTED_COUNT",
			span: "DAY",
			from: startOfLastWeek,
			to: endOfLastWeek,
		},
		lastWeekOrderValue: {
			metric: "ORDER_VALUE",
			span: "DAY",
			from: startOfLastWeek,
			to: endOfLastWeek,
		},
		lastWeekDiscountedValue: {
			metric: "DISCOUNTED_VALUE",
			span: "DAY",
			from: startOfLastWeek,
			to: endOfLastWeek,
		},
		thisWeekOrderCount: {
			metric: "ORDER_COUNT",
			span: "DAY",
			from: startOfWeek,
		},
		thisWeekFirstOrderCount: {
			metric: "FIRST_ORDER_COUNT",
			span: "DAY",
			from: startOfWeek,
		},
		thisWeekDiscountedCount: {
			metric: "DISCOUNTED_COUNT",
			span: "DAY",
			from: startOfWeek,
		},
		thisWeekOrderValue: {
			metric: "ORDER_VALUE",
			span: "DAY",
			from: startOfWeek,
		},
		thisWeekDiscountedValue: {
			metric: "DISCOUNTED_VALUE",
			span: "DAY",
			from: startOfWeek,
		},
		thisMonthOrderCount: {
			metric: "ORDER_COUNT",
			span: "MONTH",
			at: thisDay,
		},
		thisMonthFirstOrderCount: {
			metric: "FIRST_ORDER_COUNT",
			span: "MONTH",
			at: thisDay,
		},
		thisMonthDiscountedCount: {
			metric: "DISCOUNTED_COUNT",
			span: "MONTH",
			at: thisDay,
		},
		thisMonthOrderValue: {
			metric: "ORDER_VALUE",
			span: "MONTH",
			at: thisDay,
		},
		thisMonthDiscountedValue: {
			metric: "DISCOUNTED_VALUE",
			span: "MONTH",
			at: thisDay,
		},
		lastMonthOrderCount: {
			metric: "ORDER_COUNT",
			span: "MONTH",
			at: lastMonth,
		},
		lastMonthFirstOrderCount: {
			metric: "FIRST_ORDER_COUNT",
			span: "MONTH",
			at: lastMonth,
		},
		lastMonthDiscountedCount: {
			metric: "DISCOUNTED_COUNT",
			span: "MONTH",
			at: lastMonth,
		},
		lastMonthOrderValue: {
			metric: "ORDER_VALUE",
			span: "MONTH",
			at: lastMonth,
		},
		lastMonthDiscountedValue: {
			metric: "DISCOUNTED_VALUE",
			span: "MONTH",
			at: lastMonth,
		},
	};

	let provinceCode = ctx.query.provinceCode;
	let result;

	if (provinceCode) {
		for (let key in query) {
			query[key].provinceCode = provinceCode;
		}
		result = await client.getAnalyticsProvinceMulti(query);
	} else {
		result = await client.getAnalyticsMulti(query);
	}

	let today = {
			label: "today",
			previousLabel: "compareWithLastWeekday",
		},
		thisWeek = {
			label: "thisWeek",
			previousLabel: "compareWithLastWeek",
		},
		thisMonth = {
			label: "thisMonth",
			previousLabel: "compareWithLastMonth",
		};
	if (result.status !== APIStatus.OK || !result.data || !result.data[0]) {
		return { today, thisWeek, thisMonth };
	}
	let analytics = result.data[0];

	// fill today
	let currentDay = analytics.thisWeekOrderCount.data.length - 1;
	today.orderCount = analytics.thisWeekOrderCount.data[currentDay]?.value || 0;
	today.firstOrderCount = analytics.thisWeekFirstOrderCount.data[currentDay]?.value || 0;
	today.discountedCount = analytics.thisWeekDiscountedCount.data[currentDay]?.value || 0;
	today.orderValue = analytics.thisWeekOrderValue.data[currentDay]?.value || 0;
	today.discountedValue = analytics.thisWeekDiscountedValue.data[currentDay]?.value || 0;

	today.previousOrderCount = analytics.lastWeekOrderCount.data[currentDay]?.value || 0;
	today.previousFirstOrderCount = analytics.lastWeekFirstOrderCount.data[currentDay]?.value || 0;
	today.previousDiscountedCount = analytics.lastWeekDiscountedCount.data[currentDay]?.value || 0;
	today.previousOrderValue = analytics.lastWeekOrderValue.data[currentDay]?.value || 0;
	today.previousDiscountedValue = analytics.lastWeekDiscountedValue.data[currentDay]?.value || 0;

	let sumValue = function (obj) {
		return obj.data.map((item) => item.value).reduce((a, b) => a + b, 0);
	};

	// fill this week
	thisWeek.orderCount = sumValue(analytics.thisWeekOrderCount);
	thisWeek.firstOrderCount = sumValue(analytics.thisWeekFirstOrderCount);
	thisWeek.discountedCount = sumValue(analytics.thisWeekDiscountedCount);
	thisWeek.orderValue = sumValue(analytics.thisWeekOrderValue);
	thisWeek.discountedValue = sumValue(analytics.thisWeekDiscountedValue);

	thisWeek.previousOrderCount = sumValue(analytics.lastWeekOrderCount);
	thisWeek.previousFirstOrderCount = sumValue(analytics.lastWeekFirstOrderCount);
	thisWeek.previousDiscountedCount = sumValue(analytics.lastWeekDiscountedCount);
	thisWeek.previousOrderValue = sumValue(analytics.lastWeekOrderValue);
	thisWeek.previousDiscountedValue = sumValue(analytics.lastWeekDiscountedValue);

	// fill this month
	thisMonth.orderCount = analytics.thisMonthOrderCount.data[0]?.value || 0;
	thisMonth.firstOrderCount = analytics.thisMonthFirstOrderCount.data[0]?.value || 0;
	thisMonth.discountedCount = analytics.thisMonthDiscountedCount.data[0]?.value || 0;
	thisMonth.orderValue = analytics.thisMonthOrderValue.data[0]?.value || 0;
	thisMonth.discountedValue = analytics.thisMonthDiscountedValue.data[0]?.value || 0;

	thisMonth.previousOrderCount = analytics.lastMonthOrderCount.data[0]?.value || 0;
	thisMonth.previousFirstOrderCount = analytics.lastMonthFirstOrderCount.data[0]?.value || 0;
	thisMonth.previousDiscountedCount = analytics.lastMonthDiscountedCount.data[0]?.value || 0;
	thisMonth.previousOrderValue = analytics.lastMonthOrderValue.data[0]?.value || 0;
	thisMonth.previousDiscountedValue = analytics.lastMonthDiscountedValue.data[0]?.value || 0;

	return { today, thisWeek, thisMonth };
}

function StatsPanel({ data }) {
	const { t } = useTranslation();
	let previousLabel = t("analytics:" + data.previousLabel);
	return (
		<MyCard>
			<MyCardHeader title={t("analytics:" + data.label)} small={true} />
			<MyCardContent>
				<InfoLine
					label={t`analytics:order.orderCount`}
					value={data.orderCount}
					previous={data.previousOrderCount}
					previousLabel={previousLabel}
				/>
				<InfoLine
					label={t`analytics:order.firstOrderCount`}
					value={data.firstOrderCount}
					previous={data.previousFirstOrderCount}
					previousLabel={previousLabel}
				/>
				<InfoLine
					label={t`analytics:order.promotedOrderCount`}
					value={data.discountedCount}
					previous={data.previousDiscountedCount}
					previousLabel={previousLabel}
				/>
				<InfoLine
					label={t`analytics:order.totalValue`}
					value={data.orderValue}
					previous={data.previousOrderValue}
					previousLabel={previousLabel}
				/>
			</MyCardContent>
		</MyCard>
	);
}

export function OrderReportInfo({ today, thisWeek, thisMonth }) {
	return (
		<Box>
			<FlexContainer>
				<FlexContent>
					<StatsPanel data={today} />
				</FlexContent>
				<FlexContent>
					<StatsPanel data={thisWeek} />
				</FlexContent>
				<FlexContent>
					<StatsPanel data={thisMonth} />
				</FlexContent>
			</FlexContainer>
		</Box>
	);
}
