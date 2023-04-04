export const getCaretPosition = (editableDiv) => {
    let caretOffset = 0;
    const doc = editableDiv.ownerDocument || editableDiv.document;
    const win = doc.defaultView || doc.parentWindow;
    let sel = null;;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            const range = win.getSelection().getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(editableDiv);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        const textRange = sel.createRange();
        const preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(editableDiv);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}
export const setCaretPosition = (elem, pos) => {

              
   try {
     // Creates range object
     const setpos = document.createRange();
        
     // Creates object for selection
     const set = window.getSelection();
         
     // Set start position of range
     console.log(elem.childNodes, pos);
     let index = 0;
    let copyPost = pos;
     while(elem.childNodes[index] && copyPost > elem.childNodes[index].length){
        console.log(copyPost, elem.childNodes[index].length);
        copyPost -= elem.childNodes[index].length;
        index += 1;
     }
     console.log(index);
     console.log(elem.childNodes[index], pos);
    setpos.setStart(elem.childNodes[index] || elem, pos);

     // Collapse range within its boundary points
     // Returns boolean
     setpos.collapse(true);
         
     // Remove all ranges set
     set.removeAllRanges();
         
     // Add range with respect to range object.
     set.addRange(setpos);
         
     // Set cursor on focus
     elem.focus();
   } catch (error) {
        console.log(error);
   }
}

export function getCaretClientPosition() {
    const x = 0, y = 0;
    const sel = window.getSelection();
    if (sel.rangeCount) {

        const range = sel.getRangeAt(0);
        const needsToWorkAroundNewlineBug = (range.startContainer.nodeName.toLowerCase() == 'p'
                                           && range.startOffset == 0);

        if (needsToWorkAroundNewlineBug) {
            x = range.startContainer.offsetLeft;
            y = range.startContainer.offsetTop;
        } else {
            if (range.getClientRects) {
                const rects = range.getClientRects();
                if (rects.length > 0) {
                    x = rects[0].left;
                    y = rects[0].top;
                }
            }
        }
    }
    return { x: x, y: y };
}

export const focusAtTheEnd = (el) => {
    if(!el){
        return;
    }
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        let textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}