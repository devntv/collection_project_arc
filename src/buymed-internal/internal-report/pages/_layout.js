import App from "@thuocsi/nextjs-components/app/app";

export default function ReportApp(props) {
    let { children } = props
    return (
        <App breadcrumb={props.breadcrumb}>
            {children}
        </App>
    )
}