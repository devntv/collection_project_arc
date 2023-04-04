import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip, Grid, makeStyles } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import PublishIcon from "@material-ui/icons/Publish";
import LabelBox from "@thuocsi/nextjs-components/editor/label-box";
import {
	doWithLoggedInUser,
	renderWithLoggedInUser
} from "@thuocsi/nextjs-components/lib/login";
import { getActivities, MyActivity } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import {
	MyCard,
	MyCardActions,
	MyCardContent,
	MyCardHeader
} from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getFileManagerClient } from "client/file-manager";
import { getMarketingClient } from "client/marketing";
import { WEB_THUOCSI_HOST } from "components/component/constant";
import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import { useEffect, useState } from "react";
import readXlsxFile from 'read-excel-file';
import XLSX from 'xlsx';
import styles from './new-products.module.css';


const useStyles = makeStyles({
    chip: {
        borderRadius: 8,
        cursor: "pointer",
        margin: 5,
    },
    info: {
        padding: "10px",
    },
});

export async function loadData(ctx) {
    let props = {};
    let marketingClient = getMarketingClient(ctx, {})

    let results = await marketingClient.getProductFiles({ q: { status: "IN_USE" } })
    let dict = {
        status: (value) => value == "IN_PREVIEW" ? "PREVIEW" : "UPLOAD",
        files: (_) => ""
     }
     registerTranslatorMap({
         "new-product-file-update": dict,
     })
    return {
        props: {
            inUse: results?.data?.[0]?.files || [],
            inPreview: results?.data?.[0]?.files || [],
            activities: await getActivities(ctx, {}, {
                target: "new-product-file",
            })
        },
    };
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

function render({ inUse = [], inPreview = [], activities }) {
    let router = useRouter()
    let [token, setToken] = useState(null)
    let fileManagerClient = getFileManagerClient()
    let marketingClient = getMarketingClient()
    let [inPreviewFiles, setInPreviewFiles] = useState(inPreview)
    const toast = useToast();
    useEffect(() => {
        (async function () {
            let tokenRs = await fileManagerClient.getToken()
            if (tokenRs.status == "OK") {
                setToken(tokenRs.message)
            }
        })()
    }, [])

    let breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Cập nhật sản phẩm mới",
        },
    ];

		const JSONToXLSX = (data, fileName) => {
			const rows = JSON.parse(data).map(row => {
				return {...row.dataRows}
			});
			
			const wb = XLSX.utils.book_new();
			const ws = XLSX.utils.json_to_sheet(rows);
			XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
			XLSX.writeFile(wb, fileName);
		}

    const handleFileChanged = async (file) => {
				if (inPreviewFiles.length >= 4) {
					inPreviewFiles.forEach((element, index) => {
            if (element?.extension == file?.extension && element?.region == file?.region) {
                inPreviewFiles[index] = file;
            }
        });
				} else {
					inPreviewFiles.push(file);
				}

        setInPreviewFiles([...inPreviewFiles])
    };
		
    const onSubmit = async () => {
				if (inPreviewFiles.some(file => !file?.publicUrl || file?.publicUrl == "") || inPreviewFiles.length < 4) {
						toast.error("Vui lòng chọn đủ 4 file để lưu.")
						return
				}

        let rs = await marketingClient.updateProductFiles({ status: "IN_USE", files: inPreviewFiles })

        if (rs.status == "OK") {
            toast.success("Cập nhật thành công")
						router.reload()
        } else {
            toast.error("Có lỗi xảy ra: " + rs?.message)
        }
    }
		
    const onPreview = async () => {
				if (inPreviewFiles.some(file => !file?.publicUrl || file?.publicUrl == "") || inPreviewFiles.length < 4) {
						toast.error("Vui lòng chọn đủ 4 file để lưu.")
						return
				}

        let rs = await marketingClient.updateProductFiles({ status: "IN_PREVIEW", files: inPreviewFiles })
        if (rs.status == "OK") {
						toast.success("Cập nhật thành công")
						window.open(`${WEB_THUOCSI_HOST}/sanphammoi?isPreview=true`, '_ blank')
        } else {
            toast.error("Có lỗi xảy ra: " + rs?.message)
        }
    }
		
    return (
        <AppMarketing select="/marketing/new-products" breadcrumb={breadcrumb}>
            <Head>
                <title>Cập nhật danh sách sản phẩm mới</title>
            </Head>

            <MyCard>
                <MyCardHeader title="Cập nhật danh sách sản phẩm mới"></MyCardHeader>
                <MyCardContent>
                    <Grid container spacing={4}>
                        <Grid
                            item
                            container
                            spacing={4}
                            style={{ paddingBottom: 0 }}
                        >
                            <Grid item xs={12} md={6}>
                                <b>
                                    Danh sách sản phẩm mới bao gồm 2 loại file:
                                </b>
                                <p>
                                    <b>1/ Excel:</b> hiển thị danh sách bao gồm:
                                </p>
                                <ul>
                                    <li>
                                        Các cột dữ liệu sau là bắt buộc nhập:
                                        <ul>
                                            <li>Sản phẩm (tên sản phẩm)</li>
                                            <li>Giá tham khảo (VNĐ)</li>
                                        </ul>
                                    </li>
                                    <li>
                                        Dữ liệu không bắt buộc nhập:
                                        <ul>
                                            <li>Quy cách đóng gói</li>
                                            <li>Thành phần chính</li>
                                        </ul>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <b>
                                    File sản phẩm mới hiện tại (đang hiển thị
                                    trên web):
                                    <ul className={styles.newProductsInUse}>
                                        {inUse.map((file, index) => {
                                            return (
                                                <li key={`${file.name}-${index}`}>
                                                    {file.extension ===
                                                    "xlsx" ? (
                                                        <span
																														style={{cursor: 'pointer'}}
                                                            onClick={() => {
                                                                JSONToXLSX(
                                                                    file.publicUrl,
                                                                    file.name
                                                                );
                                                            }}
                                                        >
                                                            {file.name}
                                                        </span>
                                                    ) : (
                                                        <a
                                                            href={
                                                                file.publicUrl
                                                            }
                                                        >
                                                            {file.name}
                                                        </a>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </b>
                            </Grid>
                        </Grid>

                        <Grid item container spacing={4}>
                            <Grid item xs={12} style={{ paddingBottom: 0 }}>
                                <>
                                    <b>2/ PDF:</b> hiển thị file và tải về trên
                                    website
                                    <ul>
                                        <li>
                                            <b>
                                                Chọn file để cập nhật sản phẩm
                                                mới
                                            </b>
                                        </li>
                                    </ul>
                                </>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <UploadInputFile
                                    uploadToken={token}
                                    ext="xlsx"
                                    label="Miền Nam (File Excel)"
                                    onFileChanged={handleFileChanged}
                                    region="MIEN_NAM"
                                    currentFile={inPreviewFiles.find(
                                        (item) =>
                                            item?.extension == "xlsx" &&
                                            item?.region == "MIEN_NAM"
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <UploadInputFile
                                    uploadToken={token}
                                    ext="pdf"
                                    label="Miền Nam (File PDF)"
                                    onFileChanged={handleFileChanged}
                                    region="MIEN_NAM"
                                    currentFile={inPreviewFiles.find(
                                        (item) =>
                                            item?.extension == "pdf" &&
                                            item?.region == "MIEN_NAM"
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <UploadInputFile
                                    uploadToken={token}
                                    ext="xlsx"
                                    label="Miền Bắc (File Excel)"
                                    onFileChanged={handleFileChanged}
                                    region="MIEN_BAC"
                                    currentFile={inPreviewFiles.find(
                                        (item) =>
                                            item?.extension == "xlsx" &&
                                            item?.region == "MIEN_BAC"
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <UploadInputFile
                                    uploadToken={token}
                                    ext="pdf"
                                    label="Miền Bắc (File PDF)"
                                    onFileChanged={handleFileChanged}
                                    region="MIEN_BAC"
                                    currentFile={inPreviewFiles.find(
                                        (item) =>
                                            item?.extension == "pdf" &&
                                            item?.region == "MIEN_BAC"
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </MyCardContent>
                <MyCardActions>
                    <Grid item container spacing={4}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginRight: "16px" }}
                                type="submit"
                                form="uploadFileForm"
                                onClick={onSubmit}
                            >
                                Lưu
                            </Button>
                            <Button
                                variant="contained"
                                component="span"
                                style={{ marginRight: "16px" }}
																onClick={() => {
																	router.back();
																}}
                            >
                                Quay lại
                            </Button>
                            <Button
                                variant="contained"
                                onClick={onPreview}
                                component="span"
                                disabled={(inPreviewFiles.some(file => !file?.publicUrl || file?.publicUrl == "") || inPreviewFiles.length < 4)}
                            >
                                Xem trước
                            </Button>
                        </Grid>
                    </Grid>
                </MyCardActions>
            </MyCard>

            <MyCard>
                    <MyCardHeader title={`Lịch sử cài đặt sản phẩm mới`} />
                    <MyCardContent>
                        <MyActivity
                            data={activities?.data || []}
                            message="Chưa ghi nhận thao tác nào"
                        ></MyActivity>
                    </MyCardContent>
                </MyCard>
        </AppMarketing>
    );
}

export default function NewProducts(props) {
    return renderWithLoggedInUser(props, render);
}

function UploadInputFile({ label, ext, region, uploadToken = "", onFileChanged = () => { }, currentFile = {} }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(currentFile)
    let fileManagerClient = getFileManagerClient()

    async function handleFileChange(event) {
        let fileObj = event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = async () => {
            let uploadRs = await fileManagerClient.uploadDocument({
                data: reader.result,
                fileName: fileObj.name,
                refType: "PRODUCTS_MARKETING",
                token: uploadToken,
            })
            if (uploadRs.status == "OK") {
                let newFile = {
                    extension: ext,
                    publicUrl: uploadRs?.data?.[0],
                    name: fileObj.name,
                    region: region
                }
                setFile(newFile)
                await onFileChanged?.(newFile)
            }

        };
        reader.readAsDataURL(fileObj);
    }

    async function handleXLSXChange(event) {
        let fileObj = event.target.files[0]
        await readXlsxFile(fileObj).then((rows) => {
            const length = rows?.length - 5;
            let data = rows?.map((row, index) => {
                if (index > length) {
                    return { dataRows: createData(row), type: 'header' };
                }
                const rowData = row.filter((r) => r !== null);
                const rowLength = rowData.length;
                if (rowLength > 5) {
                    return { dataRows: createData(row), type: 'data' };
                }
                if (rowLength >= 4) {
                    return { dataRows: createData(row), type: 'header' };
                }
                return { dataRows: createData(row), type: 'headerTitle' };
            });
            let newFile = {
                extension: ext,
                publicUrl: JSON.stringify(data),
                name: fileObj.name,
                region: region
            }
            setFile(newFile)
            onFileChanged?.(newFile)
        })
    }
    return (
        <LabelBox label={label} padding={1}>
            {file?.name ? (
                <>
                    <Chip
                        className={classes.chip}
                        icon={<FileCopy fontSize="small" />}
                        label={file?.name}
                    />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                            setFile(null)
                            onFileChanged?.({
                                extension: ext,
                                region: region
                            })
                        }}
                        icon={faTrash}
                    />
                </>
            ) : (
                <label htmlFor={region+ext} style={{ fontSize: "11px" }}>
                    <input
                        hidden
                        id={region+ext}
                        onChange={(e) => {
                            ext == "pdf" ? handleFileChange(e) : handleXLSXChange(e)
                        }}
                        type="file"
                        accept={`.${ext}`}
                    />
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginBottom: "5px" }}
                    >
                        <PublishIcon fontSize="inherit" /> Chọn file
                    </Button>
                </label>
            )}
        </LabelBox>
    );
}

const createData = (data) => ({
    name: data[0],
    volume: data[1],
    // price: data?.type === 'header' || data?.type === 'headerTitle' ? data?.dataRows[2] : formatCurrency(data[2]),
    price: data[3],
    vol: data[2],
    link: data[4] || '',
});