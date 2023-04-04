const { APIClient } = require("@thuocsi/nextjs-components/lib/utils");

const URI = "/marketplace/marketing/v1";

class ChatSettingClient extends APIClient{
    constructor(ctx, data) {
        super(ctx, data);
    }

    getChatSetting(){
        return this.call("GET", `${URI}/setting?key=chat_config`)
    }

    updateChatSetting(data){
        return this.call("PUT",`${URI}/settings`, data)
    }

}   

export function getChatSettingClient(ctx, data){
    return new ChatSettingClient(ctx, data);
}