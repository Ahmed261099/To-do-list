
var userName = sessionStorage.getItem('userName');
var welcome = document.getElementById("Welcoming");

welcome.innerHTML = `Welcome ${userName}`;


var TaskNameInput = document.getElementById('TaskName');
var TaskPriceInput = document.getElementById('TaskPrice');
var TaskCountInput = document.getElementById('TaskCount');
var TaskCategoryInput = document.getElementById('TaskCategory');
var TaskDescInput = document.getElementById('TaskDesc');
var searchInput = document.getElementById('searchInput');
var TasksContainer;


if (localStorage.getItem("Tasks") == null)
    TasksContainer = [];
else {
    TasksContainer = JSON.parse(localStorage.getItem("Tasks"));   
    displayTasks(TasksContainer);
}
function addTask() {
    if (validate()) {
        var Task = {
            name: TaskNameInput.value,
            category: TaskCategoryInput.value,
            count: TaskCountInput.value,
            desc: TaskDescInput.value
        }
        TasksContainer.push(Task);
        localStorage.setItem("Tasks", JSON.stringify(TasksContainer));
        displayTasks(TasksContainer);
        clearForm();
        TaskNameInput.style.borderColor = "green";
    }
    else
        TaskNameInput.style.borderColor = "red";
}

function clearForm() {
    TaskNameInput.value = "";
    TaskCategoryInput.value = "";
    TaskCountInput.value = "";
    TaskDescInput.value = "";
}

function displayTasks(TasksArr) {
    
    var cartoona = "";
    for (var i = 0; i < TasksArr.length; i++) {
        cartoona += `<tr>
        <td>${i + 1}</td>   
        <td>${TasksArr[i].name}</td>
        <td>${TasksArr[i].category}</td>
        <td>${TasksArr[i].count}</td>
        <td><button onclick="updateCount(${i},1)" class="btn btn-info"><i class="fas fa-plus-circle "></i></button></td>
        <td><button onclick="updateCount(${i},-1)" class="btn btn-info"><i class="fas fa-minus-circle"></i></button></td>
        <td>${TasksArr[i].desc}</td>
        <td><button onclick="updateTask(${i})" class="btn btn-warning" id="updateBtn">Update</button></td>
        <td><button onclick="deleteTask(${i})" class="btn btn-danger" id="deleteBtn">Delete</button></td></tr>`
    }
    document.getElementById("tableRow").innerHTML = cartoona;
}

function deleteTask(TaskIndex) {
    TasksContainer.splice(TaskIndex, 1);
    localStorage.setItem("Tasks", JSON.stringify(TasksContainer));
    displayTasks(TasksContainer);
}

var updateTaskIndex = 0;
function updateTask(TaskIndex) {
    document.getElementById("addUpdateTask").innerHTML = "update Task";
    TaskNameInput.value = TasksContainer[TaskIndex].name;
    TaskCategoryInput.value = TasksContainer[TaskIndex].category;
    TaskCountInput.value = TasksContainer[TaskIndex].count;
    TaskDescInput.value = TasksContainer[TaskIndex].desc;
    updateTaskIndex = TaskIndex;

}

function showTaskAfterUpdate(TaskIndex) {
    if (validate())
     {
        var Task = {
            name: TaskNameInput.value,
            category: TaskCategoryInput.value,
            count: TaskCountInput.value,
            desc: TaskDescInput.value
        }
        TasksContainer[TaskIndex] = Task;
        localStorage.setItem("Tasks", JSON.stringify(TasksContainer));
        displayTasks(TasksContainer);
        clearForm();
        document.getElementById("addUpdateTask").innerHTML = "add Task";
    }
    else
        TaskNameInput.style.borderColor = "red";
}

function check() {
    if (document.getElementById("addUpdateTask").innerHTML == "add Task") {
        addTask();
    }
    else {
        showTaskAfterUpdate(updateTaskIndex);
    }
}


function searchTask(value) {
    var searchTasks = [];
    for (var i = 0; i < TasksContainer.length; i++) {
        if (TasksContainer[i].name.toLowerCase().includes(value.toLowerCase())) {
            searchTasks.push(TasksContainer[i]);
        }
    }
    displayTasks(searchTasks);
}

function validate() {
    var regex = /^[A-Z][a-z]{3,20}$/;
    if (regex.test(TaskNameInput.value))
        return true;
    else
        return false;
}

function updateCount(index, x) {
    if (TasksContainer[index].count == 0 && Number(x) == -1)
        TasksContainer[index].count = 0;
    else {
        TasksContainer[index].count = Number(TasksContainer[index].count) + Number(x);
        localStorage.setItem("Tasks", JSON.stringify(TasksContainer));
        displayTasks(TasksContainer);
    }
}






 

