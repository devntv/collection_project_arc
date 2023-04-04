
import React, { useContext } from 'react';
import UserContext from '@thuocsi/nextjs-components/my-context/my-context';

export default function AuthorizationButton({ requiredAPI, children }) {
    const { loggedInUserInfo } = useContext(UserContext);

    if (!loggedInUserInfo) {
        return ""
    }
    if (Array.isArray(requiredAPI)) {
        if (requiredAPI.every(item => loggedInUserInfo.apis.includes(item)) || loggedInUserInfo.apis.includes("ALL/")) {
            return children     
        } else {
            return <React.Fragment></React.Fragment>
        }
    }
    if (requiredAPI && (loggedInUserInfo.apis.includes(requiredAPI) || loggedInUserInfo.apis.includes("ALL/"))) {
        return children
    }

    return <React.Fragment></React.Fragment>
}