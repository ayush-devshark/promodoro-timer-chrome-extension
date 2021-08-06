const startTimerBtn = document.getElementById('startBtn');
const addTaskBtn = document.getElementById('addBtn');
const taskContainer = document.getElementById('task-container');

const tasks = [];

const addTask = () => {
    const taskNum = tasks.length;
    tasks.push('');

    const taskRow = document.createElement('div');
    const taskTextEL = document.createElement('input');

    taskTextEL.type = 'text';
    taskTextEL.placeholder = 'Enter a task...';
    taskTextEL.addEventListener('change', () => {
        tasks[taskNum] = taskTextEL.value;
    });

    const deleteTaskBtn = document.createElement('input');
    deleteTaskBtn.type = 'button';
    deleteTaskBtn.value = 'x';

    taskRow.appendChild(taskTextEL);
    taskRow.appendChild(deleteTaskBtn);

    taskContainer.appendChild(taskRow);
};

addTaskBtn.addEventListener('click', addTask);
