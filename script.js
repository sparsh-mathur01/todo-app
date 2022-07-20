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
let mode = document.querySelector(".top div")
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
            content = ""
            todos.forEach((todo, index) => {
                content += `
            <li data-id=${index}>
            <input type="checkbox" name="completed" ${todo['completed'] ? "checked" : ""}>
            <span>${todo.label}</span>
            <button class="delete-todo"><i class='fa fa-trash'></i></button>
            </li>
            `;
            });
            list.innerHTML = content;
            count.innerHTML = todos.filter(todo => !todo['completed']).length;
            break;
        }
        case "active": {
            content = ""
            todos.forEach((todo, index) => {
                if (!todo['completed']) {

                    content += `
                    <li data-id=${index}>
                    <input type="checkbox" name="completed" ${todo['completed'] ? "checked" : ""}>
                    <span>${todo.label}</span>
                    <button class="delete-todo"><i class='fa fa-trash'></i></button>
                    </li>
                    `;
                }
            });
            list.innerHTML = content;
            count.innerHTML = todos.filter(todo => !todo['completed']).length;
            break;
        }
        case "completed": {
            content = ""
            todos.forEach((todo, index) => {
                if (todo['completed']) {
                    content += `
                    <li data-id=${index}>
                    <input type="checkbox" name="completed" ${todo['completed'] ? "checked" : ""}>
                    <span>${todo.label}</span>
                    <button class="delete-todo"><i class='fa fa-trash'></i></button>
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
    else if (e.target.classList[0] === "todos-clear" && confirm("remove the completed todos?")) {
        todos = todos.filter(todo => !todo['completed']);
        rendertodo(todos);
    }
    else if (e.target.classList[0] === 'fa') {
        let index = parseInt(e.target.parentNode.parentNode.getAttribute('data-id'));
        todos = [...todos.slice(0, index), ...todos.slice(index + 1)]
        rendertodo(todos, show)
    }
}

function handlemode(e) {
    let ch = e.target.getAttribute('mode')
    if (ch === 'light') {
        e.target.src = "./images/icon-sun.svg"
        document.body.style.background = "url('./images/bg-desktop-dark.jpg')  hsl(235, 21%, 11%) no-repeat";
        document.querySelector('.box').style.backgroundColor="hsl(235, 24%, 19%)";
        document.querySelector('.form form input').style.background="hsl(235, 24%, 19%)";
        Array.from(document.getElementsByTagName('li')).forEach((item)=>{
            item.style.color="grey";
        })
        Array.from(document.getElementsByTagName('p')).forEach((item)=>{
            item.style.color="grey";
        })
        Array.from(document.getElementsByTagName('section')).forEach((item)=>{
            item.style.color="grey";
        })
        e.target.setAttribute('mode', 'dark');
    }
    else {
        e.target.src = "./images/icon-moon.svg"
        document.body.style.background = "url('./images/bg-desktop-light.jpg')  white no-repeat";
        document.querySelector('.box').style.backgroundColor="white";
        document.querySelector('.form form input').style.background="white";
        Array.from(document.getElementsByTagName('li')).forEach((item)=>{
            item.style.color="black";
        })
        e.target.setAttribute('mode', 'light');
    }

}


// initialization
input.focus();
function init() {
    rendertodo(todos);
    mode.addEventListener("click", handlemode);
    form.addEventListener("submit", addtodo);
    list.addEventListener("click", handleclick);
    last.addEventListener("click", handleclick);


}
init();