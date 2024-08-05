import { createPythonList, createJSList, createHTMLList, createJavaList, createCList,createRustList, createRubyList, createKotlinList } from './util.js';

const convertButton = document.getElementById('convert-button');
let languageSelector = document.querySelector(".choose-language"); 
let delimiterSelector = document.querySelector(".choose-delimiter");
let customDelimiterButton = document.querySelector(".custom-delimiter-button");
let copyButton = document.querySelector(".copy-button");
const languageErrorMessage = document.querySelector(".language-error-message");
const customDelimiterInput = document.querySelector('.custom-delimiter-textbox');
const darkModeButton = document.querySelector(".dark-mode-button");
const bodyStyling = document.querySelector('body');
const inputTextbox = document.querySelector('.list-input');
const outputTextbox = document.querySelector('.list-output');

let darkMode = false;

darkModeButton.addEventListener('click', () => {
    if (darkMode === false) {
        console.log("Dark mode enabled");
        bodyStyling.style.color = 'antiquewhite';
        bodyStyling.style.backgroundColor = 'black';
        inputTextbox.style.backgroundColor = '#c8bcac';
        outputTextbox.style.backgroundColor = '#c8bcac';
        darkMode = true;
    } else {
        console.log("Dark mode disabled");
        bodyStyling.style.color = 'black';
        bodyStyling.style.backgroundColor = 'antiquewhite';
        inputTextbox.style.backgroundColor = '';
        outputTextbox.style.backgroundColor = '';
        darkMode = false;
    }
});

let customDelimiter = "";

let input = "";
let output = "";
const outputElement = document.querySelector('.list-output');

let language = "";
languageSelector.addEventListener('change', function(e) {
    language = e.target.value;
    console.log('Language: ', language);
    languageErrorMessage.style.display='none';
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

    if (language === 'default') {
        languageErrorMessage.style.display = "flex";
    } else {
        if (language === 'python') {
            output = createPythonList(normalizedInput);
        } else if (language === 'javascript') {
            output = createJSList(normalizedInput);
        } else if (language === 'html') {
            output = createHTMLList(normalizedInput);
        } else if (language === 'java') {
            output = createJavaList(normalizedInput);
        } else if (language === 'rust') {
            output = createRustList(normalizedInput);
        } else if (language === 'c') {
            output = createCList(normalizedInput);
        } else if (language === 'ruby') {
            output = createRubyList(normalizedInput);
        } else if (language === 'kotlin') {
            output = createKotlinList(normalizedInput);
        } else {
            output = normalizedInput;
        }

        const outputContainer = document.querySelector('.output-container');
        outputElement.value = output;
        outputContainer.style.display = "inline";
    }
});

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(outputElement.value);
});