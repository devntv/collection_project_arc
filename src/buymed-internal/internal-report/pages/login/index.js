import { parseBody } from "next/dist/next-server/server/api-utils"
import { APIStatus } from "@thuocsi/nextjs-components/lib/common";
import Head from "next/head";
import { Box, Button, Paper, TextField } from "@material-ui/core";
import styles from "./login.module.css";

/*
Login page that is used on stg/uat/prd is only run from internal-report code repo.
'Login.js' file of other repos is only used for local testing.

This file have 2 ways to use:
+ GET method: display login page with login form
+ POST method: receive submitted login data (username/password)
*/
export async function getServerSideProps(ctx) {
    let returnObject = { props: {} }
    let res = ctx.res
    if (ctx.req && ctx.req.method === "POST") {

        // read form data
        let body = await parseBody(ctx.req, '1kb')

        // if empty data
        if (!body.username || !body.password) {
            returnObject.props.errorCode = "EMPTY_INPUT"
        } else {

            // call backend API
            let headers = {
                "User-Agent": ctx.req.headers['user-agent']
            }
            if (ctx.req.headers['x-forwarded-for']) {
                headers["X-Forwarded-For"] = ctx.req.headers['x-forwarded-for']
            }
            const response = await fetch(`${process.env.API_HOST}/core/account/v1/authentication`, {
                method: "POST",
                contentType: "application/json",
                body: JSON.stringify({
                    username: body.username,
                    password: body.password,
                    type: "EMPLOYEE"
                }),
                headers: headers
            })
            const result = await response.json()
            console.log(result)

            // if OK, do set cookie & redirect page to relative target
            if (result.status === APIStatus.OK) {
                let data = result.data[0]
                let url = body.url || "/"

                res.setHeader("set-cookie", [
                    `session_token=${data.bearerToken}; Path=/; HttpOnly`,
                    `remember_me=${data.bearerToken}; Max-Age=${3600 * 24 * 4}; Path=/; HttpOnly`
                ])
                res.setHeader("location", url);
                res.statusCode = 302;
                res.end();
            } else {
                returnObject.props.errorCode = result.errorCode
            }
        }
        returnObject.props.url = body.url
    } else {
        if (typeof window === "undefined") {
            res.setHeader("set-cookie", [
                `session_token=deleted;Path=/; Max-Age=1; HttpOnly`,
                `remember_me=delete; Path=/; Max-Age=1; HttpOnly`
            ])
        }
        returnObject.props.url = ctx.query.url || "/"
    }
    return returnObject

}

/*
A simple login page.
Can customize to display more.
LoginForm has basic inputs of authentication flow:
+ Login label
+ Username / password input
+ Submit button
*/
export default function LoginPage(props) {
    let msg = ""
    if (props.errorCode) {
        switch (props.errorCode) {
            case "EMPTY_INPUT":
                msg = "Vui lòng điền đầy đủ thông tin đăng nhập"
                break
            case "NOT_FOUND":
                msg = "Không tìm thấy thông tin đăng nhập"
                break
            case "WRONG_PASSWORD":
                msg = "Sai mật khẩu"
                break
            case "EXPIRED_TEMP_PASSWORD":
                msg = "Mật khẩu tạm đã hết hạn. Vui lòng liên hệ Admin."
                break
            default:
                msg = "Có lỗi xảy ra, vui lòng thử lại sau"
                break
        }
    }
    return (
        <div>
            <Head>
                <title>Đăng nhập vào hệ thống nội bộ</title>
                <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico"></link>
            </Head>
            <Paper className={styles.loginForm}>
                <p>
                    <img src="/company_logo.svg" />
                </p>
                <form method="POST" action="/login">
                    <input type="hidden" name="url" value={props.url} />
                    <Box>
                        <TextField
                            id="username"
                            label="Tên tài khoản"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={styles.loginInput}
                            autoFocus={true}
                            name="username"
                            inputRef={input => input && input.focus()}
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="password"
                            label="Mật khẩu"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={styles.loginInput}
                            name="password"
                            type="password"
                        />
                    </Box>
                    {
                        msg && <Box style={{ color: "red", fontSize: "85%", padding: "3px 10px" }} >
                            {msg}
                        </Box>
                    }
                    <Box className={styles.loginFormGroup}>
                        <Button type="submit" variant="contained" color="primary" className={styles.loginButton}>Đăng nhập</Button>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}
