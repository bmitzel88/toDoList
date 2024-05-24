class ToDo {
    text: string;
    completed: boolean;

    constructor(text: string, completed: boolean = false) {
        this.text = text;
        this.completed = completed;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form') as HTMLFormElement;
    const input = document.getElementById('todo-input') as HTMLInputElement;
    const list = document.getElementById('todo-list') as HTMLUListElement;

    // Load tasks from local storage
    const tasks: ToDo[] = JSON.parse(localStorage.getItem('tasks') || '[]');

    tasks.forEach(task => addTaskToDOM(task));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText === '') return;

        const task = new ToDo(taskText);

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        addTaskToDOM(task);
        input.value = '';
    });

    function addTaskToDOM(task: ToDo) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            li.classList.toggle('completed', task.completed);
        });

        const span = document.createElement('span');
        span.textContent = task.text;

        li.appendChild(checkbox);
        li.appendChild(span);

        if (task.completed) {
            li.classList.add('completed');
        }

        list.appendChild(li);
    }
});
