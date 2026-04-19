const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
let tasks = [];
window.onload = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
};
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//new task
addBtn.onclick = () => {
    const name = taskInput.value.trim();
    const dueDate = dateInput.value;
    if (!name || !dueDate) {
        alert("task to bharo bhai..");
        return;
    }
    const newTask = {
        id: Date.now(),
        name,
        dueDate,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
    dateInput.value = "";
};
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        };
        const span = document.createElement("span");
        span.textContent = `${task.name} (Due: ${task.dueDate})`;
        if (task.completed) {
            span.classList.add("completed");
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        };
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
export {};
//# sourceMappingURL=app.js.map