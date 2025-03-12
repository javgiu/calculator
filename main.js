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

function percentage (a, b) {
    if (b === 0) throw new Error("Percentage by 0 is not supported");
    return (a * b / 100);
}

function roundToTenDecimal (number) {
    return +(number.toFixed(10));
}

function operate (operator, a, b) {
    console.log(`Operation: ${operator}, Numbers: ${a}, ${b}`);
    let result = 0;
    if (operator === "+") result = roundToTenDecimal(sum(a, b));
    if (operator === "-") result = roundToTenDecimal(subtract(a, b));
    if (operator === "*") result = roundToTenDecimal(multiply(a, b));
    if (operator === "/") result = roundToTenDecimal(divide(a, b));
    if (operator === "%") result = roundToTenDecimal(percentage(a, b));
    if (result.toString().length > 15) return result.toExponential(10);
    else return result;
}

let num1 = 8;
let operator = "";
let num2 = 0;

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operators = ["+", "-", "*", "/", "%"];

// Store if the display is clean or not
let cleanDisplay = 0;

// Store number of digits in the display
let displayDigits = "0";

// Store decimal places in the display
let decimalPlaces = "";

// Node variables for buttons

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

// Listeners for button clicks

numberButtons.forEach(button => {
    button.addEventListener("click", printNumber);
});

operatorButtons.forEach(button => {
    button.addEventListener("click", setOperator);
});

periodButton.addEventListener("click", printPeriod);

calculateButton.addEventListener("click", calculate);

clearButton.addEventListener("click", resetCalculator);

eraseButton.addEventListener("click", erase);

signButton.addEventListener("click", changeSign);


// Functions for button clicks

function printNumber (e) {
    
    // Clean the display when we need it (if clanDisplay = 0)
    if (!cleanDisplay) {
        display.value = "";
        cleanDisplay = 1;
    }

    // Update the number of digits
    displayDigits = (Array.from(display.value)).filter(item => numbers.includes(item)).join("");

    // Update the decimal places if the display has a decimal point
    if (display.value.includes(".")) decimalPlaces = display.value.split(".")[1];
        
    // Substitute 0 with the clicked number
    if (display.value === "0") display.value = e.target.textContent;

    // Limit the number of digits to 15
    if (displayDigits.length < 15 && decimalPlaces.length < 10) {
         // Add the clicked number to the display    
        display.value += e.target.textContent;

    } else

        // Display an alert if the maximum number of digits or decimal places is reached
        displayDigits.length === 15? alert("Maximum number of digits reached: 15 digits") : alert("Maximum number of decimal places reached: 10 decimal places");
}

function setOperator (e) {

    // If the operator is not set
    if (operator === "") {
        // Store the operator from the clicked button
        operator = e.target.textContent;
        // Store the number1 from the display
        num1 = +(display.value);
        // Set a new class to the clicked button for an active state
        e.target.classList.add("active");
        // Set the cleanDisplay flag to 0 to allow clean display when entering a new number
        cleanDisplay = 0;

    // If the operator is already set and a new number is entered (display was cleaned)
    } else if (operator !== "" && cleanDisplay) {
        // set the number2 from the display
        num2 = +(display.value);
        // Perform the operation and update the display
        display.value = operate(operator, num1, num2);
        // Remove the active class from the previous operator button
        document.querySelector(".active").classList.remove("active");
        // Reset the cleanDisplay flag to 0 to allow clean display when entering a new number
        cleanDisplay = 0;
        // Store the operator from the clicked button
        operator = e.target.textContent;
        // Set the active class to the clicked button for an active state
        e.target.classList.add("active");
        // Store num1 from the display
        num1 = +(display.value);
        // Reset num2 to 0 to allow the next operation
        num2 = 0;
    // If the operator is already set and not new number is entered (display was not cleaned)
    } else {
        // Remove the active class from the previous operator button
        document.querySelector(".active").classList.remove("active");
        // Store the operator from the clicked button
        operator = e.target.textContent;
        // Set the active class to the clicked button for an active state
        e.target.classList.add("active");
    }
}

function printPeriod () {
    // Disable the period button after clicking an operator button
    if (operator !== "" && !cleanDisplay) return;

    // Add 0 + . if the display is empty or 0
    if(display.value === "" || display.value === "0") {
        display.value = "0" + periodButton.textContent;
        cleanDisplay = 1;
    }

    // Disable the period button if it's already present in the display
    if(display.value.includes(periodButton.textContent)) return;

    // Add a period to the display
    display.value += periodButton.textContent;
}

function changeSign () {
    // If display value is 0, do nothing
    if (+(display.value) === 0) return;
    // Turn display.value to a number and multiply by -1 to change its sign
    display.value = (+(display.value) * -1).toString();  
}

function calculate() {
    // Disable calculateButton until operator is clicked
    if(operator === "") return;
    // Disable calculateButton until number 2 is entered
    if (!cleanDisplay) return;
    // Store the current number in num2
    num2 = +(display.value);
    // Perform the operation and update the display
    display.value = operate(operator, num1, num2);
    // Reset the cleanDisplay flag and operator
    cleanDisplay = 0;
    operator = "";
    // Store the operation result (actual display value) on number 1
    num1 = +(display.value);
    // Set number 2 to 0
    num2 = 0;
    // Remove the active operator button
    document.querySelector(".active").classList.remove("active");
}

function erase () {
    // Erase the last character from the display
    display.value = display.value.slice(0, -1);
    // Update the number of digits every time you erase a number
    displayDigits = (Array.from(display.value)).filter(item => numbers.includes(item)).join("");
    // Update the decimal places if the display has a decimal point every time you erase a number
    if (display.value.includes(".")) decimalPlaces = display.value.split(".")[1];
}

function resetCalculator () {
    // Reset all variables and restore the button colors
    display.value = "0";
    num1 = 0;
    num2 = 0;
    operator = "";
    cleanDisplay = 0;
    // Return the active button to his original color if exists
    if (document.querySelector(".active")) document.querySelector(".active").classList.remove("active");
    decimalPlaces = "";
    displayDigits = "0"
}

// Keyboard support

document.addEventListener("keydown", function(e) {
    console.log(e.key);

    switch (e.key) {
        case "0":
            calculator.querySelector("#zero").click();
            break;
        case "1":
            calculator.querySelector("#one").click();
            break;
        case "2":
            calculator.querySelector("#two").click();
            break;
        case "3":
            calculator.querySelector("#three").click();
            break;
        case "4":
            calculator.querySelector("#four").click();
            break;
        case "5":
            calculator.querySelector("#five").click();
            break;
        case "6":
            calculator.querySelector("#six").click();
            break;
        case "7":
            calculator.querySelector("#seven").click();
            break;
        case "8":
            calculator.querySelector("#eight").click();
            break;
        case "9":
            calculator.querySelector("#nine").click();
            break;
        case "+":
            calculator.querySelector("#sum").click();
            break;
        case "-":
            calculator.querySelector("#substract").click();
            break;
        case "*":
            calculator.querySelector("#multiply").click();
            break;
        case "/":
            calculator.querySelector("#division").click();
            break;
        case "%":
            calculator.querySelector("#percentage").click();
            break;
        case ".":
            calculator.querySelector("#period").click();
            break;
        case "Enter":
            calculator.querySelector("#calculate").click();
            break;
        case "Backspace":
            calculator.querySelector("#erase").click();
            break;
        case "Escape":
            calculator.querySelector("#clear").click();
            break;
        case "Control":
            calculator.querySelector("#sign").click();
            break;
        default:
            break;
    }
    
});