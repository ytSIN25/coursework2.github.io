const expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];
const colors = {
    Food: "#FF9AA2",
    Transport: "#9ADCFF",
    Study: "#B5EAD7",
    Others: "#E2CFEA"
};

const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const categoryInput = document.getElementById("expenseCategory");
const noteInput = document.getElementById("expenseNote");
const listBody = document.getElementById("expenseList");
const summaryText = document.getElementById("summaryText");
const canvas = document.getElementById("pieChart");
const ctx = canvas.getContext("2d");

function saveExpenses(){
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
}

function deleteExpense(index){
    expenseList.splice(index, 1);
    saveExpenses();
    renderExpenses();
    drawPieChart();
}

function renderExpenses(){
    listBody.innerHTML = "";

    expenseList.forEach((e, index) => {
        listBody.innerHTML += `
            <tr>
                <td>${e.name}</td>
                <td>RM ${e.amount}</td>
                <td>${e.category}</td>
                <td>${e.note}</td>
                <td>
                    <button class="deleteBtn" onclick="deleteExpense(${index})">
                        ✕
                    </button>
                </td>
            </tr>
        `;
    });
}

function drawPieChart(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (expenseList.length === 0){
        summaryText.innerHTML = "<p>No expenses yet</p>";
        return;
    }

    const totals = {};
    let totalAmount = 0;
    let highestExpense = expenseList[0];
    let lowestExpense = expenseList[0];

    expenseList.forEach(e => {
        totals[e.category] = (totals[e.category] || 0) + e.amount;
        totalAmount += e.amount;

        if (e.amount > highestExpense.amount) highestExpense = e;
        if (e.amount < lowestExpense.amount) lowestExpense = e;
    });

    let startAngle = 0;
    for (let category in totals){
        const slice = totals[category] / totalAmount * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(130,130);
        ctx.arc(130,130,120,startAngle,startAngle + slice);
        ctx.fillStyle = colors[category];
        ctx.fill();
        startAngle += slice;
    }

    let highestCategory = "";
    let highestCategoryAmount = 0;

    for (let category in totals){
        if (totals[category] > highestCategoryAmount){
            highestCategoryAmount = totals[category];
            highestCategory = category;
        }
    }

    summaryText.innerHTML = `
        <p><strong>Total:</strong> RM ${totalAmount}</p>
        <p><strong>Highest Expense:</strong> ${highestExpense.name} (RM ${highestExpense.amount})</p>
        <p><strong>Lowest Expense:</strong> ${lowestExpense.name} (RM ${lowestExpense.amount})</p>
        <p><strong>Top Category:</strong> ${highestCategory} (RM ${highestCategoryAmount})</p>
    `;
}

document.getElementById("createExpense").onclick = () => {
    const amount = Number(amountInput.value);

    if (!nameInput.value || amountInput.value === ""){
        alert("Please enter a name and amount.");
        return;
    }

    if (amount < 0){
        alert("Amount cannot be negative.");
        amountInput.value = 0;
        return;
    }

    expenseList.push({
        name: nameInput.value,
        amount: amount,
        category: categoryInput.value,
        note: noteInput.value
    });

    nameInput.value = "";
    amountInput.value = "";
    noteInput.value = "";

    saveExpenses();
    renderExpenses();
    drawPieChart();
};

renderExpenses();
drawPieChart();
