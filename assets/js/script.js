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
    // Évalue l'expression mathématique et obtient le résultat
    var result = eval(displayValue);
    // Affiche le résultat dans l'affichage
    document.getElementById('display').value = result;
}
