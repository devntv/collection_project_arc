import React, { useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PublishIcon from '@material-ui/icons/Publish';
import CircularProgress from "@material-ui/core/CircularProgress";
import { getFileManagerClient } from "client/file-manager";

const UploadFile = (props) => {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [documentFiles, setDocumentFiles] = useState(props?.documentFiles ?? [])
	const [documentFilesChoice, setDocumentFilesChoice] = useState([]);
	const { setValue, register, getValues } = props.useForm

	const handleLicenseFile = async (event) => {
		const fileObj = event.target.files[0];
		const reader = new FileReader();
		reader.onloadend = async () => {
			const files = documentFilesChoice
			const filesOld = documentFiles
			if (files.length + filesOld.length >= 3) {
				toast.error("Chỉ được upload tối đa 3 hồ sơ");
				return
			}

			if (reader.result.length / 1000000 >= 7) {
				toast.error("Hồ sơ có dung lượng quá lớn, vui lòng kiểm tra lại");
				return
			} else {
				setIsLoading(true)
				const fileManagerClient = getFileManagerClient();
				const result = (fileObj.type === "image/png" || fileObj.type === "image/jpeg") ? await fileManagerClient.uploadImage({
					data: reader.result,
					fileName: fileObj.name ?? "",
					refType: "CUSTOMER",
					token: props.uploadToken
				}) : await fileManagerClient.uploadDocument({
					data: reader.result,
					fileName: fileObj.name ?? "",
					refType: "CUSTOMER",
					token: props.uploadToken
				});

				if (result.status === "OK") {
					files.push({
						name: fileObj.name ?? "",
						publicUrl: result.data[0],
					})
					setValue("documentFiles", [...filesOld, ...files])
				}
				else {
					toast.error(result.message || "Upload hồ sơ không thành công")
				}
				setDocumentFilesChoice([...files])
				setIsLoading(false)
			}
		};
		reader.readAsDataURL(fileObj);
	}

	return (
		<Grid item xs={12}>
			<Typography> Hồ sơ tối đa 3 file (định dạng .pdf, .doc, .docx, .png, .jpeg) </Typography>
			<label htmlFor="file" style={{ fontSize: "11px" }}>
				<input
					style={{ display: "none" }}
					id="file"
					{...register("documentFiles")}
					onClick={e => e.target.value = ""}
					disabled={props.status === "EXPIRED"}
					onChange={handleLicenseFile}
					type="file"
					accept=".pdf,.doc,.docx,.png,.jpeg"
				/>
				<Button variant="contained" component="span" disabled={props.status === "EXPIRED"} style={{ marginBottom: "5px" }}>
					<PublishIcon fontSize="inherit" /> Chọn file
				</Button>
			</label>
			<br />
			{documentFiles?.map((file, index) =>
				<React.Fragment key={index}>
					<span style={{ cursor: "pointer", color: "#00b46e" }} onClick={() => window.open(file.publicURL, '_blank')}>{file.name}</span>
					&nbsp;&nbsp;
					{props.status !== "EXPIRED" &&
						<FontAwesomeIcon style={{ color: "red", cursor: "pointer" }}
							onClick={() => {
								setDocumentFiles(documentFiles.filter((e, i) => index != i) ?? [])
								setValue("documentFiles", getValues("documentFiles")?.filter((e, i) => index != i) ?? [])
							}}
							icon={faTrash}
						/>
					}
					<br />
				</React.Fragment>
			)}

			{documentFilesChoice?.map((file, index) =>
				<React.Fragment key={index}>
					<span style={{ cursor: "pointer", color: "#00b46e" }} onClick={() => window.open(file.publicUrl, '_blank')}>{file.name}</span>
					&nbsp;&nbsp;
					&nbsp;&nbsp;
					{props.status !== "EXPIRED" &&
						<FontAwesomeIcon style={{ color: "red", cursor: "pointer" }}
							onClick={() => {
								setDocumentFilesChoice(documentFilesChoice.filter((e, i) => index != i) ?? [])
							}}
							icon={faTrash}
						/>
					}
					<br />
				</React.Fragment>
			)}
			{isLoading && <CircularProgress color="inherit" size={20} />}
		</Grid>
	);
};

export default UploadFile;
