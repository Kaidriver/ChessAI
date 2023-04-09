import { Chess } from 'chess.js'
import promptSync from 'prompt-sync'
import express from "express"
import cors from "cors"

var app = express();
app.use(cors())
app.use(express.json())
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

var counter = 0
var transTable = new Map()

var pawnWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];
var pawnBlack = pawnWhite.slice().reverse()
var knightWhite = 
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];
var knightBlack = knightWhite.slice().reverse()
var bishopWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];
var bishopBlack = bishopWhite.slice().reverse()
var rookWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];
var rookBlack = rookWhite.slice().reverse()
var queenWhite = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];
var queenBlack = queenWhite.slice().reverse()
var kingWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];
var kingBlack = kingWhite.slice().reverse()
function evaluation_fun(fen) {
    let pieces = fen.split(" ")[0]
    let rows = pieces.split("/")
    let piece_vals = {
        "p": -10,
        "n": -32,
        "b": -33,
        "q": -90,
        "r": -50,
        "k": 0,
        "P": 10,
        "N": 32,
        "B": 33,
        "Q": 90,
        "R": 50,
        "K": 0
    }

    let position_vals = {
        "p": pawnBlack,
        "n": knightBlack,
        "b": bishopBlack,
        "r": rookBlack,
        "q": queenBlack,
        "k": kingBlack,
        "P": pawnWhite,
        "N": knightWhite,
        "B": bishopWhite,
        "R": rookWhite,
        "Q": queenWhite,
        "K": kingWhite
    }

    let black = new Set(["p","n","b", "r", "q", "k"]);
    let val = 0
    for (let row = 0; row < rows.length; row++) {
        let row_string = rows[row]
        let left_spaces = 0
        for (let col = 0; col < row_string.length; col++) {
            let piece = row_string[col]
            if (piece in piece_vals) {
                if (black.has(piece)) {
                    val += piece_vals[piece] - position_vals[piece][row][left_spaces]
                }
                else {
                    val += piece_vals[piece] + position_vals[piece][row][left_spaces]
                }
                
                left_spaces++
            }
            else {
                left_spaces += parseInt(piece)
            }
        }
    }

    return val
}

function getValue(board, depth, alpha, beta) {
    counter++
    if (board.isCheckmate()) {
        // if white to move, and board is checkmate, black won
        if (depth % 2 == 1) {
            return -10000
        }
        
        return 10000
    }
    else if (depth == 4) {
        return evaluation_fun(board.fen())
    }

    if (transTable.has(board.fen())) {
        return transTable.get(board.fen())
    }

    if (depth % 2 == 0) {
        return getMin(board, depth, alpha, beta)[0]
    }
    else {
        return getMax(board, depth, alpha, beta)[0]
    }
}

function getMin(board, depth, alpha, beta) {
    let minVal = 100000
    let possibleMoves = board.moves()
    let moveVals = {}
    for (let i = 0; i < possibleMoves.length; i++) {
        board.move(possibleMoves[i])
        moveVals[possibleMoves[i]] = evaluation_fun(board.fen())
        board.undo()
    }

    let minMove = null 
    for (let i = 0; i < possibleMoves.length; i++) {
        board.move(possibleMoves[i])
        let val = getValue(board, depth + 1, alpha, beta)
        if (val < alpha) {
            board.undo()
            return val
        }

        if (val < minVal) {
            minVal = val
            minMove = possibleMoves[i]
        }

        beta = Math.min(beta, minVal)
        board.undo()
    }

    transTable.set(board.fen(), minVal)
    return [minVal, minMove]
}

function getMax(board, depth, alpha, beta) {
    let maxVal = -100000
    let possibleMoves = board.moves()
    let moveVals = {}
    for (let i = 0; i < possibleMoves.length; i++) {
        board.move(possibleMoves[i])
        moveVals[possibleMoves[i]] = evaluation_fun(board.fen())
        board.undo()
    }

    possibleMoves.sort((a, b) => moveVals[b] - moveVals[a])
    let maxMove = null 
    for (let i = 0; i < possibleMoves.length; i++) {
        board.move(possibleMoves[i])
        let val = getValue(board, depth + 1, alpha, beta)
        if (val > beta) {
            board.undo()
            return val
        }

        if (val > maxVal) {
            maxVal = val
            maxMove = possibleMoves[i]
        }

        alpha = Math.max(alpha, maxVal)
        board.undo()
    }

    transTable.set(board.fen(), maxVal)
    return [maxVal, maxMove]
}

const chess = new Chess()
const prompt = promptSync()
app.post("/make_move", (req, res) => {
    console.log(req.body)
    let from_coord = req.body["from"]
    let to_coord = req.body["to"]
    let promo_piece = req.body["piece"]
    if (promo_piece != "") {
        try {
            chess.move({from: from_coord, to: to_coord, piece: promo_piece})
            if (chess.isCheckmate()) {
                res.send("white wins")
            }
            else if (chess.isStalemate() || chess.isDraw() || chess.isThreefoldRepetition()) {
                res.send("draw")
            }
    
            res.send(chess.fen())
            console.log(chess.ascii())
        } catch (error) {
            res.send("error")
        }
    }
    else {
        try {
            chess.move({from: from_coord, to: to_coord})
            if (chess.isCheckmate()) {
                res.send("white wins")
            }
            else if (chess.isStalemate() || chess.isDraw() || chess.isThreefoldRepetition()) {
                res.send("draw")
            }
    
            res.send(chess.fen())
            console.log(chess.ascii())
        } catch (error) {
            res.send("error")
        }
    } 
})
app.get("/test", (req, res) => {
    res.send("test!")
})
app.get("/ai_move", (req, res) => {
    let aiMove = getMin(chess, 0, -1000000, 1000000)
    chess.move(aiMove[1])
    console.log(chess.ascii())

    if (chess.isCheckmate()) {
        res.send("black wins")
    }
    else if (chess.isStalemate() || chess.isDraw() || chess.isThreefoldRepetition()) {
        res.send("draw")
    }
    else {
        res.send(chess.fen())
    }
})
// while (!chess.isCheckmate()) {
//     let input = prompt("Move: ")
//     chess.move(input)
//     console.log(chess.ascii())
//     let aiMove = getMin(chess, 0, -1000000, 1000000)
//     chess.move(aiMove[1])
//     console.log(chess.ascii())
//     console.log(counter)
// }
