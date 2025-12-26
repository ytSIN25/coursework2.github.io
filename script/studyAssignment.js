// Get the spaces
const assignmentBox = document.getElementById("assignmentList")
const createBtn = document.getElementById("createBtn")
let assignments = [];

// Save in browser
function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

// Load when open
function loadAssignments() {
    const data = localStorage.getItem("assignments");
    if (data) {
        assignments = JSON.parse(data);
    }
}

// Create Assignment
function createAssignment() {
    // Get input
    const Name = document.getElementById("name").value.trim();
    const Description = document.getElementById("description").value.trim();
    const Due = document.getElementById("date").value.trim();
    const ClassName = document.getElementById("class").value.trim();

    // No input
    if (!Name || !Description || !Due || !ClassName) {
        alert("Please enter valid text to create assignment.");
        return;
    }

    // Put into list
    assignments.push({
        name: Name,
        description: Description,
        due: Due,
        className: ClassName,
        status: "PENDING"
    });

    // Save and render
    saveAssignments();
    renderAssignments(filterStatusDropdown.value);

    // Clear Input box
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    document.getElementById("class").value = "";
}


// Filtering
const filterStatusDropdown = document.getElementById("filterStatus");

function renderAssignments(filter = "ALL") {
    // Clear the HTML
    assignmentBox.innerHTML = "";

    // The filter
    const filteredAssignments = assignments.filter(assignment => {
        if (filter === "ALL") return true;
        return assignment.status === filter;
    });

    // Put every filtered into HTML
    filteredAssignments.forEach((assignment) => {
        const assignmentItem = document.createElement("div");
        assignmentItem.classList.add("assignmentItem");

        assignmentItem.innerHTML = `
            <div class="assignmentInfo">
                <h2>${assignment.name} (${assignment.className})</h2>
                <p>${assignment.description}</p>
            </div>
            <div class="assignmentAction">
                <div class="actionTop">
                    <select class="statusDropdown">
                        <option ${assignment.status === "DONE" ? "selected" : ""}>DONE</option>
                        <option ${assignment.status === "PENDING" ? "selected" : ""}>PENDING</option>
                    </select>
                    <button class="deleteBtn">✕</button>
                </div>
                <span class="due">${assignment.due}</span>
            </div>
        `;

        // Delete Function
        assignmentItem.querySelector(".deleteBtn").addEventListener("click", () => {
            if (!confirm("Are you sure?")) return;
            assignments.splice(assignments.indexOf(assignment), 1);
            saveAssignments();
            renderAssignments(filterStatusDropdown.value);
        });

        // Change status
        assignmentItem.querySelector(".statusDropdown").addEventListener("change", (e) => {
            assignment.status = e.target.value;
            saveAssignments();
            renderAssignments(filterStatusDropdown.value);
        });

        assignmentBox.appendChild(assignmentItem);
    });
}

loadAssignments();
renderAssignments("ALL");

// Event Listener
createBtn.addEventListener("click", createAssignment)
filterStatusDropdown.addEventListener("change", (e) => {
    renderAssignments(e.target.value);
});