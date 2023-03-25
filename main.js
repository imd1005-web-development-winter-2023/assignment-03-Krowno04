// Selects Element:
const form = document.getElementById("todoform")
const todoInput = document.getElementById("newtodo")
const todosListEl = document.getElementById("todos-list")

//Variables
let todos = [];
let EditTodoId = -1;


renderTodos();

//Form Submition
form.addEventListener('submit', function (event) {
  event.preventDefault();

  saveTodo();
  renderTodos();
});

// Save Todo Item
function saveTodo() {
  const todoValue = todoInput.value;

  // check if the todo is empty
  const isEmpty = todoValue === '';

  if (isEmpty) {
      showNotification("Input is empty! Add a Todo!");
  } else {
      if (EditTodoId >= 0) {
          todos = todos.map((todo, index) => ({
              ...todo,
              value: index === EditTodoId ? todoValue : todo.value,
          }));
          EditTodoId = -1;
      } else {
          todos.push({
              value: todoValue,
              checked: false,
          });
      }

      todoInput.value = '';
  }
}

// Render Todo Items onscreen
function renderTodos() {
  if(todos.length === 0) {
    todosListEl.innerHTML = '<center>List is empty!</center>'
    return;
  }
  // Clear Element before a new item added
  todosListEl.innerHTML = '';

  todos.forEach((todo, index) => {
    todosListEl.innerHTML += `
  <div class="todo" id=${index}>
    <i 
    class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
    data-action="check"
    ></i>
    <p class="" data-action="check">${todo.value}</p>
    <i class="bi bi-pencil-square" data-action="edit"></i>
    <i class="bi bi-trash" data-action="delete"></i>
    
  </div>`;
  });
}

//Target Todo Items
todosListEl.addEventListener('click', (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'todo') return;

  //todo id
  const todo = parentElement;
  const todoId = Number(todo.id);

  // Target Action
  const action = target.dataset.action
  action === "check" && checkTodo(todoId);
  action === "edit" && editTodo(todoId);
  action === "delete" && deleteTodo(todoId);

})

// Check Todo Function
function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  renderTodos();
}

// Edit Todo Function
function editTodo(todoId) {
  todoInput.value = todos[todoId].value;
  EditTodoId = todoId;
}

// DELETE TODO
function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;

  // re-render
  renderTodos();
}