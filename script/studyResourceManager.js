const resourceGrid = document.getElementById("resourceGrid");
const typeFilter = document.getElementById("typeFilter");
const moduleFilter = document.getElementById("moduleFilter");

let resources = [];

// Create Resource Cards Manually
function createCard(name, description, imagePath, type, module, link) {
    const card = document.createElement("div");
    card.className = "resourceCard";

    card.dataset.type = type;
    card.dataset.module = module;

    card.innerHTML = `
        <div class="cardImage" style="background-image:url('${imagePath}')";></div>

        <div class="cardContent">
            <div class="cardTitle">${name}</div>
            <div class="cardDesc">${description}</div>

            <div class="cardFooter">
                <span class="cardModule">${module}</span>
                <a href="${link}"><button class="cardBtn">VISIT</button></a>
            </div>
        </div>
    `;

    resourceGrid.appendChild(card);
    resources.push(card);
}

function filterResources() {
    const selectedType = typeFilter.value;
    const selectedModule = moduleFilter.value;

    resources.forEach(card => {
        const matchType = (selectedType === "all" || card.dataset.type === selectedType);
        const matchModule = (selectedModule === "all" || card.dataset.module === selectedModule);

        card.style.display = matchType && matchModule ? "flex" : "none";
    });
}

// Cards
createCard("Past Year Papers", "A complete set of past year papers to do. However, answer are only available to the relatively new papers only.", "images/rM1.webp", "book", "0001", "https://drive.google.com/file/d/11ocAGHbItNvosBFY5jvZeqH7fj-eJuMv/view")
createCard("Wolfram|Alpha", "An artificial intelligence trained to solve mathematic questions, helps you to solve question when you're stucked.", "images/rM2.png", "website", "0001", "https://www.wolframalpha.com/")
createCard("Computer Science: An Overview", "A book with comprehensive coverage accessible to students in CS Foundation Year, encouraging a practical understanding.", "images/rM3.png", "book", "0030", "https://archive.org/details/computerscienceo0000broo_i3q8")
createCard("Computer Systems, 5th Edition", "Book on clear, detailed, step-by-step introduction to the central concepts in computer organization and architectureion.", "images/rM4.png", "book", "0030", "https://www.oreilly.com/library/view/computer-systems-5th/9781284079647/")

createCard("name", "description", "images/", "type", "0032", "link")
createCard("name", "description", "images/", "type", "0032", "link")

createCard("name", "description", "images/", "type", "0033", "link")
createCard("name", "description", "images/", "type", "0033", "link")

createCard("name", "description", "images/", "type", "0035", "link")
createCard("name", "description", "images/", "type", "0035", "link")

// Event Listener
typeFilter.addEventListener("change", filterResources);
moduleFilter.addEventListener("change", filterResources);
