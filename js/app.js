const model = {
  allTasksRank: document.querySelector(".task-body__all .list"),
  activeTasksRank: document.querySelector(".task-body__active .list"),
  completdTasksRank: document.querySelector(".task-body__completed .list"),
};

const view = {
  //display the created "task"(checkbox & list item w user input) by appending it to the respective parent container
  displayTasks: function (taskRank, taskChild) {
    taskRank.insertBefore(taskChild, taskRank.firstChild);
  },

  displayOldTasks: function (taskRank, taskChild) {
    taskRank.appendChild(taskChild);
  },
};

const controller = {
  taskranks: [
    model.allTasksRank,
    model.activeTasksRank,
    model.completdTasksRank,
  ],
  
  //function to add the delete icon to task items under complete task rank 
  addTaskDelete: function (taskList) {
    const taskDelWrap = document.createElement("div");
    const taskDelete = document.createElement("img");

    taskDelWrap.classList.add("list__del");
    taskDelete.setAttribute("src", "images/trash.svg");
    taskDelete.setAttribute("alt", "delete");

    taskDelWrap.appendChild(taskDelete);

    taskList.appendChild(taskDelWrap);
  },
  
  removeTaskDelete: function (list) {
    list.removeChild(list.lastChild);
  },
  
  //tick off a task item
  tickOff: function (listText) {
    listText.classList.add("tick-relative");
  },
  
  untick: function (listText) {
    listText.classList.remove("tick-relative");
  },

  // create a task by creating a checkbox and list element from the user input for the all and active task ranks only
  createTask: function (input) {
    for (let i = 0; i < this.taskranks.length - 1; i++) {
      const task = document.createElement("li");
      const taskCheckbox = document.createElement("input");
      const taskTextwrap = document.createElement("div");
      const taskDetail = document.createElement("p");

      task.classList.add("list__option");
      taskCheckbox.classList.add("list__tick");
      taskCheckbox.setAttribute("type", "checkbox");
      taskTextwrap.classList.add("list__textwrap");
      taskDetail.classList.add("list__text");
      taskDetail.textContent = input;

      taskTextwrap.appendChild(taskDetail);

      task.appendChild(taskCheckbox);
      task.appendChild(taskTextwrap);

      view.displayTasks(this.taskranks[i], task);
    }
  },

  tickTask: function () {
    const allTasks = Array.from(model.allTasksRank.children);
    const activeTasks = Array.from(model.activeTasksRank.children);

    allTasks.forEach((el) => {
      el.firstChild.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.tickOff(el.firstChild.nextSibling.firstChild);

          let index = activeTasks.findIndex(
            (elem) =>
              elem.lastChild.firstChild.textContent ===
              el.lastChild.firstChild.textContent
          );
          activeTasks[index].firstChild.checked = true;
          this.tickOff(activeTasks[index].firstChild.nextSibling.firstChild);

          view.displayTasks(
            this.taskranks[this.taskranks.length - 1],
            activeTasks[index]
          );
          this.addTaskDelete(
            this.taskranks[this.taskranks.length - 1].firstElementChild
          );

          const completedTasks = Array.from(model.completdTasksRank.children);
          completedTasks.forEach((el) => {
            el.firstChild.addEventListener("change", (e) => {
              if (!e.target.checked) {
                index = allTasks.findIndex(
                  (elem) =>
                    elem.lastChild.firstChild.textContent ===
                    el.firstChild.nextSibling.firstChild.textContent
                );
                allTasks[index].firstChild.checked = false;
                this.untick(allTasks[index].firstChild.nextSibling.firstChild);

                this.removeTaskDelete(el);
                this.untick(el.firstChild.nextSibling.firstChild);
                view.displayOldTasks(this.taskranks[1], el);
              }
            });

            el.lastChild.firstChild.addEventListener ("click", (e) => {
                // let delIndex = allTasks.findIndex((element) => {
                //     element.firstChild.nextSibling.textContent === el.lastChild.previousSibling.textContent
                // });
                // allTasks.splice(delIndex, 1);
                // completedTasks.splice(el, 1);

                console.log(el);
            });
          });
        } else {

          this.untick(el.firstChild.nextSibling.firstChild);

          const completedTasks = Array.from(model.completdTasksRank.children);
          let index = completedTasks.findIndex(
            (elem) =>
              elem.firstChild.nextSibling.textContent ===
              el.lastChild.firstChild.textContent
          );

          completedTasks[index].firstChild.checked = false;
          this.untick(completedTasks[index].firstChild.nextSibling.firstChild);

          this.removeTaskDelete(completedTasks[index]);
          view.displayTasks(this.taskranks[1], completedTasks[index]);
        }
      });
    });

    activeTasks.forEach((el) => {
      el.firstChild.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.tickOff(el.firstChild.nextSibling.firstChild);

          let index = allTasks.findIndex(
            (elem) =>
              elem.lastChild.firstChild.textContent ===
              el.lastChild.firstChild.textContent
          );
          allTasks[index].firstChild.checked = true;
          this.tickOff(allTasks[index].firstChild.nextSibling.firstChild);

          view.displayTasks(this.taskranks[this.taskranks.length - 1], el);
          this.addTaskDelete(
            this.taskranks[this.taskranks.length - 1].firstElementChild
          );

          const completedTasks = Array.from(model.completdTasksRank.children);
          completedTasks.forEach((el) => {
            el.firstChild.addEventListener("change", (e) => {
              if (!e.target.checked) {
                this.untick(el.firstChild.nextSibling.firstChild);

                index = allTasks.findIndex(
                  (elem) =>
                    elem.lastChild.firstChild.textContent ===
                    el.firstChild.nextSibling.firstChild.textContent
                );
                allTasks[index].firstChild.checked = false;
                this.untick(allTasks[index].firstChild.nextSibling.firstChild);

                this.removeTaskDelete(el);
                view.displayOldTasks(this.taskranks[1], el);
              }
            });

            el.lastChild.firstChild.addEventListener ("click", (e) => {
                // let delIndex = allTasks.findIndex((element) => {
                //     element.firstChild.nextSibling.textContent === el.lastChild.previousSibling.textContent
                // });
                // allTasks.splice(delIndex, 1);
                // completedTasks.splice(el, 1);

                console.log(el);
            });
          });
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
