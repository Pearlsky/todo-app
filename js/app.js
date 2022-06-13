const model = {
    allTasksRank: document.querySelector('.task-body__all .list'),
    activeTasksRank: document.querySelector('.task-body__active .list'),
};

const view = {
    completdTasksList: document.querySelector('.task-body__completed .list'),

    //display the created "task"(checkbox & list item w user input) by appending it to the respective parent container
    displayTasks: function (taskRank, taskChild) {
        taskRank.appendChild(taskChild);
    }
};

const controller = {
    taskranks: [
        model.allTasksRank,
        model.activeTasksRank,
    ],

    // create a task by creating a checkbox and list element from the user input for the all and active task ranks only
    createTask: function (input) {
        this.taskranks.forEach((element, i) => {
            const task = document.createElement('li');
            const taskCheckbox = document.createElement('input');
            const taskDetail = document.createElement('p');
        
            task.classList.add('list__option');
            taskCheckbox.classList.add('list__tick');
            taskCheckbox.setAttribute('type','checkbox');
            taskDetail.classList.add('list__text');
            taskDetail.textContent = input;
        
            task.appendChild(taskCheckbox);
            task.appendChild(taskDetail);

            view.displayTasks(element, task);
        });
    },

    tickTask: function() {
        const allTasks = Array.from(model.allTasksRank.children);
        const activeTasks = Array.from(model.activeTasksRank.children);

        allTasks.forEach((el, i) => {
            el.firstChild.addEventListener('change', (e)=> {
                e.target.checked ? activeTasks[i].firstChild.checked = true : activeTasks[i].firstChild.checked = false;
            })
        });

        activeTasks.forEach((el, i) => {
            el.firstChild.addEventListener('change', (e)=> {
                e.target.checked ? allTasks[i].firstChild.checked = true : allTasks[i].firstChild.checked = false;
            })
        });
    }
};

function getTaskInput() {

    // the input and submit for each task rank should work the same way. rn it makes sense that there are two
    const addTasks = Array.from(document.querySelectorAll('.input__submit-btn'));
    const taskInputs = Array.from(document.querySelectorAll('.input__textbox'));

    addTasks.forEach((el, i)=> {
        el.addEventListener('click', (e) => {

            // prevent adding empty tasks
            if (taskInputs[i].value.trim().length !== 0) {
                e.preventDefault();
                controller.createTask(taskInputs[i].value);
                taskInputs[i].value = "";
                controller.tickTask();
            }
            else return taskInputs[i].value = "";
        });
    });
}

getTaskInput();