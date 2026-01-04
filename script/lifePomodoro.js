let timer = null;
let running = false;
let originalWorkSeconds = 0;
let remainingWorkSeconds = 0;
let phase = "idle";
let workSessionCount = 0;

const startBtn = document.getElementById("startBtn");
const digits = {
    h1: document.getElementById("h1"),
    h2: document.getElementById("h2"),
    m1: document.getElementById("m1"),
    m2: document.getElementById("m2"),
    s1: document.getElementById("s1"),
    s2: document.getElementById("s2")
}

function getTotalSeconds(){
    return parseInt(digits.h1.textContent + digits.h2.textContent) * 3600 +
           parseInt(digits.m1.textContent + digits.m2.textContent) * 60 +
           parseInt(digits.s1.textContent + digits.s2.textContent);
}

// Display function
function setDigits(sec){
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    let s = sec % 60;

    digits.h1.textContent = Math.floor(h / 10);
    digits.h2.textContent = h % 10;
    digits.m1.textContent = Math.floor(m / 10);
    digits.m2.textContent = m % 10;
    digits.s1.textContent = Math.floor(s / 10);
    digits.s2.textContent = s % 10;

    if (!running) {
        document.title = "Pomodoro Timer";
    } else {
        document.title = 
        digits.h1.textContent + digits.h2.textContent + ":" +
        digits.m1.textContent + digits.m2.textContent + ":" +
        digits.s1.textContent + digits.s2.textContent;
    }
}

document.querySelectorAll(".arrow").forEach(arrow => {
    arrow.addEventListener("click", () => {

        if (running){
            stopTimer();
            setDigits(originalWorkSeconds);
            return;
        }

        const id = arrow.dataset.unit;

        let value = parseInt(digits[id].textContent);
        const isUp = arrow.classList.contains("up");
        value += isUp ? 1 : -1;

        if (id === "m1" || id === "s1"){
            if (value > 5) value = 0;
            if (value < 0) value = 5;
        } else {
            if (value > 9) value = 0;
            if (value < 0) value = 9;
        }

        digits[id].textContent = value;
    });
});

startBtn.addEventListener("click", () => {
    if (running){
        stopTimer();
        return;
    }

    originalWorkSeconds = getTotalSeconds();
    if (originalWorkSeconds <= 0){return};

    remainingWorkSeconds = originalWorkSeconds;
    workSessionCount = 0;

    startWorkBlock();
});

function startWorkBlock(){
    phase = "work";
    document.body.style.background = "#8b0000";
    startBtn.textContent = "STOP";
    running = true;

    let workBlockSeconds = Math.min(25 * 60, remainingWorkSeconds);

    timer = setInterval(() => {
        workBlockSeconds--;
        remainingWorkSeconds--;

        setDigits(remainingWorkSeconds);

        // Do resting
        if (workBlockSeconds <= 0){
            clearInterval(timer);
            workSessionCount++;

            if (remainingWorkSeconds <= 0) {
                stopTimer();
                return;
            }

            if (workSessionCount % 2 === 0) {
                startLongRest();
            } else {
                startShortRest();
            }
        }
    }, 1000);
}

function startRestCountdown(seconds) {
    setDigits(seconds);

    timer = setInterval(() => {
        seconds--;

        if (seconds < 0) {
            clearInterval(timer);
            startWorkBlock();
            return;
        }

        setDigits(seconds);
    }, 1000);
}

function startShortRest(){
    phase = "rest";
    document.body.style.background = "#ffd700";
    startRestCountdown(5 * 60);
}

function startLongRest(){
    phase = "longRest";
    document.body.style.background = "#228b22";
    startRestCountdown(30 * 60);
}

function stopTimer(){
    clearInterval(timer);
    running = false;
    phase = "idle";
    startBtn.textContent = "START";
    document.body.style.background = "linear-gradient(to bottom, #222, #444)";
    document.title = "Pomodoro Timer";
}
