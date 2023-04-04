import {doWithLoggedInUser, renderWithLoggedInUser} from "@thuocsi/nextjs-components/lib/login";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData)
}

export async function loadData(ctx) {

}

export default function NewReportPage(props) {
    return renderWithLoggedInUser(props, renderNewReportPage)
}

export function renderNewReportPage({report, __lang}) {

}