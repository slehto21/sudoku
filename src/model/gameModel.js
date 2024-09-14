import { handleTimerDisplay } from "../controller/gameContoller.js";
let wrongMoves = 0;
let hintsUsed = 0;
let gameRunning = false;
let startTime;
let endTime;
let timerInterval = undefined;
export function resetWrongMoves() {
    wrongMoves = 0;
}
export function incrementWrongMoves() {
    wrongMoves++;
}
export function getWrongMoves() {
    return wrongMoves;
}
export function resetHintsUsed() {
    hintsUsed = 0;
}
export function incrementHintsUsed() {
    hintsUsed++;
}
export function getHintsUsed() {
    return hintsUsed;
}
export function getEmptyCell(board) {
    let emptyCells = [];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                emptyCells.push([row, col]);
            }
        }
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}
export function getBoardState() {
    const board = [];
    for (let row = 0; row < 9; row++) {
        const rowArray = [];
        for (let col = 0; col < 9; col++) {
            const inputId = `cell${row}${col}`;
            const input = document.getElementById(inputId);
            if (input) {
                rowArray.push(parseInt(input.value) || 0);
            }
            else {
                rowArray.push(0);
            }
        }
        board.push(rowArray);
    }
    return board;
}
export function setGameRunning(status) {
    gameRunning = status;
}
export function getGameRunning() {
    return gameRunning;
}
export function getStartTime() {
    return startTime;
}
export function startTimer() {
    startTime = new Date();
    handleTimerDisplay(0, 0, 0);
    timerInterval = setInterval(() => {
        const { hours, minutes, seconds } = getElapsedTime();
        handleTimerDisplay(hours, minutes, seconds);
    }, 1000);
}
export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = undefined;
    }
}
export function resetTimer() {
    stopTimer();
    startTime = null;
}
export function getElapsedTime() {
    const currentTime = new Date().getTime();
    if (startTime) {
        const elapsedTime = currentTime - startTime.getTime();
        const seconds = Math.floor(elapsedTime / 1000) % 60;
        const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
        const hours = Math.floor(elapsedTime / 1000 / 60 / 60);
        return { hours, minutes, seconds };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
}
export function getEndTime() {
    return endTime;
}
export function setEndTime() {
    endTime = new Date();
}
export function getGameTime() {
    if (startTime && endTime) {
        const duration = endTime.getTime() - startTime.getTime();
        const seconds = Math.floor(duration / 1000) % 60;
        const minutes = Math.floor(duration / 1000 / 60) % 60;
        const hours = Math.floor(duration / 1000 / 60 / 60);
        return { hours, minutes, seconds };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
}
