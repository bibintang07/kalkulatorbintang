// script.js 
const calculator = document.querySelector('.calculator'); 
const keys = calculator.querySelector('.calculator-keys'); 
const display = calculator.querySelector('.calculator-screen'); 

//Variabel untuk menyimpan keadaan kalkulator
let firstValue = null; 
let operator = null; 
let waitingForSecondValue = false; 
 
function calculate(n1, operator, n2) { 
    const num1 = parseFloat(n1); 
    const num2 = parseFloat(n2); 
 
    if (operator === '+') return num1 + num2; 
    if (operator === '-') return num1 - num2; 
    if (operator === '*') return num1 * num2; 
    if (operator === '/') return num1 / num2; 
     
    return n2; 
} 
 
function inputDigit(digit) { 
    if (waitingForSecondValue) { 
        display.value = digit; 
        waitingForSecondValue = false; 
    } else { 
        display.value = display.value === '0' ? digit : display.value + digit; 
    } 
} 
 
function inputDecimal(dot) { 
    if (waitingForSecondValue) { 
        display.value = '0.'; 
        waitingForSecondValue = false; 
        return; 
    } 
    if (!display.value.includes(dot)) { 
        display.value += dot; 
    } 
} 
 
function handleOperator(nextOperator) { 
    const inputValue = display.value; 
 
    if (firstValue === null) { 
        firstValue = inputValue; 
    } else if (operator) { 
        const result = calculate(firstValue, operator, inputValue); 
        display.value = String(result); 
        firstValue = String(result); 
    } 
 
    waitingForSecondValue = true; 
    operator = nextOperator; 
} 
 
function resetCalculator() { 
    display.value = '0'; 
    firstValue = null; 
    operator = null; 
    waitingForSecondValue = false; 
} 
 
keys.addEventListener('click', (event) => { 
    const { target } = event; 
    const value = target.value; 
 
    if (!target.matches('button')) { 
        return; 
    } 
 
    switch (value) { 
        case '+': 
        case '-': 
        case '*': 
        case '/': 
            handleOperator(value); 
            break; 
        case '=': 
            if (operator) { 
                handleOperator(value); 
                operator = null; 
            } 
            break; 
        case '.': 
            inputDecimal(value); 
            break; 
        case 'all-clear': 
            resetCalculator(); 
            break; 
        default: 
            if (Number.isInteger(parseFloat(value))) { 
                inputDigit(value); 
            } 
    } 
}); 
 
resetCalculator();
