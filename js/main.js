class ToDo {
    text;
    completed;
    constructor(text, completed = false) {
        this.text = text;
        this.completed = completed;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => addTaskToDOM(task));
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText === '')
            return;
        const task = new ToDo(taskText);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        addTaskToDOM(task);
        input.value = '';
    });
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                const index = tasks.indexOf(task);
                if (index > -1) {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    li.remove();
                }
            }
        });
        const span = document.createElement('span');
        span.textContent = task.text;
        li.appendChild(checkbox);
        li.appendChild(span);
        list.appendChild(li);
    }
});
