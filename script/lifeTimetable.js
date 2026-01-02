const timetable = document.querySelector(".timetable");
const dragItems = document.querySelectorAll(".dragItem");
const resetBtn = document.querySelector(".resetBtn");

let selectedType = null;
let longPressTimer = null;

function generateTimetable() {
    for (let hour = 6; hour < 24; hour++) {
        const timeCell = document.createElement("div");
        timeCell.className = "timeCell";
        timeCell.textContent = `${hour.toString().padStart(2, "0")}:00`;
        timetable.appendChild(timeCell);

        for (let day = 0; day < 7; day++) {
            const slot = document.createElement("div");
            slot.className = "slot";
            slot.dataset.hour = hour;
            slot.dataset.day = day;

            addSlotEvents(slot);
            timetable.appendChild(slot);
        }
    }
}

dragItems.forEach(item => {
    item.addEventListener("dragstart", e => {
        e.dataTransfer.setData("type", item.classList[1]);
        e.dataTransfer.setData("text", item.innerText);
    });

    item.addEventListener("click", () => {
        selectedType = item;
        dragItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

function addSlotEvents(slot) {
    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", e => {
        e.preventDefault();
        fillSlot(slot, e.dataTransfer.getData("type"), e.dataTransfer.getData("text"));
    });

    slot.addEventListener("click", () => {
        if (!selectedType) return;
        fillSlot(slot, selectedType.classList[1], selectedType.innerText);
    });

    slot.addEventListener("contextmenu", e => {
        e.preventDefault();
        clearSlot(slot);
    });

    slot.addEventListener("touchstart", () => {
        longPressTimer = setTimeout(() => clearSlot(slot), 600);
    });
    slot.addEventListener("touchend", () => {
        clearTimeout(longPressTimer);
    });
}

function fillSlot(slot, type, text) {
    slot.className = `slot filled ${type}`;
    slot.textContent = text;
    saveTimetable();
}
function clearSlot(slot) {
    slot.className = "slot";
    slot.textContent = "";
    saveTimetable();
}

function saveTimetable() {
    const data = [];
    document.querySelectorAll(".slot.filled").forEach(slot => {
        data.push({
            hour: slot.dataset.hour,
            day: slot.dataset.day,
            type: [...slot.classList].find(c => c.startsWith("tt-")),
            text: slot.textContent
        });
    });
    localStorage.setItem("lifeTimetableData", JSON.stringify(data));
}

function loadTimetable() {
    const data = JSON.parse(localStorage.getItem("lifeTimetableData"));
    if (!data) return;

    data.forEach(item => {
        const slot = document.querySelector(
            `.slot[data-hour="${item.hour}"][data-day="${item.day}"]`
        );
        if (slot) {
            fillSlot(slot, item.type, item.text);
        }
    });
}

resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure to clear the timetable?")){
        document.querySelectorAll(".slot").forEach(slot => {
            slot.className = "slot";
            slot.textContent = "";
        });
        localStorage.removeItem("lifeTimetableData");
    }
});

generateTimetable();
loadTimetable();