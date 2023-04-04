import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { DateRangePickerInput } from "../DatePicker";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CustomAutoComplete from "../Element/CustomAutoComplete";
import Button from "@material-ui/core/Button";
import { getDayNow, getNDayFromNow, newDateWithLocation } from "../../utilities/datetime";
import { makeStyles } from "@material-ui/core/styles";
import ListBox from "../Element/ListBox";
import { APIStatus } from "../../lib/common";
import { useDebounce } from "../hook/useDebounce/useDebounce";
import { getListCustomerSupport } from "../../services/ChatService";
import LastUpdate, { SCHEDULE_TOPIC } from "./LastUpdate";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const useStyles = makeStyles({
	inputField: {
		height: "40px",
		margin: "5px 0 0px",
		width: "100%",
		background: "white",
	},
	labelField: {
		alignItems: "start",
		"& > span": {
			fontWeight: "600",
		},
		width: "100%",
		margin: 0,
		"& span": {
			whiteSpace: "nowrap",
			maxWidth: "7vw",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	},
	select: {
		padding: 0,
		paddingLeft: "15px",
		lineHeight: "40px",
		backgroundColor: "white",
	},
	button: {
		"&:hover": {
			backgroundImage: "linear-gradient(rgb(0 0 0/10%) 0 0)",
		},
	},
});

export const regions = [
	{
		name: "common:all",
		value: "",
	},
	{
		name: "common:northern",
		value: "MIENBAC",
	},
	{
		name: "common:southern",
		value: "MIENNAM",
	},
];

const ratingEnum = [
	{
		name: "1",
		value: 1,
	},
	{
		name: "2",
		value: 2,
	},
	{
		name: "3",
		value: 3,
	},
	{
		name: "4",
		value: 4,
	},
	{
		name: "5",
		value: 5,
	},
];

const limitEmployee = 20;

const Filter = ({
	exportExcel,
	setPage,
	getListTopic,
	setDataFilter,
	dataQuery,
	setIsSubmit,
	scheduleTopic = SCHEDULE_TOPIC.COUNT_TOPIC_BY_HOUR,
	filterRating,
}) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const defaultDate = { start: getNDayFromNow(6), end: getDayNow() };
	const { handleSubmit, control, setError, setValue, reset, getValues } = useForm();
	const [data, setData] = useState([]);
	const [employeeSelected, setEmployeeSelected] = useState([]);
	const [offsetEmployee, setOffsetEmployee] = useState(20);
	const [isEmployeeLoading, setIsEmployeeLoading] = useState(false);
	const [employeeSearchValue, setEmployeeSearchValue] = useState("");
	const [stopLoading, setStopLoading] = useState(false);
	const [ratings, setRatings] = useState([]);
	const mountedRef = useRef(false);
	const debounceSearchValue = useDebounce(employeeSearchValue);
	const router = useRouter();

	useEffect(() => {
		if (mountedRef.current) {
			getData(0, debounceSearchValue);
		}
		mountedRef.current = true;
	}, [debounceSearchValue]);

	const apply = (submitData) => {
		setIsSubmit(true);
		let dataFetch = {};
		dataFetch.customerRegionCode = submitData.region || "";
		dataFetch.customerSupportIDs =
			submitData.supporter.length > 0 ? submitData.supporter.map((item) => item.id) : [];
		dataFetch.ratings = ratings || [];
		dataFetch.startTime = submitData.createdTime
			? newDateWithLocation(new Date(submitData.createdTime.start), 7)
			: null;
		dataFetch.endTime = submitData.createdTime
			? new Date(
					new Date(submitData.createdTime.end).setDate(
						submitData.createdTime.end.getDate() + 1
					)
			  )
			: null;
		dataFetch.offset = true;
		dataFetch.page = 1;
		getListTopic({ ...dataFetch });
		setDataFilter({ ...dataFetch });
	};

	const onInputChangeFunc = async (e, value) => {
		setStopLoading(false);
		setOffsetEmployee(20);
		setData([]);
		setEmployeeSearchValue(value);
	};

	const handleScrollFunc = async (e) => {
		const listboxNode = e.currentTarget;

		const position = listboxNode.scrollTop + listboxNode.clientHeight;
		if (listboxNode.scrollHeight - position <= 1 && !isEmployeeLoading) {
			getData(offsetEmployee, employeeSearchValue);
			setOffsetEmployee((prev) => prev + 20);
		}
	};

	const refresh = (reset) => {
		reset({
			region: regions[0].value,
			createdTime: defaultDate,
			supporter: [],
			rating: [],
		});
		router.push("?");
	};

	const getCustomerSupportObject = async (id) => {
		let newData = {};
		if (id != -1) {
			const res = await getListCustomerSupport({
				params: {
					q: JSON.stringify({
						accountId: id,
					}),
					limit: 1,
					offset: 0,
				},
			});
			if (res.data?.status === APIStatus.OK) {
				newData.id = id;
				newData.name = res.data?.data[0].fullname;
				return newData;
			}
			return null;
		}
		return {
			id: -1,
			name: t("common:not_found"),
		};
	};

	const getData = async (newOffset, searchContent) => {
		if (stopLoading) {
			return;
		}
		setIsEmployeeLoading(true);
		let employeeData = [];
		const res = await getListCustomerSupport({
			params: {
				q: JSON.stringify({
					search: searchContent,
				}),
				limit: 20,
				offset: newOffset,
				getTotal: true,
			},
		});
		const dataRes = res.data;
		if (dataRes?.status === APIStatus.OK) {
			employeeData.push(...dataRes.data);
			let newData = employeeData.map((item) => {
				let temp = {
					name: item.fullname || item.username,
					id: item.accountId,
				};
				return temp;
			});
			if (newOffset == 0) {
				newData.unshift({ id: -1, name: t("common:not_found") });
			}
			if (newOffset == 0) {
				setData([...newData]);
			} else {
				setData([...data, ...newData]);
			}
		} else {
			setStopLoading(true);
		}
		setIsEmployeeLoading(false);
	};

	useEffect(() => {
		let promises = [];
		dataQuery.customerSupportIDs?.forEach((item) => {
			promises.push(getCustomerSupportObject(item));
		});
		Promise.all(promises).then((res) => {
			res = res.filter((i) => i != null);
			setValue("supporter", res);
			setEmployeeSelected(res);
		});
		setRatings(dataQuery.ratings || []);
		setValue("ratings", dataQuery.ratings || []);
		setValue("region", dataQuery.customerRegionCode || "");
		setValue(
			"createdTime",
			dataQuery.startTime
				? {
						start: new Date(dataQuery.startTime),
						end: new Date(dataQuery.endTime),
				  }
				: {
						start: new Date(defaultDate.start),
						end: new Date(defaultDate.end),
						source: "default",
				  }
		);
	}, [dataQuery]);

	useEffect(() => {
		setValue("ratings", ratings);
	}, [ratings]);

	return (
		<Box component="form" onSubmit={handleSubmit(apply)} style={{ position: "relative" }}>
			{!filterRating ? (
				<Box
					style={{
						display: "flex",
						justifyContent: "flex-end",
						marginBottom: "15px",
					}}
				>
					<LastUpdate topic={scheduleTopic} />
				</Box>
			) : (
				""
			)}
			<Grid
				container
				spacing={2}
				// style={{gap: "16px"}}
			>
				<Grid item xs={12} md={6} lg={3}>
					<Box>
						<InputLabel
							className={classes.labelField}
							htmlFor="region"
							style={{
								color: "black",
								fontWeight: "500",
								fontSize: "16px",
								cursor: "pointer",
							}}
						>
							{t("common:region")}
						</InputLabel>
						<Controller
							name="region"
							control={control}
							defaultValue={regions[0].value}
							render={({ onChange, value, error }) => (
								<>
									<FormControl variant="outlined" className={classes.inputField}>
										<Select
											displayEmpty
											classes={{
												select: classes.select,
											}}
											value={value}
											onChange={onChange}
											inputProps={{
												style: { height: "40px", padding: 0 },
											}}
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											defaultValue={regions[0].value}
											style={{ height: "40px", padding: 0 }}
										>
											{regions.map((item) => (
												<MenuItem key={item.value} value={item.value}>
													{t(item.name)}
												</MenuItem>
											))}
											{filterRating ? (
												<MenuItem value={"NONE"} key={"NONE"}>
													{t("chat:customerType.potential")}
												</MenuItem>
											) : (
												""
											)}
										</Select>
									</FormControl>
								</>
							)}
						></Controller>
					</Box>
				</Grid>
				<Grid item style={{ flex: 1 }}>
					<Box
						style={{
							"& > div > div": {
								"& > div": { height: "100%" },
								height: "40px",
								bgcolor: "white",
							},
						}}
					>
						<InputLabel
							htmlFor="createdTime"
							style={{
								color: "black",
								fontWeight: "500",
								fontSize: "16px",
								marginBottom: "5px",
								cursor: "pointer",
							}}
						>
							{t("common:created_time")}
						</InputLabel>
						<Controller
							name="createdTime"
							control={control}
							defaultValue={defaultDate}
							render={({ onChange, value, error }) => (
								<DateRangePickerInput
									id="createdTime"
									maxRange={30}
									fullWidth
									height={"40px"}
									size="small"
									value={value}
									onChange={(e) => {
										onChange(e);
									}}
									error={!!error}
									helperText={error ? error.message : null}
								/>
							)}
						></Controller>
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					lg={3}
					style={{
						position: "relative",
						width: "100%",
					}}
				>
					<Box style={{ width: "100%", zIndex: 100 }}>
						<CustomAutoComplete
							id="supporter"
							name="supporter"
							fullWidth
							label={t("chat:supportEmployee")}
							placeholder={t("chat:placeholder.supportEmployee")}
							noOnBlur={true}
							size="small"
							// onChange={onChange}
							control={control}
							data={data}
							isLoading={isEmployeeLoading}
							selectedItem={employeeSelected}
							multiple
							ListboxComponent={ListBox}
							limitTags={1}
							filterSelectedOptions
							handleOpen={(e) => {
								if (data.length <= 0) {
									getData(0);
								}
							}}
							propsOnChange={(e, newValue) => {
								if (newValue) {
									setEmployeeSelected((pre) => [...newValue]);
								}
							}}
							onInputChange={(e, value) => {
								onInputChangeFunc(e, value);
							}}
							handleScroll={handleScrollFunc}
							value={employeeSelected}
							getOptionSelected={(option, value) => {
								return option && value && option.id === value.id;
							}}
						/>
					</Box>
				</Grid>
				<Grid
					item
					style={{
						flex: 1,
						display: "flex",
						alignSelf: "flex-start",
						justifyContent: "flex-end",
						justifyItems: "center",
					}}
				>
					{!filterRating ? (
						<Box>
							<InputLabel
								htmlFor=""
								style={{
									color: "black",
									fontWeight: "500",
									fontSize: "16px",
									color: "transparent",
									userSelect: "none",
									marginBottom: "4px",
								}}
							>
								/DummyLabel
							</InputLabel>
							<Box
								direction="row"
								style={{
									height: "40px",
									display: "flex",
									gap: "10px",
									justifyContent: "flex-end",
								}}
							>
								<Button
									className={classes.button}
									style={{
										whiteSpace: "nowrap",
										color: "white",
										backgroundColor: "#1A73B8",
									}}
									onClick={exportExcel}
									variant="contained"
								>
									Export Excel
								</Button>
								<Button
									className={classes.button}
									style={{ whiteSpace: "nowrap", backgroundColor: "#d9d9d9" }}
									variant="contained"
									onClick={() => {
										setValue("createdTime", defaultDate);
										refresh(reset);
										setEmployeeSelected([]);
									}}
								>
									{t("common:actions.reset")}
								</Button>
								<Button
									className={classes.button}
									style={{
										whiteSpace: "nowrap",
										color: "white",
										backgroundColor: "#00b46e",
									}}
									variant="contained"
									type="submit"
								>
									{t("common:actions.apply")}
								</Button>
							</Box>
						</Box>
					) : (
						<Box style={{ width: "100%" }}>
							<InputLabel
								htmlFor="ratings"
								style={{
									color: "black",
									fontWeight: "500",
									fontSize: "16px",
									marginBottom: "5px",
									cursor: "pointer",
								}}
							>
								{t("chat:rating")}
							</InputLabel>
							<FormControl style={{ width: "100%", bgcolor: "white" }}>
								<Select
									multiple
									id="ratings"
									classes={{
										select: classes.select,
									}}
									name="ratings"
									control={control}
									displayEmpty
									style={{ height: "40px" }}
									value={ratings}
									onChange={(event) => {
										setRatings(event.target.value);
									}}
									input={<OutlinedInput />}
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <Box>{t("common:all")}</Box>;
										}

										return selected.join(", ");
									}}
									inputProps={{ "aria-label": "Without label" }}
								>
									<MenuItem disabled value="">
										<Box>{t("common:all")}</Box>
									</MenuItem>
									{ratingEnum.map((item, index) => (
										<MenuItem key={index} value={item.value}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					)}
				</Grid>
			</Grid>
			{filterRating ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: "40px",
					}}
				>
					<Box sx={{ lineHeight: "40px", marginBottom: "20px" }}>
						<LastUpdate topic={scheduleTopic} />
					</Box>
					<Grid
						item
						style={{
							display: "flex",
							flex: 1,
							justifyContent: "flex-end",
							justifyItems: "center",
							alignSelf: "flex-start",
						}}
					>
						<Box>
							<Box style={{ height: "40px", display: "flex", gap: "10px" }}>
								<Button
									className={classes.button}
									style={{
										whiteSpace: "nowrap",
										color: "white",
										backgroundColor: "#1A73B8",
									}}
									onClick={exportExcel}
									variant="contained"
								>
									Export Excel
								</Button>
								<Button
									className={classes.button}
									style={{ whiteSpace: "nowrap", backgroundColor: "#d9d9d9" }}
									variant="contained"
									onClick={() => {
										setValue("createdTime", defaultDate);
										refresh(reset);
										setEmployeeSelected([]);
									}}
								>
									{t("common:actions.reset")}
								</Button>
								<Button
									className={classes.button}
									style={{
										whiteSpace: "nowrap",
										color: "white",
										backgroundColor: "#00b46e",
									}}
									variant="contained"
									type="submit"
								>
									{t("common:actions.apply")}
								</Button>
							</Box>
						</Box>
					</Grid>
				</Box>
			) : (
				""
			)}
		</Box>
	);
};

export default Filter;
