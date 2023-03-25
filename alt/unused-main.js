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
    alert("Input is empty! Add a Todo!");
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
        category: "untagged",
      });
    }

    todoInput.value = '';
  }
}

// Render Todo Items onscreen
function renderTodos() {
  if (todos.length === 0) {
    todosListEl.innerHTML = '<center>List is empty!</center>'
    return;
  }
  // Clear Element before a new item added
  todosListEl.innerHTML = '';

  todos.forEach((todo, index) => {

    if (todo.category==="untagged") {
      todosListEl.innerHTML += `
      <div class="todo" id=${index}>
        <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        data-action="check"
        ></i>
        <p class="" data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash" data-action="delete"></i>
        <i class="bi bi-bookmark-fill" data-action="tag">    
          <div id="tdTag" class="untagged">
        </div>
        </i>
        </div>`;
    } else if (todo.category==="session") {
      todosListEl.innerHTML += `
      <div class="todo" id=${index}>
        <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        data-action="check"
        ></i>
        <p class="" data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash" data-action="delete"></i>
        <i class="bi bi-bookmark-fill" data-action="tag">    
          <div id="tdTag" class="session">
        </div>
        </i>
        </div>`;
    } else if (todo.category==="ongoing") {
      todosListEl.innerHTML += `
      <div class="todo" id=${index}>
        <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        data-action="check"
        ></i>
        <p class="" data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash" data-action="delete"></i>
        <i class="bi bi-bookmark-fill" data-action="tag">    
          <div id="tdTag" class="ongoing">
        </div>
        </i>
        </div>`;
    } else {
      todosListEl.innerHTML += `
      <div class="todo" id=${index}>
        <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        data-action="check"
        ></i>
        <p class="" data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash" data-action="delete"></i>
        <i class="bi bi-bookmark-fill" data-action="tag">    
          <div id="tdTag" class="future">
        </div>
        </i>
        </div>`;
    }
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
  const todoTag = tdTag.className;

  // Target Action
  const action = target.dataset.action
  action === "check" && checkTodo(todoId);
  action === "edit" && editTodo(todoId);
  action === "delete" && deleteTodo(todoId);
  action === "tag" && changeTag(todoId, todoTag);

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
  console.log(todoId);

  todoInput.value = todos[todoId].value;
  EditTodoId = todoId;
}

// Delete Todo Function
function deleteTodo(todoId) {
  console.log(todoId);

  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;

  // re-render
  renderTodos();
}

// Change Class Function, fully custom!! :D
function changeTag(todoId, todoTag) {
  console.log(todoTag);
  switch (todoTag) {
    case "untagged":
      tdTag.classList.replace("untagged", "session");
      todos.category="session"; // is this correct? Because IDK and it isn't working
      console.log(todoTag);
      break;
    case "session":
      tdTag.classList.replace("session", "ongoing");
      console.log(todoTag);
      break;
    case "ongoing":
      tdTag.classList.replace("ongoing", "future");
      console.log(todoTag);
      break;
    case "future":
      tdTag.classList.replace("future", "untagged");
      console.log(todoTag);
      break;
    default:       
    console.log(todoTag);
      break;
  }
    // re-render
    renderTodos(); // This is making it be "Untagged" EVERY loop
}