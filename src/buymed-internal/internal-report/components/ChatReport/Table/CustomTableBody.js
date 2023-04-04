import { TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageStatus from "../../MessageStatus/MessageStatus";
import { CONVERSATION_STATUS } from "../../../constants/chat";

const useStyles = makeStyles({
	root: {
		"& .MuiTableRow-root:nth-child(even)": {
			backgroundColor: "#f3ffee",
		},
	},
});

const CustomTableBody = ({
	stableSort,
	getComparator,
	emptyRows,
	rows,
	order,
	orderBy,
	page,
	rowsPerPage,
}) => {
	const classes = useStyles();
	return (
		<TableBody className={classes.root}>
			{stableSort(rows, getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((row, index) => {
					const labelId = `enhanced-table-checkbox-${index}`;
					return (
						<TableRow hover key={row.id}>
							<TableCell component="td" id={labelId} scope="row">
								{row.id}
							</TableCell>
							<TableCell align={"left"}>
								<a
									href={``}
									style={{
										textDecoration: "underline",
										color: "#161FF4",
									}}
									target="_blank"
									onClick={(e) => e.stopPropagation()}
								>
									{row.customer}
								</a>
							</TableCell>
							<TableCell align={"left"}>{row.region}</TableCell>
							<TableCell align={"left"}>
								<a
									href={``}
									style={{
										textDecoration: "underline",
										color: "#161FF4",
									}}
									target="_blank"
									onClick={(e) => e.stopPropagation()}
								>
									{row.cs}
								</a>
							</TableCell>
							<TableCell align={"left"}>{row.createdTime}</TableCell>
							<TableCell align={"left"}>{row.updatedTime}</TableCell>
							<TableCell align={"center"}>
								<MessageStatus status={CONVERSATION_STATUS.WAIT_TO_PROCESS} />
							</TableCell>
						</TableRow>
					);
				})}
			{emptyRows > 0 && (
				<TableRow
					style={{
						height: 33 * emptyRows,
					}}
				>
					<TableCell colSpan={6} />
				</TableRow>
			)}
		</TableBody>
	);
};

export default CustomTableBody;
