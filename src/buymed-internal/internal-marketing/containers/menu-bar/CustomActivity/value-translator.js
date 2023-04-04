const patternParsers = {}

export default async function translateValues(templateName, fields){ // array of {name, value}
    for (let i = 0; i < fields.length; i++){
        let field = fields[i]
        let key = templateName + "." + field.rawKey
        if (patternParsers[key]){
            field.value = await patternParsers[key](field.value)
        }
    }
    return fields
}

export function registerTranslator(templateName, fieldName, func){
    patternParsers[templateName + "." + fieldName] = func
}

export function registerTranslatorMap(dictionaryMap){
    for (let templateCode in dictionaryMap){
        if (typeof dictionaryMap[templateCode] === "object") {
            for (let fieldName in dictionaryMap[templateCode]) {
                if (typeof dictionaryMap[templateCode][fieldName] === "function") {
                    patternParsers[templateCode + "." + fieldName] = dictionaryMap[templateCode][fieldName]
                }
            }
        }
    }
}

