var state = false;
var currPiece;
var currCell;
var piece_color = {
  "♟": "black",
  "♜": "black",
  "♞": "black",
  "♝": "black",
  "♛": "black",
  "♚": "black",
  "♙": "white",
  "♖": "white",
  "♘": "white",
  "♗": "white",
  "♕": "white",
  "♔": "white"
};
var piece_to_letter = {
  "♟": "p",
  "♜": "r",
  "♞": "n",
  "♝": "b",
  "♛": "q",
  "♚": "k",
  "♙": "P",
  "♖": "R",
  "♘": "N",
  "♗": "B",
  "♕": "Q",
  "♔": "K"
};
var letter_to_piece = {
  "p": "♟",
  "r": "♜",
  "n": "♞",
  "b": "♝",
  "q": "♛",
  "k": "♚",
  "P": "♙",
  "R": "♖",
  "N": "♘",
  "B": "♗",
  "Q": "♕",
  "K": "♔"
};

// Function to display and start the board
function initBoard() {
  display = "<table class='center chess-board'> <tbody>";
  for (let i = 9; i >= 1; i--) {
    display += "<tr class='row'>";
    if (i == 9) {
      display += "<th></th> <th>a</th> <th>b</th> <th>c</th> <th>d</th> <th>e</th> <th>f</th> <th>g</th> <th>h</th>";
    } else if (i == 8) {
      display += "<th>8</th> <td class='light'>♜</td> <td class='dark'>♞</td> <td class='light'>♝</td>" +
                 "<td class='dark'>♛</td> <td class='light'>♚</td> <td class='dark'>♝</td>" +
                 "<td class='light'>♞</td> <td class='dark'>♜</td>"
    } else if (i == 1) {
      display += "<th>1</th> <td class='dark'>♖</td> <td class='light'>♘</td> <td class='dark'>♗</td>" +
                 "<td class='light'>♕</td> <td class='dark'>♔</td> <td class='light'>♗</td>" +
                 "<td class='dark'>♘</td> <td class='light'>♖</td>"
    } else {
      for (let j = 0; j <= 8; j++) {
        if (j == 0) {
          display += "<th>" + i + "</th>";
        } else {
          if (i % 2 == 0) {
            if (j % 2 == 0) {
              display += "<td class='dark'>" + (i == 2 ? "♙" : "") + "</td>";
            } else {
              display += "<td class='light'>" + (i == 2 ? "♙" : "") + "</td>";
            }
          } else {
            if (j % 2 == 0) {
              display += "<td class='light'>" + (i == 7 ? "♟" : "") + "</td>";
            } else {
              display += "<td class='dark'>" + (i == 7 ? "♟" : "") + "</td>";
            }
          }
        }
      }
    }
    display += "</tr>";
  }
  display += "</tbody> </table>";
  document.getElementById("board").innerHTML = display;
}

// Listens for clicks, if cell has a piece, call getCell to update position
function playBoard() {
  let cells = document.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++){
    cells[i].onclick = function() {
      getCell(this);
    }
  }
}

// Function to change piece position
function getCell(curr) {
  if (!state) {
    getFEN();
    if (curr.innerHTML && piece_color[curr.innerHTML] === "white") {
      state = true;
      currPiece = curr.innerHTML;
      currCell = curr;
    }
  } else {
    if (curr != currCell && piece_color[curr.innerHTML] !== "white") {
      curr.innerHTML = currPiece;
      currCell.innerHTML = "";
    }
    getFEN();
    state = false;
  }
}

function FENtoBoard(fen) {
  const regex = new RegExp(['([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)\/?',
                            '([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)\/?',
                            '([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)'].join(''));
  let matchGroups = regex.exec(fen)
  console.log(matchGroups);

  display = "<table class='center chess-board'> <tbody>";

  let row = 8;
  for (let i = 0; i < matchGroups.length; i++) {
    let counter = 1;
    display += "<tr class='row'>";
    if (i == 0) {
      display += "<th></th> <th>a</th> <th>b</th> <th>c</th> <th>d</th> <th>e</th> <th>f</th> <th>g</th> <th>h</th>";
    } else {
      display += "<th>" + row + "</th>";
      row--;

      let chars = matchGroups[i].split('');
      console.log(chars);

      for (let j = 0; j < chars.length; j++) {
        if (!isNaN(parseInt(chars[j]))) {
          for (let k = 0; k < parseInt(chars[j]); k++) {
            if (i % 2 == 0) {
              if (counter % 2 == 0) {
                display += "<td class='light'></td>";
              } else {
                display += "<td class='dark'></td>";
              }
              counter++;
            } else {
              if (counter % 2 == 0) {
                display += "<td class='dark'></td>";
              } else {
                display += "<td class='light'></td>";
              }
              counter++;
            }
          }
        } else {
          if (i % 2 == 0) {
            if (counter % 2 == 0) {
              display += "<td class='light'>" + letter_to_piece[chars[j]] + "</td>";
            } else {
              display += "<td class='dark'>" + letter_to_piece[chars[j]] + "</td>";
            }
            counter++;
          } else {
            if (counter % 2 == 0) {
              display += "<td class='dark'>" + letter_to_piece[chars[j]] + "</td>";
            } else {
              display += "<td class='light'>" + letter_to_piece[chars[j]] + "</td>";
            }
            counter++;
          }
        }
      }
    }
    display += "</tr>";
  }
  display += "</tbody> </table>";
  document.getElementById("board").innerHTML = display;
}

function getFEN() {
  let cells = document.getElementsByTagName("td");
  let board= [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""]
  ];

  let x = 0;
  let y = 0;
  for (let i = 0; i < cells.length; i++) {
    if (y > 7) {
      y = 0;
      x++;
    }
    board[x][y] = cells[i].innerHTML;
    y++;
  }
  // console.log(board);

  let FEN = "";
  for (let i = 0; i < board.length; i++) {
    let counter = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        counter++;
      } else {
        if (counter != 0) {
          FEN += counter.toString();
          counter = 0;
        }
        FEN += piece_to_letter[board[i][j]];
      }
    }
    if (counter != 0) {
      FEN += counter.toString();
    }
    FEN += "/";
  }

  FEN += " w";
  console.log(FEN);
}

// Initialize the game
function initGame() {
  initBoard();
  playBoard();
}

initGame();

// FENtoBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
 FENtoBoard("r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1");
 playBoard();
// FENtoBoard("8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50");


/* // Function to move a piece
function movePiece(startRow, startCol, endRow, endCol) {
  let piece = board[startRow][startCol];
  if (isValidMove(startRow, startCol, endRow, endCol)) {
    board[endRow][endCol] = piece;
    board[startRow][startCol] = " ";
    displayBoard();
  }
}

// Function to check if a move is valid
function isValidMove(startRow, startCol, endRow, endCol) {
  let piece = board[startRow][startCol];
  let destPiece = board[endRow][endCol];

  // Check if the destination square is empty or contains an opponent's piece
  if (destPiece === " " || isOpponentPiece(piece, destPiece)) {
    // Check if the move is valid for the selected piece
    switch (piece.toLowerCase()) {
      case "p":
        return isValidPawnMove(startRow, startCol, endRow, endCol);
      case "r":
        return isValidRookMove(startRow, startCol, endRow, endCol);
      case "n":
        return isValidKnightMove(startRow, startCol, endRow, endCol);
      case "b":
        return isValidBishopMove(startRow, startCol, endRow, endCol);
      case "q":
        return isValidQueenMove(startRow, startCol, endRow, endCol);
      case "k":
        return isValidKingMove(startRow, startCol, endRow, endCol);
      default:
        return false;
    }
  }
  return false;
}

// Function to check if a piece is an opponent's piece
function isOpponentPiece(piece1, piece2) {
  return piece1.toLowerCase() !== piece2.toLowerCase();
}

// Functions to check if a move is valid for each piece type
function isValidPawnMove(startRow, startCol, endRow, endCol) {
  // Check if the pawn is moving forward
  if (startCol === endCol) {
    // Check if the pawn is moving one or two squares
    if (startRow - endRow === 1 || (startRow === 6 && startRow - endRow === 2)) {
      return true;
    }
  }
  // Check if the pawn is capturing a piece diagonally
  else if (Math.abs(startCol - endCol) === 1 && startRow - endRow === 1) {
    return true;
  }
  return false;
}

function isValidRookMove(startRow, startCol, endRow, endCol) {
  // Check if the rook is moving vertically or horizontally
  if (startRow === endRow || startCol === endCol) {
    // Check if there are no pieces blocking the path
    if (isPathClear(startRow, startCol, endRow, endCol)) {
      return true;
    }
  }
  return false;
}

function isValidKnightMove(startRow, startCol, endRow, endCol) {
  // Check if the knight is moving in an L-shape
  if (
    (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 1) ||
    (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 2)
  ) {
    return true;
  }
  return false;
}

function isValidBishopMove(startRow, startCol, endRow, endCol) {
  // Check if the bishop is moving diagonally
  if (Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) {
    // Check if there are no pieces blocking the path
    if (isPathClear(startRow, startCol, endRow, endCol)) {
      return true;
    }
  }
  return false;
}

function isValidQueenMove(startRow, startCol, endRow, endCol) {
  // Check if the queen is moving horizontally, vertically or diagonally
  if (startRow === endRow || startCol === endCol || Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) {
    // Check if there are no pieces blocking the path
    if (isPathClear(startRow, startCol, endRow, endCol)) {
      return true;
    }
  }
  return false;
}

function isValidKingMove(startRow, startCol, endRow, endCol) {
  // Check if the king is moving one square in any direction
  if (Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1) {
    return true;
  }
  return false;
}

// Function to check if there are no pieces blocking the path
function isPathClear(startRow, startCol, endRow, endCol) {
  let rowDir = startRow < endRow ? 1 : startRow > endRow ? -1 : 0;
  let colDir = startCol < endCol ? 1 : startCol > endCol ? -1 : 0;
  let row = startRow + rowDir;
  let col = startCol + colDir;
  while (row !== endRow || col !== endCol) {
    if (board[row][col] !== " ") {
      return false;
    }
    row += rowDir;
    col += colDir;
  }
  return true;
}


*/