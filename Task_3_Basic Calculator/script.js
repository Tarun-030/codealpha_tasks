const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = '';

function updateDisplay(value) {
  display.value = value;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;

    if (key === 'C') {
      expression = '';
    } else if (key === 'Backspace') {
      expression = expression.slice(0, -1);
    } else if (key === '=') {
      try {
        expression = eval(expression).toString();
      } catch {
        expression = 'Error';
      }
    } else {
      expression += key;
    }

    updateDisplay(expression);
  });
});

// Bonus: Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if ((/[0-9+\-*/.]/.test(key))) {
    expression += key;
  } else if (key === 'Enter') {
    try {
      expression = eval(expression).toString();
    } catch {
      expression = 'Error';
    }
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
  } else if (key.toLowerCase() === 'c') {
    expression = '';
  }

  updateDisplay(expression);
});