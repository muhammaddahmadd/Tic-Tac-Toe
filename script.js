console.log("Tic tac toe");
let bgMusic = new Audio("music.mp3");
let userSwitch = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let gamefinish = false;
let turn = "X";
let playerXName = "";
let playerOName = "";

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

const infoElemente = document.querySelector(".info");
const imgElemente = document.querySelector(".imgbox img");

function showWinningInfo(winner) {
  if (winner === "draw") {
    infoElemente.innerText = "Game Over Vro!";
  } else {
    infoElemente.innerText = "User " + winner + " Won!";
  }
  imgElemente.style.width = "100px";
  imgElemente.style.opacity = "1";
  imgElemente.src = "winner-icegif-7.gif";
}

const checkValue = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let draw = true; // Assume draw initially
  wins.forEach((win) => {
    if (
      boxtext[win[0]].innerText === boxtext[win[1]].innerText &&
      boxtext[win[2]].innerText === boxtext[win[1]].innerText &&
      boxtext[win[0]].innerText !== ""
    ) {
      showWinningInfo(boxtext[win[0]].innerText);
      gamefinish = true;
      draw = false; // Reset draw if there's a win
    }
  });
  if (draw && Array.from(boxtext).every((el) => el.innerText !== "")) {
    showWinningInfo("draw");
    gamefinish = true;
  }
};

const boxes = document.querySelectorAll(".box");
Array.from(boxes).forEach((box) => {
  let boxtext = box.querySelector(".boxtext");
  box.addEventListener("click", () => {
    if (boxtext.innerText === "" && !gamefinish) {
      boxtext.innerText = turn;
      turn = changeTurn();
      userSwitch.play();
      checkValue();
      if (!gamefinish) {
        const currentPlayerName = turn === "X" ? playerXName : playerOName;
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + currentPlayerName;
      }
    }
  });
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", (e) => {
  let boxtext = document.querySelectorAll(".boxtext");
  Array.from(boxtext).forEach((el) => {
    el.innerHTML = "";
  });
  gamefinish = false;
  turn = "X";
  document.getElementsByClassName("info")[0].innerText =
    "Turn for " + playerXName;
  imgElemente.style.width = "0";
  imgElemente.style.opacity = "0";
  imgElemente.src = "";
  // Clear player names
  playerXName = "";
  playerOName = "";
  // Clear input fields
  document.getElementById("playerX").value = "";
  document.getElementById("playerO").value = "";
});

// Get player names
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
playerXInput.addEventListener("change", (e) => {
  playerXName = e.target.value;
});
playerOInput.addEventListener("change", (e) => {
  playerOName = e.target.value;
});
