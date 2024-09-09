import { fillClientBoard, solveSudokuBoard, isValidMove, generateEmptySudoku } from "./sudokuSolver.js";
import { resetWrongMoves } from "./sudokuCheck.js";
import { resetHints } from "./sudokuHint.js";
let solutionCounter = 0;
export let solvedBoard = [];
export function generateSudoku(difficulty) {
    resetStyles();
    const board = generateEmptySudoku();
    initializeWithNums(board, 10);
    solveSudokuBoard(board);
    solvedBoard = board.map(row => row.slice());
    resetWrongMoves();
    resetHints();
    removeNums(board, difficulty);
    fillClientBoard(board);
}
function resetStyles() {
    const cells = document.querySelectorAll('.sudokuGrid input[type="text"]');
    cells.forEach((cell) => {
        const inputElement = cell;
        inputElement.style.backgroundColor = ''; // Nollaa taustaväri
        inputElement.style.color = ''; // Nollaa tekstin väri
    });
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
// function sleep(ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }
// function main() {
//     const args = process.argv.slice(2);
//     if (args[0] === "generateSudoku") {
//         generateSudoku();
//     } else {
//         console.log("Unknown function. Use 'initializeWithNums' to run the function.");
//     }
// }
// main();
