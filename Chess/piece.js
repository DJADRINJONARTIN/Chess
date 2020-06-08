class Piece {
  constructor(i, j) {
    // IMPORTANT
    this.i = i;
    this.j = j;
    this.pos = createVector(this.i * w, this.j * w);

    // NON-IMPORTANT
    this.moved = false;
    // this.color = (this.i % 2 == this.j % 2) ? '#4B7399' : 'white';
    this.color = (this.i % 2 == this.j % 2) ? 'white' : 'black';
    this.begginerColor = this.color;
    this.type;
    this.castle = false;
    this.begginingJ = j;
    this.start = [
      [5, 0, 80, 100], // pawns
      [70, 0, 75, 100], // rooks
      [140, 0, 70, 100], // knight
      [210, 0, 65, 100], // bishops
      [280, 0, 60, 100], // queen
      [350, 0, 55, 100], // king
    ];


    if (this.begginingJ <= 1)
      this.state = 0;
    else if (this.begginingJ >= 6)
      this.state = 1;
    else if (this.begginingJ < 6 && this.begginingJ > 5)
      this.state = null;
  }

  show() {
    stroke(0);
    const types = ["pawn", "rook", "knight", "bishop", "queen", "king"];
    for (let i = 0; i < 6; i++) {
      if (this.type == types[i]) {
        if (this.state == 1)
          image(sheet, this.pos.x, this.pos.y - 4, w, w, this.start[i][0], this.start[i][1], this.start[i][2], this.start[i][3]);
        else if (this.state == 0)
          image(sheet, this.pos.x, this.pos.y + 6, w, w, this.start[i][0], this.start[i][3], this.start[i][2], this.start[i][3]);
      }
    }
  }

  pressed(x, y) {
    return (x > this.pos.x && x < this.pos.x + w && y > this.pos.y && y < this.pos.y + w);
  }

  checkPossibilty(ai, aj) {
    if (this.type == "pawn") {
      this.checkPawns(ai, aj);
    } else if (this.type == "rook") {
      this.checkForward(ai, aj);
    } else if (this.type == "bishop") {
      this.checkDiagonals(ai, aj);
    } else if (this.type == "queen") {
      this.checkDiagonals(ai, aj);
      this.checkForward(ai, aj);
    } else if (this.type == "king") {
      this.checkCastles(ai, aj);
      this.checkKing(ai, aj);
    } else if (this.type == "knight") {
      this.checkKnight(ai, aj);
    }
  }



  checkPawns(ai, aj) {
    let newPieces = [];
    let takePieces = [];
    let way = (this.state == 0) ? 1 : -1;

    newPieces.push(board[ai][aj + way]);
    if (this.moved == false) {
      newPieces.push(board[ai][aj + way * 2])
    }
    if (ai < cols - 1) {
      takePieces.push(board[ai + 1][aj + way]);
    }
    if (ai > 0) {
      takePieces.push(board[ai - 1][aj + way]);
    }
    for (let i = 0; i < newPieces.length; i++) {
      let newPiece = newPieces[i];
      if (newPiece.state == null)
        newPiece.color = dynamicColor;
    }

    for (let i = 0; i < takePieces.length; i++) {
      if (takePieces[i].state != null && takePieces[i].state != this.state) {
        takePieces[i].color = dynamicColor;
      }
    }
  }

  checkForward(ai, aj) {
    let i = ai,
      j = aj - 1;
    while (j >= 0) {
      if (board[i][j].state == this.state) {
        break;
      } else if (board[i][j].state != null) {
        board[i][j].color = dynamicColor;
        break;
      } else {
        board[i][j].color = dynamicColor;
      }
      j--;
    }
    i = ai,
      j = aj + 1;
    while (j <= board.length - 1) {
      if (board[i][j].state == this.state) {
        break;
      } else if (board[i][j].state != null) {
        board[i][j].color = dynamicColor;
        break;
      } else {
        board[i][j].color = dynamicColor;
      }
      j++;
    }
    i = ai + 1,
      j = aj;
    while (i <= board.length - 1) {
      if (board[i][j].state == this.state) {
        break;
      } else if (board[i][j].state != null) {
        board[i][j].color = dynamicColor;
        break;
      } else {
        board[i][j].color = dynamicColor;
      }
      i++;
    }
    i = ai - 1,
      j = aj;
    while (i >= 0) {
      if (board[i][j].state == this.state) {
        break;
      } else if (board[i][j].state != null) {
        board[i][j].color = dynamicColor;
        break;
      } else {
        board[i][j].color = dynamicColor;
      }
      i--;
    }
  }

  checkDiagonals(ai, aj) {
    let i = ai - 1,
      j = aj - 1;
    let topRight = [];
    let topLeft = [];
    let bottomLeft = [];
    let bottomRight = [];

    // TOP LEFT
    while (i >= 0 && j >= 0) {
      topLeft.push(board[i][j]);
      i--;
      j--;
    }
    i = ai + 1,
      j = aj - 1;
    //TOP RIGHT
    while (i <= board.length - 1 && j >= 0) {
      topRight.push(board[i][j]);
      i++;
      j--;
    }
    i = ai + 1,
      j = aj + 1;
    // BOTTOM RIGHT
    while (i <= board.length - 1 && j <= board.length - 1) {
      bottomRight.push(board[i][j]);
      i++;
      j++;
    }
    i = ai - 1,
      j = aj + 1;
    //BOTTOM LEFT
    while (i >= 0 && j <= board.length - 1) {
      bottomLeft.push(board[i][j]);
      i--;
      j++;
    }

    for (let n = 0; n < topLeft.length; n++) {
      let pL = topLeft[n];
      if (pL.state == this.state) {
        break;
      } else if (pL.state == null) {
        pL.color = dynamicColor;
      } else if (pL.state != this.state) {
        pL.color = dynamicColor;
        break;
      }
    }
    for (let n = 0; n < topRight.length; n++) {
      let pL = topRight[n];
      if (pL.state == this.state) {
        break;
      } else if (pL.state == null) {
        pL.color = dynamicColor;
      } else if (pL.state != this.state) {
        pL.color = dynamicColor;
        break;
      }
    }
    for (let n = 0; n < bottomLeft.length; n++) {
      let pL = bottomLeft[n];
      if (pL.state == this.state) {
        break;
      } else if (pL.state == null) {
        pL.color = dynamicColor;
      } else if (pL.state != this.state) {
        pL.color = dynamicColor;
        break;
      }
    }
    for (let n = 0; n < bottomRight.length; n++) {
      let pL = bottomRight[n];
      if (pL.state == this.state) {
        break;
      } else if (pL.state == null) {
        pL.color = dynamicColor;
      } else if (pL.state != this.state) {
        pL.color = dynamicColor;
        break;
      }
    }
  }

  checkKing(ai, aj) {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = ai + xoff;
        let j = aj + yoff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          let neighbor = board[i][j];
          if (neighbor.state == null || neighbor.state != this.state)
            neighbor.color = dynamicColor;
        }
      }
    }
  }

  checkKnight(ai, aj) {
    const posiblityIJ = [
      [+1, -2],
      [+2, -1],
      [+2, +1],
      [+1, +2],
      [-1, +2],
      [-2, +1],
      [-2, -1],
      [-1, -2]
    ];

    for (let j = 0; j < posiblityIJ.length; j++) {
      const x = ai + posiblityIJ[j][0];
      const y = aj + posiblityIJ[j][1];
      if (x >= 0 && y >= 0) {
        if (x <= cols - 1 && y <= rows - 1) {
          let obj = board[x][y];
          if (obj.state == null || obj.state != this.state)
            obj.color = dynamicColor;
        }
      }
    }
  }

  checkCastles(ai, aj) {
    let i = ai,
      j = aj;

    if (board[i + 1][j].state == null && board[i + 2][j].state == null) {
      board[i + 2][j].color = dynamicColor;
      board[i + 2][j].castle = true;
    }
  }
}