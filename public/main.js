// Onclick command from index button to create a new DOM objects and push user data to local storage: 
function saveTask() {
    // Take DOM objects:
    const taskDescription = document.getElementById("taskDescription");
    const taskDate = document.getElementById("taskDate");
    const taskTime = document.getElementById("taskTime");
    // Take task values: 
    const Description = taskDescription.value;
    const date = taskDate.value;
    const time = taskTime.value;
    // Create task object: 
    const task = { Description, date, time };
    // Load all tasks from local storage: 
    const allTasks = loadTasks();
    // Add the new task to the array:
    allTasks.push(task);
    // Save the new array back to local storage: 
    allTasksJsonString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksJsonString);
    displayAllTasks();
    // Clear all text boxes: 
    taskDescription.value = "";
    taskDate.value = "";
    taskTime.value = "";
    taskDescription.focus();
}

// Load all tasks from local storage:
function loadTasks() {
    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    } return allTasks;
}

// Create a new task from local storage:
function displayAllTasks() {
    // Get container DOM object: 
    const taskContainer = document.getElementById("taskContainer");
    // Load all tasks from local storage: 
    const allTasks = loadTasks();
    // Clear previous data: 
    taskContainer.innerHTML = "";
    // Display all tasks: 
    let index = 0;
    for (const task of allTasks) {
        // Create new div: 
        const divTaskCard = document.createElement("div");
        const divDescription = document.createElement("div");
        const divTimeAndDate = document.createElement("div");
        //Create delete button
        const deleteButton = document.createElement("button");
        //set class
        deleteButton.setAttribute("class", "deleteButton btn btn-outline-dark btn-md");
        deleteButton.setAttribute("type", "button");
        //add event
        deleteButton.setAttribute("onclick", "deleteNote(" + index + ")");
        //add the button to the div
        divTaskCard.appendChild(deleteButton);
        //create span for the glyphicons
        const span = document.createElement("span");
        //set class to the span
        span.setAttribute("class", "glyphicon glyphicon-remove");
        //add span to button
        deleteButton.appendChild(span);
        // Set class: 
        divTaskCard.setAttribute("class", "note"); // <div class="card">
        divDescription.setAttribute("class", "description "); // <div class="card">
        divTimeAndDate.setAttribute("class", "timeAndDate"); // <div class="card">
        // Set task data: 
        divDescription.innerHTML = "<br>" + task.Description;
        divTimeAndDate.innerHTML = "Date: " + task.date + "<br> Time: " + task.time;
        // Add div to container (will add it to the DOM):
        divTaskCard.appendChild(divDescription);
        divTaskCard.appendChild(divTimeAndDate);
        taskContainer.appendChild(divTaskCard);
        //Increases index:
        index++;
    }
}

// Delete tasks from local storage:
function deleteNote(index) {
    //load all notes from local storage
    const allTasks = loadTasks();
    //delete the note
    allTasks.splice(index, 1);
    //clear previous data:
    taskContainer.innerHTML = "";
    // Save the new array back to local storage: 
    allTasksJsonString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksJsonString);
    displayAllTasks();

}
