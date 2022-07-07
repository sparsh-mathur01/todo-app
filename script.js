//state
let todos = [];

//selectors

let form = document.forms.todos;
let input = form.elements.todo;
let list = document.querySelector("ul");
let count = document.querySelector(".items-count");
// console.log(form)
// console.log(input)





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
    // console.log("submit")
}

function rendertodo(todos) {
    content = ""
    todos.forEach(todo => {
        content += `
    <li>
    <input type="checkbox" name="completed">
    <span>${todo.label}</span>
    </li>
    `;
    });
    list.innerHTML = content;
    count.innerHTML = todos.length;
}

function handleclick(e){
    // if (e.target)
}



// initialization
input.focus();
function init() {
    rendertodo(todos);
    form.addEventListener("submit", addtodo);
    list.addEventListener("click",handleclick);

}

init();