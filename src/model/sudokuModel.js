import { resetTimer, stopTimer, resetHintsUsed, resetWrongMoves, setGameRunning, startTimer, setEndTime } from "./gameModel.js";
let solutionCounter = 0;
let solvedBoard = [];
export function resetSudoku() {
    setGameRunning(false);
    resetWrongMoves();
    resetHintsUsed();
    resetTimer();
    return generateEmptySudoku();
}
export function generateSudoku(difficulty) {
    resetHintsUsed();
    resetWrongMoves();
    setGameRunning(true);
    stopTimer();
    startTimer();
    const board = generateEmptySudoku();
    initializeWithNums(board, 10);
    solveSudokuBoard(board);
    setSolvedBoard(board);
    removeNums(board, difficulty);
    return board;
}
export function solveSudoku() {
    const board = generateEmptySudoku();
    fillBoard(board);
    if (isValidStartingBoard(board)) {
        solveSudokuBoard(board);
    }
    else {
        return null;
    }
    resetHintsUsed();
    resetWrongMoves();
    resetTimer();
    setGameRunning(false);
    return board;
}
export function compareBoards(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (!a[i].every((val, index) => val === b[i][index]))
            return false;
    }
    return true;
}
export function endGame() {
    setGameRunning(false);
    stopTimer();
    setEndTime();
}
export function setSolvedBoard(board) {
    solvedBoard = board.map(row => row.slice());
}
export function getSolvedBoard() {
    return solvedBoard.map(row => row.slice());
}
function generateEmptySudoku() {
    const sudokuBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    return sudokuBoard;
}
function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const inputId = `cell${row}${col}`;
            const input = document.getElementById(inputId);
            const value = input.value;
            if (value !== "") {
                board[row][col] = parseInt(value);
            }
            else {
                board[row][col] = 0;
            }
        }
    }
}
function isValidStartingBoard(board) {
    for (let row = 0; row < 9; row++) {
        const rowSet = new Set();
        const colSet = new Set();
        const boxSet = new Set();
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== 0) {
                if (isNaN(board[row][col])) {
                    return false;
                }
                if (rowSet.has(board[row][col])) {
                    return false;
                }
                rowSet.add(board[row][col]);
            }
            if (board[col][row] !== 0) {
                if (isNaN(board[col][row])) {
                    return false;
                }
                if (colSet.has(board[col][row])) {
                    return false;
                }
                colSet.add(board[col][row]);
            }
            const rowOffset = 3 * Math.floor(row / 3);
            const colOffset = 3 * (row % 3);
            const boxRow = rowOffset + Math.floor(col / 3);
            const boxCol = colOffset + (col % 3);
            if (board[boxRow][boxCol] !== 0) {
                if (isNaN(board[boxRow][boxCol])) {
                    return false;
                }
                if (boxSet.has(board[boxRow][boxCol])) {
                    return false;
                }
                boxSet.add(board[boxRow][boxCol]);
            }
        }
    }
    return true;
}
function isNumberInRow(board, row, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return true;
        }
    }
    return false;
}
function isNumberInCol(board, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return true;
        }
    }
    return false;
}
function isNumberInBox(board, row, col, num) {
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return true;
            }
        }
    }
    return false;
}
function isValidMove(board, row, col, num) {
    return !isNumberInRow(board, row, num) && !isNumberInCol(board, col, num) && !isNumberInBox(board, row, col, num);
}
function solveSudokuBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let i = 1; i < 10; i++) {
                    if (isValidMove(board, row, col, i)) {
                        board[row][col] = i;
                        if (solveSudokuBoard(board)) {
                            return true;
                        }
                        else {
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function initializeWithNums(board, initialCount) {
    let count = 0;
    while (count < initialCount) {
        const randomRow = Math.floor(Math.random() * 9);
        const randomCol = Math.floor(Math.random() * 9);
        const num = Math.floor(Math.random() * 9) + 1;
        if (board[randomRow][randomCol] === 0) {
            const dupBoard = board.map((row) => row.slice());
            if (isValidMove(dupBoard, randomRow, randomCol, num)) {
                dupBoard[randomRow][randomCol] = num;
                if (solveSudokuBoard(dupBoard)) {
                    board[randomRow][randomCol] = num;
                    count++;
                }
            }
        }
    }
}
function determineNumsToRemove(difficulty) {
    let numsToRemove = 0;
    if (difficulty === "Hard") {
        numsToRemove = 65;
    }
    else if (difficulty === "Medium") {
        numsToRemove = 55;
    }
    else {
        numsToRemove = 45;
    }
    return numsToRemove;
}
function removeNums(board, difficulty) {
    let numsToRemove = determineNumsToRemove(difficulty);
    const dupBoard = board.map((row) => row.slice());
    while (numsToRemove > 0) {
        const randomRow = Math.floor(Math.random() * 9);
        const randomCol = Math.floor(Math.random() * 9);
        if (board[randomRow][randomCol] !== 0) {
            board[randomRow][randomCol] = 0;
            numsToRemove--;
        }
    }
    if (countUniqueSolutions(board) != 1) {
        return board;
    }
    else {
        removeNums(dupBoard, difficulty);
    }
}
function countUniqueSolutions(board) {
    solutionCounter = 0;
    const dupBoard = board.map((row) => row.slice());
    countUniqueSolutionsHelper(dupBoard);
    return solutionCounter;
}
function countUniqueSolutionsHelper(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num < 10; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;
                        countUniqueSolutionsHelper(board);
                        board[row][col] = 0;
                        if (solutionCounter > 1) {
                            return;
                        }
                    }
                }
                return;
            }
        }
    }
    solutionCounter++;
}
export function printSudoku(board) {
    for (let row = 0; row < board.length; row++) {
        let line = "";
        for (let col = 0; col < board[row].length; col++) {
            line += (col % 3 === 0 ? ' | ' : ' ') + board[row][col];
        }
        line += ' |';
        console.log(line);
        if ((row + 1) % 3 === 0) {
            console.log('-------------------------');
        }
    }
}
