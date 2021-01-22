// finish task
// delete task
const lists = document.querySelectorAll(".task-list ul");
Array.from(lists).forEach(myFunction);

function myFunction(list) {
    list.addEventListener('click', function (e) {
        console.log(e.target);
        if (e.target.className == 'delete') {
            const li = e.target.parentElement;
            li.parentNode.removeChild(li);
        }

        if (e.target.className == 'check-box') {
            const strikeTextBox = e.target;
            const taskText = e.target.nextElementSibling;
            if (strikeTextBox.checked) {
                taskText.classList.add('task-finished');
                const thisLi = e.target.parentElement;
                const thisUl = thisLi.parentElement;
                const finishedList = document.querySelector("#finished-task-list ul");
                thisUl.removeChild(thisLi);
                finishedList.append(thisLi);
            } else {
                taskText.classList.remove('task-finished');
                const thisLi = e.target.parentElement;
                const thisUl = thisLi.parentElement;
                const currentList = document.querySelector("#current-task-list ul");
                thisUl.removeChild(thisLi);
                currentList.append(thisLi);
            }
        }
    });
}


// add to current-task-list from form
const addForm = document.forms['add-task']; // 'add-task' is id
const currentList = document.querySelector("#current-task-list ul");
addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;

    if (value.length > 0) {
        // creat element
        const li = document.createElement('li');
        const checkBox = document.createElement('input');
        const taskName = document.createElement('span');
        const deleteButton = document.createElement('span');

        // add content
        deleteButton.textContent = 'delete';
        taskName.textContent = value;
        checkBox.setAttribute('type', 'checkbox');

        // add style
        deleteButton.classList.add("delete");
        taskName.classList.add('task');
        checkBox.classList.add('check-box');

        // append to list
        li.appendChild(checkBox);
        li.appendChild(taskName);
        li.appendChild(deleteButton);
        currentList.prepend(li);

        addForm.querySelector('input[type="text"]').value = ""
    }
});


// search tasks
const searchBar = document.forms['search-tasks'].querySelector('input');

searchBar.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase();
    const currentList = document.querySelector("#current-task-list ul");
    const finsihedList = document.querySelector('#finished-task-list ul');

    const task1 = Array.from(currentList.getElementsByTagName('li'));
    const task2 = Array.from(finsihedList.getElementsByTagName('li'));
    const tasks = task1.concat(task2);

    Array.from(tasks).forEach(function (task) {
        const taskText = task.firstElementChild.nextElementSibling.textContent;

        if (taskText.toLowerCase().indexOf(term) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});