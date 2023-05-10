// Récupère les éléments HTML
var display = document.getElementById('display');
var buttons = document.querySelectorAll('.keypad button');

// Ajoute un gestionnaire d'événement aux boutons
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    var value = this.textContent;

    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearDisplay();
    } else {
      appendToDisplay(value);
    }
  });
});

function appendToDisplay(value) {
  // Vérifie si la dernière saisie est une virgule
  var lastChar = display.value.slice(-1);
  if (lastChar === ',') {
    // Vérifie si la valeur actuelle est également une virgule
    if (value === ',') {
      return; // Empêche d'ajouter une virgule supplémentaire
    }
  }

  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculateResult() {
  var expression = display.value;

  try {
    if (hasMultipleCommas(expression)) {
      throw new Error('Nombre invalide');
    }

    var result = evaluateExpression(expression);
    display.value = result;
  } catch (error) {
    display.value = 'Erreur';
  }
}

function evaluateExpression(expression) {
  var operators = ['+', '-', '*', '/'];
  var numbers = expression.split(new RegExp('[' + operators.join('') + ']'));

  // Vérifie si l'expression contient au moins un opérateur
  if (numbers.length < 2) {
    throw new Error('Expression invalide');
  }

  var operands = numbers.map(function(num) {
    return parseFloat(num);
  });

  var operatorIndex = 0;
  var result = operands[0];

  for (var i = 1; i < operands.length; i++) {
    var operator = expression[operatorIndex + numbers[i - 1].length];
    var operand = operands[i];

    if (isNaN(operand)) {
      throw new Error('Nombre invalide');
    }

    if (operator === '+') {
      result += operand;
    } else if (operator === '-') {
      result -= operand;
    } else if (operator === '*') {
      result *= operand;
    } else if (operator === '/') {
      result /= operand;
    }

    operatorIndex += numbers[i - 1].length + 1;
  }

  return result;
}

function hasMultipleCommas(expression) {
  // Vérifie si l'expression contient plusieurs virgules consécutives
  return /,\s*,/.test(expression);
}
