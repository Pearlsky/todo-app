"use strict"

// navigate task ranks

function selectTaskRank () {
    const allTasks = document.querySelector('.all__link');
    const allTasksBody = document.querySelector('.task-body__all');

    const activeTasks = document.querySelector('.active__link');
    const activeTasksBody = document.querySelector('.task-body__active');

    const completdTasks = document.querySelector('.completed__link');
    const completdTasksBody = document.querySelector('.task-body__completed');


    allTasks.addEventListener('click', (e) => {
        e.preventDefault();
        allTasks.classList.add('relative');
        allTasksBody.classList.remove('hidden');

        activeTasks.classList.remove('relative');
        activeTasksBody.classList.add('hidden');

        completdTasks.classList.remove('relative');
        completdTasksBody.classList.add('hidden');
    });

    activeTasks.addEventListener('click', (e) => {
        e.preventDefault();
        allTasks.classList.remove('relative');
        allTasksBody.classList.add('hidden');

        activeTasks.classList.add('relative');
        activeTasksBody.classList.remove('hidden');

        completdTasks.classList.remove('relative');
        completdTasksBody.classList.add('hidden');
    });

    completdTasks.addEventListener('click', (e) => {
        e.preventDefault();
        allTasks.classList.remove('relative');
        allTasksBody.classList.add('hidden');

        activeTasks.classList.remove('relative');
        activeTasksBody.classList.add('hidden');

        completdTasks.classList.add('relative');
        completdTasksBody.classList.remove('hidden');
    });
}

selectTaskRank();