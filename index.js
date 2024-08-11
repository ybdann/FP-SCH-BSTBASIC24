var inputScreen = document.querySelector('#inputScreen');
var outputScreen = document.querySelector('#outputScreen');
var btn = document.querySelectorAll('.btn');
var isDegrees = true;
var lastAnswer = '';
var isNewInput = false;

for (item of btn) {
    item.addEventListener('click', (e) => {
        let btntext = e.target.innerText;

        if (btntext == '×') {
            btntext = '*';
        }

        if (btntext == '÷') {
            btntext = '/';
        }

        if (['sin', 'cos', 'tan', 'arcsin', 'arccos', 'arctan', 'ANS'].includes(btntext)) {
            return;
        }

        if (isNewInput) {
            inputScreen.value = '';
            outputScreen.value = '';
            isNewInput = false;
        }

        inputScreen.value += btntext;
    });
}

function setAngleMode(mode) {
    isDegrees = (mode === 'deg');
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function sin() {
    let value = parseFloat(inputScreen.value);
    value = isDegrees ? toRadians(value) : value;
    outputScreen.value = Math.sin(value);
    isNewInput = true;
}

function cos() {
    let value = parseFloat(inputScreen.value);
    value = isDegrees ? toRadians(value) : value;
    outputScreen.value = Math.cos(value);
    isNewInput = true;
}

function tan() {
    let value = parseFloat(inputScreen.value);
    value = isDegrees ? toRadians(value) : value;
    outputScreen.value = Math.tan(value);
    isNewInput = true;
}

function arcsin() {
    let value = parseFloat(inputScreen.value);
    let result = Math.asin(value);
    outputScreen.value = isDegrees ? toDegrees(result) : result;
    isNewInput = true;
}

function arccos() {
    let value = parseFloat(inputScreen.value);
    let result = Math.acos(value);
    outputScreen.value = isDegrees ? toDegrees(result) : result;
    isNewInput = true;
}

function arctan() {
    let value = parseFloat(inputScreen.value);
    let result = Math.atan(value);
    outputScreen.value = isDegrees ? toDegrees(result) : result;
    isNewInput = true;
}

function sq() {
    let value = parseFloat(inputScreen.value);
    inputScreen.value += '^2';
    outputScreen.value = Math.pow(value, 2);
    isNewInput = true;
}

function cubic() {
    let value = parseFloat(inputScreen.value);
    inputScreen.value += '^3';
    outputScreen.value = Math.pow(value, 3);
    isNewInput = true;
}

function cbrt() {
    inputScreen.value += '∛(';
    isNewInput = false;
}

function sqrt() {
    inputScreen.value += '√(';
    isNewInput = false;

}

function absolute() {
    inputScreen.value += '|';
    isNewInput = false;
}

function ln() {
    inputScreen.value += 'ln(';
    isNewInput = false;
}

function log() {
    inputScreen.value += 'log(';
    isNewInput = false;
}

function pi() {
    inputScreen.value += 'π';
    isNewInput = false;
}

function e() {
    inputScreen.value += 'e';
    isNewInput = false;
}

function fact() {
    inputScreen.value += '!';
    isNewInput = false;

}

function backspc() {
    inputScreen.value = inputScreen.value.substr(0, inputScreen.value.length - 1);
}

function clearScreen() {
    inputScreen.value = '';
    outputScreen.value = '';
}

function plusminus() {
    let value = parseFloat(inputScreen.value);
    outputScreen.value = -value;
    isNewInput = true;
}

function calculate() {
    try {
        let expression = inputScreen.value.replace(/ANS/g, lastAnswer)
                                          .replace(/π/g, '*Math.PI')
                                          .replace(/e/g, '*Math.E')
                                          .replace(/(\d)(Math\.)/g, '$1*$2')
                                          .replace(/\|(.+?)\|/g, 'Math.abs($1)')
                                          .replace(/ln\((.+?)\)/g, 'Math.log($1)')
                                          .replace(/log\((.+?)\)/g, 'Math.log10($1)')
                                          .replace(/√\((.+?)\)/g, 'Math.sqrt($1)')
                                          .replace(/∛\((.+?)\)/g, 'Math.cbrt($1)')
                                          .replace(/(\d+)!/g, 'factorial($1)');
        lastAnswer = eval(expression);
        outputScreen.value = lastAnswer;
        isNewInput = true;
    } catch (e) {
        outputScreen.value = 'Error';
    }
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

function useAns() {
    inputScreen.value = '';
    inputScreen.value += 'ANS';
    isNewInput = false;
}

