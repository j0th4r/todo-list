function resetButtonStyles() {
  const filterButtons = document.querySelectorAll('#btn');
  filterButtons.forEach(button => {
    button.style.color = "";
  });
}

function updateCounter(choice) {
  const taskCount = document.querySelector('.task-count');
  const tasks = document.querySelectorAll('.task');
  const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
  const activeTasks = tasks.length - completedTasks;
  if (choice === "active") {
    taskCount.textContent = `${activeTasks} items left`;
  } else if (choice === "completed") {
    taskCount.textContent = `${completedTasks} items completed`;
  }
}

class Task {
  constructor(taskText) {
    this.taskText = taskText;
  }
  
  createTask(taskId) {
    const taskList = document.querySelector(".task-list");
    const taskText = this.taskText.trim();

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const taskContainerDiv = document.createElement("div");
    taskContainerDiv.classList.add("task-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `check-task-${taskId}`;
    checkbox.classList.add("task-checkbox");

    checkbox.addEventListener('change', function () {
      updateCounter("active");
    });

    const label = document.createElement("label");
    label.htmlFor = `check-task-${taskId}`;
    label.classList.add("task-checkmark");

    const paragraph = document.createElement("p");
    paragraph.classList.add("task-text");
    paragraph.textContent = taskText;

    taskContainerDiv.appendChild(checkbox);
    taskContainerDiv.appendChild(label);
    taskContainerDiv.appendChild(paragraph);

    taskDiv.appendChild(taskContainerDiv);

    taskList.appendChild(taskDiv);
  }
}

let taskIndex = 0;
const addTask = (event) => {
  if (event.key === 'Enter') {
    const taskText = inputField.value;
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }
    const task = new Task(taskText);
    taskIndex++;
    inputField.value = "";
    task.createTask(taskIndex);
    updateCounter("active");
  }
}

const inputField = document.querySelector('#input');
inputField.addEventListener('keypress', addTask);


const clearBtn = document.querySelector('.clear-btn'); // Clear button
const filterAll = document.querySelector('.all-btn');
const filterActive = document.querySelector('.active-btn');
const filterCompleted = document.querySelector('.completed-btn');
filterAll.style.color = "#3A7CFD";

// Event listener for the clear button
clearBtn.addEventListener('click', function () {
  const taskList = document.querySelector(".task-list");
  const checkboxes = taskList.querySelectorAll(".task-checkbox:checked"); // Get all checked checkboxes
  checkboxes.forEach(checkbox => {
    const taskDiv = checkbox.closest(".task"); // Get the parent task div
    taskDiv.remove(); // Remove the task div
  });
  if(clearBtn.classList.contains('completed-active')) {
    updateCounter("completed");
  } else {
    updateCounter("active");
  }
});

// Filter Functions
filterAll.addEventListener('click', function () {
  resetButtonStyles();
  clearBtn.classList.remove('completed-active');
  filterAll.style.color = "#3A7CFD";
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    task.style.display = 'flex';
    const checkbox = task.querySelector('.task-checkbox');
    checkbox.addEventListener('change', function () {
      task.style.display = 'flex'
      updateCounter("active");
    });
  }); // Show all tasks
  updateCounter("active");
});

filterActive.addEventListener('click', function () {
  resetButtonStyles();
  clearBtn.classList.remove('completed-active');
  filterActive.style.color = "#3A7CFD";
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const checkbox = task.querySelector('.task-checkbox');
    if (checkbox.checked) {
      task.style.display = 'none'; // Hide completed tasks
    } else {
      task.style.display = 'flex'; // Show active tasks
    }

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        task.style.display = 'none';
        updateCounter("active");
      }
    });
  });
  updateCounter("active");
});

filterCompleted.addEventListener('click', function () {
  resetButtonStyles();
  clearBtn.classList.add('completed-active');
  filterCompleted.style.color = "#3A7CFD";
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const checkbox = task.querySelector('.task-checkbox');

    if (checkbox.checked) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }

    checkbox.addEventListener('change', function () {
      if (!checkbox.checked) {
        updateCounter("completed");
        task.style.display = 'none';
      }
    });
  });
  updateCounter("completed");
});


let lightmode = localStorage.getItem('lightmode');
const themeSwitch = document.getElementById('theme-sw');

const enableLightMode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "active");
}

const disableLightMode = () => {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
}

if (lightmode === "active") enableLightMode();

themeSwitch.addEventListener("click", () => {
  lightmode = localStorage.getItem('lightmode');
  lightmode !== "active" ? enableLightMode() : disableLightMode();
});