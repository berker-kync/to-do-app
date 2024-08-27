document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const prioritySelect = document.getElementById('prioritySelect');
    const taskPriority = prioritySelect.value;
    const dueDateInput = document.getElementById('dueDateInput');
    const dueDate = dueDateInput.value;

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');

        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('checkbox-wrapper');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', function() {
            const task = JSON.parse(listItem.dataset.task);
            task.completed = checkbox.checked;
            listItem.dataset.task = JSON.stringify(task);
            listItem.classList.toggle('completed', task.completed);
            listItem.classList.toggle('checkbox-checked', task.completed);
            filterTasks();
        });

        checkboxWrapper.appendChild(checkbox);

        const taskSpan = document.createElement('span');
        taskSpan.classList.add('task-text');
        taskSpan.textContent = taskText;
        taskSpan.addEventListener('dblclick', function() {
            const newText = prompt('Edit your task:', taskText);
            if (newText !== null && newText.trim() !== '') {
                taskSpan.textContent = newText;
            }
        });

        const prioritySpan = document.createElement('span');
        prioritySpan.classList.add('priority');
        prioritySpan.textContent = `[${taskPriority}]`;

        const dueDateSpan = document.createElement('span');
        dueDateSpan.classList.add('due-date');
        dueDateSpan.textContent = `Due: ${dueDate}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
            filterTasks();
        });

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        taskContainer.appendChild(checkboxWrapper);
        taskContainer.appendChild(taskSpan);
        taskContainer.appendChild(prioritySpan);
        taskContainer.appendChild(dueDateSpan);

        listItem.appendChild(taskContainer);
        listItem.appendChild(deleteButton);
        listItem.dataset.priority = taskPriority;


        const task = {
            text: taskText,
            priority: taskPriority,
            dueDate: dueDate,
            completed: false
        };
        listItem.dataset.task = JSON.stringify(task);

        taskList.appendChild(listItem);
        taskInput.value = '';
        filterTasks();
    }
});

document.getElementById('filterSelect').addEventListener('change', filterTasks);

function filterTasks() {
    const filter = document.getElementById('filterSelect').value;
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children);

    tasks.forEach(taskElement => {
        const task = JSON.parse(taskElement.dataset.task);
        taskElement.style.display = 'none';

        if (filter === 'all') {
            taskElement.style.display = 'block';
        } else if (filter === 'completed' && task.completed) {
            taskElement.style.display = 'block';
        } else if (filter === 'incomplete' && !task.completed) {
            taskElement.style.display = 'block';
        } else if (filter === 'due' && task.dueDate < new Date().toISOString()) {
            taskElement.style.display = 'block';
        }
    });
}