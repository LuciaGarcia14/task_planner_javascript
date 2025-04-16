const form = document.getElementById('create-form');
const table = document.getElementById('table-tasks');
const table_body = document.getElementById('body_table-tasks');


document.getElementById('btn_create-task').addEventListener('click', function(){
    const form = document.getElementById('create-form');
    form.style.display = 'block';
});

window.addEventListener('load', ()=>{
    const saved_tasks = sessionStorage.getItem('tasks');
    if(saved_tasks){
        const tasks = JSON.parse(saved_tasks);
        tasks.forEach(task => add_task (task));
        table.style.display = 'block';
    }
});

document.getElementById('btn_insert_tasks').addEventListener('click', async function(e){
    e.preventDefault();

    let id_task = document.getElementById('id-tasks').value;
    let title_task = document.getElementById('title-tasks').value;
    let description_task = document.getElementById('description-tasks').value;
    let date_task = document.getElementById ('date-tasks').value;
    let status_task = document.getElementById('status-tasks').value;
    let img_url = '';
    
    try {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await res.json(); 
        img_url = data[0].url;
    } catch (error) {
        console.error('Error en la petición', error);
        img_url = "¡No hay conexión con la API!"; 
    }

    const task = {id_task, title_task, description_task, date_task, status_task, img_url}

    const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
    tasks.push(task);
    sessionStorage.setItem('tasks', JSON.stringify(tasks));

    add_task(task);
    table.style.display = 'block';

    form.reset();
    form.style.display = 'none';
});

function add_task(task){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${task.id_task}</td>
    <td>${task.title_task}</td>
    <td>${task.description_task}</td>
    <td>${task.date_task}</td>
    <td>${task.status_task}</td>
    <td><img src="${task.img_url}" width="95"/></td>
    `;

    table_body.appendChild(row);
}