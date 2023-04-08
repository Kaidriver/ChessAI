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

axios.get('http://localhost:3000/get_board').then((res) => {
  alert(res["data"])
})
