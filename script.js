//state
// let todos = [{ label: "test", completed: false }];
let todos = JSON.parse(localStorage
    .getItem('todos')) || []

//selectors

let form = document.forms.todos;
let input = form.elements.todo;
let list = document.querySelector("ul");
let count = document.querySelector(".items-count");
let last = document.querySelector(".last");
let show = "all"



//handlers

function saveToStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addtodo(e) {
    e.preventDefault();
    let todo = e.target.todo;
    const label = todo.value;
    let completed = false;
    todos = [...todos,
    {
        label,
        completed
    }]
    rendertodo(todos);
    todo.value = ""
    todo.focus;
}

function rendertodo(todos, filter = 'all') {

    switch (filter) {
        case "all": {
            console.log("all todos must be shown");
            content = ""
            todos.forEach((todo, index) => {
                content += `
            <li data-id=${index}>
            <input type="checkbox" name="completed" ${todo['completed'] ? "checked" : ""}>
            <span>${todo.label}</span>
            <button class="delete-todo"></button>
            </li>
            `;
            });
            list.innerHTML = content;
            count.innerHTML = todos.filter(todo => !todo['completed']).length;
            break;
        }
        case "active": {
            console.log("active todos must be shown");
            content = ""
            todos.forEach((todo, index) => {
                if (!todo['completed']) {

                    content += `
                    <li data-id=${index}>
                    <input type="checkbox" name="completed" ${todo['completed'] ? "checked" : ""}>
                    <span>${todo.label}</span>
                    </li>
                    `;
                }
            });
            list.innerHTML = content;
            count.innerHTML = todos.filter(todo => !todo['completed']).length;
            break;
        }
        case "completed": {
            console.log("completed todos must be shown");
            content = ""
            todos.forEach((todo, index) => {
                if (todo['completed']) {
                    content += `
                    <li data-id=${index}>
                    <input type="checkbox" name="completed" ${todo['completed'] ? "checked" : ""}>
                    <span>${todo.label}</span>
                    </li>
                    `;
                }
            });
            list.innerHTML = content;
            count.innerHTML = todos.filter(todo => !todo['completed']).length;
            break;
        }
    }
    saveToStorage(todos);
}

function handleclick(e) {
    if (e.target.type === "checkbox") {
        let complete = e.target.checked;
        let index = e.target.parentNode.getAttribute('data-id');
        todos[index]["completed"] = complete;
        rendertodo(todos, show);
    }
    else if (e.target.classList[0] === "filter") {
        show = e.target.classList[1]
        rendertodo(todos, show)
    }
    else if (e.target.classList[0]==="todos-clear" && confirm("remove the completed todos?")){
        todos=todos.filter(todo=>!todo['completed']);
        rendertodo(todos);
    }
    else if(e.target.classList[0]==='delete-todo'){
        let index=e.target.parentNode.getAttribute('data-id');
        todos=[...todos.slice(0,index),...todos.slice(index+1)]
        rendertodo(todos,show)
    }
}



// initialization
input.focus();
function init() {
    rendertodo(todos);
    form.addEventListener("submit", addtodo);
    list.addEventListener("click", handleclick);
    last.addEventListener("click", handleclick)

}
init();