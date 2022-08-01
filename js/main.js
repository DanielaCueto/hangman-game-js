"use strict";

console.log("helloWOrld");

//variables from html:

let userWord = document.querySelector(".js-word");

//palabra generada por el fetch. Declarada pero no asignada
let secretWord = "";
function setSecretWord(strWord) {
  secretWord = strWord.toLowerCase();
  secretWord = removeAccents(secretWord);
  displayCensoredWord();
  console.log(secretWord);
}
//array donde almaceno todas los caracteres intentados hasta ahora
let triedCharacters = [];
//funcion que va a actualizar el valor de triedCharacters y redibuja todo lo que dependa de ese valor:
function setTriedCharacters(pressCharacter) {
  triedCharacters.push(pressCharacter);
  console.log(triedCharacters);
  displayCensoredWord();
  displayNotInWord();
}

// función que se encarga de hacer el fetch para la palabra random.
function getRandomWord() {
  fetch("https://random-word-api.herokuapp.com/word?lang=es&length=8")
    .then((response) => response.json())
    .then((words) => {
      //tengo que sacar la palabra del array. Uso su indice. esta en el indice 0 segun la api
      const strWord = words[0];
      setSecretWord(strWord);
      return strWord;
    });
}

//funcion que retorna ua cadena de guiones que remplaza la string que le pase56
function displayCensoredWord() {
  let result = ``;
  for (let i = 0; i < secretWord.length; i++) {
    const character = secretWord[i];
    //console.log(character);
    if (triedCharacters.includes(character)) {
      result += `${character}  `;
    } else {
      result += `_  `;
    }
  }
  userWord.textContent = result;
}

function handleKey(ev) {
  console.log(ev);
  let pressed = ev.target;
  let pressCharacter = pressed.innerHTML.trim();
  console.log(pressCharacter);
  setTriedCharacters(pressCharacter);
  //document.querySelector(".js-inputWord").innerHTML += pressCharacter;
  console.log(pressed);
}

function displayNotInWord() {
  let notInTheWord = [];
  for (let character of triedCharacters) {
    if (!secretWord.includes(character)) {
      notInTheWord.push(character);
    }
  }
  document.querySelector(
    ".not-word"
  ).innerHTML = `Is not in the word:  ${notInTheWord.join(", ")}`;

  let attempts = 7;
  attempts -= notInTheWord.length;
  const displayAttempt = document.querySelector(".attempts");
  displayAttempt.innerHTML = `${attempts}`;
  if (attempts === 0) {
    attempts = 0;
    window.alert("SORRY, YOU LOST");
  }
}

//Función que genera el teclado virtual
function generateKeyBoard() {
  const keyBoardLetter = "abcdefghijklmnopqrstuvwxyz";
  keyBoardLetter.split("");
  for (let letter of keyBoardLetter) {
    //console.log(letter);
    document.querySelector(
      ".keyBoard"
    ).innerHTML += `<button class="button">${letter}</button>`;
    // - añadir un eventListener en cada tecla del teclado. - Que la letra de la tecla se pinte en el input.
  }
  const buttons = document.querySelectorAll(".button");
  for (let button of buttons) {
    button.addEventListener("click", handleKey);
  }
  //console.log(keyBoardLetter);
}

//función que remueve los acentos de la palabra secreta
function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

generateKeyBoard();
getRandomWord();

//QUE FALTA:
// reducir el número de intentos cuando la letra no esta en la secretword.

//Cuando este a 0 --> LOST THE GAME
//Cuando acierte la palabra --> YOU WON!! (ventana modal quizas?)
