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
        tasks.forEach(task => add_task);
    }
});

document.getElementById('btn_insert_tasks').addEventListener('click', async function(e){
    e.preventDefault();

    let id_task = document.getElementById('id-tasks').value;
    let title_task = document.getElementById('title-tasks').value;
    let description_task = document.getElementById('description-tasks').value;
    let date_task = document.getElementById ('date-tasks').value;
    let status_task = document.getElementById('status-tasks').value;
    let phrase = '';
    try{
        const res = await fetch ('https://api.quotable.io/random?tags=motivational');
        const data = await res.json();
        phrase = data.content;
    }catch (error){
        console.error('error en la peticion', error);
    }

    const task = {id_task, title_task, description_task, date_task, status_task, phrase}

    const tasks = JSON.parse(sessionStorage.getItem(tasks)) || [];
    tasks.push(task);
    sessionStorage.setItem('task', JSON.stringify(tasks));

    form.reset();
    form.style.display = 'none';
});