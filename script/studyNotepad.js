const textarea = document.querySelector(".notepad textarea");
const toolbar = document.querySelector(".toolbar");
const wordCountEl = document.getElementById("wordCount");
const savedEl = document.querySelector(".saved");
const title = "notepad";

let fontSize = 18;
let saveTimer = null;
let isSaving = false;

// Load Local Storage
textarea.value = localStorage.getItem("noteContent") || "";
fontSize = Number(localStorage.getItem("fontSize")) || 18;

textarea.style.fontSize = fontSize + "px";
updateWordCount();

function autosave() {
    clearTimeout(saveTimer);
    if (!isSaving) {
        savedEl.textContent = "Saving...";
        savedEl.style.color = "#999";
        isSaving = true;
    }

    saveTimer = setTimeout(() => {
        localStorage.setItem("noteContent", textarea.value);
        localStorage.setItem("fontSize", fontSize);

        savedEl.textContent = "Saved ✓";
        savedEl.style.color = "#2ecc71";
        isSaving = false
    }, 400);
}

function exportNote() {
    const content = textarea.value.trim();

    if (!content) {
        alert("Nothing to export!");
        return;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = title.replace(/[^\w\d]+/g, "_") + ".txt";
    a.click();

    URL.revokeObjectURL(url);
}

function updateWordCount() {
    const words = textarea.value.trim().split(/\s+/).filter(Boolean);
    wordCountEl.textContent = words.length;
}

// Event Listener for Toolbar
toolbar.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;

    const action = e.target.dataset.action;

    switch (action) {
        case "increase":
            fontSize = Math.min(fontSize + 2, 32);
            textarea.style.fontSize = fontSize + "px";
            autosave();
            break;

        case "decrease":
            fontSize = Math.max(fontSize - 2, 12);
            textarea.style.fontSize = fontSize + "px";
            autosave();
            break;
        
        case "export":
            exportNote();
            break;

        case "clear":
            if (!confirm("Clear all notes?")) return;
            textarea.value = "";
            updateWordCount();
            autosave();
            break;
    }
});

// When input do autosave
textarea.addEventListener("input", () => {
    updateWordCount();
    autosave();
});
