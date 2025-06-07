const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');

document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTask(task.text, task.done));
  toggleEmptyMessage();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    input.value = '';
    saveTasks();
    toggleEmptyMessage();
  }
});

function addTask(text, done = false) {
  const li = document.createElement('li');
  li.textContent = text;

  if (done) {
    li.classList.add('done');
  }

  li.addEventListener('click', () => {
    li.classList.toggle('done');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.title = 'Delete';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    list.removeChild(li);
    saveTasks();
    toggleEmptyMessage();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterTasks(btn.dataset.filter);
  });
});

function filterTasks(filter) {
  const tasks = document.querySelectorAll('#todo-list li');
  tasks.forEach(task => {
    const isDone = task.classList.contains('done');
    if (
      filter === 'all' ||
      (filter === 'completed' && isDone) ||
      (filter === 'active' && !isDone)
    ) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}

function toggleEmptyMessage() {
  emptyMessage.style.display = list.children.length === 0 ? 'block' : 'none';
}

function saveTasks() {
  const tasks = Array.from(list.children).map(li => ({
    text: li.firstChild.textContent.trim(),
    done: li.classList.contains('done')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

