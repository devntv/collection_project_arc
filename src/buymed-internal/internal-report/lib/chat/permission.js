import PageError from "../../components/PageError/PageError"

export const ACTION = {
    VIEW_MENU_CHAT: "VIEW_MENU_CHAT",
    WORK_WITH_MY_CHAT: "WORK_WITH_MY_CHAT",
    VIEW_MENU_MANAGE_INTERNAL_SELLER_CHAT: "VIEW_MENU_MANAGE_INTERNAL_SELLER_CHAT",
    VIEW_LIST_MANAGE_INTERNAL_SELLER_CHAT: "VIEW_LIST_MANAGE_INTERNAL_SELLER_CHAT",
    VIEW_BUTTON_HISTORY_IN_LIST_MANAGE_INTERNAL_SELLER_CHAT: 'VIEW_BUTTON_HISTORY_IN_LIST_MANAGE_INTERNAL_SELLER_CHAT',
    VIEW_BUTTON_CHAT_IN_LIST_MANAGE_INTERNAL_SELLER_CHAT: "VIEW_BUTTON_CHAT_IN_LIST_MANAGE_INTERNAL_SELLER_CHAT",
    VIEW_ANOTHER_CS_CHAT: "VIEW_ANOTHER_CS_CHAT",
    REPLY_ANOTHER_CS_CHAT: "REPLY_ANOTHER_CS_CHAT",
    VIEW_CONVERSATION_HISTORY_SCREEN: "VIEW_CONVERSATION_HISTORY_SCREEN",
    VIEW_MENU_REPORT_AND_ALL_SUB_REPORT_ITEM:"VIEW_MENU_REPORT_AND_ALL_SUB_REPORT_ITEM",
    VIEW_REPORT_AND_EXPORT_EXCEL:"VIEW_REPORT_AND_EXPORT_EXCEL",
    VIEW_CHAT_SETTING:"VIEW_CHAT_SETTING",
    VIEW_MENU_CHAT_SETTING:"VIEW_MENU_CHAT_SETTING",
    UPDATE_CHAT_SETTING:"UPDATE_CHAT_SETTING",
    VIEW_MENU_CHAT_PERMISSION:"VIEW_MENU_CHAT_PERMISSION",
    UPDATE_CHAT_PERMISSION:"UPDATE_CHAT_PERMISSION",
    UPDATE_QUICK_MESSAGE_CONFIG: "UPDATE_QUICK_MESSAGE_CONFIG",
    VIEW_MENU_MESSAGE_CONFIG:"VIEW_MENU_MESSAGE_CONFIG"
}
export const PERMISSION = {
    BASIC_SUPPORT: 'BASIC_SUPPORT',
    VIEW_LIST_CS_CONVERSATION: "VIEW_LIST_CS_CONVERSATION",
    VIEW_HISTORY_CS_CONVERSATION: "VIEW_HISTORY_CS_CONVERSATION",
    VIEW_CHAT_WITHOUT_ASSIGNEE: "VIEW_CHAT_WITHOUT_ASSIGNEE",
    SUPPORT_CHAT_WITHOUT_ASSIGNEE: "SUPPORT_CHAT_WITHOUT_ASSIGNEE",
    VIEW_REPORT:"VIEW_REPORT",
    VIEW_CHAT_SETTING:"VIEW_CHAT_SETTING",
    UPDATE_CHAT_SETTING:"UPDATE_CHAT_SETTING",
    VIEW_AND_UPDATE_CHAT_PERMISSION:"VIEW_AND_UPDATE_CHAT_PERMISSION",
    VIEW_AND_UPDATE_QUICK_MESSAGE_CONFIG: "VIEW_AND_UPDATE_QUICK_MESSAGE_CONFIG",
    REPORT_CHAT_SUPPORT_SELLER: "REPORT_CHAT_SUPPORT_SELLER"
}

export const PERMISSION_ACTION = {
    [PERMISSION.BASIC_SUPPORT]: [
        ACTION.VIEW_MENU_CHAT,
        ACTION.WORK_WITH_MY_CHAT
    ],
    [PERMISSION.VIEW_LIST_CS_CONVERSATION]: [
        ACTION.VIEW_MENU_MANAGE_INTERNAL_SELLER_CHAT,
        ACTION.VIEW_LIST_MANAGE_INTERNAL_SELLER_CHAT
    ],
    [PERMISSION.VIEW_HISTORY_CS_CONVERSATION]: [
        ACTION.VIEW_BUTTON_HISTORY_IN_LIST_MANAGE_INTERNAL_SELLER_CHAT,
        ACTION.VIEW_CONVERSATION_HISTORY_SCREEN
    ],
    [PERMISSION.VIEW_CHAT_WITHOUT_ASSIGNEE]: [
        ACTION.VIEW_BUTTON_CHAT_IN_LIST_MANAGE_INTERNAL_SELLER_CHAT,
        ACTION.VIEW_MENU_CHAT,
        ACTION.VIEW_ANOTHER_CS_CHAT
    ],
    [PERMISSION.SUPPORT_CHAT_WITHOUT_ASSIGNEE]: [
        ACTION.VIEW_BUTTON_CHAT_IN_LIST_MANAGE_INTERNAL_SELLER_CHAT,
        ACTION.VIEW_MENU_CHAT,
        ACTION.REPLY_ANOTHER_CS_CHAT,
        ACTION.WORK_WITH_MY_CHAT,
    ],
    [PERMISSION.VIEW_REPORT]: [
        ACTION.VIEW_MENU_REPORT_AND_ALL_SUB_REPORT_ITEM,
        ACTION.VIEW_REPORT_AND_EXPORT_EXCEL,
    ],
    [PERMISSION.VIEW_CHAT_SETTING]: [
        ACTION.VIEW_MENU_CHAT_SETTING,
        ACTION.VIEW_CHAT_SETTING,
    ],
    [PERMISSION.UPDATE_CHAT_SETTING]: [
        ACTION.VIEW_MENU_CHAT_SETTING,
        ACTION.UPDATE_CHAT_SETTING,
    ],
    [PERMISSION.VIEW_AND_UPDATE_CHAT_PERMISSION]: [
        ACTION.VIEW_MENU_CHAT_PERMISSION,
        ACTION.UPDATE_CHAT_PERMISSION,
    ],
    [PERMISSION.VIEW_AND_UPDATE_QUICK_MESSAGE_CONFIG]: [
        ACTION.UPDATE_QUICK_MESSAGE_CONFIG,
        ACTION.VIEW_MENU_MESSAGE_CONFIG,
    ],
}

const screens = [
    {
        path: "=/chat",
        action: ACTION.VIEW_MENU_CHAT,
    },
    {
        path: "=/chat/setting",
        action: ACTION.VIEW_MENU_CHAT_SETTING,
    },
    {
        path: "=/chat/setting/permission",
        action: ACTION.VIEW_MENU_CHAT_PERMISSION,
    },
    {
        path: "=/chat/setting/quick-message",
        action: ACTION.VIEW_MENU_MESSAGE_CONFIG,
    },
    {
        path: "=/chat/conversations/internal",
        action: ACTION.VIEW_MENU_MANAGE_INTERNAL_SELLER_CHAT,
    },
    {
        path: "/chat/report",
        action: ACTION.VIEW_MENU_REPORT_AND_ALL_SUB_REPORT_ITEM,
    },
    {
        path:"/chat/conversations/history",
        action: ACTION.VIEW_CONVERSATION_HISTORY_SCREEN
    }
]

export const availableScreens = (actions) => {
    return screens.filter(item => {
        const a = (actions || []).map(item => item.code)
        return a.includes(item.action)
    }).map(item => item.path)
}

function comparePath(input, permission) {
    if (permission.startsWith("=")) {
        if (input === permission.substr(1)) {
            return true
        }
    } else if (input.startsWith(permission)) {
        return true
    }
    return false
}

export const acceptedChatScreenPath = (chatPermission, path) => {
    if(!chatPermission || !chatPermission.actions){
        return false
    }
    const {actions} = chatPermission;
    const myScreens = availableScreens(actions);
    let accepted = false;
    for(let i = 0 ; i < myScreens.length; i++){
        if(comparePath(path, myScreens[i])){
            accepted = true;
            break;
        }
    }
    return accepted;
}

export const renderWithPermissionUser = (router, props, callback) => {
    if (props.loggedIn !== false) {
        // validate permissions
        const chatPermission = props.chatPermission;
        if(!chatPermission){
            return PageError({...props, hasLayout:true})
        }
        const path = router.asPath.split("?")[0]
        let accepted = acceptedChatScreenPath(chatPermission, path)
        if(!accepted){
            return PageError({...props, hasLayout:true})
        }
        return callback(props) || null
    }

    // if not
    else {


        // do hard redirect to /login
        if (typeof window != "undefined") {
            window.location.href = "/login?url=" + router.asPath
        }
    }

    return null
}