// Selectores
const form = document.getElementById('form');
const taskInput = document.getElementById('form-input-task');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('form-error-text');
const taskTotal = document.getElementById('task-total');
const taskComplete = document.getElementById('task-complete');
const taskIncomplete = document.getElementById('task-incomplete');

// Lista de tareas (se carga desde localStorage si existen)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para guardar tareas en el localStorage
function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para renderizar las tareas
function renderTasks() {
  // Limpiar la lista actual
  taskList.innerHTML = '';

  // Agregar cada tarea
  tasks.forEach((task, index) => {
    // Crear el elemento de la tarea
    const taskItem = document.createElement('li');
    taskItem.classList.add(task.completed ? 'task-item-completed' : 'task-item');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('task-delete-btn');
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 1 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
      </svg>`;
    deleteButton.addEventListener('click', () => deleteTask(index));

    const taskText = document.createElement('p');
    taskText.classList.add(task.completed ? 'task-text-completed' : 'task-text');
    taskText.textContent = task.text;

    const checkButton = document.createElement('button');
    checkButton.classList.add('task-check-btn');
    checkButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" />
      </svg>`;
    checkButton.addEventListener('click', () => toggleTaskCompletion(index));

    // Añadir los elementos al <li>
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(taskText);
    taskItem.appendChild(checkButton);

    // Añadir el <li> al <ul>
    taskList.appendChild(taskItem);
  });

  // Actualizar los contadores
  updateCounters();
}

// Función para agregar una nueva tarea
function addTask(taskText) {
  if (taskText.trim() === '') {
    showErrorMessage('No puede estar vacío');
    return;
  }

  // Agregar la nueva tarea al array "[tasks]"
  tasks.push({ text: taskText, completed: false });
  saveTasksToStorage();
  renderTasks();
  clearInput();
}

// Función para eliminar una tarea
function deleteTask(index) {
  tasks.splice(index, 1); // Elimina la tarea del array "[tasks]"
  saveTasksToStorage();
  renderTasks();
}

// Función para marcar/desmarcar una tarea como completada
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage();
  renderTasks();
}

// Función para actualizar los contadores
function updateCounters() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  taskTotal.textContent = `Total: ${totalTasks}`;
  taskComplete.textContent = `Completadas: ${completedTasks}`;
  taskIncomplete.textContent = `Incompletas: ${incompleteTasks}`;
}

// Función para mostrar un mensaje de error en el input
function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

// Función para limpiar el mensaje de error y el campo de entrada
function clearInput() {
  taskInput.value = '';
  errorMessage.style.display = 'none';
}

// Manejar el evento de envío del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

// Renderizar las tareas al cargar la página
document.addEventListener('DOMContentLoaded', renderTasks);