const { APIClient } = require("@thuocsi/nextjs-components/lib/utils");

const URI = "/marketplace/marketing/v1";

class InsiderSettingClient extends APIClient{
    constructor(ctx, data) {
        super(ctx, data);
    }

    getInsiderSetting(data){
        return this.call("GET", `${URI}/insider-setting`,data)
    }

    updateInsiderSetting(data){
        return this.call("PUT",`${URI}/insider-setting`, data)
    }

}   

export function getInsiderSettingClient(ctx, data){
    return new InsiderSettingClient(ctx, data);
}