class todoItem {
  constructor(title, description, dueDate, priority) {  
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  
}

const filterButtons = document.querySelectorAll('#btn');

function resetButtonStyles() {
  filterButtons.forEach(button => {
    button.style.color = "";
  });
}

const taskCount = document.querySelector('.task-count');
const inputField = document.querySelector('#input');
const clearBtn = document.querySelector('.clear-btn'); // Clear button
const filterAll = document.querySelector('.all-btn');
const filterActive = document.querySelector('.active-btn');
const filterCompleted = document.querySelector('.completed-btn');
filterAll.style.color = "#3A7CFD";

// Initialize a task counter to increment input IDs
let taskCounter = 0;
let taskId = 0;
let completedTasks = 0;

// Event listener for the "Enter" key press
inputField.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') { // Check if the key pressed is "Enter"
    const taskList = document.querySelector(".task-list");
    const taskText = inputField.value.trim(); // Get text from the input field

    // Check if the input is not empty
    if (taskText !== "") {
      taskCounter++; // Increment the counter for unique IDs
      taskId++;

      // Create the outer task div
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      // Create the task-container div
      const taskContainerDiv = document.createElement("div");
      taskContainerDiv.classList.add("task-container");

      // Create the checkbox input
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `check-task-${taskId}`;
      checkbox.classList.add("task-checkbox");

      // Add an event listener to update task class when checkbox is toggled
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          taskDiv.classList.add("completed");
          completedTasks++;
          taskCounter--;
          taskCount.textContent = `${taskCounter} items left`;
        } else {
          taskDiv.classList.remove("completed");
          completedTasks--;
          taskCounter++;
          taskCount.textContent = `${taskCounter} items left`;
        }
      });

      // Create the label
      const label = document.createElement("label");
      label.htmlFor = `check-task-${taskId}`;
      label.classList.add("task-checkmark");

      // Create the paragraph
      const paragraph = document.createElement("p");
      paragraph.classList.add("task-text");
      paragraph.textContent = taskText;

      // Append elements to the task-container div
      taskContainerDiv.appendChild(checkbox);
      taskContainerDiv.appendChild(label);
      taskContainerDiv.appendChild(paragraph);

      // Append task-container div to the outer task div
      taskDiv.appendChild(taskContainerDiv);

      // Append the task div to the task list
      taskList.appendChild(taskDiv);

      // Clear the input field after adding the task
      inputField.value = "";

      taskCount.textContent = `${taskCounter} items left`;
    } else {
      // Optionally show an error message if the input is empty
      alert("Please enter a task!");
    }
  }
});

// Event listener for the clear button
clearBtn.addEventListener('click', function () {
  const taskList = document.querySelector(".task-list");
  const checkboxes = taskList.querySelectorAll(".task-checkbox:checked"); // Get all checked checkboxes
  completedTasks = 0;
  checkboxes.forEach(checkbox => {
    const taskDiv = checkbox.closest(".task"); // Get the parent task div
    taskDiv.remove(); // Remove the task div
  });
  taskCount.textContent = `${completedTasks} items left`;
});

// Filter Functions
filterAll.addEventListener('click', function () {
  resetButtonStyles();
  filterAll.style.color = "#3A7CFD";
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    task.style.display = 'flex';
    const checkbox = task.querySelector('.task-checkbox');
    checkbox.addEventListener('change', function () {
      task.style.display = 'flex'
    });
  }); // Show all tasks
  taskCount.textContent = `${taskCounter} items left`;
});

filterActive.addEventListener('click', function () {
  resetButtonStyles();
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
        taskCount.textContent = `${taskCounter} items left`;
        task.style.display = 'none';
      }
    });
  });
  taskCount.textContent = `${taskCounter} items left`;
});

filterCompleted.addEventListener('click', function () {
  resetButtonStyles();
  filterCompleted.style.color = "#3A7CFD";
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const checkbox = task.querySelector('.task-checkbox');

    if (checkbox.checked) {
      task.style.display = 'flex'; // Show completed tasks
    } else {
      task.style.display = 'none'; // Hide active tasks
    }

    checkbox.addEventListener('change', function () {
      if (!checkbox.checked) {
        taskCount.textContent = `${completedTasks} items left`;
        task.style.display = 'none';
      }
    });
  });
  taskCount.textContent = `${completedTasks} items left`;
});

