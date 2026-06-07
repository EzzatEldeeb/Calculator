const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;

    if (!isNaN(buttonText) || buttonText === ".") {
      inputNumber(buttonText);
    } else if (buttonText === "C") {
      clearAll();
    } else if (buttonText === "⌫") {
      backspace();
    } else if (buttonText === "=") {
      calculate();
    } else {
      handleOperator(buttonText);
    }

    updateDisplay();
  });
});

function inputNumber(num) {
  if (currentInput === "0" || shouldResetDisplay) {
    currentInput = num;
    shouldResetDisplay = false;
  } else {
    if (num === "." && currentInput.includes(".")) return;
    currentInput += num;
  }
}

function handleOperator(nextOperator) {
  const value = parseFloat(currentInput);

  if (nextOperator === "%") {
    currentInput = (value / 100).toString();
    return;
  }

  if (operator && !shouldResetDisplay) {
    calculate();
  }

  previousInput = currentInput;
  operator = nextOperator;
  shouldResetDisplay = true;
}
function calculate() {
  let result = 0;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      if (current === 0) {
        currentInput = "Error";
        operator = "";
        shouldResetDisplay = true;
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = Math.round(result * 10000000) / 10000000;
  currentInput = currentInput.toString();
  operator = "";
  shouldResetDisplay = true;
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = "";
  shouldResetDisplay = false;
}

function backspace() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
}

function updateDisplay() {
  display.innerText = currentInput;
}
document.addEventListener("keydown", (event) => {
  let key = event.key;

  if (key === "Enter") key = "=";

  if (key === "Escape") key = "C";

  if (key === "Backspace") key = "⌫";

  if (key === "*") key = "×";

  if (key === "/") {
    event.preventDefault();
    key = "÷";
  }

  buttons.forEach((button) => {
    if (button.innerText === key) {
      button.style.transform = "translateY(1px)";
      button.style.filter = "brightness(0.8)";

      button.click();

      setTimeout(() => {
        button.style.transform = "";
        button.style.filter = "";
      }, 100);
    }
  });
});
