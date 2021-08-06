const startTimerBtn = document.getElementById('startBtn');
const addTaskBtn = document.getElementById('addBtn');
const taskContainer = document.getElementById('task-container');

let tasks = [];

chrome.storage.local.get(['tasks'], res => {
    tasks = res.tasks ? res.tasks : [];
    renderTasks();
});

const saveTasks = () => {
    chrome.storage.local.set({
        tasks,
    });
};

const addTask = () => {
    const taskNum = tasks.length;
    tasks.push('');
    rendertask(taskNum);
};

const rendertask = taskNum => {
    const taskRow = document.createElement('div');
    const taskTextEL = document.createElement('input');

    taskTextEL.type = 'text';
    taskTextEL.placeholder = 'Enter a task...';
    taskTextEL.value = tasks[taskNum];
    taskTextEL.addEventListener('change', () => {
        tasks[taskNum] = taskTextEL.value;
        saveTasks();
    });

    const deleteTaskBtn = document.createElement('input');
    deleteTaskBtn.type = 'button';
    deleteTaskBtn.value = 'x';
    deleteTaskBtn.addEventListener('click', () => {
        deleteTask(taskNum);
    });

    taskRow.appendChild(taskTextEL);
    taskRow.appendChild(deleteTaskBtn);

    taskContainer.appendChild(taskRow);
};

const deleteTask = taskNum => {
    tasks.splice(taskNum, 1);
    renderTasks();
};

function renderTasks() {
    taskContainer.textContent = '';
    tasks.forEach((taskText, taskNum) => rendertask(taskNum));
}

addTaskBtn.addEventListener('click', addTask);
