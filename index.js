class todoItem {
  constructor(title, description, dueDate, priority) {  
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  
}

const inputField = document.querySelector('#input');
const taskCount = document.querySelector(".task-count");

// Initialize a task counter to increment input IDs
let taskCounter = 0;
let taskId = 0;

// Event listener for the "Enter" key press
inputField.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') { // Check if the key pressed is "Enter"
    const taskList = document.querySelector(".task-list");
    const taskText = inputField.value.trim(); // Get text from the input field

    // Check if the input is not empty
    if (taskText !== "") {
      taskCounter++; // Increment the counter for unique IDs
      taskId++; // Increment the task ID
      
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

      
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          taskCounter--; // Decrement the counter when the checkbox is checked
          taskCount.textContent = `${taskCounter} items left`; 
        } else {
          taskCounter++; // Increment the counter if unchecked
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


const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener('click', function () {
  const taskList = document.querySelector(".task-list");
  const checkboxes = taskList.querySelectorAll(".task-checkbox:checked"); // Get all checked checkboxes

  checkboxes.forEach(checkbox => {
    const taskDiv = checkbox.closest(".task"); // Get the parent task div
    taskDiv.remove(); // Remove the task div
  });
});

