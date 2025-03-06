function sum (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b === 0) throw new Error("Division by 0 is not supported");
    return a / b;
}

let num1 = 8;
let operator = "";
let num2 = 0;
const operators = ["+", "-", "*", "/"];

function operate (operator, a, b) {
    console.log(`Operating ${num1} ${operator} ${num2}`);
    if (operator === "+") return sum(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
}

const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number-button");
const display = document.querySelector("#display");
const operatorButtons = document.querySelectorAll(".operator-button");
const calculateButton = document.querySelector("#calculate");
const clearButton = document.querySelector("#clear");
const eraseButton = document.querySelector("#erase");
const memoryButton = document.querySelector("#memory");

numberButtons.forEach(button => {
    button.addEventListener("click",(e) => {
        if(display.value === "0") display.value = e.target.textContent;
        else display.value += e.target.textContent;
        if (operator === "") num1 = +(display.value);
        if (operator !== "") {
            num2 = +(display.value.split(`${operator}`)[1]);   
        }
    })
});

eraseButton.addEventListener("click", (e) => {
    const erasedValue = display.value.split("").pop();
    display.value = display.value.slice(0, -1);
    if(erasedValue === operator) operator = "";
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if(operator === "") {
            display.value += e.target.textContent;
            operator = e.target.textContent;
        } 
        else if (operator !== "" && !operators.includes(display.value.slice(-1))) {
            num1 = operate(operator, num1, num2);
            num2 = 0;
            display.value = num1 + e.target.textContent;
            operator = e.target.textContent;
        } 
        else {
            display.value = display.value.slice(0, -1) + e.target.textContent;
            operator = e.target.textContent;
        }

    })
});

calculateButton.addEventListener("click", (e) => {
    if(operator === "") return;
    display.value = operate(operator, num1, num2);
    operator = "";
    num1 = +(display.value);
    num2 = 0;
});

clearButton.addEventListener("click", (e) => {
    display.value = "0";
    num1 = 0;
    num2 = 0;
    operator = "";
});

function calculator() {
    
}