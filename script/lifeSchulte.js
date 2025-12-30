const cells = document.querySelectorAll('.cell');
const timerDisplay = document.querySelector('.schulteTimer');
const bestDisplay = document.querySelector('.schulteBest');
const resetBtn = document.querySelector('.schulteReset');

let currentNumber = 1;
let milliseconds = 0;
let timer;
let timerStarted = false;
let bestTime = null;

// Shuffle numbers
function randomizeGrid(){
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);

    cells.forEach((cell, index) => {
        cell.textContent = numbers[index];
        cell.classList.remove('active', 'correct');
    });

    currentNumber = 1;
    milliseconds = 0;
    timerDisplay.textContent = '00:00';
    timerStarted = false;
}

// Start timer
function startTimer(){
    timer = setInterval(() => {
        milliseconds += 10;
        const sec = String(Math.floor(milliseconds / 1000)).padStart(2, '0');
        const ms = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, '0');
        timerDisplay.textContent = `${sec}:${ms}`;
    }, 10);
}

// Stop timer
function stopTimer(){
    clearInterval(timer);

    if (!bestTime || milliseconds < bestTime) {
        bestTime = milliseconds;
        const sec = String(Math.floor(bestTime / 1000)).padStart(2, '0');
        const ms = String(Math.floor((bestTime % 1000) / 10)).padStart(2, '0');
        bestDisplay.textContent = `FASTEST: ${sec}:${ms}`;
    }
}

// Clicks
function listenClicks(){
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const value = Number(cell.textContent);

            // Start timer
            if (!timerStarted){
                startTimer();
                timerStarted = true;
            }

            if (value === currentNumber){
                cell.classList.add('correct');
                currentNumber++;

                // Finish
                if (currentNumber > 25){
                    stopTimer();
                };
            } else {
                cell.classList.add('active');
                setTimeout(() => cell.classList.remove('active'), 200);
            }
        });
    });
};

// Reset button
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    randomizeGrid();
});

randomizeGrid();
listenClicks();
