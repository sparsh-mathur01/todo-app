//state
let todos = [{ label: "test", completed: false }];

//selectors

let form = document.forms.todos;
let input = form.elements.todo;
let list = document.querySelector("ul");
let count = document.querySelector(".items-count");





//handlers
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

function rendertodo(todos) {
    content = ""
    todos.forEach((todo,index) => {
        content += `
    <li data-id=${index}>
    <input type="checkbox" name="completed">
    <span>${todo.label}</span>
    </li>
    `;
    });
    list.innerHTML = content;
    count.innerHTML = todos.length;
}

function handleclick(e) {
    console.log(e.target.parentNode)
}



// initialization
input.focus();
function init() {
    rendertodo(todos);
    form.addEventListener("submit", addtodo);
    list.addEventListener("click", handleclick);

}
init();