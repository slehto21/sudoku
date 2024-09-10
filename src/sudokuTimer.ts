let startTime: Date;
let timerInterval: ReturnType<typeof setInterval> | undefined;

export function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = undefined;
    }
}

export function resetTimer() {
    stopTimer();
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        timerDisplay.textContent = '00:00:00';
    }
}

function updateTimer() {
    const currentTime = (new Date().getTime()) as number;
    const elapsedTime = currentTime - (startTime as unknown as number);
    const seconds = Math.floor(elapsedTime / 1000) % 60; 
    const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    const hours = Math.floor(elapsedTime /1000 / 60 / 60);  
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

function pad(number: number){
    return number < 10 ? "0" + number : number;
}

}