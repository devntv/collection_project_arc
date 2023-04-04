import React, { useEffect, useState } from "react";
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
	Grid,
	Box,
	TextField,
	FormGroup,
	makeStyles,
} from "@material-ui/core";
import {
	MyCard,
	MyCardContent,
	MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import EditIcon from "@material-ui/icons/Edit";
import { getSaleCampaignClient } from 'client/saleCampaign';
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";

export const textfieldProps = {
	InputLabelProps: {
		shrink: false,
		style: {
			color: "#353434",
			fontSize: "20px",
		},
	},
};

const useStyles = makeStyles(theme => ({
	containerIcon: {
		display: "flex",
		position: "absolute",
		right: "33%",
		top: "32%",
		zIndex: 1,
		cursor: "pointer"
	},
	container: {
		position: "relative",
		height: 121,
		width: 302
	},
	link: {
		textDecoration: "none !important",
		cursor: "pointer",
		color: "#00b46e",
	}
}))


const InfomationCampaign = (props) => {
	const { isEdit, useForm, disabled, campaignType, handleChangeCampaignType, status, slug, env } = props;
	const { errors, register, setValue, getValues, formState: { isSubmitted } } = useForm;
	const [previewBanner, setPreviewBanner] = useState("")
	const [showIcon, setShowIcon] = useState(false)
	const toast = useToast();
	const classes = useStyles()

	let domain = "https://thuocsi.vn"
	if (env !== "prd") {
		domain = `https://web.v2-${env}.thuocsi.vn`
	}

	useEffect(() => {
		setPreviewBanner(getValues("banner"))
	}, [getValues("banner")])

	const handleUploadTicketImage = async (value) => {
		try {
			const result = await getSaleCampaignClient().uploadImage({ data: value });
			setValue("banner", result?.data[0]);
			setPreviewBanner(result?.data[0])
		} catch (err) {
			toast.error("Thêm hình ảnh không thành công");
		}
	}

	const handleUpload = (e) => {
		const maxFileSize = 7
		if (e.target.files) {
			const fileReader = new FileReader();
			fileReader.onloadend = async () => {
				if (fileReader.result.length > maxFileSize * 1333000) {
					toast.error(`Kích thước file không được quá ${maxFileSize}MB. Vui lòng thử lại.`);
					return
				}
				await handleUploadTicketImage(fileReader.result);
			};
			fileReader?.readAsDataURL(e.target.files[0]);
		}
	}

	return (
		<MyCard>
			<FormGroup style={{ width: "100%" }}>
				<MyCardHeader
					small={true}
					title="THÔNG TIN CHƯƠNG TRÌNH"
				></MyCardHeader>
				<MyCardContent>
					<Grid container item xs={12} justifyContent="space-between" spacing={4}>
						<div style={{ width: 'fit-content', padding: 16 }}>
							<Typography>
								Banner <span style={{ color: 'red' }}> *</span>
							</Typography>
							<input
								{...register("banner", { required: "Banner không được để trống" })}
								accept="image/jpeg, image/png"
								id="upload-photo"
								type="file"
								hidden
								className="marketingCampaignBanner"
								onChange={handleUpload}
							/>
							{previewBanner ?
								<div className={classes.container}>
									{showIcon && status !== "EXPIRED" &&
										<div className={classes.containerIcon} onMouseEnter={() => setShowIcon(true)}>
											<span>
												<IconButton onClick={() => window.open(previewBanner, '_blank')}>
													<FontAwesomeIcon icon={faEye} size="sm" />
												</IconButton>
											</span>
											<span>
												<IconButton component="label" htmlFor="upload-photo">
													<EditIcon />
												</IconButton>
											</span>
										</div>
									}
									<img
										onMouseEnter={() => setShowIcon(true)}
										onMouseLeave={() => setShowIcon(false)}
										style={{ height: 121, width: 302, borderRadius: 6, objectFit: "contain" }}
										src={previewBanner}
										alt="upload-img"
									/>
								</div>
								:
								<label htmlFor="upload-photo">
									<Box
										border={1}
										borderColor="grey.500"
										borderRadius={6}
										display="flex"
										flexDirection="column"
										alignItems="center"
										justifyContent="flex-end"
										height={121}
										width={302}
										sx={{ p: 2, border: '1px dashed #D9D9D9' }}
										bgcolor="#FAFAFA"
									>
										<img src="/upload-img.png" alt="upload-img" />
										<Typography style={{ marginTop: 9, marginBottom: 4 }}>Tải lên Banner</Typography>
									</Box>
								</label>
							}
							{isSubmitted && !previewBanner && errors?.banner?.message &&
								<p style={{ color: "#f44336", marginTop: 4, fontSize: "0.75rem" }}>
									{errors?.banner?.message}
								</p>
							}
						</div>
						<Grid container item xs>
							<Grid item xs={12}>
								<Typography>
									Tên Chương trình khuyến mãi <span style={{ color: 'red' }}> *</span>
								</Typography>
								<TextField
									name="campaignName"
									placeholder="Nhập tên chương trình khuyến mãi"
									defaultValue=""
									helperText={errors.campaignName?.message}
									{...textfieldProps}
									size="small"
									InputProps={{
										readOnly: disabled,
									}}
									fullWidth
									disabled={status === "EXPIRED"}
									error={!!errors.campaignName}
									required
									variant="outlined"
									inputRef={register({
										validate: (value) => {
											if (value.trim().length == 0) {
												setValue("campaignName", value.trim());
												return "Tên Chương trình khuyến mãi không được để trống";
											}
										},
										required: "Tên Chương trình khuyến mãi không được để trống",
										maxLength: {
											value: 250,
											message: "Tên Chương trình khuyến mãi không được vượt quá 250 kí tự",
										},
										minLength: {
											value: 1,
											message: "Tên khuyến mãi phải có độ dài lớn hơn 1 kí tự",
										},
									})}
								/>
							</Grid>
							<Grid container alignItems="center" justifyContent="space-between">
								<FormControl component="fieldset" disabled={isEdit}>
									<RadioGroup
										id="campaignType"
										name="campaignType"
										row
										value={campaignType}
										onChange={(e) => {
											handleChangeCampaignType(e.target.value)
											setValue("campaignType", e.target.value)
										}}
										inputref={register("campaignType")}
									>
										<FormControlLabel value="FLASH_SALE" control={<Radio style={{ color: 'green' }} />} label="Flash sale" />
										<FormControlLabel value="NORMAL" control={<Radio style={{ color: 'green' }} />} label="Chương trình khuyến mãi" />
									</RadioGroup>
								</FormControl>
								{isEdit &&
									<Grid item xs>
										<Typography>
											Đường dẫn:&nbsp;
											<Link
                                                href={`${domain}/khuyenmai/${slug}`}
                                                prefetch={false}>
                                                <a color="primary" target="_blank" className={classes.link}>
													{`${domain}/khuyenmai/${slug}`}
                                                </a>
                                            </Link>
										</Typography>
									</Grid>
								}
							</Grid>
						</Grid>

					</Grid>
				</MyCardContent>
			</FormGroup>
		</MyCard >
	);
};

export default InfomationCampaign;
