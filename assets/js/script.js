var screenDataBis = ''; // Écran de sortie secondaire
var screenData = '';    // Écran de sortie principal
var datas = 0;          // Données résultantes
var myScreen = document.querySelector('.input');   // Sélection de l'élément d'affichage principal
var myScreenBis = document.querySelector('.output'); // Sélection de l'élément d'affichage secondaire

function calcul(e) {
  // Vérifie si le dernier caractère dans screenData est '='
  if (screenData[screenData.length - 1] === '=') {
    // Réinitialise les écrans de sortie
    screenData = '';
    screenDataBis = '';
  }

  // Ajoute le chiffre ou caractère correspondant au bouton cliqué à screenData
  screenData += e.dataset.num;
  // Met à jour l'écran de sortie principal
  myScreen.textContent = screenData;

  // Ajoute également le chiffre ou caractère à l'écran de sortie secondaire
  screenDataBis += e.dataset.num;
  // Met à jour l'écran de sortie secondaire
  myScreenBis.textContent = screenDataBis;
}

function calculate(e) {
  // Vérifie si le dernier caractère dans screenData est '='
  if (screenData[screenData.length - 1] === '=') {
    // Supprime le signe '=' du calcul précédent
    screenData = screenData.substr(0, screenData.length - 1);
  }

  // Ajoute le chiffre ou caractère correspondant au bouton cliqué à screenData
  screenData += e.dataset.num;
  // Ajoute le contenu textuel du bouton à l'écran de sortie secondaire
  screenDataBis += e.textContent;

  // Crée une copie de screenData sans le dernier caractère pour évaluation
  let objet = screenData.substr(0, screenData.length - 1);

  // Gestion des opérations répétitives ('+' ou '-')
  if ((e.dataset.num === '-' || e.dataset.num === '+') && (screenData[screenData.length - 2] === '+' || screenData[screenData.length - 2] === '-')) {
    // Vérifie si le caractère précédant est également un opérateur ('+' ou '-')
    if (screenData[screenData.length - 3] === '*' || screenData[screenData.length - 3] === '/') {
      // Si oui, supprime le dernier opérateur et son équivalent dans l'écran secondaire
      screenData = screenData.substr(0, screenData.length - 1);
      screenDataBis = screenDataBis.substr(0, screenDataBis.length - 1);
      return; // Sort de la fonction pour éviter l'opération incorrecte
    } else {
      // Si non, supprime les deux derniers caractères (opérateurs répétitifs)
      screenData = screenData.substr(0, screenData.length - 2);
      screenDataBis = screenDataBis.substr(0, screenDataBis.length - 2) + e.dataset.num;
      objet = screenData.substr(0, screenData.length);
    }
  }

  // Gestion des opérations interdites ('+' ou '-')
  if ((e.dataset.num === '-' || e.dataset.num === '+') && (screenData[screenData.length - 2] === '*' || screenData[screenData.length - 2] === '/')) {
    return; // Sort de la fonction pour éviter l'opération incorrecte
  }

  // Évalue l'expression mathématique et stocke le résultat
  datas = eval(objet);
  // Affiche le résultat sur l'écran principal
  myScreen.textContent = datas;

  // Met à jour screenData avec le résultat calculé et l'opérateur
  screenData = datas.toString() + e.dataset.num;
}


function end() {
  // Vérifie si le dernier caractère dans screenData est '='
  if (screenData[screenData.length - 1] === '=') {
    return; // Si oui, ne fait rien et sort de la fonction
  }

  // Évalue l'expression mathématique actuelle
  datas = eval(screenData);
  // Affiche le résultat sur l'écran principal
  myScreen.textContent = datas;
  // Réinitialise l'écran de sortie secondaire
  myScreenBis.textContent = '';
  // Ajoute le signe '=' à l'écran de sortie principal pour indiquer la fin du calcul
  screenData += '=';
}

function res() {
  // Réinitialise toutes les données et écrans
  screenDataBis = '';
  screenData = '';
  datas = 0;
  myScreen.textContent = datas;
  myScreenBis.textContent = '';
}

function ce() {
  // Supprime les deux derniers caractères de screenData
  screenData = screenData.substr(0, screenData.length - 2);
  // Met à jour l'écran principal avec la nouvelle valeur
  myScreen.textContent = screenData;
  // Supprime également les deux derniers caractères de l'écran secondaire
  screenDataBis = screenData.substr(0, screenData.length - 2);
  // Met à jour l'écran secondaire avec la nouvelle valeur
  myScreenBis.textContent = screenDataBis;

  // Si screenData est vide, affiche '0' sur l'écran principal
  if (screenData === '') {
    myScreen.textContent = '0';
  }
}
