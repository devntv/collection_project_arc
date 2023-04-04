import { Button, FormGroup, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import Head from "next/head";
import AppMarketing from "pages/_layout";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import moment from "moment";
import InfomationCampaign from 'components/component/promotion/infomation-campaign'
import TimeSetting from 'components/component/promotion/time-setting'
import PriceAndProductSetting from 'components/component/promotion/price-and-product-setting'
import ApplicableObject from 'components/component/promotion/applicable-object'
import DescriptionInformation from 'components/component/promotion/description-information'
import { useRouter } from "next/router";
import { getAreaClient } from "client/area";
import { getSellerClient } from "client/seller";
import { scopes } from 'components/global'
import { getSaleCampaignClient } from 'client/saleCampaign'
import { rewards } from "components/component/constant";
import styles from './sale-campaign.module.css';
import { formatUTCTime } from "components/component/util";

const SaleCampaignForm = (props, type) => {
	const edit = type === "edit";
	const toast = useToast();
	const router = useRouter();
	const { saleCampaignRes, env } = props;

	const {
		banner,
		campaignName,
		campaignType,
		registrationStartTime,
		registrationEndTime,
		startTime,
		endTime,
		flashSaleTimes,
		reward,
		sellerCodes,
		customerScopes,
		regions,
		description,
		status,
		campaignID,
		saleType,
		fulfill,
		slug,
	} = saleCampaignRes || {
		banner: "",
		campaignName: "",
		campaignType: "FLASH_SALE",
		registrationStartTime: moment().add(1, "days").set({hour:0,minute:0,second:0}),
		registrationEndTime: moment().add(1, "months").set({hour:0,minute:0,second:0}),
		startTime: moment(moment().add(1, "months")).add(15, "days").set({hour:0,minute:0,second:0}),
		endTime: moment(moment().add(1, "months")).add(30, "days").set({hour:23,minute:59,second:59}),
		flashSaleTimes: [],
		reward: { absoluteDiscount: 0, maxDiscount: 0, percentageDiscount: 0 },
		sellerCodes: [{ value: "all", label: "Tất cả" }],
		customerScopes: [{ value: "all", label: "Tất cả" }],
		regions: [{ value: "all", label: "Tất cả" }],
		description: "",
		status: "",
		campaignID: 0,
		saleType: { value: "UNLIMIT", label: "Không giới hạn" },
		fulfill: 50,
		slug: "",
	};

	const form = useForm({
		mode: "onChange",
		shouldFocusError: true,
		defaultValues: {
			banner,
			campaignName,
			campaignType,
			registrationStartTime: formatUTCTime(registrationStartTime),
			registrationEndTime: formatUTCTime(registrationEndTime),
			startTime: formatUTCTime(startTime),
			endTime: formatUTCTime(endTime),
			flashSaleTimes,
			reward,
			rewardLevel: null,
			sellerCodes,
			customerScopes,
			regions,
			description,
			saleType,
			fulfill: fulfill ?? 0	
		},
	});

	const { setValue, getValues, handleSubmit, register, errors, formState } = form;
	const disabled = edit && new Date() >= new Date(startTime);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingPage, setIsLoadingPage] = useState(false);
	const [campaignPromotionType, setCampaignPromotionType] = useState(campaignType)

	const defaultTimeSlot = [{
		startTime: moment(moment().add(1, "months")).add(15, "days").set({hour:0,minute:0,second:0}),
		endTime: moment(moment().add(1, "months")).add(15, "days").set({hour:23,minute:0,second:0}),
		detail: [
			{
				code: "0600-1159",
				categoryCodes: ["all"],
				productIDs: ["all"],
			}
		]
	}]

	const [listTime, setListTime] = useState(edit ? [] : defaultTimeSlot)
	const [defaultTime, setDefaultTime] = useState([])
	useEffect(() => {
		register({name: "description"})
		if (edit) {
			fillDefaultData();
			document.getElementsByName("saleType")[0].className = styles.saleType
		}
	}, []);

	const updateDataSeller = async () => {
		const resSeller = await getSellerClient().getSellerBySellerCodesClient(sellerCodes);
		const arrSeller = []
		resSeller?.data?.forEach((seller) =>
			arrSeller.push({
				value: seller.code,
				label: seller.name,
			})
		);
		setValue("sellerCodes", arrSeller)
	}

	const updateDataRegion = async () => {
		const resRegion = await getAreaClient().getListAreaByCodes(regions);
		const arrRegion = []
		resRegion?.data?.forEach((area) =>
			arrRegion.push({
				value: area.code,
				label: area.name,
			})
		);
		setValue("regions", arrRegion)
	}

	const fillDefaultData = () => {
		setIsLoadingPage(true)
		const arr = flashSaleTimes?.map(item => {
			item.detail?.map(el => {
				if (el.productIDs.length === 0 || (el.productIDs.length === 1) && el.productIDs[0] === "") {
					el.productIDs = []
					return el
				}
				return el
			})
			item.startTime = formatUTCTime(item.startTime)
			item.endTime = formatUTCTime(item.endTime)
			if (campaignType === "NORMAL") {
				item.startTime = null
				item.endTime = null
			}
			return item
		})
		setDefaultTime(arr)
		setListTime(arr)

		if (saleType) {
			let dataSaleType = { value: "UNLIMIT", label: "Không giới hạn" }
			rewards.forEach(item => {
				if (item.value === saleType) {
					dataSaleType = item
				}
			})
			setValue("saleType", dataSaleType)
		}

		const objScopes = {}
		if (customerScopes?.toString()) {
			customerScopes?.forEach(element => {
				objScopes[element] = element
			});
			setValue("customerScopes", scopes.filter(item => objScopes[item.value] === item.value))
		} else setValue("customerScopes", [{ value: "all", label: "Tất cả" }])

		if (!sellerCodes?.toString()) setValue("sellerCodes", [{ value: "all", label: "Tất cả" }])
		else updateDataSeller()

		if (!regions?.toString()) setValue("regions", [{ value: "all", label: "Tất cả" }])
		else updateDataRegion()

		setIsLoadingPage(false)
	}

	const convertData = (formData) => {
		if (edit) formData.campaignID = campaignID
		if (formData.customerScopes.length) {
			formData.customerScopes = formData.customerScopes.map(item => item.value)
		}
		if (formData.regions.length) {
			formData.regions = formData.regions.map(item => item.value)
		}
		if (formData.saleType) {
			formData.saleType = formData.saleType?.value

			const objReward = {
				percentageDiscount: 0,
				absoluteDiscount: 0,
				maxDiscount: 0
			}
			if (formData.saleType === "PERCENTAGE") {
				objReward.percentageDiscount = Number(formData.rewardLevel) || 0
			} else if (formData.saleType === "ABSOLUTE") {
				objReward.absoluteDiscount = Number(formData.rewardLevel) || 0
			}
			formData.reward = objReward
			delete formData.rewardLevel
		}
		if (formData.sellerCodes.length) {
			formData.sellerCodes = formData.sellerCodes.map(item => item.value)
		}
		let flag = false
		if (listTime?.length) {
			const arr = listTime?.map(item => {
				if(!item) flag = true
				if((!item.startTime || item.startTime?.toString() === "Invalid Date") && formData.campaignType === "FLASH_SALE") flag = true
				else item.startTime = new Date(new Date(item.startTime).setHours(7))?.toISOString()
				if((!item.endTime || item.endTime?.toString() === "Invalid Date") && formData.campaignType === "FLASH_SALE") flag = true
				else item.endTime = new Date(new Date(item.endTime).setHours(7))?.toISOString()
				if(formData.campaignType === "FLASH_SALE" && !item.detail?.length) flag = true

				item.detail?.map(el => {
					if (el.productIDs?.length === 1 && el.productIDs[0] === "all") {
						el.productIDs = []
					}
					if (el.categoryCodes?.length === 1 && el.categoryCodes[0] === "all") {
						el.categoryCodes = []
					}
					return el
				})
				
				return item
			})
			if (formData.campaignType === "NORMAL") {
				formData.flashSaleTimes = [{
					detail: [{
						categoryCodes: arr[0].detail[0].categoryCodes,
						productIDs: arr[0].detail[0].productIDs
					}]
				}]
			} else formData.flashSaleTimes = arr
		}
		if (formData.registrationStartTime) {
			formData.registrationStartTime = new Date(formData.registrationStartTime)?.toISOString()
		}
		if (formData.registrationEndTime) {
			formData.registrationEndTime = new Date(formData.registrationEndTime)?.toISOString()
		}
		if (formData.startTime) {
			formData.startTime = new Date(formData.startTime)?.toISOString()
		}
		if (formData.endTime) {
			formData.endTime = new Date(formData.endTime)?.toISOString()
		}
		if (formData.sellerCodes.find(item => item === "all")) formData.sellerCodes = []
		if (formData.customerScopes.find(item => item === "all")) formData.customerScopes = []
		if (formData.regions.find(item => item === "all")) formData.regions = []

		if (formData.fulfill) formData.fulfill =  Number(formData.fulfill)

		if(flag) {
			const muiErrors = document.getElementsByClassName("MuiInputBase-root Mui-error")
			muiErrors[0] && muiErrors[0].scrollIntoView({behavior: "smooth", block: "center"})
			return
		}
		return formData
	}

	const onSubmitUpdate = async () => {
		if(!convertData(getValues())) return
		setIsLoading(true);
		const res = await getSaleCampaignClient().updateSaleCampaign(convertData(getValues()));
		if (res && res.status === "OK") {
			toast.success("Cập nhật chương trình khuyến mãi thành công")
			router.reload()
			setIsLoading(false);
			return
		}

		if (res && res.errorCode === "START_TIME_INVALID") {
			toast.error("Thời gian bắt đầu khung giờ không hợp lệ")
		}
		else if (res && res.message) toast.error(res.message)
		setIsLoading(false);
	};

	const onSubmitCreate = async () => {
		if(!convertData(getValues())) return
		setIsLoading(true);
		const res = await getSaleCampaignClient().createSaleCampaign(convertData(getValues()));
		if (res && res.status === "OK") {
			toast.success("Tạo chương trình khuyến mãi thành công")
			router.push("/marketing/sale-campaign");
			setIsLoading(false);
			return
		}

		if (res && res.errorCode === "START_TIME_INVALID") {
			toast.error("Thời gian bắt đầu khung giờ không hợp lệ")
		}
		else if (res && res.message) toast.error(res.message)
		setIsLoading(false);
	};
	const onError = async (e) => {
		if (e?.banner) {
			const banner = document.getElementsByClassName("marketingCampaignBanner")?.[0]
			banner && window.scrollTo({top: 0, behavior: "smooth"})
			return
		}
	}
	const handleChangeCampaignPromotionType = (value) => {
		setCampaignPromotionType(value)
		if (value === "NORMAL") {
			setListTime([{
				startTime: null,
				endTime: null,
				detail: [
					{
						code: null,
						categoryCodes: ["all"],
						productIDs: ["all"]
					}
				]
			}])
			return
		}
		setListTime(defaultTimeSlot)
	}

	const handleChangeTimeSlot = (index, value) => {
		const arrayBefore = listTime.slice(0, index)
		const arrayAfter = listTime.slice(index + 1)
		const array = arrayBefore.concat(value, arrayAfter)
		setListTime(array)
	}

	const handleRemoveTimeSlot = (indexValue) => {
		if (listTime.length !== 1) {
			setListTime(listTime.filter((item, index) => index !== indexValue))
		}
	}

	const handleAddTimeSlot = () => {
		const start = moment(listTime[listTime.length - 1].endTime).add(1, 'days')
		const end = moment(listTime[listTime.length - 1].endTime).add(1, 'days').set({hour:23,minute:0,second:0})
		setListTime([
			...listTime,
			{
				startTime: start,
				endTime: end,
				detail: [
					{
						code: "0600-1159",
						categoryCodes: ["all"],
						productIDs: ["all"]
					}
				]
			}
		])
	}

	const breadcrumb = [
		{
			name: "Trang chủ",
			link: "/marketing"
		},
		{
			name: "Danh sách chương trình khuyến mãi",
			link: "/marketing/sale-campaign"
		},
		{
			name: edit ? "Chỉnh sửa chương trình khuyến mãi" : "Tạo chương trình khuyến mãi",
		},
	]

	return (
		<AppMarketing select="/marketing/sale-campaign" breadcrumb={breadcrumb}>
			<Head>
				<title>{edit ? "Chỉnh sửa chương trình khuyến mãi" : "Tạo chương trình khuyến mãi"}</title>
			</Head>
			{isLoadingPage ? (
				<MyCard>
					<FormGroup style={{ width: "100%" }}>
						<MyCardHeader
							small={true}
							title="THÔNG TIN CHƯƠNG TRÌNH"
						></MyCardHeader>
						<MyCardContent>
							<center>
								<CircularProgress />
							</center>
						</MyCardContent>
					</FormGroup>
				</MyCard>
			) : (
				<>
					<InfomationCampaign
						isEdit={edit}
						useForm={form}
						campaignType={campaignPromotionType}
						handleChangeCampaignType={handleChangeCampaignPromotionType}
						status={status}
						slug={slug}
						env={env}
					/>
					<TimeSetting
						isEdit={edit}
						disabled={disabled}
						useForm={form}
						campaignType={campaignPromotionType}
						listTime={listTime}
						handleChangeTimeSlot={handleChangeTimeSlot}
						handleAddTimeSlot={handleAddTimeSlot}
						handleRemoveTimeSlot={handleRemoveTimeSlot}
						status={status}
						defaultTime = {defaultTime}
					/>
					<PriceAndProductSetting
						isEdit={edit}
						listTime={listTime}
						useForm={form}
						handleChangeTimeSlot={handleChangeTimeSlot}
						reward={reward}
						campaignType={campaignPromotionType}
						status={status}
					/>
					<Grid container spacing={2}>
						<Grid item xs>
							<ApplicableObject
								useForm={form}
								status={status}
							/>
						</Grid>
						<Grid item xs>
							<DescriptionInformation
								useForm={form}
								status={status}
							/>
						</Grid>
					</Grid>
				</>
			)}
			{!isLoadingPage && status !== "EXPIRED" && (
				<ButtonGroup>
					<Button
						variant="contained"
						style={{ margin: 8 }}
						onClick={() => router.push("/marketing/sale-campaign")}
					>
						Huỷ
					</Button>
					{isLoading ? (
						<Button variant="contained" style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}>
							<CircularProgress color="secondary" size={20} />
						</Button>
					) : edit ? (
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit(onSubmitUpdate, onError)}
							style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
						>
							Cập nhật
						</Button>
					) : (
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit(onSubmitCreate, onError)}
							style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
						>
							Tạo
						</Button>
					)}
				</ButtonGroup>
			)}
		</AppMarketing>
	);
};

export default SaleCampaignForm;
