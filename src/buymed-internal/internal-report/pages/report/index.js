import { doWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { PERMISSION } from "utilities/permission";
import { acceptedScreenExactly, existPermission } from "utilities/screenCheck";
import SummaryReportPage, { getDataSummaryReport } from "./chat/summary";
import CustomerReportPage, {loadCustomerReportData} from "./customer";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        if (acceptedScreenExactly(ctx.loggedInUserInfo, "/")) {
            return loadCustomerReportData(ctx)
        } else if (existPermission(ctx.loggedInUserInfo, PERMISSION.REPORT_CHAT_SUPPORT_SELLER)) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/report/seller-chat/summary",
                },
                props: {},
            };
        }
        else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/report/chat/summary",
                },
                props: {},
            };
        }
    })
}


export default function ReportIndexPage(props) {
    if (acceptedScreenExactly(props.loggedInUserInfo, "/")) {
        return CustomerReportPage(props)
    } else {
        return SummaryReportPage(props)
    }
}