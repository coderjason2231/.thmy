const daysContainer = document.getElementById("days");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const taskForm = document.getElementById("taskForm");
const taskDate = document.getElementById("taskDate");
const taskDesc = document.getElementById("taskDesc");
const tasksContainer = document.getElementById("tasks");

let currentDate = new Date();

function renderCalendar() {
    daysContainer.innerHTML = "";
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    monthYear.textContent = `${firstDay.toLocaleString("default", { month: "long" })} ${firstDay.getFullYear()}`;

    for (let i = 0; i < firstDay.getDay(); i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement("div");
        day.textContent = i;
        day.addEventListener("click", () => selectDate(i));
        daysContainer.appendChild(day);
    }
}

function selectDate(day) {
    const selectedDay = document.querySelector(".days div.active");
    if (selectedDay) selectedDay.classList.remove("active");

    const days = Array.from(daysContainer.children);
    const dayDiv = days.find((d) => d.textContent == day);
    if (dayDiv) dayDiv.classList.add("active");

    taskDate.value = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

prevMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = taskDate.value;
    const task = taskDesc.value;

    const taskItem = document.createElement("div");
    taskItem.textContent = `${date}: ${task}`;
    tasksContainer.appendChild(taskItem);

    taskForm.reset();
});
 
renderCalendar();
