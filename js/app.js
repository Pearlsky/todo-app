const model = {
    allTasksRank: document.querySelector(".task-body__all .list"),
    activeTasksRank: document.querySelector(".task-body__active .list"),
    completdTasksRank: document.querySelector(".task-body__completed .list"),
};

const view = {
    //display the created "task"(checkbox & list item w user input) by appending it to the respective parent container
    displayTasks: function (taskRank, taskChild) {
        taskRank.appendChild(taskChild);
    },
};

const controller = {
    taskranks: [
        model.allTasksRank,
        model.activeTasksRank,
        model.completdTasksRank,
    ],

    // create a task by creating a checkbox and list element from the user input for the all and active task ranks only
    createTask: function (input) {
        for (let i = 0; i < this.taskranks.length - 1; i++) {
            const task = document.createElement("li");
            const taskCheckbox = document.createElement("input");
            const taskDetail = document.createElement("p");

            task.classList.add("list__option");
            taskCheckbox.classList.add("list__tick");
            taskCheckbox.setAttribute("type", "checkbox");
            taskDetail.classList.add("list__text");
            taskDetail.textContent = input;

            task.appendChild(taskCheckbox);
            task.appendChild(taskDetail);

            view.displayTasks(this.taskranks[i], task);
        }
    },

    tickTask: function () {
        const allTasks = Array.from(model.allTasksRank.children);
        const activeTasks = Array.from(model.activeTasksRank.children);
        let completedTasks = Array.from(model.completdTasksRank.children); 

        allTasks.forEach((el, i) => {
            el.firstChild.addEventListener("change", (e) => {
                if (e.target.checked) {
                    //
                    let index = activeTasks.findIndex(
                        (elem) => elem.lastChild.textContent === el.lastChild.textContent
                    );
                    activeTasks[index].firstChild.checked = true;
                    view.displayTasks(this.taskranks[2], ...activeTasks.splice(index, 1));
                    completedTasks = Array.from(model.completdTasksRank.children);

                } else {
                    //
                    let index = completedTasks.findIndex(
                        (elem) => elem.lastChild.textContent === el.lastChild.textContent
                    );
                    completedTasks[index].firstChild.checked = false;
                    view.displayTasks(this.taskranks[1], ...completedTasks.splice(index, 1));
                }
            });
        });

        activeTasks.forEach((el, i) => {
            el.firstChild.addEventListener("change", (e) => {
                if (e.target.checked) {
                    let index = allTasks.findIndex(
                        (elem) => elem.lastChild.textContent === el.lastChild.textContent
                    );
                    allTasks[index].firstChild.checked = true;
                    view.displayTasks(this.taskranks[2], ...activeTasks.splice(i, 1));
                }
            });
        });
    },
};

function getTaskInput() {
    // the input and submit for each task rank should work the same way. rn it makes sense that there are two
    const addTasks = Array.from(document.querySelectorAll(".input__submit-btn"));
    const taskInputs = Array.from(document.querySelectorAll(".input__textbox"));

    addTasks.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            // prevent adding empty tasks
            if (taskInputs[i].value.trim().length !== 0) {
                // if (passedTest), do this:
                e.preventDefault();
                controller.createTask(taskInputs[i].value);
                taskInputs[i].value = "";
                controller.tickTask();
            } else return (taskInputs[i].value = "");
        });
    });
}

getTaskInput();
