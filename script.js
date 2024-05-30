// To set multiple attributes
function setAttributes(ele, attributes) {
  for (let keys in attributes) {
    let id_name = keys;
    let value = attributes[keys];
    ele.setAttribute(id_name, value);
  }
}

// To add individual button columns
let buttonColumns = function (colValue, idValue, content, value) {
  const singleColumn = document.createElement("div");
  singleColumn.classList.add(`col-${colValue}`, "button-columns");
  const button = document.createElement("button");
  setAttributes(button, { class: "keys", id: idValue });
  button.innerHTML = content;
  if (value) {
    button.dataset[value] = "";
  }
  singleColumn.append(button);
  return singleColumn;
};

// To add individual button rows
let buttonRows = function () {
  const singleRow = document.createElement("div");
  singleRow.classList.add("row", "line-section", "justify-content-start");
  return singleRow;
};

const header =  document.createElement("h1")
header.setAttribute("id","title")

header.innerHTML="DOM CALCULATOR"
const para =  document.createElement("p")
para.setAttribute("id","description")
para.innerHTML="To perform basic math operations"


// To add calculator layout
const body = document.body;
const container = document.createElement("div");
container.classList.add("container", "calci","col-lg-4","col-md-6","p-5");
body.append(container);
const insideCalci = document.createElement("div");
insideCalci.classList.add("row", "inside", "justify-content-start",);
container.append(header,para,insideCalci);
const firstdisplay = document.createElement("div");
firstdisplay.classList.add("previous");
firstdisplay.dataset.previous = "";
const seconddisplay = document.createElement("input");
seconddisplay.classList.add("current");
seconddisplay.setAttribute("id", "result");
seconddisplay.dataset.current = "";
insideCalci.append(firstdisplay, seconddisplay);
const firstRow = buttonRows();
container.append(firstRow);
firstRow.append(buttonColumns(3, "clear", "C", "clear"));
firstRow.append(buttonColumns(3, "delete", "DEL", "delete"));
firstRow.append(buttonColumns(3, "period", `<i class="fa-solid fa-period"><b>.</b></i>`, "number"));
firstRow.append(buttonColumns(3, "multiply", "*", "operation"));
const secondRow = buttonRows();
container.append(secondRow);
secondRow.append(buttonColumns(3, "7", "7", "number"));
secondRow.append(buttonColumns(3, "8", "8", "number"));
secondRow.append(buttonColumns(3, "9", "9", "number"));
secondRow.append(buttonColumns(3, "divide", "÷", "operation"));
const thirdRow = buttonRows();
container.append(thirdRow);
thirdRow.append(buttonColumns(3, "4", "4", "number"));
thirdRow.append(buttonColumns(3, "5", "5", "number"));
thirdRow.append(buttonColumns(3, "6", "6", "number"));
thirdRow.append(buttonColumns(3, "subtract", "-", "operation"));
const fourthRow = buttonRows();
container.append(fourthRow);
fourthRow.append(buttonColumns(3, "1", "1", "number"));
fourthRow.append(buttonColumns(3, "2", "2", "number"));
fourthRow.append(buttonColumns(3, "3", "3", "number"));
fourthRow.append(buttonColumns(3, "add", "+", "operation"));
const fifthRow = buttonRows();
container.append(fifthRow);
fifthRow.append(buttonColumns(3, "0", "0", "number"));
fifthRow.append(buttonColumns(3, "00", "00", "number"));
fifthRow.append(buttonColumns(6, "equal", "=", "equals"));


const numbers = document.querySelectorAll("[data-number]");
const mathOperation = document.querySelectorAll("[data-operation]");
const equal = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const firstdisplayTextElement = document.querySelector("[data-previous]");
const seconddisplayTextElement = document.querySelector("[data-current]");

class calci {
  constructor(firstdisplayTextElement, seconddisplayTextElement) {
    this.firstdisplayTextElement = firstdisplayTextElement;
    this.seconddisplayTextElement = seconddisplayTextElement;
    this.clear();
  }

  clear() {
    this.firstdisplay = "";
    this.seconddisplay = "";
    this.operation = undefined;
  }

  delete() {}

  appendNumber(number) {
    if (number === "." && this.seconddisplay.includes(".")) return;
    this.seconddisplay = this.seconddisplay.toString() + number.toString();
  }

  chooseoperation(operation) {
    if (this.seconddisplay === "") return;
    if (this.firstdisplay !== "") {
      this.compute();
    }
    this.operation = operation;
    this.firstdisplay = this.seconddisplay;
    this.seconddisplay = "";
  }

  compute() {
    let computation;
    let prev = parseFloat(this.firstdisplay);
    let curr = parseFloat(this.seconddisplay);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.seconddisplay = computation;
    this.operation = undefined;
    this.firstdisplay = "";
  }

  delete() {
    this.seconddisplay = this.seconddisplay.toString().slice(0, -1);
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.seconddisplayTextElement.value = this.getDisplayNumber(this.seconddisplay);
    if (this.operation != null) {
      this.firstdisplayTextElement.innerText = `${this.getDisplayNumber(this.firstdisplay)} ${
        this.operation
      }`;
    } else {
      this.firstdisplayTextElement.innerText = "";
    }
  }
}

const calculator = new calci(firstdisplayTextElement, seconddisplayTextElement);
// To click number values
for (let button of numbers) {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
}
// To press number values
let buttonids = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
document.body.addEventListener("keypress", (e) => {
  let key = e.key;
  console.log(key);
  if (buttonids.includes(key)) {
    calculator.appendNumber(key);
    calculator.updateDisplay();
  } else {
    alert("Only numbers are allowed");
  }
});

for (let button of mathOperation) {
  button.addEventListener("click", () => {
    calculator.chooseoperation(button.innerText);
    calculator.updateDisplay();
  });
}

equal.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});