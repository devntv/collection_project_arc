import Head from "next/head";
import AppCMS from "pages/_layout";
import React, { useState } from "react";
import {
    Button, CircularProgress,
    FormGroup, Grid, Link, makeStyles, Chip, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, FormHelperText,
} from "@material-ui/core";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import LabelBox from "@thuocsi/nextjs-components/editor/label-box";
import PublishIcon from '@material-ui/icons/Publish';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileCopy } from "@material-ui/icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import readXlsxFile from 'read-excel-file';
import XLSX from "xlsx"
import { getProductClient } from "client/product";
import { isNumber } from "components/global";

const useStyles = makeStyles({
    chip: {
        borderRadius: 8,
        cursor: "pointer",
        margin: 5,
    },
    info: {
        padding: "10px"
    }
});

function render() {
    const classes = useStyles();
    const { error, success } = useToast();
    const [loading, setLoading] = useState(false);
    const [listContent, setListContent] = useState([]);
    const [fileName, setFileName] = useState("");
    const [listErrors, setListErrors] = useState([])

    async function onChangeFile(e) {
        setLoading(true)
        setListErrors([])
        if (e.target.files.length === 0) return
        const file = e.target.files[0]
        setFileName(file.name)
        const list = []
        await readXlsxFile(file).then((rows) => {
            rows.map((row, index) => {
                if (index === 0) return
                list.push({
                    skuCode: row[0] || null,
                    point: row[1],
                    pointMultiplier: row[2],
                })
            })
        }).catch(err => console.log(err))
        setListContent(list.filter(item => item.skuCode !== null))
        setLoading(false)
    }
    function exampleExcel() {
        return (
            <table id="example" border="1" style={{ display: "none" }}>
                <thead>
                    <tr>
                        <th>Mã SKU</th>
                        <th>Điểm tích luỹ</th>
                        <th>Hệ số nhân</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>sku.code1</td>
                        <td></td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>sku.code2</td>
                        <td>4</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>sku.code3</td>
                        <td>3</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const fetchImport = async (payload) => {
        
    }
    async function importFile() {

        if (!!!fileName) {
            error("Vui lòng chọn file")
            return
        }
        if (listContent?.length === 0 || !listContent) {
            error("Import chưa đúng format/sai data")
            return
        }   
        console.log(listContent)
        let errors = listContent.filter((item, index) => {
            item.message = ""
            let splitChar = ";"
            if (!item.skuCode || item.skuCode === "") {
                item.message += `Mã SKU không hợp lệ${splitChar}`
            }
            if (item.point !== null && (item.point < 1 || item.point > 100)) {
                item.message += `Điểm tích lũy được phép nhập từ 1-100${splitChar}`
            }
            if (item?.point && !isNumber(item.point)) {
                item.message += `Điểm tích lũy phải là số${splitChar}`
            }
            if (item?.pointMultiplier && !isNumber(item.pointMultiplier)) {
                item.message += `Hệ số nhân phải là số${splitChar}`
            }
            if (item.pointMultiplier !== null && (item.pointMultiplier < 1 || item.pointMultiplier > 10)) {
                item.message += `Hệ số nhân được phép nhập từ 1-10${splitChar}`
            }
            // if (item.point === null && item.pointMultiplier === null) {
            //     item.message += `Vui lòng nhập ít nhất 1 trong 2 cột: Điểm tích lũy hoặc Hệ số nhân${splitChar}`
            // }
            return item.message !== ""
        })
        setListErrors(errors)
        // if (errors.length > 0) return;
        setLoading(true);
        const client = getProductClient();
        const validContent = listContent.filter((item, index) => {
            if (!item.skuCode || item.skuCode === "") {
                return false
            }
            if (item.point !== null && (item.point < 1 || item.point > 100)) {
                return false
            }
            if (item?.point && !isNumber(item.point)) {
                return false
            }
            if (item?.pointMultiplier && !isNumber(item.pointMultiplier)) {
                return false
            }
            if (item.pointMultiplier !== null && (item.pointMultiplier < 1 || item.pointMultiplier > 10)) {
                return false
            }
            // if (item.point === null && item.pointMultiplier === null) {
            //     return false
            // }
            return true
        })
        if (validContent.length === 0) {
            error("Dữ liệu toàn bộ file không hợp lệ, vui lòng kiểm tra lại")
            setLoading(false)
            return
        }

        const content = validContent.map(item => {
            let point = item.point === null ? 0 : item.point
            let pointMultiplier = item.pointMultiplier === null ? 0 : item.pointMultiplier
            return {...item, point, pointMultiplier}
        })

        const res = await client.importSkuPoint(content);
        if (res.status === "OK") {
            success("Import cài đặt điểm thành công");
        } else {
            if (!!res.message) {
                error(res.message)
            }
        }

        setLoading(false)
    }
    function downloadFileExcel() {
        let file = document.getElementById("example");
        var wb = XLSX.utils.table_to_book(file, { sheet: "sheet1" });
        return XLSX.writeFile(wb, ('CaiDatDiem.' + 'xlsx'));
    }
    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Cài đặt điểm",
            link: "/marketing/sku-point"
        },
        {
            name: "Import",
        }
    ]
    async function exportFile() {
        setLoading(true);
        var wscols = [
            { wch: 40 },
            { wch: 20 },
            { wch: 20 },
            { wch: 60 },
        ];
        const jsonSheet = listErrors.map(item => {
            return {
                'Mã SKU': item.skuCode,
                'Điểm tích luỹ': item.point,
                'Hệ số nhân': item.pointMultiplier,
                'Lỗi': item.message
            }
        })
        const wb = XLSX.utils.book_new();
        wb.SheetNames.push("sku-point");
        const ws = XLSX.utils.json_to_sheet(jsonSheet)

        ws['!cols'] = wscols;
        wb.Sheets["sku-point"] = ws;
        setLoading(false)
        return XLSX.writeFile(wb, ('CaiDatDiem' + '.xlsx'));
    }
    return (
        <AppCMS select="/marketing/sku-point" breadcrumb={breadcrumb}>
            {exampleExcel()}
            <Head>
                <title>Cập nhật Cài đặt điểm</title>
            </Head>
            <MyCard>
                <MyCardHeader title={"Import điểm và hệ số nhân"} />
                <MyCardContent>
                    <form>
                        <Grid container>
                            <Grid item xs={12} md={6} sm={12}>
                                <Grid item xs={12} md={12} sm={12}>
                                    <LabelBox label="Danh sách điểm và hệ số nhân" padding={1}>
                                        {!!fileName ? <>
                                            <Chip
                                                className={classes.chip}
                                                icon={<FileCopy fontSize="small" />}
                                                label={fileName}
                                            />
                                            &nbsp;&nbsp;
                                            <FontAwesomeIcon style={{ color: "red", cursor: "pointer" }}
                                                onClick={
                                                    () => {
                                                        setListContent([])
                                                        setFileName("");
                                                    }
                                                }
                                                icon={faTrash}
                                            />
                                        </> :
                                            (<label htmlFor="documentFiles" style={{ fontSize: "11px" }}>
                                                <input
                                                    style={{ display: "none" }}
                                                    id="documentFiles"
                                                    onChange={onChangeFile}
                                                    type="file"
                                                    accept=".xlsx"
                                                />
                                                <Button variant="contained" component="span" style={{ marginBottom: "5px" }}>
                                                    <PublishIcon fontSize="inherit" /> Chọn file
                                                </Button>
                                            </label>)}
                                    </LabelBox>
                                    <div className={classes.info}>
                                        <span><b>File excel gồm 3 cột:</b></span>
                                        <ul>
                                            <li>Mã SKU<span style={{ color: 'red' }}> *</span></li>
                                            <li>Điểm tích luỹ</li>
                                            <li>Hệ số nhân</li>
                                        </ul>
                                        {/* <p><i>Bắt buộc nhập ít nhất 1 trong 2 cột: Điểm tích lũy hoặc Hệ số nhân</i></p> */}
                                        <Button variant="outlined" onClick={() => {
                                            downloadFileExcel()
                                        }}><FileCopy fontSize="small" />{"  "} Mẫu file excel</Button>
                                    </div>
                                </Grid>

                                <Grid container spacing={1} style={{ margin: "10px 0" }}>
                                    <Grid item>
                                        <Button variant="contained" onClick={Router.back}> Trở về </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => importFile()}
                                            disabled={loading}
                                        >
                                            Lưu
                                            {loading && <CircularProgress size={20} />}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </MyCardContent>
            </MyCard>

            {
                !!listErrors.length && (
                    <MyCard>
                        <MyCardHeader title={"Danh sách mã SKU bị lỗi"}>
                            <Button disabled={loading} style={{ margin: 4 }} onClick={exportFile} variant="contained" color="primary">
                                Export File
                                {loading && <CircularProgress size={20} />}
                            </Button>
                        </MyCardHeader>
                        <FormGroup>
                            <MyCardContent>
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table" style={{ tableLayout: 'fixed' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Mã SKU</TableCell>
                                                <TableCell align="center">Điểm tích luỹ</TableCell>
                                                <TableCell align="center">Hệ số nhân</TableCell>
                                                <TableCell align="left">Lỗi</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {listErrors.slice(0, 20).map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left" >
                                                        {row.skuCode}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.point}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.pointMultiplier}
                                                    </TableCell>
                                                    <TableCell align="left" >
                                                        {!!row.message && row.message.split(";").map((item, index) => <p key={index}>{item}</p>)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </MyCardContent>
                        </FormGroup>
                    </MyCard>
                )
            }
        </AppCMS>
    )
}

export default function ImportPage(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return { props: {} };
    });
}
