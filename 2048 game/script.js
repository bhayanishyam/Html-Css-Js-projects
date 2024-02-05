let bored = [];
let score = 0;
const ROWS = 4;
const COLUMNS = 4;
let restart = document.querySelector(".restart");
document.getElementById("high-score").innerHTML =
  localStorage.getItem("score") > 0 ? localStorage.getItem("score") : 0;
let close = document.querySelector(".close");
let gameOver = document.querySelector(".game-over");
let wrapper = document.querySelector(".wrapper");
let msg = document.querySelector(".msg");

window.onload = function () {
  startGame();
};

close.addEventListener("click", () => {
  gameOver.classList.toggle("hide");
  wrapper.classList.toggle("hide");
  msg.classList.toggle("hide");

});

restart.addEventListener("click", () => {
  gameOver.classList.add("hide");
  wrapper.classList.add("hide");
  msg.classList.add("hide");
  location.reload();
});

function startGame() {
  bored = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = bored[r][c];
      updateBored(tile, num);
      document.querySelector(".playground").append(tile);
    }
  }

  setTwo();
  setTwo();
}

function isEmpty() {
  for (r = 0; r < ROWS; r++) {
    for (c = 0; c < COLUMNS; c++) {
      if (bored[r][c] == 0) {
        return true;
      }
    }
  }

  gameOver.classList.toggle("hide");
  wrapper.classList.toggle("hide");
  document.getElementById("final-score").innerHTML = score;
  if (localStorage.getItem("score")) {
    if (+localStorage.getItem("score") < score) {
      msg.classList.remove("hide");
      localStorage.setItem("score", score);
    }
  } else {
    localStorage.setItem("score", score);
  }

  return false;
}

function setTwo() {
  if (!isEmpty()) {
    return;
  }

  let isSet = false;
  while (!isSet) {
    let r = Math.floor(Math.random() * ROWS);
    let c = Math.floor(Math.random() * COLUMNS);

    if (bored[r][c] == 0) {
      bored[r][c] = 2;

      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      tile.innerText = "2";
      tile.classList.add("x2");
      isSet = true;
    }
  }
}

function updateBored(tile, number) {
  tile.innerHTML = "";
  tile.classList.value = "";
  tile.classList.add("tile");

  if (number > 0) {
    tile.innerText = number;
    if (number <= 2048) {
      tile.classList.add("x" + number);
    } else {
      tile.classList.add("x2048");
    }
  }
}

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }

  row = filterZero(row);

  while (row.length < COLUMNS) {
    row.push(0);
  }

  return row;
}

// left Arrow
function slideLeft() {
  for (r = 0; r < ROWS; r++) {
    let row = bored[r];
    row = slide(row);
    bored[r] = row;

    for (c = 0; c < COLUMNS; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = bored[r][c];
      updateBored(tile, num);
    }
  }
  console.log(bored);
}

// Right Arrow

function slideRight() {
  for (r = 0; r < ROWS; r++) {
    let row = bored[r];
    row = row.reverse();
    row = slide(row);
    bored[r] = row.reverse();

    for (c = 0; c < COLUMNS; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = bored[r][c];
      updateBored(tile, num);
    }
    console.log(bored);
  }
}

// Up Arrow

function slideUP() {
  for (let c = 0; c < COLUMNS; c++) {
    row = [bored[0][c], bored[1][c], bored[2][c], bored[3][c]];
    row = slide(row);
    [bored[0][c], bored[1][c], bored[2][c], bored[3][c]] = row;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = bored[r][c];
      updateBored(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < COLUMNS; c++) {
    row = [bored[0][c], bored[1][c], bored[2][c], bored[3][c]];
    row = row.reverse();
    row = slide(row);
    row = row.reverse();
    [bored[0][c], bored[1][c], bored[2][c], bored[3][c]] = row;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let num = bored[r][c];
      updateBored(tile, num);
    }
  }
}

document.addEventListener("keyup", (e) => {
  console.log(e.code);
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUP();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerHTML = score;
});
