//
// APP VARIABLES AND DOM ELEMENTS
//

// Array of pokemons that are provided by the user
const ToDoOngoing = [];
// The ul for the list of pokemon
const ToDoList = document.querySelector(".Ongoing-items");
// The form where we intake pokemon
const TodoForm = document.querySelector(".add-item");
// The form text element that has the name the user provided
const ToDoName = document.querySelector("#item-name");

//
// FUNCTIONS
//

// Handle the event when a user submits the form
function addPokemonItem(e) {
  // Stop browser default form submission
  e.preventDefault();
  // Get the text from the input field
  const ToDoItemName = ToDoName.value;
  // Add the user defined pokemon to our array
  ToDoOngoing.push(ToDoItemName);
  // Draw the list of pokemons
  renderList(ToDoOngoing, ToDoList);
  // Reset the form so that the text field name is cleared
  TodoForm.reset();
}

// Draw the list of items
// Step 1: remove all of the children in the UL list
// Step 2: for each entry in the array add the array item to the list
function renderList(items, itemsList) {
  // Clear all of the entries in the list
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }

  // For each item in the list add a list item
  for (let i = 0; i < items.length; i++) {
    // Create the list item and add the text
    const listItem = document.createElement("li");
    listItem.textContent = items[i];
    // On the last item in the list, add the annimation class
    if (i === items.length - 1) {
      listItem.classList.add("new-item-annimate");
    }
    // Add the list item to the list
    itemsList.appendChild(listItem);
  }
}

//
// EVENT LISTENERS AND INITIALISION
//

// Add the submit form handler
TodoForm.addEventListener("submit", addPokemonItem);

// Draw the list
renderList(ToDoOngoing, ToDoList);
