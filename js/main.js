"use strict";

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
//función (de estado) que añade el nuevo character al tried character
function addTriedCharacters(pressCharacter) {
  setTriedCharacters([...triedCharacters, pressCharacter]);
}

//función que remplaza el triedCharacter anterior por el nuevo
function setTriedCharacters(newTriedCharacters) {
  triedCharacters = newTriedCharacters;
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
  //Si el triedCharacter ya tiene el pressCharacter, que no lo incluya.
  if (triedCharacters.includes(pressCharacter)) {
    return;
  }
  addTriedCharacters(pressCharacter);
  console.log(pressed);
  if (getAttemptsLeft() === 0) {
    setTimeout(() => {
      alert("SORRY YOU LOST 😣");
      reset();
    }, 0);
    //window.location.reload();
  } else if (isWordCompleted()) {
    setTimeout(() => {
      alert("CONGRATULATIONS!! YOU WON 🥳");
      reset();
    }, 0);
  }
}

function isWordCompleted() {
  for (let character of secretWord) {
    if (triedCharacters.includes(character)) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

function displayNotInWord() {
  const notInTheWord = getNotInTheWord();
  document.querySelector(
    ".not-word"
  ).innerHTML = `No está en la palabra:  ${notInTheWord.join(", ")}`;
  const attempts = getAttemptsLeft();
  const displayAttempt = document.querySelector(".attempts");
  displayAttempt.innerHTML = `${attempts}`;
}

function getAttemptsLeft() {
  let attempts = 10;
  attempts -= getNotInTheWord().length;
  return attempts;
}

function getNotInTheWord() {
  let notInTheWord = [];
  for (let character of triedCharacters) {
    if (!secretWord.includes(character)) {
      notInTheWord.push(character);
    }
  }
  return notInTheWord;
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
  }
  // - añadir un eventListener en cada tecla del teclado. - Que la letra de la tecla se pinte en el input.
  assignEventEveryButton();

  //console.log(keyBoardLetter);
}

function assignEventEveryButton() {
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < buttons.length; i++) {
    console.log(i);
    const buttonClicked = buttons[i];
    buttonClicked.addEventListener("click", handleKey);
  }
}

//función que remueve los acentos de la palabra secreta
function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

generateKeyBoard();
getRandomWord();

const btnReset = document.querySelector(".js-reset");
console.log(btnReset);
btnReset.addEventListener("click", reset);

function reset() {
  setSecretWord("");
  setTriedCharacters([]);
  getRandomWord();
}
//QUE FALTA:
// reducir el número de intentos cuando la letra no esta en la secretword.DONE

//Cuando este a 0 --> LOST THE GAME DONE
//Cuando acierte la palabra --> YOU WON!! (ventana modal quizas?)
