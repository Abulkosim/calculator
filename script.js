const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');

const equals = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');

class Calculator {
  constructor(previous, current) {
    this.previous = previous;
    this.current = current;
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  pickOperation(operation) {
    if (this.currentOperand == '') return;
    if (this.previousOperand != '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let comp;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '+':
        comp = prev + curr;
        break;
      case '-':
        comp = prev - curr;
        break;
      case '÷':
        comp = prev / curr;
        break;
      case '×':
        comp = curr * prev;
        break;
      case '%':
        comp = prev % curr;
        break;
      default: return;
    }
    this.currentOperand = comp;
    this.operation = undefined;
    this.previousOperand = '';
    document.body.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  changeDisplay() {
    this.current.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previous.innerText = `${this.previousOperand} ${this.operation}`;
    }
  }
}

const calculator = new Calculator(previous, current);

numbers.forEach(number => {
  number.addEventListener('click', () => {
    calculator.appendNumber(number.innerText);
    calculator.changeDisplay();
  })
})

operations.forEach(operation => {
  operation.addEventListener('click', () => {
    calculator.pickOperation(operation.innerText);
    calculator.changeDisplay();
  })
})

equals.addEventListener('click', () => {
  calculator.compute();
  calculator.changeDisplay();
})

clear.addEventListener('click', () => {
  calculator.clear();
  calculator.changeDisplay();
})
