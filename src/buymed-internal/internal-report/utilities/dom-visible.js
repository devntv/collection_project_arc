export const isElementInViewport = (el, parentRect) => {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    const rect = el.getBoundingClientRect();
    return (
        (rect.top) >= parentRect.top && 
        (rect.bottom) <= (parentRect.bottom)
    );
}

export const onVisibilityChange = (el, parentRect,  callback) => {
    let old = false;
    return () => {
        const visible = isElementInViewport(el, parentRect);
        if (visible !== old) {
            old = visible;
            if (typeof callback == 'function') {
                callback(visible);
            }
        }
    }
}