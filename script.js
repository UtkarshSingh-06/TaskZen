const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = [];

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("delete")) {
      tasks.splice(index, 1);
    } else if (e.target.classList.contains("toggle")) {
      tasks[index].completed = !tasks[index].completed;
    }
    renderTasks();
  }
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    button.classList.add("active");
    renderTasks();
  });
});

function renderTasks() {
  const activeFilter = document.querySelector(".filters .active").dataset.filter;
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      activeFilter === "all" ||
      (activeFilter === "completed" && task.completed) ||
      (activeFilter === "pending" && !task.completed)
    ) {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button class="toggle" data-index="${index}">${task.completed ? "Undo" : "Done"}</button>
          <button class="delete" data-index="${index}">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    }
  });
}
