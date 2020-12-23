window.onload = function(){
    
    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const todosUL = document.getElementById("todos");

    const todos = JSON.parse(localStorage.getItem("todes"));

    if(todos){
        todos.forEach(todo => {
            addTodo(todo);
        })
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addTodo();
    });

    function addTodo(todo){
        input.classList.add("completed");

        let todoText = input.value;

        if(todo){
            todoText = todo.text;
        }
        if(todoText){

            const todoEl = document.createElement("li");

            if(todo && todo.completed){  
                todoEl.classList.add("completed");
            }

            todoEl.innerText = todoText;

            todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

                updateLS();
            });

            const x = document.getElementsByTagName("li");

            todoEl.addEventListener("contextmenu", (e) => {
                e.preventDefault();

            if(todoEl.length === 0){
                input.classList.add("completed");
            }
            todoEl.remove();
            if(x.length == 0){
                input.classList.remove("completed");
            }

            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS();
        }
    }

    function updateLS(){
        const todesEl = document.querySelectorAll("li");

        const todes = [];

        todesEl.forEach(todesEl => {
            todes.push({
                text: todesEl.innerText,
                completed: todesEl.classList.contains("completed")
            });
        });
        localStorage.setItem("todes", JSON.stringify(todes));
    }
};