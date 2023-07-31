import { storage } from './storage';

export const UI = {
    initialLoad() {
        const hideButton = document.querySelector('#sideBarCloserBtn');
        hideButton.addEventListener('click', UI.toggleSidebar);

        const projectToggleText = document.getElementById('projectsBtn');
        const projectToggleBtn = document.getElementById('projectsArrow');

        projectToggleText.addEventListener('click', UI.toggleProjectList);
        projectToggleBtn.addEventListener('click', UI.toggleProjectList);

        UI.loadProjectList();

        // only for development, will be removed
        UI.loadAllTasks();
        
    },
    toggleSidebar() { // toggles the sidebar
        const sideBar = document.getElementById('sidebar');
        if (sideBar.dataset.hidden != 'true') {
            sideBar.style.width = 0;
            sideBar.childNodes.forEach(node => {
                if (node.style && node.id != 'sideBarCloserBtn') {
                    node.style.opacity = 0;
                } else {
                    if (node.style) {
                        node.children[0].classList.remove('left');
                        node.children[0].classList.add('right');
                        sideBar.dataset.hidden = true;
                    } else {
                        return
                    }
                }
            })
        } else {
            sideBar.style.width = '300px';
            sideBar.childNodes.forEach(node => {
                if (node.style && node.id != 'sideBarCloserBtn') {
                    node.style.opacity = 1;
                } else {
                    if (node.style) {
                        node.children[0].classList.remove('right');
                        node.children[0].classList.add('left');
                        sideBar.dataset.hidden = false;
                    } else {
                        return
                    }
                }
            })
        }
    },
    toggleProjectList() { // toggles whether the projects show up on the sidebar or not
        const projectToggleText = document.getElementById('projectsBtn');
        const projectToggleBtn = document.getElementById('projectsArrow');
        let projectElements = document.querySelectorAll('.projectElement');
        if (projectToggleText.dataset.hidden != 'true') {
            projectElements.forEach( e => {
                e.style.opacity = 0;
            });
            projectToggleBtn.classList.remove('up');
            projectToggleBtn.classList.add('down');
            projectToggleText.dataset.hidden = true;
        } else {
            projectElements.forEach( e => {
                e.style.opacity = 1;
            });
            projectToggleBtn.classList.add('up');
            projectToggleBtn.classList.remove('down');
            projectToggleText.dataset.hidden = false;
        }
    
    },
    loadProjectList() { // loads the projects list on the sidebar
        const projectElementWrapper = document.getElementById('projectElementWrapper');
        let projects = Object.values(localStorage)
        projects.forEach(element => {
            let e = JSON.parse(element)
            const newProject = document.createElement('p');
            newProject.textContent = e.name;
            newProject.dataset.projectId = e.id;
            newProject.addEventListener('click', function() {
                UI.loadProjectPage(e.id);
            })
            newProject.classList.add('projectElement');
            projectElementWrapper.appendChild(newProject);
        });
    },
    loadProjectPage(id) { // (WIP -> IMPLEMENT) load a specific project's todos
        console.log(id)
    },
    loadAllTasks() { // loads all tasks to the grid from all projects
        const gridWrapper = document.getElementById('gridWrapper');
        UI.clearGrid();
        let projects = Object.values(localStorage);
        let todos = [];
        projects.forEach(element => { // put all todos in one array (todo lists the projects contain)
            let e = JSON.parse(element);
            todos.push(e.todos);
        })
        todos.forEach(element => { //render the rows
            element.forEach(e => {
                let gridElement = document.createElement('div');
                gridElement.classList.add('gridElement');
                gridWrapper.appendChild(gridElement);
                let checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                checkBox.dataset.todoId = e.id;
                gridElement.appendChild(checkBox);
                let title = document.createElement('div');
                title.classList.add('gridTextElement');
                title.textContent = e.title;
                gridElement.appendChild(title);
                let description = document.createElement('div');
                description.classList.add('gridTextElement');
                description.textContent = e.description;
                gridElement.appendChild(description);
                let dueDate = document.createElement('div');
                dueDate.classList.add('gridTextElement');
                dueDate.textContent = e.dueDate;
                gridElement.appendChild(dueDate);
                let priority = document.createElement('div');
                priority.classList.add('gridTextElement');
                priority.textContent = e.priority;
                gridElement.appendChild(priority);
                let notes = document.createElement('p');
                notes.classList.add('gridTextElement');
                notes.textContent = e.notes;
                gridElement.appendChild(notes);
                let editBtn = document.createElement('div');
                editBtn.classList.add('gridTextElement');
                editBtn.textContent = 'edit >';
                editBtn.dataset.todoId = e.id;
                editBtn.dataset.projectId = e.projectId;
                editBtn.addEventListener('click', (e) => {
                    UI.handleEdit(e);
                })
                gridElement.appendChild(editBtn);
                let deleteBtn = document.createElement('div');
                deleteBtn.textContent = 'delete';
                deleteBtn.classList.add('gridTextElement');
                deleteBtn.dataset.todoId = e.id;
                deleteBtn.dataset.projectId = e.projectId;
                deleteBtn.addEventListener('click', (e) => {
                    UI.handleDelete(e.target.dataset.todoId, e.target.dataset.projectId);
                });
                gridElement.appendChild(deleteBtn);
            })
        })
    },
    handleEdit(e) { // (WIP -> IMPLEMENT) handles edit button press
        alert('please implement edit functionality');
        console.log(e);
    },
    handleDelete(todoId, projectId) { // handles the delete button press
        storage.deleteTodo(todoId, projectId);
        this.loadAllTasks(); // replace with logic to decide whether it's all tasks, project or today / this week view
    },
    clearGrid() { //clears the grid except for the first (title) row
        let gridChildren = document.querySelectorAll('.gridElement');
        gridChildren.forEach(e => { // remove all rows except for the title row
            if (e.classList.contains('titleRow')) {
                return;
            } else {
                gridWrapper.removeChild(e)
            }
        })
    },
};