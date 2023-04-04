import { ACTION, PERMISSION, PERMISSION_ACTION } from "../lib/chat/permission"
import { ACTION as ACTION_EMS, PERMISSION as PERMISSION_EMS, PERMISSION_ACTION as PERMISSION_ACTION_EMS } from "../lib/ems/permission"

export {
    ACTION,
    PERMISSION,
    PERMISSION_ACTION,
    ACTION_EMS,
    PERMISSION_EMS,
    PERMISSION_ACTION_EMS
}


export const getUserActionByPermission = (permissions) => {
    const action = new Set();
    permissions.forEach(item => {
        if (item && PERMISSION_ACTION[PERMISSION[item]]) {
            PERMISSION_ACTION[PERMISSION[item]].forEach(a => {
                action.add(a);
            })
        }
    });
    return [...action];
}