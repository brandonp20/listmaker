const convertButton = document.getElementById('convert-button');
let languageSelector = document.querySelector(".choose-language"); 
let delimiterSelector = document.querySelector(".choose-delimiter");
let customDelimiterButton = document.querySelector(".custom-delimiter-button");

let input = "";

let language = "";
languageSelector.addEventListener('change', function(e) {
    language = e.target.value;
    console.log('Language: ', language);
});

let delimiter = "auto-detect";
delimiterSelector.addEventListener('change', function(e) {
    delimiter = e.target.value;
    console.log('Delimiter: ', delimiter);
});

if (input !== "") {
    if (language = "python") {
        console.log("Python detected");
    } else if (language = "javascript") {
        console.log("JavaScript detected");
    } else if (language ="html") {
        console.log("HTML detected");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const delimiterSelector = document.querySelector(".choose-delimiter");
    const customDelimiterInput = document.querySelector('.custom-delimiter-textbox');

    function toggleCustomDelimiterInput() {
        if (delimiterSelector.value === 'custom') {
            customDelimiterInput.disabled = false;
            customDelimiterInput.style.backgroundColor = '';
            customDelimiterInput.style.cursor = 'text';
            customDelimiterButton.disabled = false;
        } else {
            customDelimiterInput.disabled = true;
            customDelimiterInput.style.backgroundColor = '#f0f0f0';
            customDelimiterInput.style.cursor = 'not-allowed';
        }
    }

    // Initial state
    toggleCustomDelimiterInput();

    // Add event listener for changes
    delimiterSelector.addEventListener('change', toggleCustomDelimiterInput);
});

customDelimiterButton.addEventListener('click', () => {
    const customDelimiterInput = document.querySelector(".custom-delimiter-textbox");
    customDelimiter = customDelimiterInput.value;
    console.log('Custom delimiter set to:', customDelimiter);
});

function normalizeDelimiter(delimiter, input) {
    if (delimiter === 'comma') {
        return input.replace(/,/g, '/\*& ');
    } else if (delimiter === 'comma-space') {
        return input.replace(/, /g, '/\*& ');
    } else if (delimiter === 'period') {
        return input.replace(/\./g,'/\*& ');
    } else if (delimiter === 'line-break') {
        return input.replace(/\n/g, '/\*& ');
    } else if (delimiter === 'space') {
        return input.replace(/ /g,'/\*& ')
    } else if (delimiter === 'custom') {
        const escapedDelimiter = customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedDelimiter, 'g');
        return input.replace(regex, '/\*&');
    } else {
        return input;
    }
}

convertButton.addEventListener('click', function() {
    const language = document.querySelector('.choose-language').value;
    const delimiter = document.querySelector('.choose-delimiter').value;
    const input = document.querySelector('.list-input').value;
    console.log(language, delimiter, input);
    const normalizedInput = normalizeDelimiter(delimiter, input);

    let output;
    if (language === 'python') {
        output = createPythonList(normalizedInput);
    } else if (language === 'javascript') {
        output = createJSList(normalizedInput);
    } else if (language === 'html') {
        output = createHTMLList(normalizedInput);
    } else if (language === 'java') {
        output = createJavaList(normalizedInput);
    } 
    else {
        output = normalizedInput;
    }

    const outputContainer = document.querySelector('.output-container');
    const outputElement = document.querySelector('.list-output');
    outputElement.value = output;
    outputContainer.style.display = "inline";
});

function createPythonList(input) {
    // Split the input into an array
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');

    // Create the Python list string with quotes around each item
    const pythonList = '[' + items.map(item => `"${item}"`).join(', ') + ']';
    output = pythonList;
    return output;
}

function createJSList(input) {
    // Split the input into an array
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');

    // Create the js list string with quotes around each item
    const jsList = '[' + items.map(item => `"${item}"`).join(', ') + ']';
    output = jsList;
    return output;
} 

function createHTMLList(input) {
    // Split the input into an array
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');

    // Create the HTML list
    const htmlList = items.map(item => `  <li>${item}</li>`).join('\n');
    const fullHtmlList = `<ul>\n${htmlList}\n</ul>`;

    output = fullHtmlList;
    return output;
}

function createJavaList(input) {
    // Split the input into an array
    const items = input.split('/\*&').map(item => item.trim()).filter(item => item !== '');

    // Create the Java list string
    const javaList = '(' + items.map(item => `"${item}"`).join(', ') + ');';

    console.log('Java list:', javaList);
    return javaList;
}