// Inputs
const wordInput = document.querySelectorAll(".inputTable textarea")[0];
const meaningInput = document.querySelectorAll(".inputTable textarea")[1];

// Displays
const flashCard = document.querySelector(".flashCard1");
const wordSpace = flashCard.querySelector(".word");
const meaningSpace = flashCard.querySelector(".meaning");
const correctSpace = document.querySelector(".correct");
const wrongSpace = document.querySelector(".wrong");

let cards = [];
let index = 0;
let showMeaning = false;
let correctList = [];
let wrongList = [];

// Refresh things and get inputs
function initialize() {
    // If empty
    if (!(wordInput.value.trim() && meaningInput.value.trim())){
        wordSpace.innerText = "Input texts";
        meaningSpace.innerText = "Input meaning to start";
        correctSpace.innerHTML = "CORRECT ◀";
        wrongSpace.innerHTML = "▶ WRONG";
        cards = [];
        index = 0;
        showMeaning = false;
        return;
    }

    const words = wordInput.value.split(",").map(w => w.trim()).filter(Boolean);
    const meanings = meaningInput.value.split(",").map(m => m.trim()).filter(Boolean);

    cards = words.map((w, i) => ({
        word: w,
        meaning: meanings[i] || ""
    }));

    index = 0;
    correctList = [];
    wrongList = [];
    showMeaning = false;

    correctSpace.innerHTML = "CORRECT ◀";
    wrongSpace.innerHTML = "▶ WRONG";

    renderCard();
}

// Save
function saveToLocalStorage() {
    localStorage.setItem("flashWords", wordInput.value);
    localStorage.setItem("flashMeanings", meaningInput.value);
}

// Load
function loadFromLocalStorage() {
    const savedWords = localStorage.getItem("flashWords");
    const savedMeanings = localStorage.getItem("flashMeanings");

    if (savedWords) wordInput.value = savedWords;
    if (savedMeanings) meaningInput.value = savedMeanings;
}

// Display words
function renderCard() {
    if (index >= cards.length){
        wordSpace.innerText = "Try Again?";
        meaningSpace.innerText = "Click to run again";
        return;
    }

    wordSpace.innerText = cards[index].word;
    meaningSpace.innerText = "Click to see Meaning";
    flashCard.style.cursor = "pointer";
    showMeaning = false;
}

// Cliking shows meaning
flashCard.addEventListener("click", () => {
    if (index >= cards.length){
        initialize();
        return;
    }

    if (!showMeaning){
        meaningSpace.innerText = cards[index].meaning;
        showMeaning = true;
        // Allows swipe
        flashCard.style.cursor = "grab";
    }
});

// Detects Swiping
let startX = 0;

function swipeEnd(endX){
    flashCard.style.cursor = "pointer";

    if (index >= cards.length){return};

    const distance = endX - startX;
    if (Math.abs(distance) < 50){return};
    if (distance > 0){
        wrongList.push(cards[index].word);
    } else {
        correctList.push(cards[index].word);
    }

    index++;
    showMeaning = false;
    renderCard();

    // Finished
    if (index >= cards.length){
        correctSpace.innerHTML = "CORRECT ◀<br>" + correctList.join(", ");
        wrongSpace.innerHTML = "▶ WRONG<br>" + wrongList.join(", ");
    }
}

// PC swipe
let isDragging = false;
flashCard.addEventListener("mousedown", e => {
    if (!showMeaning) return;
    startX = e.clientX;
    isDragging = true;
    flashCard.style.cursor = "grabbing"; 
});

document.addEventListener("mouseup", e => {
    if (!isDragging) return;
    isDragging = false;
    flashCard.style.cursor = "grab";
    swipeEnd(e.clientX);
});

// Phone swipe
flashCard.addEventListener("touchstart", e => {
    if (!showMeaning) return;
    startX = e.touches[0].clientX
    isDragging = true;
});

document.addEventListener("touchend", e => {
    if (!isDragging) return;
    isDragging = false;
    if (!showMeaning) return;
    swipeEnd(e.changedTouches[0].clientX)
});

// Listen to Input
wordInput.addEventListener("input", () => {
    initialize();
    saveToLocalStorage();
});
meaningInput.addEventListener("input", () => {
    initialize();
    saveToLocalStorage();
});

// Start
loadFromLocalStorage()
initialize();