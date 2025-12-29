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
        <div class="cardImage" style="background-image:url('${imagePath}');"></div>

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
createCard("Wolfram|Alpha", "An artificial intelligence trained to solve mathematic questions, helps you to solve question when you're stucked.", "images/rM2.png", "website", "0001", "https://www.wolframalpha.com/");
createCard("Computer Systems, 5th Edition", "Book on clear, detailed, step-by-step introduction to the central concepts in computer organization and architectureion.", "images/rM4.png", "book", "0030", "https://www.oreilly.com/library/view/computer-systems-5th/9781284079647/");
createCard("W3 School", "A full and complete website for tutorials like Python and JavaScript that is very good for new learners.", "images/rM8.png", "website", "0033", "https://www.w3schools.com/python/");
createCard("Computer Science", "This is the textbook of Computer Science Cambridge International AS and A Level which will be helpful for GENG0030 and GENG0032", "images/rM5.png", "book", "0032", "https://anyflip.com/nzeux/jwbs/basic");
createCard("Scientists Must Write", "A book on writing and communication skills to help observation, thinking and remembering.", "images/rM6.png", "book", "0033", "https://www.amazon.com/Scientists-Must-Write-Engineers-Routledge/dp/0415269962");
createCard("Live Preview", "A extension for Visual Studio Code, make web development easy with instant update to the webpage.", "images/rM12.png", "website", "0035", "https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server");
createCard("Python All-in-One For Dummies", "Everything you need to know to get into Python coding, with 7 books in one Python All-in-One For Dummies.", "images/rM7.png", "book", "0033", "https://www.dummies.com/book/technology/programming-web-design/python/python-all-in-one-for-dummies-281833/");
createCard("Python Roadmap", "A detailed roadmap for Python Learners to know what's next and what's left.", "images/rM9.png", "website", "0033", "https://roadmap.sh/python");
createCard("Computer Science: An Overview", "A book with comprehensive coverage for students in computer science with practical understanding.", "images/rM3.png", "book", "0030", "https://archive.org/details/computerscienceo0000broo_i3q8");
createCard("HTML 5 Notees for Professionals", "A small and compact note book for all HTML tags and details.", "images/rM10.png", "book", "0035", "https://goalkicker.com/HTML5Book/HTML5NotesForProfessionals.pdf");
createCard("PHP and MySQL Web development", "A book of in-depth guide to combining the two open source tools to create dynamic Web sites.", "images/rM11.png", "book", "0035", "https://theswissbay.ch/pdf/Gentoomen%20Library/Networking/PHP%20%26%20MySQL/PHP%20and%20MySQL%20Web%20Development%2C%204th%20ed.%20%282009%29.pdf");
createCard("Past Year Papers", "A complete set of past year papers to do. However, answer are only available to the relatively new papers only.", "images/rM1.webp", "book", "0001", "https://drive.google.com/file/d/11ocAGHbItNvosBFY5jvZeqH7fj-eJuMv/view");

// Event Listener
typeFilter.addEventListener("change", filterResources);
moduleFilter.addEventListener("change", filterResources);
