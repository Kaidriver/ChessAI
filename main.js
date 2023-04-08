let board = [  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
];

function insertImage() {
  document.querySelectorAll('.box').forEach(image => {
    if (image.innerText.length !== 0) {
      if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
        image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${image.innerText}.png" alt="">`
        image.style.cursor = 'pointer'
      } else {
        image.innerHTML = `${image.innerText} <img class='allimg' src="${image.innerText}.png" alt="">`
        image.style.cursor = 'pointer'
      }
    }
  })
}
insertImage()

// Function to display the board
function displayBoard() {
  let display = "";
  for (let i = 0; i < 8; i++) {
    display += "<div class='row'>";
    for (let j = 0; j < 8; j++) {
      display += "<div class='square'>" + board[i][j] + "</div>";
    }
    display += "</div>";
  }
  document.getElementById("board").innerHTML = display;
}

// Initialize the game
function initGame() {
  displayBoard();
}


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