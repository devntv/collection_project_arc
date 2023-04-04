import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
} from "@material-ui/core";
import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { UAParser } from "ua-parser-js";
import styles from "./my-activity.module.css";
import translateValues from "./value-translator";

export async function getActivities(ctx, data, filter, offset, limit) {
    let client = new APIClient(ctx, data);
    let result = await client.call("GET", "/core/activity/v1/activity/list", {
        q: JSON.stringify(filter || {}),
        offset: offset || 0,
        limit: limit || 50,
        getTotal: true,
    });
    // console.log("act", result)
    if (result && result.status === "OK") {
        let tplCodes = [];
        result.data.forEach((act) => {
            if (tplCodes.indexOf(act.templateCode) < 0) {
                tplCodes.push(act.templateCode);
            }
        });
        let tplResult = await client.call("GET", "/core/activity/v1/template", {
            codes: tplCodes.join(","),
        });
        // console.log("tpl", tplResult)
        let tplMap = {};

        // if get tempaltes successfully
        if (tplResult && tplResult.status === "OK") {
            let targetCodes = [];
            tplResult.data.forEach((tpl) => {
                tplMap[tpl.code] = tpl;
                if (targetCodes.indexOf(tpl.target) < 0) {
                    targetCodes.push(tpl.target);
                }
            });

            let targetResult = await client.call(
                "GET",
                "/core/activity/v1/target",
                { codes: targetCodes.join(",") }
            );
            let targetMap = {};
            if (targetResult && targetResult.status === "OK") {
                targetResult.data.forEach((target) => {
                    targetMap[target.code] = target;
                });

                result.data.forEach((act) => {
                    let tpl = tplMap[act.templateCode];
                    if (tpl) {
                        let target = targetMap[tpl.target];
                        act.templateName = tpl.name;
                        target?.name && (act.targetName = target.name);
                        act.isSelf = tpl.primaryName === "@self";
                        let ua = new UAParser(act.userAgent).getResult();
                        act.ua = {
                            device: ua.device.type || "Computer",
                            os: ua.os.name || null,
                            browser:
                                ua.browser.name + " " + ua.browser.version ||
                                null,
                        };

                        // from app
                        if (act.userAgent.startsWith("thuocsi")) {
                            act.ua.device = "Mobile";
                            act.ua.browser = "App thuocsi";
                        }

                        if (act.data) {
                            act.rawData = act.data;
                            let normData = [];
                            for (let key in act.data) {
                                if (tpl.dictionary[key]) {
                                    normData.push({
                                        key: tpl.dictionary[key],
                                        rawKey: key,
                                        value: act.data[key],
                                    });
                                }
                            }

                            if (normData.length > 0) {
                                act.data = translateValues(
                                    act.templateCode,
                                    normData
                                );
                            } else {
                                delete act.data;
                            }
                        }
                    }
                });

                let values = await Promise.all(
                    result.data.map((act) => act.data)
                );
                for (let i = 0; i < result.data.length; i++) {
                    if (values[i]) {
                        result.data[i].data = values[i];
                    }
                }
                return result;
            }
        }
    }

    return result;
}

function decapitalize(str) {
    if (!str) {
        return "";
    }
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function capitalize(str) {
    if (!str) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayFullTime(time) {
    let d = new Date(time);
    let m = d.getMonth() + 1;
    m = m > 9 ? m : "0" + m;
    let h = d.getHours();
    h = h > 9 ? h : "0" + h;
    let min = d.getMinutes();
    min = min > 9 ? min : "0" + min;
    let sec = d.getSeconds();
    sec = sec > 9 ? sec : "0" + sec;
    let date = d.getDate();
    date = date > 9 ? date : "0" + date;
    return `${date}-${m}-${d.getFullYear()} ${h}:${min}:${sec}`;
}

function displayShortTime(time) {
    let d = new Date(time);
    let m = d.getMonth() + 1;
    m = m > 9 ? m : "0" + m;
    let h = d.getHours();
    h = h > 9 ? h : "0" + h;
    let min = d.getMinutes();
    min = min > 9 ? min : "0" + min;
    let date = d.getDate();
    date = date > 9 ? date : "0" + date;
    return `${date}-${m} ${h}:${min}`;
}

function MenuBar({ item }) {
    return (
        <a href={item.url} className={styles.menuBarTab} target="_blank">
            <img src={item.iconUrl} alt={item.label} />
            <span>{item.label}</span>
        </a>
    );
}

function AcitivtyRow({ data }) {
    if (!data.templateName) {
        return (
            <TableRow className={styles.actRow}>
                <TableCell component="th" scope="row" colSpan="100%">
                    Không tìm thấy cài đặt hiển thị <b>{data.templateCode}</b>{" "}
                    cho hoạt động này.
                </TableCell>
            </TableRow>
        );
    }
    return (
        <TableRow className={styles.actRow}>
            <TableCell component="th" scope="row">
                <div
                    className={styles.actTime}
                    title={displayFullTime(data.createdTime)}
                >
                    {displayShortTime(data.createdTime)}
                </div>
            </TableCell>
            <TableCell align="left">
                {data.session && (
                    <div className={styles.actSession}>
                        IP: {data.ip} <br />
                        {data.ua && (
                            <>
                                {" "}
                                {capitalize(data.ua.device)} - {data.ua.os} -{" "}
                                {data.ua.browser} <br />
                            </>
                        )}
                        Session:{" "}
                        <input
                            className={styles.actSessionValue}
                            type="text"
                            value={data.session}
                            disabled
                        />
                    </div>
                )}
            </TableCell>
            <TableCell align="left">
                <div className={styles.actContent}>
                    <Tooltip title={data.username}>
                        <b>{data.fullname}</b>
                    </Tooltip>{" "}
                    {decapitalize(data.displayName || data.templateName)}
                    {!data.isSelf && data.templateName.indexOf("${") < 0 && (
                        <b> {data.primaryKey}</b>
                    )}
                </div>
                {data.data && (
                    <div className={styles.actData}>
                        <Table>
                            <colgroup>
                                <col width={120} />
                                <col />
                            </colgroup>
                            <TableBody>
                                {data.data.map((line) => (
                                    <TableRow key={line.key}>
                                        <TableCell
                                            className={styles.actDataCell}
                                        >
                                            {" "}
                                            <b>
                                                {capitalize(
                                                    line.key.toLowerCase()
                                                )}
                                            </b>
                                        </TableCell>
                                        <TableCell
                                            className={styles.actDataCell}
                                        >
                                            <div
                                                className={
                                                    styles.menuBarWrapper
                                                }
                                            >
                                                {JSON.parse(line.value)
                                                    ?.filter(
                                                        (item) => item?.isActive
                                                    )
                                                    .map((item) => (
                                                        <MenuBar item={item} />
                                                    ))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {data.resultStatus !== "OK" && (
                    <Box>
                        <FontAwesomeIcon
                            icon={faExclamationCircle}
                            style={{ color: "red" }}
                        />{" "}
                        {data.resultErrorCode} {data.resultMessage}
                    </Box>
                )}
            </TableCell>
        </TableRow>
    );
}

export default function MyActivity({ data, message }) {
    data = data || [];
    data.forEach((activity) => {
        activity.displayName = activity.templateName?.replace(
            /\$\{[A-Za-z0-9.]+}/g,
            function (match, id) {
                let data = activity.rawData || activity.data;
                return "<b>" + eval(match.substr(2, match.length - 3)) + "</b>";
            }
        );
    });

    // console.log(data[0])

    return (
        <Box style={{ padding: 5, maxWidth: "100%" }}>
            <Table size="small" style={{ maxWidth: "100%", overflowX: "auto" }}>
                {data?.length > 0 ? (
                    <TableBody>
                        {data.map((row) => (
                            <AcitivtyRow data={row} key={row.code} />
                        ))}
                    </TableBody>
                ) : (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={3} align="left">
                                {message}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </Box>
    );
}
