let wonMusic = new Audio("gamewon.mp3");
let turnMusic = new Audio("ting2.mp3");
let drawMusic = new Audio("drawmusic.mp3");

let turn = "X";
let gameover = false;
let win = false;

// function to change the turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

let options = ["", "", "", "", "", "", "", "", ""];
// Function to check for a win
const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],
    [0, 3, 6, 15, 10, 90],
    [1, 4, 7, 15, 0, 90],
    [2, 5, 8, 15, -10, 90],
    [0, 4, 8, 10, 10.5, 45],
    [2, 4, 6, 10, -10.5, 135],
  ];

  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      document.getElementById("info").innerText =
        boxtexts[e[0]].innerText + " Won";
      win = true;
      document.querySelector(
        ".line"
      ).style.transform = `rotate(${e[5]}deg) translate(${e[3]}vw, ${e[4]}vw) `;
      document.querySelector(".line").style.width = `30vw`;
      return win;
    }
  });
  return win;
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element, index) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      options[index] = turn;
      boxtext.innerText = turn;
      turn = changeTurn();
      turnMusic.play();
      let winGame = checkWin();
      // console.log(winGame);
      if (winGame === true) {
        wonMusic.play();
        gameover = true;
        win = false;
        document
          .querySelector(".imgBox")
          .getElementsByTagName("img")[0].style.width = "300px";
      } else if (!options.includes("")) {
        win = false;
        drawMusic.play();
        alert("Game Draw");
      }
      if (!gameover) {
        document.getElementById("info").innerText = `Turn for ${turn}`;
      }
    }
  });
});

// reset button
document.getElementById("reset").addEventListener("click", () => {
  let boxtext = document.getElementsByClassName("boxtext");
  options = ["", "", "", "", "", "", "", "", ""];
  Array.from(boxtext).forEach((element) => {
    element.innerText = "";
  });
  wonMusic.pause();
  drawMusic.pause();
  turn = "X";
  win = false;
  document.getElementById("info").innerText = `Turn for ${turn}`;
  document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width =
    "0px";

  document.querySelector(".line").style.width = `0`;
});
