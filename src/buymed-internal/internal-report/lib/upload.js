import { APIStatus } from "./common";

function createChunks(file, cSize) {
	let startPointer = 0;
	let endPointer = file.size;
	let chunks = [];
	while (startPointer < endPointer) {
		let newStartPointer = startPointer + cSize;
		chunks.push(file.slice(startPointer, newStartPointer));
		startPointer = newStartPointer;
	}
	return chunks;
}
/**
 * Upload a file to Google Cloud Storage
 * @param file a file object to upload. Example: event.target.files[0]
 * @param beforeUploadHandler some action for before uploading, example: setLoadingScreen(false)
 * @param callAPIUploadLink this is the function call to backend service to get the uploadlink, params is the object for request body, make sure this function return the APIResponse object:
 *  - status
 *  - data
 *  - message
 * @param callAPIUploadFileToGCS this is the function for uploading file to GCS, params:
 * - url: the upload url
 * - body: the binary of file
 * - headers: the object for the headers to upload to GCS
 * this function return a fetch object like this:
 * ```javascript
 * fetch(url, {
 *  method: 'PUT',
 *  body,
 *  headers
 * })
 * ```
 * @param callAPICompleteUpload this is the function call to our backend service to get the update upload status, params is the object for request body, make sure this function return the APIResponse object:
 *  - status
 *  - data
 *  - message
 * @param onUploadSuccess the action when upload successfully, example: setLoading(false); alert('Successfully')
 * @param onUploadError the action when upload error, example: setLoading(false); alert('Upload fail....')
 */
export default async function UploadFile({
	file,
	beforeUploadHandler,
	callAPIGetUploadLink,
	callAPIUploadFileToGCS,
	callAPICompleteUpload,
	onUploadSuccess,
	onUploadError,
}) {
	if (
		!file ||
		!callAPIGetUploadLink ||
		!callAPICompleteUpload ||
		!callAPIUploadFileToGCS ||
		!onUploadError
	) {
		return;
	}

	try {
		if (beforeUploadHandler) {
			beforeUploadHandler();
		}

		const reqUploadVideo = {
			filename: file.name,
			mime: file.type || "application/octet-stream",
		};

		const resUploadVideo = await callAPIGetUploadLink(reqUploadVideo);
		if (resUploadVideo?.status === APIStatus.OK) {
			const data = resUploadVideo.data[0];
			const uploadLink = data.uploadLink;
			const chunks = createChunks(file, 256 * 1024 * 1024);
			let chunkFirstByte = 0;

			for (let i = 0; i < chunks.length; i++) {
				let headers = {};
				headers["Content-Type"] = file.type;
				headers["Content-Range"] = `bytes ${chunkFirstByte}-${
					chunkFirstByte + chunks[i].size - 1
				}/${file.size}`;
				let res = await callAPIUploadFileToGCS(uploadLink, chunks[i], headers);
				if (res.status !== 308 && res.status != 200 && res.status != 201) {
					onUploadError(res.message);
					return res;
				}
				chunkFirstByte += chunks[i].size;
			}

			const reqCompleUploadVideo = {
				uploadCode: data.uploadCode,
			};
			const resCompleteUploadVideo = await callAPICompleteUpload(reqCompleUploadVideo);
			if (resCompleteUploadVideo?.status !== APIStatus.OK) {
				onUploadError(resCompleteUploadVideo.message);
			}
			if (onUploadSuccess) {
				onUploadSuccess();
			}
			return resCompleteUploadVideo;
		} else {
			onUploadError(resUploadVideo.message);
			return resUploadVideo;
		}
	} catch (error) {
		onUploadError(error.message);
	}
}
