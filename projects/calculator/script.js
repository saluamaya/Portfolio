let justCalculated = false; 
let lastResult = null;
let zeroAfterCalc = false;
const display = document.getElementById('display');

function appendToDisplay(value) {
  const isNumber = /^[0-9.]$/.test(value);

  if (justCalculated) {
    if (value === '0') {
      display.value = '0';
      zeroAfterCalc = true;
      justCalculated = false;
      return;
    } else if (isNumber) {
      if (zeroAfterCalc) {
        display.value = value;
        zeroAfterCalc = false;
      } else {
        display.value = value;
      }
    } else {
      display.value = lastResult + value;
    }
    justCalculated = false;
  } else {
    if (zeroAfterCalc && /^[1-9]$/.test(value)) {
      display.value = value;
      zeroAfterCalc = false;
    } else {
      display.value += value;
    }
  }
}

function clearDisplay() {
  display.value = '';
  justCalculated = false;
  lastResult = null;
}

function calculate() {
  try {
    let expression = display.value.replace(/√/g, 'Math.sqrt')
                                  .replace(/%/g, '/100');
    const result = eval(expression);
    display.value = result;
    lastResult = result;
    justCalculated = true;
  } catch {
    display.value = 'Error';
    justCalculated = false;
  }
}

function applyFunction(fn) {
  try {
    let currentValue = parseFloat(display.value);
    let result;

    switch (fn) {
      case 'sqrt':
        result = Math.sqrt(currentValue);
        break;
      case 'square':
        result = currentValue * currentValue;
        break;
      case 'reciprocal':
        result = 1 / currentValue;
        break;
      default:
        return;
    }

    display.value = result;
  } catch {
    display.value = 'Error';
  }
}


document.addEventListener('keydown', function(e) {
  const allowedKeys = '0123456789+-*/().%';

  if (allowedKeys.includes(e.key)) {
    appendToDisplay(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (e.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});