const left = document.querySelector(".card1");
const mid = document.querySelector(".card2");
const right = document.querySelector(".card3");
const previous = document.getElementById("left");
const next = document.getElementById("right");

const cardList = [
    {
        name: "Assignment Tracker",
        description: "A webpage that allows you to list out your assignments for easier time management and planning.",
        imageID: "1",
        href: "studyAssignment.html"
    },
    {
        name: "GPA Calculator",
        description: "A small calculator program that lets you enter your grades and then summaries it.",
        imageID: "2",
        href: "studyGPA.html"
    },
    {
        name: "Flash Card",
        description: "A webpage that have a flash-card function to help you learn vocabularies and its meanings.",
        imageID: "3",
        href: "studyFlashCard.html"
    },
    {
        name: "Notepad",
        description: "A notepad webpage that stores your notes in your browser so you won't lost it in case you need it in the future.",
        imageID: "4",
        href: "studyNotepad.html"
    },
    {
        name: "Resource Manager",
        description: "A webpage that showcases different resources that will be helpful to students like books and webpages.",
        imageID: "5",
        href: "studyResourceManager.html"
    }
];

let counter = 5;

renderDisplay = function() {
    let before = counter - 1;
    let after = counter + 1;

    left.innerHTML =  `
        <img src="images/studyCard${cardList[before%5].imageID}.jpg">
        <h1>${cardList[before%5].name}</h1>
        <p>${cardList[before%5].description}</p>
        <a href="${cardList[before%5].href}">
            <button>Try Now</button>
        </a>
    `;
    mid.innerHTML = `
        <img src="images/studyCard${cardList[counter%5].imageID}.jpg">
        <h1>${cardList[counter%5].name}</h1>
        <p>${cardList[counter%5].description}</p>
        <a href="${cardList[counter%5].href}">
            <button>Try Now</button>
        </a>
    `;
    right.innerHTML = `
        <img src="images/studyCard${cardList[after%5].imageID}.jpg">
        <h1>${cardList[after%5].name}</h1>
        <p>${cardList[after%5].description}</p>
        <a href="${cardList[after%5].href}">
            <button>Try Now</button>
        </a>
    `;
};

goNext = function(){
    counter++;
    renderDisplay();
};

goPrevious = function() {
    counter--;
    if (counter == 0) {
        counter = counter +5
    };
    renderDisplay();
};

renderDisplay();
next.addEventListener("click",goNext);
previous.addEventListener("click",goPrevious);

// Scrolling
mid.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
        goNext();
    } else {
        goPrevious();
    }
}, { passive: false });

// Swiping
let startX = 0;
// Detect start and minus end to define swiping motion
mid.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

mid.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            goNext();
        } else {
            goPrevious();
        }
    }
});

