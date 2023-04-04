export function acceptedScreenExactly(loggedInUserInfo, link) {
    if (loggedInUserInfo?.screens) {
        const havePermission = loggedInUserInfo?.screens?.find(item => {
            if (item.startsWith("=")) {
                if (link === item.substr(1)) {
                    return true
                }
            }
            return item === link || item === "/"
        })

        if (havePermission) {
            return true
      } else {
          return false
      }
    } else {
        return false
    }
}

export function existPermission(loggedInUserInfo, permission) {
    let result = false;
    loggedInUserInfo.roles.forEach(item => {
        if (item.permissions?.includes(permission)) {
            result = true;
        }
    })
    return result
}