// Load stored tasks on page load
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;

    if (!taskTitle) {
        alert('Please enter a task title');
        return;
    }

    const task = {
        id: Date.now(),
        title: taskTitle,
        textColor: textColor,
        bgColor: bgColor,
        completed: false
    };

    saveTaskToLocalStorage(task);
    displayTask(task, false); // false indicates it's an active task
    document.getElementById('taskTitle').value = '';
}

function displayTask(task, isEnded) {
    const taskContainer = isEnded ? document.getElementById('endedTasks') : document.getElementById('todoList');
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.style.backgroundColor = task.bgColor;
    taskElement.setAttribute('data-id', task.id);

    const taskClass = task.completed ? 'task-text completed' : 'task-text';

    taskElement.innerHTML = `
        <span class="${taskClass}" style="color: ${task.textColor}">${task.title}</span>
        <button class="complete" onclick="markComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        <button class="save" onclick="saveTask(${task.id})" style="display:none">Save</button>
    `;

    taskContainer.appendChild(taskElement);
}

function editTask(taskId) {
    const taskElement = document.querySelector(`.task[data-id='${taskId}']`);
    const taskText = taskElement.querySelector('.task-text');
    const saveButton = taskElement.querySelector('.save');
    const editButton = taskElement.querySelector('.edit');

    const newTitle = prompt('Edit task title:', taskText.textContent);
    if (newTitle) {
        taskText.textContent = newTitle;
        saveButton.style.display = 'inline-block';
        editButton.style.display = 'none';
    }
}

function saveTask(taskId) {
    const taskElement = document.querySelector(`.task[data-id='${taskId}']`);
    const taskText = taskElement.querySelector('.task-text').textContent;
    const task = getTaskFromLocalStorage(taskId);

    if (task) {
        task.title = taskText;
        updateTaskInLocalStorage(task);
    }

    const saveButton = taskElement.querySelector('.save');
    const editButton = taskElement.querySelector('.edit');
    saveButton.style.display = 'none';
    editButton.style.display = 'inline-block';
}

function deleteTask(taskId) {
    const taskElement = document.querySelector(`.task[data-id='${taskId}']`);
    taskElement.remove();
    deleteTaskFromLocalStorage(taskId);
}

function markComplete(taskId) {
    const task = getTaskFromLocalStorage(taskId);
    task.completed = !task.completed;
    updateTaskInLocalStorage(task);
    reloadTasks();
}

// LocalStorage functions
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskFromLocalStorage(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.find(task => task.id === taskId);
}

function updateTaskInLocalStorage(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        displayTask(task, task.completed);
    });
}

function reloadTasks() {
    document.getElementById('todoList').innerHTML = '';
    document.getElementById('endedTasks').innerHTML = '';
    loadTasks();
}

// Add dynamic typing effect for the title
document.addEventListener("DOMContentLoaded", function() {
    let text = "To-Do List";
    let i = 0;
    let isDeleting = false;
    const speed = 200; // Speed of typing

    function typeEffect() {
        const h1 = document.getElementById('dynamicText');

        if (!isDeleting) {
            h1.textContent = text.slice(0, ++i);
            if (i === text.length) {
                setTimeout(() => isDeleting = true, 2000); // Pause before deleting
            }
        } else {
            h1.textContent = text.slice(0, --i);
            if (i === 0) {
                isDeleting = false;
            }
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
});

// Other JavaScript functionality for the to-do list...

