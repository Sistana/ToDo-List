function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(index));

        const label = document.createElement("label");
        label.textContent = task.text;

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-trash-alt");
        deleteIcon.addEventListener("click", () => deleteTask(index));

        taskElement.appendChild(checkbox);
        taskElement.appendChild(label);
        taskElement.appendChild(deleteIcon);

        tasksContainer.appendChild(taskElement);
    });
}

function addTask() {
    const newTaskInput = document.getElementById("newTask");
    const newTaskText = newTaskInput.value.trim();

    if (newTaskText !== "") {
        const tasks = getTasks();
        tasks.push({ text: newTaskText, completed: false });
        saveTasks(tasks);
        newTaskInput.value = "";
        displayTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks();
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks();
}

function clearAll() {
    localStorage.removeItem("tasks");
    displayTasks();
}

displayTasks();
