import { doWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import Gamification, { loadData } from "./marketing/gamification";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx))
}

export default function MarketingIndexPage(props) {
    return Gamification(props)
}