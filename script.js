const input = document.querySelector('.input');
const todoList = document.querySelector('.list');
const defaultMessage = document.querySelector('.default-message');
document.body.onload = callFunctions();

// function to create a new todo item
function createTodoItem(text) {
  const newTodo = document.createElement('li');
  newTodo.className = 'todo-item';
  newTodo.draggable = true;

  const checkBtn = document.createElement('img');
  checkBtn.src = './images/icon-check.svg';
  checkBtn.className = 'check-btn';
  checkBtn.addEventListener('click', () => {
    checkTodoItem(newTodo);
    checkBtn.classList.toggle('active');
  });

  const deleteBtn = document.createElement('img');
  deleteBtn.src = './images/icon-cross.svg';
  deleteBtn.addEventListener('click', () => deleteTodoItem(newTodo));

  const newTodoText = document.createElement('p');
  newTodoText.innerText = text;

  newTodo.appendChild(checkBtn);
  newTodo.appendChild(newTodoText);
  newTodo.appendChild(deleteBtn);

  todoList.appendChild(newTodo);
  updateItemCount();
}

// function to delete a todo item
function deleteTodoItem(todoItem) {
  todoItem.remove();
  updateItemCount();
}

// function to check a todo item
function checkTodoItem(todoItem) {
  todoItem.classList.toggle('active');
}

// function to update item count
function updateItemCount() {
  const numberOfItems = todoList.children.length;

  if (numberOfItems === 0) {
    defaultMessage.style.display = 'block';
  } else {
    defaultMessage.style.display = 'none';
  }

  const itemsLeft = document.querySelector('.items-left');
  itemsLeft.innerText = `${numberOfItems} items left`;
}

// event listener for input change
input.addEventListener('change', (e) => {
  e.preventDefault();
  createTodoItem(e.currentTarget.value);
  input.value = '';
});

// event listener for input click
input.addEventListener('click', () => {
  input.setAttribute('placeholder', 'Currently typing');
});

// event listener for body click
document.body.addEventListener('click', (event) => {
  if (!input.contains(event.target)) {
    input.setAttribute('placeholder', 'Create new todo');
  }
});

let completedCount = 0;
const completedBtn = document.querySelector('.completed');

//function to update the number of completed items
function updateCompletedCount() {
  completedCount = 0;
  const items = document.querySelectorAll('.todo-item');
  items.forEach((item) => {
    // if the item is active, increase the count and display the item
    if (item.classList.contains('active')) {
      item.style = 'display:flex';
      completedCount++;
    }
    // if the item is not active, hide the item
    else if(!item.classList.contains('active')){
      item.style = 'display:none';
    }
  });
  // Update the number of items left on the page
  document.querySelector('.items-left').innerText = `${completedCount} items left`;
}

// event listener for completed button click
completedBtn.addEventListener('click', () =>{
  handleStateClick(completedBtn);
  updateCompletedCount()
});

// Event listener for all button click
const allBtn = document.querySelector('.all');
allBtn.addEventListener('click',()=>{
  handleStateClick(allBtn);
  notCompleted();
})

// function to make all todo items visible
function notCompleted(){
  const items = document.querySelectorAll('.todo-item');
  items.forEach((item)=>{
    if(item.classList.contains('todo-item')){
      item.style = 'display:flex';
    }
  });
  updateItemCount();
}

// Event listener for active button click
const activeBtn = document.querySelector('.not-completed');
function Active(){
  let activeCount = 0;
  const items = document.querySelectorAll('.todo-item');
  items.forEach((item)=>{
    // if the item is not active, display it and increase the count
    if(!item.classList.contains('active')){
      item.style = 'display:flex';
      activeCount++;
    }
    // if the item is active, hide it
    else if(item.classList.contains('active')){
      item.style = 'display:none';
    }
  });
  // Update the number of items left on the page
  document.querySelector('.items-left').innerText = `${activeCount} items left`;
}
activeBtn.addEventListener('click',()=>{
  handleStateClick(activeBtn);
  Active();
});

//function to handle button state 
function handleStateClick(clicked){
  const stateItems = document.querySelectorAll('.state-p');
  stateItems.forEach((item)=>{
    if(item == clicked){
      item.classList.toggle('checked');
    }
    else{
      item.classList.remove('checked');
    }
  });
}
// function to remove all completed todo items
function clearCompleted(){
  const items = document.querySelectorAll('.todo-item');
  items.forEach((item)=>{
    if(item.classList.contains('active')){
      item.remove();
    }
  });
  updateItemCount();
}

// Event listener for clear all button click
const clearAllBtn = document.querySelector('.clear');
clearAllBtn.addEventListener('click',() =>{
  clearCompleted();
});

// toggle light theme on body element
document.body.classList.toggle('light-theme');

// function to change the theme icon and background
function changeThemeIcon() {
  changeHeroImg();
  document.body.classList.toggle('light-theme');
  const themeBtn = document.querySelector('.toggle-btn');
  // change the icon to match the current theme
  themeBtn.src = themeBtn.src.endsWith('icon-sun.svg')
    ? './images/icon-moon.svg'
    : './images/icon-sun.svg';
}

// function to set the theme icon
function setThemeIcon(){
  const themeBtn = document.createElement('img');
  themeBtn.src = './images/icon-sun.svg';
  themeBtn.classList = 'toggle-btn';
  document.querySelector('.title-and-theme').appendChild(themeBtn);

  themeBtn.addEventListener('click', changeThemeIcon);
};

// function to change the hero section background
function changeHeroImg(){
  document.querySelector('.hero-section').classList.toggle('banner-theme');
}

// function to change the layout of the todo form 
function changeLayout() {
  // create a div element to hold the state buttons
  const stateInner = document.createElement('div');
  stateInner.className = 'state-inner-js';

  // arrays of context and corresponding class names for the state buttons
  const context = ['All', 'Active', 'Completed'];
  const classNames = ['js-all', 'js-not-completed', 'js-completed'];

  // loop through the context array to create state buttons
  for (let i = 0; i < context.length; i++) {
    const stateContext = document.createElement('p');
    // add class names to the state button
    stateContext.classList.add('state-p', classNames[i]);
    // set the inner text of the state button
    stateContext.innerText = context[i];
    // add the state button to the state inner div
    stateInner.appendChild(stateContext);
  }
  // add the state inner div to the todo form
  document.querySelector('.todo-form').appendChild(stateInner);
}

// event listeners for state button clicks
// all button click
document.querySelector('.js-all').addEventListener('click', () => {
  handleStateClick(allBtn);
  notCompleted();
});
// active button click
document.querySelector('.js-not-completed').addEventListener('click', () => {
  handleStateClick(activeBtn);
  Active();
});
// completed button click
document.querySelector('.js-completed').addEventListener('click', () => {
  handleStateClick(completedBtn);
  updateCompletedCount();
});

// function to call other necessary functions when the page loads
function callFunctions(){
  // call the changeLayout function to generate the state buttons
  changeLayout();
  // call the setThemeIcon function to generate the theme toggle button
  setThemeIcon();
  // call the updateItemCount function to update the count of todo items
  updateItemCount();
}


