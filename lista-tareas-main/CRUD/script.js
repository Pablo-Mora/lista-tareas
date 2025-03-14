function addTask() {
    let taskName = document.getElementById("taskName").value;
    let taskDesc = document.getElementById("taskDesc").value;
    if (taskName === "") return;

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    let taskContent = `<div class="task-header">${taskName}
        <button class='info-btn' onclick="toggleDetails(this)">ℹ️</button>
        <button class='edit-btn' onclick="editTask(this)">✏️</button>
        <button class='delete-btn' onclick="this.parentElement.parentElement.remove()">❌</button>
    </div>
    <div class='details'>${taskDesc}</div>`;

    taskDiv.innerHTML = taskContent;
    document.getElementById("taskList").appendChild(taskDiv);
}

function toggleDetails(button) {
    let details = button.parentElement.nextElementSibling;
    if (details.style.maxHeight === "0px" || details.style.maxHeight === "") {
        details.style.maxHeight = details.scrollHeight + "px";
        details.style.padding = "10px";
    } else {
        details.style.maxHeight = "0px";
        details.style.padding = "0";
    }
}

function editTask(button) {
    let taskDiv = button.parentElement;
    let taskText = taskDiv.firstChild;
    let details = taskDiv.nextElementSibling;

    let newTaskName = prompt("Editar nombre de tarea:", taskText.nodeValue);
    let newTaskDesc = prompt("Editar descripción de tarea:", details.innerText);

    if (newTaskName) taskText.nodeValue = newTaskName;
    if (newTaskDesc) details.innerText = newTaskDesc;
}

function exportToPDF() {
    let content = document.getElementById("taskList").cloneNode(true);
    let buttons = content.querySelectorAll(".info-btn, .edit-btn, .delete-btn");
    buttons.forEach(btn => btn.remove());

    let win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head><title>Lista de Tareas</title></head><body>');
    win.document.write(content.innerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}
