import { get } from "http";
import { solvedBoard, getGameRunning } from "./sudokuGenerator.js";

let hintsUsed = 0;

export function resetHints() {
    hintsUsed = 0;
    updateHintsDisplay();
}

function updateHintsDisplay() {
    const hintsCounter = document.getElementById('hintsCounter');
    if (hintsCounter) {
        if (getGameRunning() === false) {
            hintsCounter.textContent = '';
        } else {
            hintsCounter.textContent = `Hints used: ${hintsUsed}`;
        }
    }
}


export function getHint() {
    if (getGameRunning() === false) {
        return;
    }
    if (getGameRunning() === false) {
        return;
    }
    const board = getBoardState();
    let emptyCell = getEmptyCell(board);
    if (emptyCell === undefined) {
        return;
    }
    hintsUsed++;
    updateHintsDisplay();
    placeHintOnBoard(emptyCell);
}

function placeHintOnBoard(cell: [number, number]) {
    const inputId = `cell${cell[0]}${cell[1]}`;
    const input = document.getElementById(inputId) as HTMLInputElement;

    if (input && input.value === '') {
        input.value = solvedBoard[cell[0]][cell[1]].toString();
        input.style.color = 'blue';
    }
}

function getEmptyCell(board: number[][]) {
    let emptyCells: [number, number][] = []
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                emptyCells.push([row, col]);
            }
        }
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}


function getBoardState(): number[][] {
    const board: number[][] = [];
    for (let row = 0; row < 9; row++) {
        const rowArray: number[] = [];
        for (let col = 0; col < 9; col++) {
            const inputId = `cell${row}${col}`;
            const input = document.getElementById(inputId) as HTMLInputElement | null;
            if (input) {
                rowArray.push(parseInt(input.value) || 0);
            } else {
                rowArray.push(0);
            }
        }
        board.push(rowArray);
    }
    return board;
}