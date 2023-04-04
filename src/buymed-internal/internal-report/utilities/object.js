// Scan object, remove key with `undefined` value
export const sanitizeObject = (object, option = {}) => {
	if (typeof object === "undefined") return true;

	if (Array.isArray(object)) {
		for (let i = 0; i < object.length; i++) {
			if (sanitizeObject(object[i])) object.splice(i, 1);
		}
	} else {
		if (typeof object === "object" && object != null) {
			const keys = Object.keys(object);
			for (let i = 0; i < keys.length; i++) {
				if (sanitizeObject(object[keys[i]])) delete object[keys[i]];
				if (option.removeEmptyValues)
					if (object[keys[i]] === "") delete object[keys[i]];
				if (option.removeNullValues)
					if (object[keys[i]] === null) delete object[keys[i]];
			}
		}
	}
};

export const sanitize = (object, option = {}) => {
	const newObj = { ...object };
	sanitizeObject(newObj, option);
	return newObj;
};

export const parseJsonToOjb = (json) => { // default return object
    if (!json) return {}
    const dataParsed = JSON.parse(json)
    return typeof dataParsed === "object" ? dataParsed : {}
}
