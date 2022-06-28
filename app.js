// Objetos del HTML
const input = document.getElementById("input");
const addTaskBtn = document.getElementById("addTask").addEventListener("click", addTask);
const deleteAllBtn = document.getElementById("deleteAll").addEventListener("click", deleteAll);
const listTasks = document.getElementById("list-container");
const showAll = document.getElementById("showAll").addEventListener("click", filterAll);
const showDone = document.getElementById("showDone").addEventListener("click", filterDone);
const showNotDone = document.getElementById("showNotDone").addEventListener("click", filterNotDone);
const filters = document.getElementsByClassName("filters");

// Obtenemos los datos del local storage y los pintamos en la pantalla
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
createHTML(tasks);

// Ocultar filtros si no hay tareas
// if(tasks.length == 0) {
//     filters[0].style.opacity = "0";
//     const example = {
//         task: "Ejemlo de tarea",
//         id: Date.now(),
//         done: false
//     }
//     createHTML(example)
// } else {
//     filters[0].style.opacity = "1";
//     createHTML(tasks)
// }

// Función para agregar tarea
function addTask() {
    const task = input.value;

    if(task === '') {
        showError("La tarea está vacia")
    } else {
        const taskObj = {
            task,
            id: Date.now(),
            done: false
        }
    
        tasks = [...tasks, taskObj]
        localStorage.setItem('tasks', JSON.stringify(tasks));
    
        // Pintar la lista
        createHTML(tasks);
    
        // Limpiar el input
        input.value = "";
    }
}

// Función para eliminar todas las tareas

function deleteAll() {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createHTML(tasks);
}

// Función para eliminar una tarea

function deleteTask() {
    tasks = tasks.filter((e) => e.id != this.parentNode.id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createHTML(tasks);
}

// Función para marcar tareas hechas

function setDone() {
    if(this.checked) {
        tasks = tasks.map((e) => {
            if(e.id == this.parentNode.id) {
                e.done = true;
                return e;
            }
            return e;
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        tasks = tasks.map((e) => {
            if(e.id == this.parentNode.id) {
                e.done = false;
                return e;
            }
            return e;
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Filtros
function filterAll() {
    createHTML(tasks);
}

function filterDone() {
    let tasksDone = [];
    tasksDone = tasks.filter((task) => task.done)
    createHTML(tasksDone);
}

function filterNotDone() {
    let tasksNotDone = [];
    tasksNotDone = tasks.filter((task) => !task.done)
    createHTML(tasksNotDone)
}

// Función para pintar las tareas

function createHTML(tasks) {
    listTasks.innerHTML = "";
    tasks.forEach((task) => {
        // Crear un li por cada task
        const taskLi = document.createElement("li");
        taskLi.id = task.id;
        taskLi.innerHTML = `${task.task}`
        // Crear botón de eliminar para cada task
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "X";
        taskLi.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", deleteTask)
        // Crear ckeckbox para tareas cumplidas
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        taskLi.appendChild(checkbox); 
        checkbox.addEventListener('change', setDone);

        listTasks.appendChild(taskLi);
    });
}

// Función con mensaje de error

function showError(error) {
    const msgError = document.createElement("p");

    msgError.textContent = error;

    msgError.classList.add("error");

    listTasks.appendChild(msgError);

}