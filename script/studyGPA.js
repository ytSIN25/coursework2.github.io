const subjectNum = document.getElementById("subjectNum");
const subjects = document.getElementById("subjects");
const calcBtn = document.querySelector(".calcBtn");
const resultCard = document.querySelector(".card.result");

// Displays the subject inputs
function renderSubjects() {
    const n = Number(subjectNum.value);
    subjects.innerHTML = "";

    for (let i = 1; i <= n; i++) {
        const row = document.createElement("div");
        row.className = "row";

        row.innerHTML = `
            <label>Subject ${i}:</label>
            <input type="text" class="sub-name">
            <label>Mark:</label>
            <input type="number" class="sub-mark" min="0" max="100">
        `;

        subjects.appendChild(row);
    }
}

// Make the inputs into array
function collectData() {
    const rows = document.querySelectorAll("#subjects .row");
    const subjectsData = [];

    rows.forEach(row => {
        const name = row.querySelector(".sub-name").value.trim();
        const mark = Number(row.querySelector(".sub-mark").value);

        if (name && !isNaN(mark)) {
            subjectsData.push({ name, mark });
        }
    });

    return subjectsData;
}

// Define Grades
function getGrade(mark) {
    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 50) return "D";
    if (mark >= 40) return "E";
    return "F";
}

// Displays result
function showResults(data) {
    if (data.length === 0) {
        resultCard.innerHTML = "<h2>RESULTS</h2><p>No data entered.</p>";
        return;
    }

    let total = 0;
    let html = `
                <h2>RESULTS</h2>
                    <ul>
                `;

    data.forEach(sub => {
        const grade = getGrade(sub.mark);
        total += sub.mark;

        html += `
            <li>
                <strong>${sub.name}</strong>: ${sub.mark} → <strong>${grade}</strong>
            </li>
        `;
    });

    const average = (total / data.length).toFixed(2);
    const avgGrade = getGrade(average);

    html += `
        </ul>
        <hr>
        <p><strong>Average Mark:</strong> ${average}</p>
        <p><strong>Average Grade:</strong> ${avgGrade}</p>
    `;

    resultCard.innerHTML = html;
}

renderSubjects();
subjectNum.addEventListener("input", renderSubjects);

// Scrolling increases value
subjectNum.addEventListener("wheel", (e) => {
    e.preventDefault();
    let current = Number(subjectNum.value) || 0;

    if (e.deltaY < 0) {
        subjectNum.value = current + 1;
    } else {
        subjectNum.value = Math.max(1, current - 1);
    }

    renderSubjects();
});

calcBtn.addEventListener("click", () => {
    const rows = document.querySelectorAll("#subjects .row");
    let invalid = false;

    rows.forEach(row => {
        const mark = Number(row.querySelector(".sub-mark").value);
        if (isNaN(mark) || mark < 0 || mark > 100) {
            invalid = true;
        }
    });

    if (invalid) {
        alert("Please make sure the mark is in range of 0 to 100");
        return;
    }

    const data = collectData();
    showResults(data);
});
