let board, current, currentBoolean = false,
  sheet, w,
  turn = 1,
  movesDIV;
const cols = rows = 8,
  letters = ["A", "B", "C", "D", "E", "F", "G", "H"],
  numbers = [1, 2, 3, 4, 5, 6, 7, 8],
  dynamicColor = "darkred",
  whitePlayer = prompt("Who's white?"),
  blackPlayer = prompt("Who's black?");

function setup() {
  createCanvas(600, 600);
  board = makeBoard(cols, rows);
  w = floor(width / cols) - 5;
  movesDIV = document.getElementById('moves');
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = new Piece(i, j);
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[0][0].type = "rook", board[7][0].type = "rook", board[0][7].type = "rook", board[7][7].type = "rook";
      board[1][0].type = "knight", board[6][0].type = "knight", board[1][7].type = "knight", board[6][7].type = "knight";
      board[2][0].type = "bishop", board[5][0].type = "bishop", board[2][7].type = "bishop", board[5][7].type = "bishop";
      board[3][0].type = "queen", board[3][7].type = "queen", board[4][0].type = "king", board[4][7].type = "king";

      board[i][1].type = "pawn";
      board[i][6].type = "pawn";
    }
  }
}

function preload() {
  sheet = loadImage("pieces/sheet.png");
}

function draw() {
  background('#8B4513');
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const obj = board[i][j];
      fill(obj.color);
      rect(i * w, j * w, w, w);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoolean == false) {
        board[i][j].color = board[i][j].begginerColor;
      }
      board[i][j].show();
    }
  }


  push();
  fill(0);
  textSize(32);
  stroke(0);
  strokeWeight(5);
  for (let i = 0; i < numbers.length; i++) {
    text(numbers[i], width - 30, i * 70 + 50);
    for (let j = 0; j < letters.length; j++) {
      text(letters[j], j * 70 + 30, height - 10);
    }
  }
  pop();
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j].pressed(mouseX, mouseY)) {
        if (board[i][j].state != null && currentBoolean == false && board[i][j].state == turn) {
          current = board[i][j];
          currentBoolean = true;
          current.x = mouseX;
          board[i][j].checkPossibilty(i, j);
          board[i][j].color = "yellow";
        } else if (currentBoolean == true && board[i][j].color == dynamicColor) {
          let turnChar = (turn == 0) ? blackPlayer : whitePlayer;
          let opositeTurn = (turnChar == blackPlayer) ? whitePlayer : blackPlayer;
          let colors = (turnChar == blackPlayer) ? "black" : "white";
          let oppositeColor = (turnChar == whitePlayer) ? "white" : "black";
          if (board[i][j].castle == true) {
            board[i + 1][j].state = board[i - 1][j].state;
            board[i + 1][j].type = board[i - 1][j].type;
            board[i - 1][j].type = null, board[i - 1][j].state == null;
          }
          if (board[i][j].type == "pawn") {
            if (board[i][j].state == 0 && board[i][j].j == rows) {}
          }
          if (board[i][j].type == "king") {
            document.getElementsByTagName("BODY")[0].innerHTML = "";
            createElement('h1', `Game Over! ${turnChar} won`).addClass('endscreen');
            background(0);
          }
          // movesDIV.innerHTML += `<h3 style='color:${colors} '>${turnChar} moved ${current.type} from: ${letters[current.i]}${numbers[current.j]} to ${letters[board[i][j].i]}${numbers[board[i][j].j]} <span style='color:${opositeTurn}';>Its'${opositeTurn}'s turn</h3>`;

          board[i][j].state = current.state, board[i][j].type = current.type;
          board[i][j].moved = true;
          current.state = null, current.type = null;
          currentBoolean = false;
          turn = turn ? 0 : 1;
        } else if (currentBoolean == true && board[i][j].state != null && board[i][j].state == turn) {
          resetColor();
          board[i][j].color = "yellow";
          current = board[i][j];
          console.log(current);
          currentBoolean = true;
          board[i][j].checkPossibilty(i, j);
        } else if (currentBoolean == false && board[i][j].state == null) {
          notification("Can't to that");
        }
      }
    }
  }
}


function resetColor() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j].color = board[i][j].begginerColor;
    }
  }
}


function notification(what) {
  let notification = createP(`<h1 id='bruh'> ${what} </h1>`);

  setTimeout(() => {
    document.getElementById('bruh')
      .innerHTML = "";
  }, 500);
}