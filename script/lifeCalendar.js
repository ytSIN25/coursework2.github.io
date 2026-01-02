const yearSelect = document.getElementById("yearSelect");
const monthSelect = document.getElementById("monthSelect");
const loadBtn = document.getElementById("loadCalendar");
const calendarDisplay = document.getElementById("calendarDisplay");
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const currentYear = new Date().getFullYear();
for(let y = currentYear - 5; y <= currentYear + 5; y++){
    yearSelect.add(new Option(y, y));
}
for(let m = 1; m <= 12; m++){
    const monthName = new Date(0, m-1).toLocaleString("en", {month: "long"});
    monthSelect.add(new Option(monthName, m));
}

function addEvent(day, text, cell, events, eventsKey){
    const div = document.createElement("div");
    div.className = "event";
    div.textContent = text;

    div.addEventListener("click", (e) => {
        e.stopPropagation();
        if(confirm("Delete this event?")){
            cell.removeChild(div);
            events[day] = events[day].filter(ev => ev !== text);
            if(events[day].length === 0) delete events[day];
            localStorage.setItem(eventsKey, JSON.stringify(events));
        }
    });

    cell.appendChild(div);

    if(!events[day]) events[day] = [];
    events[day].push(text);
    localStorage.setItem(eventsKey, JSON.stringify(events));
}

function renderCalendar(year, month){
    calendarDisplay.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const eventsKey = `calendar-${year}-${month}`;
    const events = JSON.parse(localStorage.getItem(eventsKey) || "{}");

    const grid = document.createElement("div");
    grid.className = "calendarGrid";

    WEEKDAYS.forEach(d=>{
        const h = document.createElement("div");
        h.className = "dayHeader";
        h.textContent = d;
        grid.appendChild(h);
    });

    // Empty before first day
    for(let i=0; i<firstDay; i++){
        grid.appendChild(document.createElement("div"));
    }

    for(let d=1; d<=totalDays; d++){
        const cell = document.createElement("div");
        cell.className = "dayCell";
        cell.textContent = d;

        // Weekend
        const dayOfWeek = (firstDay + d - 1) % 7;
        if(dayOfWeek === 0 || dayOfWeek === 6){
            cell.style.backgroundColor = "#f0f0f0";
        }

        // Load event
        if(events[d]){
            events[d].forEach(event => {
                addEvent(d, event, cell, events, eventsKey);
            });
        }

        cell.addEventListener("click", () => {
            const eventText = prompt("Add event for this day:");
            if(eventText){
                addEvent(d, eventText, cell, events, eventsKey);
            }
        });

        grid.appendChild(cell);
    }

    calendarDisplay.appendChild(grid);
}

loadBtn.addEventListener("click", () => {
    if(!yearSelect.value || !monthSelect.value){
        alert("Select year and month");
        return;
    }

    const year = +yearSelect.value;
    const month = +monthSelect.value - 1;

    renderCalendar(year, month);
});