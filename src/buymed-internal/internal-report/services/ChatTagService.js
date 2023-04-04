
export const TagCode = {
    SP:"@SP_",
    DH:"@DH_",
    HOTRO:"@HOTRO_",
    // MAKM:"@MAKM_",
    // CTKM:"@CTKM_",
}

export const tagList =[
    {
        code: TagCode.SP,
        image: "/images/tags/SP.svg",
        title: "Tìm kiếm và tag một sản phẩm",
        guide: `${TagCode.SP}<Tên sản phẩm>`,

    },
    {
        code: TagCode.DH,
        image: "/images/tags/DH.svg",
        title: "Tìm kiếm và tag một đơn hàng của khách hàng",
        guide: `${TagCode.DH}<Mã đơn hàng>`,
    },
    // {
    //     code: TagCode.MAKM,
    //     image: "/images/tags/promo-code.png",
    //     title: "Tìm kiếm và tag một mã giảm giá",
    //     guide: `${TagCode.MAKM}<Mã giảm giá>`,
    // },
    // {
    //     code: TagCode.CTKM,
    //     image: "/images/tags/tag.png",
    //     title: "Tìm kiếm và tag chương trình khuyến mãi",
    //     guide: `${TagCode.CTKM}<CT khuyến mãi>`,
    // },
    {
        code: TagCode.HOTRO,
        image: "/images/tags/HOTRO.svg",
        title: "Tìm kiếm và tag một phiếu hỗ trợ",
        guide: `${TagCode.HOTRO}<Mã phiếu hỗ trợ>`,
    },
]

export const searchTagCode = (str) => {
    const result = [];
    tagList.forEach(tag => {
        if(tag.code.includes(str.toUpperCase())){
            result.push(tag);
        }
    });
    return result;
}

export const isStartTag = (text) => {
    const n = tagList.length;
    let first = text.length;
    let j = -1;
    for(let i = 0 ; i < n ; i++){
        // let index = text.indexOf(tagList[i].code);
        let index = text.toLowerCase().indexOf(tagList[i].code.toLowerCase());
        if(index >= 0 && index < first){
            first = index;
            j = i;
        }
    }
    if(first < text.length && j >= 0){
        return tagList[j];
    }
    return null;
}

export const startTagAt = (text, tag = "") => {
    if(tag.length > 0){
        let index = text.indexOf(tag);
        index = index >= 0 ? index : text.indexOf(tag.toLowerCase());
        return {
            start: index,
            tag,
        };
    }
    const n = tagList.length;
    let first = text.length;
    let resultTag = null;
    for(let i = 0 ; i < n ; i++){
        let index = text.indexOf(tagList[i].code);
        index = index >= 0 ? index : text.indexOf(tagList[i].code.toLowerCase());
        if(index >= 0 && index < first){
            first = index;
            resultTag = tagList[i];
        }
    }
    if(first === text.length || first < 0){
        return null;
    }
    return {
        start: first,
        tag: resultTag.code,
    };
}

export const startTagMenuCommandAt = (text) => {
    const n = tagList.length;
    let first = text.length;
    let index = -1;
    while(true){
        index = text.indexOf("@", index+1);
        if(index < 0){
            return -1;
        }
        else{
            const sub = text.substring(index);
            for(let i = 0 ; i < n ; i++){
                if(index >= 0  && tagList[i].code.includes(sub.toUpperCase())){
                    return index;
                }
            }
        }
    }
    return -1;
}
