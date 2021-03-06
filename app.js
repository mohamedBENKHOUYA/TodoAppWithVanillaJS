//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

// console.log(todoList.children[0])

let ar = '[2, 3]';
// let jso = JSON.stringify(ar);

// Event LIstenters
document.addEventListener('DOMContentLoaded', start);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
// Funcions

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add('todo-item');

    //actions div
    const actions = document.createElement('div');
    actions.classList.add('actions');

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    
    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //Trash BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");


    //add buttons to action div
    actions.appendChild(completedButton);
    actions.appendChild(trashButton);

    todoDiv.appendChild(todoLi);
    todoDiv.appendChild(actions);


    //add todo to list todos
    todoList.appendChild(todoDiv);
    todoInput.value = '';
    filterTodo();
}

function deleteCheck(e) {
    console.log(e.target)
    //DELETE TODO
    const item = e.target;
    if(item.classList.contains('trash-btn')){
        const todo = item.parentElement.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
        deleteFromStorage(todo);
    }
    // console.log(typeof e.target.classList)

    //CHECK MARK
    if(item.classList.contains('complete-btn')) {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('completed');
     }
    
     filterTodo()
}

let target;
function filterTodo(e = null) {
    let all_possibilities = ['all', 'completed', 'uncompleted'];
    target = (e === null)? target: e.target.value;
    const todos = todoList.children;
        for(let todo of todos){
            switch(target) {
                case 'all': todo.style.display = 'flex'; break;
                case 'completed': 
                    if(todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    }else {
                        todo.style.display = 'none';
                    }; break;
                case 'uncompleted':
                    if(todo.classList.contains("completed")){
                        todo.style.display = 'none';
                    }else {todo.style.display = 'flex';};
                    break;
            }
        }
}

function saveLocalTodos(todo) {
    // CHECK ---HEY DO I already have thing in there ?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos)); 
} 

function deleteFromStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos = todos.filter((str) => todo.children[0].innerText === str);
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('child : ',todo.children[0].innerText)

}

function start() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.map((value) => {
        let div = document.createElement('div');
        div.classList.add('todo');
        let li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerText = value;
        let actions = document.createElement('div');
        actions.classList.add('actions');
        let trash = document.createElement('button');
        trash.classList.add('trash-btn');
        trash.innerHTML = `<i class="fas fa-trash"></i>`;
        let complete = document.createElement('button');
        complete.classList.add('complete-btn');
        complete.innerHTML = `<i class="fas fa-check"></i>`;

        actions.appendChild(complete);
        actions.appendChild(trash);
        div.appendChild(li);
        div.appendChild(actions);
        todoList.appendChild(div);
    })
}