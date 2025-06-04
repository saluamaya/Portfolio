const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', function (e) {
e.preventDefault();
const task = input.value.trim();
if (task !== '') {
addTask(task);
input.value = '';
}
});

function addTask(task) {
const li = document.createElement('li');
li.textContent = task;

li.addEventListener('click', function () {
li.classList.toggle('done');
});

const deleteBtn = document.createElement('button');
deleteBtn.textContent = '✕';
deleteBtn.style.marginLeft = '10px';
deleteBtn.addEventListener('click', function () {
list.removeChild(li);
});

li.appendChild(deleteBtn);
list.appendChild(li);
}
