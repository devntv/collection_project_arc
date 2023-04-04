import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import Head from "next/head";
import AppMarketing from "pages/_layout";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import moment from "moment";
import { useRouter } from "next/router";
import InformationGamification from "containers/gamification/InformationGamification";
import ApplicableCustomer from "containers/gamification/ApplicableCustomer";
import TimePermissionSetting from "containers/gamification/TimeSetting";
import { getGamificationClient } from "client/gamification";
import DetailGamification from "containers/gamification/DetailGamification";
import { gamificationType } from "components/global"
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";

const GamificationForm = (props, type) => {

	const isEdit = type === "edit";
	const toast = useToast();
	const router = useRouter();
	const { gamificationRes } = props;
	// console.log(gamificationRes)

	if (isEdit && !gamificationRes?.gamificationCode) {
		return (
			<AppMarketing select="/marketing/gamification">
				<Head>
					<title>Chỉnh sửa chương trình thưởng</title>
				</Head>
				<NotFound linkAddress={"/marketing/gamification"} linkLabel={"Danh sách chương trình thưởng"} />
			</AppMarketing>
		);
	}

	const status = gamificationRes?.status ?? ""

	const defaultValue = {
		name: "",
		description: "",
		startTime: moment(moment().add(1, "months")).add(15, "days").set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
		endTime: moment(moment().add(1, "months")).add(30, "days").set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
		publicTime: moment().add(1, "months").set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
		customerIDs: [{ value: "all", label: "Tất cả" }],
		customerScopes: [{ value: "all", label: "Tất cả" }],
		type: gamificationType[0].value,
		target: "",
		numberOfDayCalResult: 10
	}

	const form = useForm({
		mode: "onChange",
		defaultValues: isEdit ? {
			...defaultValue,
			...gamificationRes,
		} : defaultValue
	});

	const { getValues, handleSubmit, register, formState: { dirtyFields } } = form;
	const disabled = isEdit && status === "EXPIRED";
	const processing = isEdit && status === "PROCESSING"
	const isPublic = isEdit && new Date() >= new Date(gamificationRes?.publicTime)
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		register({ name: "description" })
		register({ name: "conditionDescription" })
		register({ name: "detailDescription" })
		register({ name: "reward" })
	}, []);

	const convertData = (formData) => {
		let reward = formData?.reward || ""
		reward = reward.replace(new RegExp('&nbsp;', 'g'), "")
		reward = reward.replace(new RegExp('<p><br></p>', 'g'), "")
		reward = reward.replace(new RegExp('\n', 'g'), "")

		if (reward === "<p></p>" || reward === "") return toast.error("Thông tin phần thưởng không được để trống")

		if (formData.endTime && formData.startTime) {

			let endTime = new Date(formData.endTime)
			let startTime = new Date(formData.startTime)

			if (endTime <= startTime) {
				return toast.error("Thời gian kết thúc phải lớn hơn thời gian bắt đầu")
			}
		}

		if (formData.customerIDs?.length) {
			if (formData.customerIDs.find(item => item?.value === "all")) formData.customerIDs = []
			else formData.customerIDs = formData.customerIDs.map(item => item.value)
		}

		if (formData.customerScopes?.length) {
			if (formData.customerScopes.find(item => item?.value === "all")) formData.customerScopes = []
			else formData.customerScopes = formData.customerScopes.map(item => item.value)
		}

		const details = [{
			condition: {
				type: formData.type,
				target: +formData.target,
				description: formData.detailDescription,
			},
			reward: {
				description: formData.reward
			}
		}]

		if (isEdit) details[0].gamificationDetailCode = gamificationRes.gamificationDetailCode

		const scope = {
			customerIDs: formData.customerIDs,
			customerScopes: formData.customerScopes,
			description: formData.conditionDescription,
		}

		let description = formData.description ?? ""
		if (isEdit) {
			Object.keys(formData).forEach((key) => {
				if (!dirtyFields[key]) delete formData[key];
			});
		}

		if (!isEdit) formData.isActive = false

		if (isEdit) formData.gamificationCode = gamificationRes.gamificationCode

		if (formData.publicTime) formData.publicTime = new Date(formData.publicTime).toISOString()

		if (formData.startTime) formData.startTime = new Date(formData.startTime).toISOString()

		if (formData.endTime) formData.endTime = new Date(formData.endTime).toISOString()

		if (formData.numberOfDayCalResult) formData.numberOfDayCalResult = Number(formData.numberOfDayCalResult
		) ?? 0

		formData.details = details
		formData.scope = scope
		formData.description = description

		delete formData.reward
		delete formData.target
		delete formData.type
		delete formData.customerIDs
		delete formData.customerScopes
		delete formData.conditionDescription
		delete formData.detailDescription

		return formData
	}

	const onSubmitCreate = async () => {
		setIsLoading(true);
		const data = convertData(getValues())
		if (data) {
			const res = await getGamificationClient().createGamification(data);
			if (res && res.status === "OK") {
				toast.success("Tạo chương trình thưởng thành công")
				router.push("/marketing/gamification");
				setIsLoading(false);
				return
			}

			if (res && res.message) toast.error(res.message)
		}
		setIsLoading(false);
	};

	const onSubmitUpdate = async () => {
		setIsLoading(true);
		const data = convertData(getValues())
		if (data) {
			const res = await getGamificationClient().updateGamification(data);
			if (res && res.status === "OK") {
				toast.success("Cập nhật chương trình thưởng thành công")
				setIsLoading(false);
				router.reload()
				return
			}

			if (res && res.message) toast.error(res.message)
		}
		setIsLoading(false);
	};

	const breadcrumb = [
		{
			name: "Trang chủ",
			link: "/marketing"
		},
		{
			name: "Danh sách chương trình thưởng",
			link: "/marketing/gamification"
		},
		{
			name: isEdit ? "Chỉnh sửa chương trình thưởng" : "Tạo chương trình thưởng",
		},
	]

	useEffect(() => {
		const timer = setInterval(() => {
			if (status != "EXPIRED" && isEdit) {
				if (new Date() >= new Date(gamificationRes?.endTime)) router.push(router.asPath)
			}

			if (status === "UPCOMING") {
				if (new Date() >= new Date(gamificationRes?.startTime)) router.push(router.asPath)
			}

			if (status === "UPCOMING" && !isPublic) {
				if (new Date() >= new Date(gamificationRes?.publicTime)) router.push(router.asPath)
			}
		}, 30000);
		// clearing interval
		return () => clearInterval(timer);
	});

	return (
		<AppMarketing select="/marketing/gamification" breadcrumb={breadcrumb}>
			<Head>
				<title>{isEdit ? "Chỉnh sửa chương trình thưởng" : "Tạo chương trình thưởng"}</title>
			</Head>


			<InformationGamification
				isEdit={isEdit}
				useForm={form}
				disabled={disabled}
				processing={processing}
			/>

			<Grid container spacing={2}>
				<Grid item xs>
					<TimePermissionSetting
						useForm={form}
						disabled={disabled}
						processing={processing}
						isEdit={isEdit}
						createdTime={gamificationRes?.createdTime}
						isPublic={isPublic}
					/>
				</Grid>
				<Grid item xs>
					<ApplicableCustomer
						useForm={form}
						disabled={disabled}
						processing={processing}
					/>
				</Grid>
			</Grid>

			<DetailGamification
				useForm={form}
				disabled={disabled}
				processing={processing}
			/>

			<ButtonGroup>
				<Button
					variant="contained"
					style={{ margin: 8 }}
					onClick={() => router.push("/marketing/gamification")}
				>
					Huỷ
				</Button>
				{isLoading ? (
					<Button variant="contained" style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}>
						<CircularProgress color="primary" size={20} />
					</Button>
				) : (
					<>
						{isEdit && !disabled && (gamificationRes.sellerCode === "" || !gamificationRes.sellerCode) && (
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit(onSubmitUpdate)}
								style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
							>
								Cập nhật
							</Button>
						)}
						{!isEdit && (
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit(onSubmitCreate)}
								style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
							>
								Tạo
							</Button>
						)}
					</>
				)}
			</ButtonGroup>

		</AppMarketing>
	);
};

export default GamificationForm;
