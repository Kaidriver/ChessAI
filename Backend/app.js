import { Chess } from 'chess.js'

function evaluation_fun(fen) {
    let pieces = fen.split(" ")[0]
    let piece_vals = {
        "p": -1,
        "n": -3,
        "b": -3,
        "q": -9,
        "r": -5,
        "P": 1,
        "N": 3,
        "B": 3,
        "Q": 9,
        "R": 5,
    }

    let val = 0
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i] in piece_vals) {
            val += piece_vals[pieces[i]]
        }
    }

    return val
}

function getValue(board, depth) {
    let chess = new Chess(board)
    if (chess.isCheckmate()) {
        if (board % 2 == 0) {
            return -100
        }
        
        return 100
    }
    else if (depth == 4) {
        return evaluation_fun(board)
    }

    if (depth % 2 == 0) {
        return getMin(board, depth)[0]
    }
    else {
        return getMax(board, depth)[0]
    }
}

function getMin(board, depth) {
    let minVal = 1000
    let chess = new Chess(board)
    let possibleMoves = chess.moves()

    let minMove = null 
    for (let i = 0; i < possibleMoves.length; i++) {
        chess.move(possibleMoves[i])
        let val = getValue(chess.fen(), depth + 1)
        if (val < minVal) {
            minVal = val
            minMove = possibleMoves[i]
        }

        chess.undo()
    }

    return [minVal, minMove]
}

function getMax(board, depth) {
    let maxVal = -1000
    let chess = new Chess(board)
    let possibleMoves = chess.moves()

    let maxMove = null 
    for (let i = 0; i < possibleMoves.length; i++) {
        chess.move(possibleMoves[i])
        let val = getValue(chess.fen(), depth + 1)
        if (val > maxVal) {
            maxVal = val
            maxMove = possibleMoves[i]
        }

        chess.undo()
    }

    return [maxVal, maxMove]
}

const chess = new Chess()
chess.move('e4')
 
console.log(getMin(chess.fen(), 0)[1])
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });