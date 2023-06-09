var state = false;
var currPiece;
var currCell;
var res;
var current_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
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
var coord = {
  "81": "a8",
  "82": "b8",
  "83": "c8",
  "84": "d8",
  "85": "e8",
  "86": "f8",
  "87": "g8",
  "88": "h8",


  "71": "a7",
  "72": "b7",
  "73": "c7",
  "74": "d7",
  "75": "e7",
  "76": "f7",
  "77": "g7",
  "78": "h7",

  "61": "a6",
  "62": "b6",
  "63": "c6",
  "64": "d6",
  "65": "e6",
  "66": "f6",
  "67": "g6",
  "68": "h6",

  "51": "a5",
  "52": "b5",
  "53": "c5",
  "54": "d5",
  "55": "e5",
  "56": "f5",
  "57": "g5",
  "58": "h5",

  "41": "a4",
  "42": "b4",
  "43": "c4",
  "44": "d4",
  "45": "e4",
  "46": "f4",
  "47": "g4",
  "48": "h4",

  "31": "a3",
  "32": "b3",
  "33": "c3",
  "34": "d3",
  "35": "e3",
  "36": "f3",
  "37": "g3",
  "38": "h3",

  "21": "a2",
  "22": "b2",
  "23": "c2",
  "24": "d2",
  "25": "e2",
  "26": "f2",
  "27": "g2",
  "28": "h2",

  "11": "a1",
  "12": "b1",
  "13": "c1",
  "14": "d1",
  "15": "e1",
  "16": "f1",
  "17": "g1",
  "18": "h1"
};

async function make_move(from, to, piece) {
  let res = await axios.post("https://api.cagnusmarlsenbot.tech/make_move", {
        from: from,
        to: to,
        piece: piece,
        fen: current_fen
      })
  return res.data
}

async function ai_move() {
  let res = await axios.post("https://api.cagnusmarlsenbot.tech/ai_move", {
        fen: current_fen
      })
  return res.data
}

// Listens for clicks, if cell has a piece, call getCell to update position
function playBoard() {
  let cells = document.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener('click', function() {
      getCell(this);
    })
  }
}

// Function to change piece position
async function getCell(curr) {
  if (!state) {
    if (curr.innerHTML && piece_color[curr.innerHTML] === "white") {
      state = true;
      currPiece = curr.innerHTML;
      currCell = curr;
      curr.style.background = "#6a6b6e";
    }
  } else {
    currCell.style.background = (currCell.classList[0] == "light") ? "#eee" : "#aaa"
    let promotion = "";
    if ((piece_to_letter[currPiece] === "p" || piece_to_letter[currPiece] === "P") && (curr.id).includes("8")) {
      let pass = true;
      while(pass) {
        promotion = prompt("Enter q for Queen, r for Rook, b for Bishop, or n for Knight");
        switch (promotion) {
          case "q":
          case "Q":
            promotion = "q";
            pass = false;
            break;
          case "r":
          case "R":
            promotion = "r";
            pass = false;
            break;
          case "b":
          case "B":
            promotion = "r";
            pass = false;
            break;
          case "n":
          case "N":
            promotion = "n";
            pass = false;
            break;
        }
      }
    }
    res = await make_move(currCell.id, curr.id, promotion);
    if (res !== "error" && res !== "draw" && res !== "white wins" && res !== "black wins") {
      // if (promotion) {
      //   switch (promotion) {
      //     case "q":
      //     case "Q":
      //       curr.innerHTML = letter_to_piece["Q"]
      //       break;
      //     case "r":
      //     case "R":
      //       curr.innerHTML = letter_to_piece["R"]
      //       break;
      //     case "b":
      //     case "B":
      //       curr.innerHTML = letter_to_piece["B"]
      //       break;
      //     case "n":
      //     case "N":
      //       curr.innerHTML = letter_to_piece["N"]
      //       break;
      //   }
      // } else {
      //   curr.innerHTML = currPiece;
      // }
      // currCell.innerHTML = "";
      current_fen = res
      FENtoBoard(res)
      document.querySelector('.loading').style.visibility = "initial"
      ai_res = await ai_move();

      if (ai_res !== "draw" && ai_res !== "white wins" && ai_res !== "black wins") {
        current_fen = ai_res
        console.log(current_fen)
        FENtoBoard(ai_res);
      }
      else {
        switch (ai_res) {
          case "draw":
            alert("The game ended in a draw!");
            break;
          case "white wins":
            alert("Player won!");
            break;
          case "black wins":
            alert("AI won!");
            break;
        }
      }
    } else if (res !== "error") {
      switch (res) {
        case "draw":
          alert("The game ended in a draw!");
          break;
        case "white wins":
          alert("Player won!");
          break;
        case "black wins":
          alert("AI won!");
          break;
      }
    }

    document.querySelector('.loading').style.visibility = "hidden"
    state = false;
  }
}

function FENtoBoard(fen) {
  const regex = new RegExp(['([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)\/?',
                            '([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)\/?',
                            '([pnbrqkPNBRQK12345678]+)\/?([pnbrqkPNBRQK12345678]+)'].join(''));
  let matchGroups = regex.exec(fen)

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

      for (let j = 0; j < chars.length; j++) {
        if (!isNaN(parseInt(chars[j]))) {
          for (let k = 0; k < parseInt(chars[j]); k++) {
            let id = coord[(row + 1).toString() + counter.toString()];
            if (i % 2 == 0) {
              if (counter % 2 == 0) {
                display += "<td class='light' id=" + id + "></td>";
              } else {
                display += "<td class='dark' id=" + id + "></td>";
              }
              counter++;
            } else {
              if (counter % 2 == 0) {
                display += "<td class='dark' id=" + id + "></td>";
              } else {
                display += "<td class='light' id=" + id + "></td>";
              }
              counter++;
            }
          }
        } else {
          let id = coord[(row + 1).toString() + counter.toString()];
          if (i % 2 == 0) {
            if (counter % 2 == 0) {
              display += "<td class='light' id=" + id + ">" + letter_to_piece[chars[j]] + "</td>";
            } else {
              display += "<td class='dark' id=" + id + ">" + letter_to_piece[chars[j]] + "</td>";
            }
            counter++;
          } else {
            if (counter % 2 == 0) {
              display += "<td class='dark' id=" + id + ">" + letter_to_piece[chars[j]] + "</td>";
            } else {
              display += "<td class='light' id=" + id + ">" + letter_to_piece[chars[j]] + "</td>";
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
  playBoard()
}

// Initialize the game
function initGame() {
  FENtoBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
}

initGame();

// FENtoBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
// FENtoBoard("r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1");
// FENtoBoard("8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50");

// Function to display and start the board
/* function initBoard() {
  display = "<table class='center chess-board'> <tbody>";
  for (let i = 9; i >= 1; i--) {
    display += "<tr class='row'>";
    if (i == 9) {
      display += "<th></th> <th>a</th> <th>b</th> <th>c</th> <th>d</th> <th>e</th> <th>f</th> <th>g</th> <th>h</th>";
    } else if (i == 8) {
      display += "<th>8</th> <td class='light' id='a8'>♜</td> <td class='dark' id='b8'>♞</td>" +
                 "<td class='light' id='c8'>♝</td> <td class='dark' id='d8'>♛</td>" +
                 "<td class='light' id='e8'>♚</td> <td class='dark' id='f8'>♝</td>" +
                 "<td class='light' id='g8'>♞</td> <td class='dark' id='h8'>♜</td>"
    } else if (i == 1) {
      display += "<th>1</th> <td class='dark' id='a1'>♖</td> <td class='light' id='b1'>♘</td>" +
                 "<td class='dark' id='c1'>♗</td> <td class='light' id='d1'>♕</td>" +
                 "<td class='dark' id='e1'>♔</td> <td class='light' id='f1'>♗</td>" +
                 "<td class='dark' id='g1'>♘</td> <td class='light' id='h1'>♖</td>"
    } else {
      for (let j = 0; j <= 8; j++) {
        if (j == 0) {
          display += "<th>" + i + "</th>";
        } else {
          let id = coord[i.toString() + j.toString()];
          if (i % 2 == 0) {
            if (j % 2 == 0) {
              display += "<td class='dark' id=" + id + ">" + (i == 2 ? "♙" : "") + "</td>";
            } else {
              display += "<td class='light' id=" + id + ">" + (i == 2 ? "♙" : "") + "</td>";
            }
          } else {
            if (j % 2 == 0) {
              display += "<td class='light' id=" + id + ">" + (i == 7 ? "♟" : "") + "</td>";
            } else {
              display += "<td class='dark' id=" + id + ">" + (i == 7 ? "♟" : "") + "</td>";
            }
          }
        }
      }
    }
    display += "</tr>";
  }
  display += "</tbody> </table>";
  document.getElementById("board").innerHTML = display;
} */

/* function getFEN() {
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
} */
