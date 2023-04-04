export const storageAvailable = () => {
    let hasLocalStorage = true
    try {
        localStorage;
        window;
    } catch (error) {
        hasLocalStorage = false
    }
    return hasLocalStorage;
}

export const getData = (key) => {
    if(storageAvailable()){
        return localStorage.getItem(key)
    }
    return null;
}

export const pushData = (key, data) => {
    if(storageAvailable()){
        localStorage.setItem(key, data);
        return data;
    }
    return null;
}

export const removeData = (key) => {
    if(storageAvailable()){
        const data = getData(key);
        localStorage.removeItem(key);
        return data;
    }
    return null;
}

export const clearStorage = () => {
    if(storageAvailable()){
        localStorage.clear();
        return true;
    }
    return false;
}