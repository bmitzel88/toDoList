class ToDo {
    text: string;
    completed: boolean;

    constructor(text: string, completed: boolean = false) {
        this.text = text;
        this.completed = completed;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('todo-list') as HTMLUListElement;

    // Load tasks from local storage
    const tasks: ToDo[] = JSON.parse(localStorage.getItem('tasks') || '[]');

    tasks.forEach(task => addTaskToDOM(task));

    document.getElementById('open-modal-btn')!.addEventListener('click', function() {
        const myModal = new bootstrap.Modal(document.getElementById('todoModal')!, {
            keyboard: false
        });
        myModal.show();
    });

    document.getElementById('save-task-btn')!.addEventListener('click', function() {
        const input = document.getElementById('task-input') as HTMLInputElement;
        const taskText = input.value.trim();
        if (taskText === '') return;

        const task = new ToDo(taskText);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        addTaskToDOM(task);
        input.value = '';

        const modalElement = document.getElementById('todoModal')!;
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    });

    function addTaskToDOM(task: ToDo) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.className = 'form-check-input me-2';
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        const span = document.createElement('span');
        span.textContent = task.text;

        li.appendChild(checkbox);
        li.appendChild(span);

        list.appendChild(li);
    }
});
