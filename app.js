// delete tasks
// attach button with even - event bubble way
const list = document.querySelector("#current-task-list ul");

list.addEventListener('click', function(e){
    if(e.target.className == 'delete'){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
    }
});



// add to current-task-list from form
const addForm = document.forms['add-task']; // 'add-task' is id

addForm.addEventListener('submit', function(e){
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;

    // creat element
    const li = document.createElement('li');
    const taskName = document.createElement('span');
    const deleteButton = document.createElement('span');

    // add content
    deleteButton.textContent = 'delete';
    taskName.textContent = value;

    // add style
    deleteButton.classList.add("delete");
    taskName.classList.add('task');

    // append to list
    li.appendChild(taskName);
    li.appendChild(deleteButton);
    list.appendChild(li);
});



// hide tasks
// const hideBox = document.querySelector('#hide');
// hideBox.addEventListener('change', function(e){

//     if(hideBox.checked){
//         list.style.display = "none";
//     }else{
//         list.style.display = "initial";
//     }
// });



// search tasks
const searchBar = document.forms['search-tasks'].querySelector('input');

searchBar.addEventListener('keyup', function(e){
    const term = e.target.value.toLowerCase();
    const tasks = list.getElementsByTagName('li');

    Array.from(tasks).forEach(function(task){

        const taskText = task.firstElementChild.textContent;

        if(taskText.toLowerCase().indexOf(term) != -1){
            task.style.display = 'flex';
        }else{
            task.style.display = 'none';
        }
    });
});