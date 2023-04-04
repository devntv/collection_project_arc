const deepLoop = (object) => {
    // leaf level
    if (typeof object === "undefined") return true;
    // node is array
    if (Array.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
            if (deepLoop(object[i])) object.splice(i, 1);
        }
    } else {
        // node is object
        if (typeof object === "object" && object != null) {
            const keys = Object.keys(object);
            for (let i = 0; i < keys.length; i++) {
                if (deepLoop(object[keys[i]])) delete object[keys[i]];
            }
        }
    }
}

export const sanitizeObject = (object) => {
    deepLoop(object);
}