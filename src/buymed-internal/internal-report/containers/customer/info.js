import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { FlexContainer, FlexContent } from "containers/common/flex";
import { Box } from "@material-ui/core";
import { InfoLine } from "containers/common/info";
import { getAnalyticsClient } from "client/integration-analytics";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { APIStatus } from "lib/common";

export async function getCustomerReportData(ctx, data) {
	let client = getAnalyticsClient(ctx, data);
	let startOfWeek = new Date();
	if (startOfWeek.getDay() != 1) {
		if (startOfWeek.getDay() == 0) {
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
	let query = {
		lastWeekRegistration: {
			metric: "CUSTOMER_REGISTRATION",
			span: "DAY",
			from: startOfLastWeek,
			to: endOfLastWeek,
		},
		lastWeekActivation: {
			metric: "CUSTOMER_ACTIVATION",
			span: "DAY",
			from: startOfLastWeek,
			to: endOfLastWeek,
		},
		lastWeekPlaceOrder: {
			metric: "PLACE_ORDER_CUSTOMER",
			span: "DAY",
			from: startOfLastWeek,
			to: endOfLastWeek,
		},
		thisWeekRegistration: {
			metric: "CUSTOMER_REGISTRATION",
			span: "DAY",
			from: startOfWeek,
		},
		thisWeekActivation: {
			metric: "CUSTOMER_ACTIVATION",
			span: "DAY",
			from: startOfWeek,
		},
		thisWeekActiveAccount: {
			metric: "ACTIVE_ACCOUNT",
			span: "DAY",
			from: startOfWeek,
		},
		thisWeekPlaceOrder: {
			metric: "PLACE_ORDER_CUSTOMER",
			span: "DAY",
			from: startOfWeek,
		},
		thisMonthRegistration: {
			metric: "CUSTOMER_REGISTRATION",
			span: "MONTH",
			at: new Date(),
		},
		thisMonthActivation: {
			metric: "CUSTOMER_ACTIVATION",
			span: "MONTH",
			at: new Date(),
		},
		thisMonthActiveAccount: {
			metric: "ACTIVE_ACCOUNT",
			span: "MONTH",
			at: new Date(),
		},
		thisMonthPlaceOrder: {
			metric: "PLACE_ORDER_CUSTOMER",
			span: "MONTH",
			at: new Date(),
		},
		lastMonthRegistration: {
			metric: "CUSTOMER_REGISTRATION",
			span: "MONTH",
			at: lastMonth,
		},
		lastMonthActivation: {
			metric: "CUSTOMER_ACTIVATION",
			span: "MONTH",
			at: lastMonth,
		},
		lastMonthPlaceOrder: {
			metric: "PLACE_ORDER_CUSTOMER",
			span: "MONTH",
			at: lastMonth,
		},
	};

	let result = await client.getAnalyticsMulti(query);

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
	let currentDay = analytics.thisWeekRegistration.data.length - 1;
	today.registration = analytics.thisWeekRegistration.data[currentDay].value || 0;
	today.activation = analytics.thisWeekActivation.data[currentDay].value || 0;
	today.activeAccount = analytics.thisWeekActiveAccount.data[currentDay].value || 0;
	today.placeOrder = analytics.thisWeekPlaceOrder.data[currentDay].value || 0;
	today.previousRegistration = analytics.lastWeekRegistration.data[currentDay].value || 0;
	today.previousActivation = analytics.lastWeekActivation.data[currentDay].value || 0;
	today.previousActiveAccount = -1;
	today.previousPlaceOrder = analytics.lastWeekPlaceOrder.data[currentDay].value || 0;

	let sumValue = function (obj) {
		return obj.data.map((item) => item.value).reduce((a, b) => a + b, 0);
	};

	// fill this week
	thisWeek.registration = sumValue(analytics.thisWeekRegistration) || 0;
	thisWeek.activation = sumValue(analytics.thisWeekActivation) || 0;
	thisWeek.activeAccount = sumValue(analytics.thisWeekActiveAccount) || 0;
	thisWeek.placeOrder = sumValue(analytics.thisWeekPlaceOrder) || 0;
	thisWeek.previousRegistration = sumValue(analytics.lastWeekRegistration) || 0;
	thisWeek.previousActivation = sumValue(analytics.lastWeekActivation) || 0;
	thisWeek.previousActiveAccount = -1;
	thisWeek.previousPlaceOrder = sumValue(analytics.lastWeekPlaceOrder) || 0;

	// fill this month
	thisMonth.registration = analytics.thisMonthRegistration.data[0].value || 0;
	thisMonth.activation = analytics.thisMonthActivation.data[0].value || 0;
	thisMonth.activeAccount = analytics.thisMonthActiveAccount.data[0].value || 0;
	thisMonth.placeOrder = analytics.thisMonthPlaceOrder.data[0].value || 0;
	thisMonth.previousRegistration = analytics.lastMonthRegistration.data[0].value || 0;
	thisMonth.previousActivation = analytics.lastMonthActivation.data[0].value || 0;
	thisMonth.previousActiveAccount = -1;
	thisMonth.previousPlaceOrder = analytics.lastMonthPlaceOrder.data[0].value || 0;

	return { today, thisWeek, thisMonth };
}

// display statistic panel
function StatsPanel({ data }) {
	const { t } = useTranslation();
	let previousLabel = t("analytics:" + data.previousLabel);
	return (
		<MyCard>
			<MyCardHeader title={t("analytics:" + data.label)} small={true} />
			<MyCardContent>
				<InfoLine
					label={t`analytics:customer.newRegistration`}
					value={data.registration || 0}
					previous={data.previousRegistration || 0}
					previousLabel={previousLabel}
				/>
				<InfoLine
					label={t`analytics:customer.newActivation`}
					value={data.activation || 0}
					previous={data.previousActivation || 0}
					previousLabel={previousLabel}
				/>
				<InfoLine
					label={t`analytics:customer.loginCount`}
					value={data.activeAccount || 0}
					previous={data.previousActiveAccount || 0}
					previousLabel={previousLabel}
				/>
				<InfoLine
					label={t`analytics:customer.orderedCount`}
					value={data.placeOrder || 0}
					previous={data.previousPlaceOrder || 0}
					previousLabel={previousLabel}
				/>
			</MyCardContent>
		</MyCard>
	);
}

// export main component
export function CustomerReportInfo({ today, thisWeek, thisMonth }) {
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
