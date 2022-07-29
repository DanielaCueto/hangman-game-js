"use strict";

console.log("helloWOrld");

//variables from html:

let userWord = document.querySelector(".js-word");
let secretWord = ""; //palabra generada por el fetch. Declarada pero no asignada
let triedCharacters = []; //array donde almaceno todas los caracteres intentados hasta ahora
let notInTheWord = [];
let pressCharacter;

// función que se encarga de hacer el fetch para la palabra random.
function getRandomWord() {
  fetch("https://random-word-api.herokuapp.com/word?lang=es&length=8")
    .then((response) => response.json())
    .then((words) => {
      //tengo que sacar la palabra del array. Uso su indice. esta en el indice 0 segun la api
      const strWord = words[0];
      secretWord = strWord.toLowerCase();
      displayCensoredWord();
      console.log(strWord);
      return strWord;
    });
}

//funcion que retorna ua cadena de guiones que remplaza la string que le pase56
function displayCensoredWord() {
  let result = ``;
  for (let i = 0; i < secretWord.length; i++) {
    const character = secretWord[i];
    console.log(character);
    if (triedCharacters.includes(character)) {
      result += `${character}  `;
    } else {
      result += `_  `;
    }
  }
  userWord.textContent = result;
}

getRandomWord();

/* function userInput() {
  const key = userWord.value;
  console.log(key);
  document.querySelector(".js-inputWord").innerHTML = key;
} */

function handleKey(ev) {
  console.log(ev);
  let pressed = ev.target;
  pressCharacter = pressed.innerHTML.trim();
  console.log(pressCharacter);
  triedCharacters.push(pressCharacter);
  console.log(triedCharacters);
  displayCensoredWord();
  document.querySelector(".js-inputWord").innerHTML += pressCharacter;
  console.log(pressed);
  isInTheWord();
}

function isInTheWord() {
  if (!secretWord.includes(pressCharacter)) {
    notInTheWord.push(pressCharacter);
    document.querySelector(
      ".not-word"
    ).innerHTML = `Is not in the word:  ${notInTheWord.join(", ")}`;
  }
}
function generateKeyBoard() {
  const keyBoardLetter = "abcdefghijklmnopqrstuvwxyz";
  keyBoardLetter.split("");
  for (let letter of keyBoardLetter) {
    console.log(letter);
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

generateKeyBoard();

//userWord.addEventListener("keyup", userInput);
