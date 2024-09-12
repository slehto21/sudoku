export function resetStyles() {
    const cells = document.querySelectorAll('.sudokuGrid input[type="text"]');
    cells.forEach((cell) => {
        const inputElement = cell as HTMLInputElement;
        inputElement.style.backgroundColor = '';
        inputElement.style.color = '';
    });
}

export function fillClientBoard(board: number[][], solve: boolean) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const inputId = `cell${row}${col}`;
            const input = document.getElementById(inputId) as HTMLInputElement;

            if (input) {
                input.value = board[row][col] !== 0 ? board[row][col].toString() : '';
                if (solve) {
                    input.style.color = 'green';
                }
            }
        }
    }
}