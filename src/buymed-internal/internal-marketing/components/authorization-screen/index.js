
import { useContext } from 'react';
import UserContext from '@thuocsi/nextjs-components/my-context/my-context';
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";

export default function AuthorizationScreen({ linkAddress, children }) {
    const { loggedInUserInfo } = useContext(UserContext);
    const router = useRouter()

    if (!loggedInUserInfo) {
        return ""
    }

    if (!loggedInUserInfo.screens.includes("/") && !(loggedInUserInfo.screens.includes(router.pathname) || loggedInUserInfo.screens.includes("=" + router.pathname))) {
        return (
            <AppMarketing>
                 <NotFound linkAddress={linkAddress} linkLabel={"Trang chủ"} />
            </AppMarketing>
        )
    }

    return children
}