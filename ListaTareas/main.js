// Selección de elementos del DOM
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.querySelector('button');

let tasks = [];
let editingIndex = -1;

// Función para crear un elemento con sus atributos
function createElement(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

// Función para agregar una tarea
function addTask() {
    const text = taskInput.value.trim();
    
    if (text) {
        if (editingIndex >= 0) {
            // Editando tarea existente
            tasks[editingIndex].text = text;
            editingIndex = -1;
            addButton.textContent = 'Agregar';
        } else {
            // Agregando nueva tarea
            tasks.push({
                text: text,
                completed: false
            });
        }
        taskInput.value = '';
        renderTasks();
    }
}

// Función para crear los elementos de una tarea
function createTaskElement(task, index) {
    // Crear contenedor de la tarea
    const taskElement = createElement('div', `task ${task.completed ? 'completed' : ''}`);

    // Crear checkbox
    const checkbox = createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(index));

    // Crear span para el texto
    const taskText = createElement('span', 'task-text', task.text);

    // Crear botón de editar
    const editBtn = createElement('button', 'edit-btn', 'Editar');
    editBtn.addEventListener('click', () => editTask(index));

    // Crear botón de eliminar
    const deleteBtn = createElement('button', 'delete-btn', 'Eliminar');
    deleteBtn.addEventListener('click', () => deleteTask(index));

    // Agregar elementos al contenedor
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(editBtn);
    taskElement.appendChild(deleteBtn);

    // Agregar efecto de fade-out cuando está completada
    if (task.completed) {
        taskElement.style.opacity = '0.5';
        taskElement.style.transition = 'opacity 0.5s ease';
    }

    return taskElement;
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Función para editar una tarea
function editTask(index) {
    taskInput.value = tasks[index].text;
    taskInput.focus();
    editingIndex = index;
    addButton.textContent = 'Guardar';
}

// Función para marcar/desmarcar una tarea como completada
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    
    // Si la tarea se marcó como completada, eliminarla después de 1 segundo
    if (tasks[index].completed) {
        setTimeout(() => {
            deleteTask(index);
        }, 1000);
    }
}

// Función para renderizar la lista de tareas
function renderTasks() {
    // Limpiar la lista actual
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    
    // Crear y agregar cada tarea
    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });
}

// Event Listeners
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

addButton.addEventListener('click', addTask);

// Renderizar tareas iniciales
renderTasks();