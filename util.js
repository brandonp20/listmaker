export function createPythonList(input) {
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');
    const pythonList = '[' + items.map(item => `"${item}"`).join(', ') + ']';
    return pythonList;
}

export function createJSList(input) {
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');
    const jsList = '[' + items.map(item => `"${item}"`).join(', ') + '];';
    return jsList;
}

export function createHTMLList(input) {
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');
    const htmlList = items.map(item => `  <li>${item}</li>`).join('\n');
    const fullHtmlList = `<ul>\n${htmlList}\n</ul>`;
    return fullHtmlList;
}

export function createJavaList(input) {
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');
    const javaList = '(' + items.map(item => `"${item}"`).join(', ') + ');';
    return javaList;
}

export function createCList(input) {
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');
    const cList = '{' + items.map(item => `"${item}"`).join(', ') + '};';
    return cList;
}

export function createRustList(input) {
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');
    const rustList = '[' + items.map(item => `"${item}"`).join(', ') + '];';
    return rustList;
}

export function createRubyList(input) {
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');
    const rubyList = '[' + items.map(item => `"${item}"`).join(', ') + ']';
    return rubyList
}

export function createKotlinList(input) {
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');
    const kotlinList = '(' + items.map(item => `"${item}"`).join(', ') + ')';
    return kotlinList
}