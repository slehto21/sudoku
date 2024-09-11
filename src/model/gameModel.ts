import { handleTimerDisplay } from "../controller/gameContoller.js";

let wrongMoves = 0;
let hintsUsed = 0;
let gameRunning = false;
let startTime: Date | null;
let timerInterval: NodeJS.Timeout | undefined = undefined;

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

export function getHintsUsed(): number {
    return hintsUsed;
}

export function getEmptyCell(board: number[][]) {
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

export function getBoardState(): number[][] {
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

export function setGameRunning(status: boolean) {
    gameRunning = status;
}

export function getGameRunning() {
    return gameRunning;
}

export function getStartTime(): Date | null {
    return startTime;
}

export function startTimer() {
    startTime = new Date();
    handleTimerDisplay(0, 0, 0,);
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