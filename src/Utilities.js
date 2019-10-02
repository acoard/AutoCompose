export const ensure = (context, object, keys) => {
    [].concat(keys).forEach(key => {
        if (typeof object[key] === 'undefined') {
            throw new Error(`AutoCompose: Missing required parameter, ${context}.${key}`);
        }
    });
};
export const ensureAnyOf = (context, object, keys) => {
    let currentKey;
    if (!keys.some(key => (
        typeof object[currentKey = key] !== 'undefined'
    ))) throw new Error(`AutoCompose: Missing required parameter, ${context}.${currentKey}`);
};
export const ensureType = (context, object, key, type) => {
    [].concat(object[key]).forEach(value => {
        const valueType = typeof value;
        if (valueType !== type && valueType !== 'undefined') {
            throw new TypeError(`AutoCompose: Invalid Type for ${context}.${key}, expected ${type}`);
        }
    });
};

export const getComputedStyle = (element, style) =>
    window.getComputedStyle(element).getPropertyValue(style);

export const getGlobalOffset = $0 => {
    let node = $0, top = 0, left = 0;

    do {
        left += node.offsetLeft;
        top += node.offsetTop;
    } while (node = node.offsetParent);

    return {left, top};
};

export const getScrollLeftForInput = input => {
    if (input.createTextRange) {
        const range = input.createTextRange();
        const inputStyle = window.getComputedStyle(input);
        const paddingLeft = parseFloat(inputStyle.paddingLeft);
        const rangeRect = range.getBoundingClientRect();
        return input.getBoundingClientRect().left + input.clientLeft + paddingLeft - rangeRect.left;
    } else {
        return input.scrollLeft;
    }
};

export const getCursorPosition = input => {
    return [input.selectionStart, input.selectionEnd].sort((a, b) => a - b);
};

export const getSelectedTextNodes = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    let { startContainer, startOffset } = range;
    const direction = selection.anchorNode === startContainer &&
        selection.anchorOffset === startOffset;

    if (startContainer.nodeType !== startContainer.TEXT_NODE) {
        startContainer = startContainer.childNodes[startOffset];
        while (startContainer && startContainer.nodeType !== startContainer.TEXT_NODE) {
            startContainer = startContainer.firstChild;
        }
        startOffset = 0;
    }

    let { endContainer, endOffset } = range;
    if (endContainer.nodeType !== endContainer.TEXT_NODE) {
        endContainer = endContainer.childNodes[endOffset];
        while (endContainer && endContainer.nodeType !== endContainer.TEXT_NODE) {
            endContainer = endContainer.lastChild;
        }
        endOffset = endContainer ? endContainer.nodeValue.length : endContainer;
    }

    return { startContainer, startOffset, endContainer, endOffset, direction };
};

export const makeAsyncQueueRunner = () => {
    let i = 0;
    let queue = [];

    return (f, j) => {
        queue[j - i] = f;
        while (queue[0]) ++i, queue.shift()();
    };
};

export const data = (element, key, value) => {
    key = 'autosuggest_' + key;
    if (typeof value !== 'undefined') {
        element.dataset[key] = JSON.stringify(value);
    } else {
        value = element.dataset[key];
        return typeof value !== 'undefined' ? JSON.parse(element.dataset[key]) : value;
    }
};

export const createNode = html => {
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild; 
};
