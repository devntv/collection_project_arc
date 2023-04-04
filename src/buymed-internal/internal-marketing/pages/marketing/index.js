import { doWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import Gamification, { loadData } from "./gamification";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData)
}

export default function MarketingIndexPage(props) {
    return Gamification(props)
}