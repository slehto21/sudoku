export function updateWrongMovesDisplay(wrongMoves: number, gameStatus: boolean) {
    const wrongMovesCounter = document.getElementById('wrongMovesCounter');
    if (wrongMovesCounter) {
        if (gameStatus === false) {
            wrongMovesCounter.textContent = '';
        } else {
            wrongMovesCounter.textContent = `Wrong moves: ${wrongMoves}`;
        }
    }
}

export function setCellBackground(inputElement: HTMLInputElement, color: string) {
    inputElement.style.backgroundColor = color;
}

export function updateHintsDisplay(hints: number, gameStatus: boolean) {
    const hintsCounter = document.getElementById('hintsCounter');
    if (hintsCounter) {
        if (gameStatus === false) {
            hintsCounter.textContent = '';
        } else {
            hintsCounter.textContent = `Hints used: ${hints}`;
        }
    }
}

export function placeHintOnBoard(cell: [number, number], solvedBoard: number[][]) {
    const inputId = `cell${cell[0]}${cell[1]}`;
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input && input.value === '') {
        input.value = solvedBoard[cell[0]][cell[1]].toString();
        input.style.color = 'blue';
    }
}


export function updateTimerDisplay(hours: number, minutes: number, seconds: number, gameStatus: boolean) {
    console.log('updateTimerDisplay');
    console.log(hours, minutes, seconds, gameStatus);
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        if (gameStatus === false) {
            timerDisplay.textContent = '';
        }
        else{
            console.log('updateTimerDisplay else');
            timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
    }
}

function pad(number: number) {
    return number < 10 ? "0" + number : number;
}

