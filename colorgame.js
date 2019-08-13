let isEasy = true;
let colors = generateRandomColorArray(3);
let pickedColor = getRandomColorInArray(colors);

//the possible color options
let pickerSquares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let header = document.querySelector("h1");
let newGame = document.querySelector("#newGame");
let easyButton = document.querySelector("#easy");
let hardButton = document.querySelector("#hard");

colorDisplay.textContent = pickedColor;

//Event Listeners to change difficulty, not using a button array or condensing for readability
// easyButton.addEventListener("click", function() {
//   isEasy = true;
//   reset();
// });
easyButton.addEventListener("click", () => {
  isEasy = true;
  reset();
});

hardButton.addEventListener("click", () => {
  isEasy = false;
  reset();
});

newGame.addEventListener("click", function() {
  reset();
});

for (i = 0; i < pickerSquares.length; i++) {
  //add initial colors to squares
  pickerSquares[i].style.backgroundColor = colors[i];

  //add click listeners to squares
  pickerSquares[i].addEventListener("click", function() {
    if (this.style.backgroundColor === pickedColor) {
      changeSquareColorsTo(pickedColor);
      messageDisplay.textContent = "Correct!";
      header.style.backgroundColor = pickedColor;
      newGame.textContent = "Play again?";
    } else {
      this.style.backgroundColor = "#232323";
      messageDisplay.textContent = "Try Again";
    }
  });
}

function changeSquareColorsTo(str) {
  //loop through all squares and change their colors
  for (i = 0; i < pickerSquares.length; i++) {
    pickerSquares[i].style.backgroundColor = str;
  }
}

//Returns a random color in an array of colors
function getRandomColorInArray(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function generateRandomColorArray(num) {
  //returns an array with random colors
  var arr = [];
  for (i = 0; i < num; i++) {
    //get random color and push into arr
    arr.push(generateRandomColor());
  }
  return arr;
}

function generateRandomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function reset() {
  if (isEasy) {
    hardButton.classList.remove("selected");
    easyButton.classList.add("selected");
    colors = generateRandomColorArray(3);
    // Halve the options
  } else {
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
    colors = generateRandomColorArray(6);
  }
  for (i = 0; i < pickerSquares.length; i++) {
    //if there is a string in the array
    if (colors[i]) {
      //create color squares and set their display to default
      pickerSquares[i].style.backgroundColor = colors[i];
      pickerSquares[i].style.display = "block";
    } else {
      //hide the excess squares with no color
      pickerSquares[i].style.display = "none";
    }
  }
  newGame.textContent = "Reset";
  messageDisplay.textContent = "";
  header.style.backgroundColor = "#6495ED";
  pickedColor = getRandomColorInArray(colors);
  colorDisplay.textContent = pickedColor;
}
