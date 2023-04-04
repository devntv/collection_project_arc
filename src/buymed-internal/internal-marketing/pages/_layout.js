import App from "@thuocsi/nextjs-components/app/app";

export default function AppMarketing(props){
    let { children } = props
    return (
        <App select={props.select} breadcrumb={props.breadcrumb}>
            {children}
        </App>
    )
}