import * as React from "react";
import { styled } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";

export default function SummaryTable({
	data = {},
	label,
	completedTimeLabel,
	numberByDateLabel,
	ratingLabel,
	waitTimeLabel,
}) {
	const { t } = useTranslation();
	return (
		<TableContainer component={Paper}>
			<Box
				sx={{
					bgcolor: "#1A73B8",
					color: "white",
					padding: "7px 14px",
					fontWeight: 600,
				}}
			>
				<Box>
					<Box>{label}</Box>
				</Box>
			</Box>
			<Box sx={{ padding: "1rem" }}>
				<Box
					sx={{
						padding: "3px 8px",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Box sx={{ fontWeight: "400", fontSize: "14px", color: "#676565" }}>
						{t(numberByDateLabel)}
					</Box>
					<Box sx={{ fontWeight: 600 }} align="right">
						{data[numberByDateLabel] || 0}
					</Box>
				</Box>
				<Box
					sx={{
						padding: "3px 8px",
						display: "flex",
						justifyContent: "space-between",
						bgcolor: "#D9D9D9",
					}}
				>
					<Box sx={{ fontWeight: "400", fontSize: "14px", color: "#676565" }}>
						{t(waitTimeLabel)}
					</Box>
					<Box sx={{ fontWeight: 600 }} align="right">
						{data[waitTimeLabel] || 0}
					</Box>
				</Box>
				<Box
					sx={{
						padding: "3px 8px",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Box sx={{ fontWeight: "400", fontSize: "14px", color: "#676565" }}>
						{t(completedTimeLabel)}
					</Box>
					<Box sx={{ fontWeight: 600 }} align="right">
						{data[completedTimeLabel] || 0}
					</Box>
				</Box>
				<Box
					sx={{
						padding: "3px 8px",
						display: "flex",
						justifyContent: "space-between",
						bgcolor: "#D9D9D9",
					}}
				>
					<Box sx={{ fontWeight: "400", fontSize: "14px", color: "#676565" }}>
						{t(ratingLabel)}
					</Box>
					<Box sx={{ fontWeight: 600 }} align="right">
						{data[ratingLabel] || 0}*
					</Box>
				</Box>
			</Box>
		</TableContainer>
	);
}
