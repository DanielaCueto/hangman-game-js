"use strict";

//  INPUTS
// - KeyBoard  (26 buttons)
function generateKeyBoard() {
  const keyBoardLetter = "abcdefghijklmnopqrstuvwxyz";
  keyBoardLetter.split("");
  for (let letter of keyBoardLetter) {
    //console.log(letter);
    document.querySelector(
      ".keyBoard"
    ).innerHTML += `<button class="button">${letter}</button>`;
  }
  const buttons = document.querySelectorAll(".button");
  for (let button of buttons) {
    button.addEventListener("click", displayKey);
  }
  console.log(keyBoardLetter);
}
generateKeyBoard();

// - Reset btn (1 button)
const resetBtn = document.querySelector(".js-reset");
//
//  OUTPUTS
// - Show word's characters:

//  display key pressed

// - Show tried characters:
// - num of tries
// - Win/Lose display

// MEMORY/STATE/STORAGE:
// let numOfTries = 5
// let getrandomWord = fetch
function getRandomWord() {
  fetch("https://random-word-api.herokuapp.com/word?lang=es")
    .then((response) => response.json())
    .then((words) => {
      //tengo que sacar la palabra del array. Uso su indice. esta en el indice 0 segun la api
      const strWord = words[0];
      userWord.textContent = getCensoredWord(strWord);
      console.log(strWord);

      return strWord;
    });
}
//triedCharacters = []

//ACTIONS
//INITIALIZE
// MAKE ATTEMPT
//
