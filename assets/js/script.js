function appendToDisplay(value) {
    // Ajoute la valeur au contenu de l'affichage
    document.getElementById('display').value += value;
}

function clearDisplay() {
    // Efface le contenu de l'affichage
    document.getElementById('display').value = '0';
}

function calculateResult() {
    // Récupère la valeur affichée dans l'affichage
    var displayValue = document.getElementById('display').value;
    // Évalue l'expression et obtient le résultat
    var result = evaluateExpression(displayValue);
    // Affiche le résultat dans l'affichage
    document.getElementById('display').value = result;
}

function evaluateExpression(expression) {
    // Tableau des opérateurs supportés
    var operators = ['+', '-', '*', '/'];
    // Sépare l'expression en valeurs (opérandes et opérateurs)
    var values = expression.split(' ');
    // Pile pour les opérandes
    var operandStack = [];
    // Pile pour les opérateurs
    var operatorStack = [];

    // Parcours des valeurs de l'expression
    for (var i = 0; i < values.length; i++) {
        var currentValue = values[i];

        if (operators.includes(currentValue)) {
            // Si c'est un opérateur, on effectue les calculs en respectant la précédence des opérateurs
            while (operatorStack.length > 0 && hasPrecedence(operatorStack[operatorStack.length - 1], currentValue)) {
                var operator = operatorStack.pop();
                var operand2 = operandStack.pop();
                var operand1 = operandStack.pop();
                var result = calculate(operator, operand1, operand2);
                operandStack.push(result);
            }
            operatorStack.push(currentValue);
        } else {
            // Si c'est un opérande, on l'ajoute à la pile des opérandes
            operandStack.push(parseFloat(currentValue));
        }
    }

    // Effectue les calculs restants avec les opérateurs et opérandes restants
    while (operatorStack.length > 0) {
        var operator = operatorStack.pop();
        var operand2 = operandStack.pop();
        var operand1 = operandStack.pop();
        var result = calculate(operator, operand1, operand2);
        operandStack.push(result);
    }

    // Le résultat final est le seul élément restant dans la pile des opérandes
    return operandStack[0];
}

function calculate(operator, operand1, operand2) {
    // Effectue le calcul en fonction de l'opérateur
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if (operand2 === 0) {
                return 'Erreur : Division par zéro';
            }
            return operand1 / operand2;
        default:
            return 0;
    }
}

function hasPrecedence(operator1, operator2) {
    // Vérifie si l'opérateur1 a une précédence plus élevée que l'opérateur2
    if ((operator1 === '*' || operator1 === '/') && (operator2 === '+' || operator2 === '-')) {
        return true;
    }
    return false;
}
