document.addEventListener("DOMContentLoaded", function () {
    // Your full JavaScript code here
let currentInput = "";
let resultFrozen = false; // Prevent "=" from executing twice
const maxLength = 20; // Limit input length


function addToInput(value) {
    const inputElement = document.querySelector(".inputNum");
    const operators = ["+", "-", "*", "/", "%", "x"]; // Allowed operators

    // Prevent input exceeding max length
    if (currentInput.length >= maxLength && !operators.includes(value)) return;

    // If result is frozen, only allow new numbers or operators to start a fresh calculation
    if (resultFrozen && !operators.includes(value)) {
        currentInput = value; // Start fresh input
    } else {
        let lastChar = currentInput.slice(-1);
        if (operators.includes(lastChar) && operators.includes(value)) return; // Prevent multiple operators
        
        currentInput += value;
    }

    inputElement.innerText = currentInput;
    resultFrozen = false; // Reset freeze when new input starts
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    document.querySelector(".inputNum").innerText = currentInput || "0";
}

function clearInput() {
    currentInput = "";
    document.querySelector(".inputNum").innerText = "0";
    document.querySelector(".scroll").innerHTML = "";
    resultFrozen = false; // Reset freeze but keep history
}

function calculateResult() {
    if (resultFrozen) return; // Prevent repeated "=" execution

    try {
        let formattedInput = currentInput.replace(/x/g, "*");
        let result = eval(formattedInput);

        //  Update inputNum with result
        document.querySelector(".inputNum").innerText = result;

        //  Append result to history-container (persists across sessions)
        const historyElement = document.querySelector(".history-container");
        historyElement.value += currentInput + " = " + result + "\n";

        //  Append result to scroll (for dynamic history display)
        const scrollElement = document.querySelector(".scroll");
        const newHistoryItem = document.createElement("h2");
        newHistoryItem.innerText = currentInput + " = " + result;
        scrollElement.appendChild(newHistoryItem);

        //  Auto-scroll to bottom
        scrollElement.scrollTop = scrollElement.scrollHeight;

        currentInput = result.toString();
        resultFrozen = true; // Freeze input until new operation starts
    } catch (error) {
        document.querySelector(".inputNum").innerText = "Error";
    }
}

});