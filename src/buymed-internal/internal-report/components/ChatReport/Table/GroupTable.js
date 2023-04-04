import * as React from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { EmployeeInfo } from "@thuocsi/profile";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const useStyles = makeStyles({
	pagination: {
		flexWrap: "nowrap",
	},
});

const hrefCss = `
  a {
    text-decoration: none !important;
  }
`;

const headCells = (t) => [
	[
		{
			name: t("chat:supportEmployee"),
			align: "left",
			data: "sellerAdminName",
		},
		{
			name: t("chat:processing"),
			data: "inProcess",
		},
		{
			name: t("chat:completed"),
			children: 3,
			data: "completed",
		},
		{
			name: t("chat:avgProcessTime"),
			data: "averageWaitTime",
		},
		{
			name: t("chat:avgCompleteTime"),
			data: "averageComplete",
		},
	],
	[
		{
			name: t("chat:title.today"),
			data: "today",
			parent: "completed",
		},
		{
			name: t("chat:title.last7Days"),
			data: "week",
			parent: "completed",
		},
		{
			name: t("chat:title.last30Days"),
			data: "month",
			parent: "completed",
		},
	],
];

export default function GroupTable({
	schema,
	totalCS,
	rowsPerPageOptions,
	data,
	page,
	rowsPerPage,
	lang,
}) {
	const { t } = useTranslation();
	const classes = useStyles();
	const router = useRouter();
	const handleChangePageFunc = (newPage) => {
		const query = router.query || {};
		router.push({
			pathname: "",
			query: {
				...query,
				page: newPage,
			},
		});
	};

	const handleChangeRowsPerPageFunc = (event) => {
		const query = router.query || {};
		router.push({
			pathname: "",
			query: {
				...query,
				page: 1,
				limit: event.target.value || 20,
			},
		});
	};

	const renderDataTable = (cells, item) => {
		return Array.apply(null, Array(schema.numColumn)).map((item2, index) => {
			if (index === 0) {
				return (
					<TableCell
						style={{
							border: "1px solid #ccc",
							padding: "5px 16px",
							fontSize: "16px",
						}}
						width={schema.columns[index].width || 150}
						key={schema.columns[index].data}
						align={schema.columns[index].align || "center"}
					>
						<EmployeeInfo
							accountID={item["customerSupportID"] || item["sellerAdminID"]}
							language={lang}
						>
							<span style={{ color: "#00b46e", textDecoration: "none" }}>
								{item[schema.columns[index].data]}
							</span>
						</EmployeeInfo>
					</TableCell>
				);
			} else {
				return (
					<TableCell
						style={{
							border: "1px solid #ccc",
							padding: "5px 16px",
							fontSize: "16px",
						}}
						width={schema.columns[index].width || 150}
						key={schema.columns[index].data}
						align={schema.columns[index].align || "center"}
					>
						{item[schema.columns[index].data]}
					</TableCell>
				);
			}
		});
	};

	return (
		<Box sx={{ width: "100%" }}>
			<style>{hrefCss}</style>
			<TableContainer>
				<Table aria-label="sticky table">
					<TableHead style={{ backgroundColor: "#E9E9E9", textTransform: "uppercase" }}>
						{Array.apply(null, Array(headCells(t).length)).map((cell, cellIndex) => (
							<TableRow key={cellIndex}>
								{headCells(t)[cellIndex].map((item, index) => (
									<TableCell
										style={{
											border: "1px solid #ccc",
											fontWeight: "bold",
											padding: "5px 16px",
											fontSize: "16px",
										}}
										key={index}
										rowSpan={item.children ? 1 : headCells(t).length}
										colSpan={item.children || 1}
										align={item.align || "center"}
									>
										{item.name}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<TableRow
								tabIndex={-1}
								key={index}
								style={{
									backgroundColor: `${index % 2 == 1 ? "" : ""}`,
									padding: "0 14px",
									"& > td:focus, & > th:focus": {
										outline: "solid #00b46e 1px",
										outlineOffset: "-1px",
									},
								}}
							>
								{renderDataTable(headCells(t), item)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				style={{
					position: "relative",
				}}
				rowsPerPageOptions={rowsPerPageOptions}
				component="div"
				count={totalCS || 0}
				rowsPerPage={rowsPerPage}
				page={page - 1}
				ActionsComponent={(props) => {
					return (
						<Pagination
							classes={{
								ul: classes.pagination,
							}}
							count={Math.ceil(props.count / rowsPerPage)}
							sx={{
								"& > ul": {
									flexWrap: "nowrap",
								},
							}}
							page={page}
							onChange={(e, page) => {
								handleChangePageFunc(page);
							}}
						/>
					);
				}}
				onPageChange={handleChangePageFunc}
				onRowsPerPageChange={handleChangeRowsPerPageFunc}
				labelRowsPerPage={t("common:rowsPerPage")}
				labelDisplayedRows={({ from, to, count }) => {
					return (
						<span>
							từ <strong>{from}</strong> đến <strong>{to}</strong> trong{" "}
							<strong>{count}</strong>
						</span>
					);
				}}
			></TablePagination>
		</Box>
	);
}
