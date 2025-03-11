function sum (a, b) {
    return a + b;
}

function substract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b === 0) throw new Error("Division by 0 is not supported");
    return a / b;
}

function percentage (a, b) {
    if (b === 0) throw new Error("Percentage by 0 is not supported");
    return (a * b / 100);
}

let num1 = 8;
let operator = "";
let num2 = 0;
const operators = ["+", "-", "*", "/", "%"];
let cleanDisplay = 0;

function operate (operator, a, b) {
    console.log(`Operating ${num1} ${operator} ${num2}`);
    if (operator === "+") return sum(a, b);
    if (operator === "-") return substract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
    if (operator === "%") return percentage(a, b);
}

const calculator = document.querySelector(".calculator");
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number-button");
const display = document.querySelector("#display");
const operatorButtons = document.querySelectorAll(".operator-button");
const calculateButton = document.querySelector("#calculate");
const clearButton = document.querySelector("#clear");
const eraseButton = document.querySelector("#erase");
const memoryButton = document.querySelector("#memory");
const periodButton = document.querySelector("#period");
const signButton = document.querySelector("#sign");

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (operator === "") {
            if(display.value === "0") display.value = e.target.textContent;
            else display.value += e.target.textContent;
        }
        if (operator !== "") {
            if (!cleanDisplay) {
                display.value = "";
                cleanDisplay = 1;
            }
            display.value += e.target.textContent;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if(operator === "") {
            operator = e.target.textContent;
            num1 = +(display.value);
            e.target.setAttribute("id", "active");
        } else if (operator !== "" && cleanDisplay) {
            cleanDisplay = 0;
            num2 = +(display.value);
            display.value = operate(operator, num1, num2);
            document.querySelector("#active").removeAttribute("id", "active");
            operator = e.target.textContent;
            e.target.setAttribute("id", "active");
            num1 = +(display.value);
            num2 = 0;
        }   else {
            document.querySelector("#active").removeAttribute("id", "active");
            operator = e.target.textContent;
            e.target.setAttribute("id", "active");
        }
    });
});

periodButton.addEventListener("click", (e) => {
    if (operator !== "" && !cleanDisplay) return;
    if(display.value === "") display.value = "0" + periodButton.textContent;
    if(display.value.includes(periodButton.textContent)) return;
    display.value += periodButton.textContent;
});

calculateButton.addEventListener("click", (e) => {
    if(operator === "") return;
    num2 = +(display.value);
    display.value = operate(operator, num1, num2);
    operator = "";
    num1 = +(display.value);
    num2 = 0;
    cleanDisplay = 0;
    document.querySelector("#active").removeAttribute("id", "active");
});

clearButton.addEventListener("click", (e) => {
    display.value = "0";
    num1 = 0;
    num2 = 0;
    operator = "";
    cleanDisplay = 0;
    periodButton.disabled = false;
    if (document.querySelector("#active")) document.querySelector("#active").removeAttribute("id", "active");
    
});

eraseButton.addEventListener("click", (e) => {
    display.value = display.value.slice(0, -1);
});

signButton.addEventListener("click", (e) => {
    if (+(display.value) === 0) return;
    display.value = (+(display.value) * -1).toString();     
});