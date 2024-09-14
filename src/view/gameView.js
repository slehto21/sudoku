export function updateWrongMovesDisplay(wrongMoves, gameStatus) {
    const wrongMovesCounter = document.getElementById('wrongMovesCounter');
    if (wrongMovesCounter) {
        if (gameStatus === false) {
            wrongMovesCounter.textContent = '';
        }
        else {
            wrongMovesCounter.textContent = `Wrong moves: ${wrongMoves}`;
        }
    }
}
export function setCellBackground(inputElement, color) {
    inputElement.style.backgroundColor = color;
}
export function updateHintsDisplay(hints, gameStatus) {
    const hintsCounter = document.getElementById('hintsCounter');
    if (hintsCounter) {
        if (gameStatus === false) {
            hintsCounter.textContent = '';
        }
        else {
            hintsCounter.textContent = `Hints used: ${hints}`;
        }
    }
}
export function placeHintOnBoard(cell, solvedBoard) {
    const inputId = `cell${cell[0]}${cell[1]}`;
    const input = document.getElementById(inputId);
    if (input && input.value === '') {
        input.value = solvedBoard[cell[0]][cell[1]].toString();
        input.style.color = 'blue';
    }
}
export function updateTimerDisplay(hours, minutes, seconds, gameStatus) {
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        if (gameStatus === false) {
            timerDisplay.textContent = '';
        }
        else {
            timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
    }
}
function pad(number) {
    return number < 10 ? "0" + number : number;
}
export function completionModal(time, wrongMoves, hintsUsed, gameStatus) {
    const modal = document.getElementById("endGameModal");
    const span = document.getElementsByClassName("close")[0];
    const h2 = document.getElementById("completionHeader");
    const p = document.getElementById("completionMessage");
    if (gameStatus === false) {
        if (modal) {
            if (h2 && p) {
                console.log(time);
                const hours = time['hours'];
                const minutes = time['minutes'];
                const seconds = time['seconds'];
                h2.textContent = 'You Won!';
                p.innerHTML = 'Time: ' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + '<br>' +
                    'Wrong Moves: ' + wrongMoves + '<br>' +
                    'Hints Used: ' + hintsUsed;
            }
            modal.style.display = "block";
        }
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        if (modal !== null && modal !== undefined) {
            modal.style.display = "none";
        }
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            if (modal)
                modal.style.display = "none";
        }
    };
}
export function chooseDifficultyModal() {
    const endModal = document.getElementById("endGameModal");
    const difficultyModal = document.getElementById("difficultyModal");
    const span = document.getElementsByClassName("close")[1];
    if (endModal) {
        endModal.style.display = "none";
    }
    if (difficultyModal) {
        difficultyModal.style.display = "block";
    }
    span.onclick = function () {
        if (difficultyModal !== null && difficultyModal !== undefined) {
            difficultyModal.style.display = "none";
        }
    };
    window.onclick = function (event) {
        if (event.target == difficultyModal) {
            if (difficultyModal)
                difficultyModal.style.display = "none";
        }
    };
}
