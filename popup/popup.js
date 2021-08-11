const startTimerBtn = document.getElementById('startBtn');
const resetTimerBtn = document.getElementById('resetBtn');
const addTaskBtn = document.getElementById('addBtn');
const taskContainer = document.getElementById('task-container');
const time = document.getElementById('time');

let tasks = [];

function updateTime() {
    chrome.storage.local.get(['timer', 'timerOptions'], res => {
        const minutes = `${
            res.timerOptions - Math.ceil(res.timer / 60)
        }`.padStart(2, '0');
        let seconds = '00';
        if (res.timer % 60 !== 0) {
            seconds = `${60 - (res.timer % 60)}`.padStart(2, '0');
        }
        time.textContent = `${minutes}: ${seconds}`;
    });
}

updateTime();
setInterval(updateTime, 1000);

startTimerBtn.addEventListener('click', () => {
    chrome.storage.local.get(['isRunning'], res => {
        chrome.storage.local.set(
            {
                isRunning: !res.isRunning,
            },
            () => {
                startTimerBtn.textContent = !res.isRunning
                    ? 'Pause Timer'
                    : 'Start Timer';
            }
        );
    });
});

resetTimerBtn.addEventListener('click', () => {
    chrome.storage.local.set(
        {
            timer: 0,
            isRunning: false,
        },
        () => {
            startTimerBtn.textContent = 'Start Timer';
        }
    );
});

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
    saveTasks();
};

const rendertask = taskNum => {
    const taskRow = document.createElement('div');
    const taskTextEL = document.createElement('input');

    taskTextEL.type = 'text';
    taskTextEL.placeholder = 'Enter a task...';
    taskTextEL.value = tasks[taskNum];
    taskTextEL.className = 'task-input';
    taskTextEL.addEventListener('change', () => {
        tasks[taskNum] = taskTextEL.value;
        saveTasks();
    });

    const deleteTaskBtn = document.createElement('input');
    deleteTaskBtn.type = 'button';
    deleteTaskBtn.value = 'x';
    deleteTaskBtn.className = 'task-delete';
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
    saveTasks();
};

function renderTasks() {
    taskContainer.textContent = '';
    tasks.forEach((taskText, taskNum) => rendertask(taskNum));
}

addTaskBtn.addEventListener('click', addTask);
