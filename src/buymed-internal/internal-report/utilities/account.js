import { getAccountClient } from "../clients/account";
import { APIStatus } from "../lib/common";

export const isLoggedIn = async (context) => {
    const {req} = context;
    const isFromOtherSite = (()=>{
        if(!req.headers.host){
            return false;
        }
        if(req.headers.host.includes("internal")){
            return true
        }
        return false;
    })()
    if(!req.cookies){
        return false;
    }
    if(!req.cookies.session_token || (!isFromOtherSite && !req.cookies.type)){
        return false;
    }
    const accountClient = getAccountClient(context, {});
    const authResp = await accountClient.getInfo((!isFromOtherSite) ? req.cookies.type : "EMPLOYEE" );
    if (authResp.status != APIStatus.OK) {
        return false;
    }
    return true;
}