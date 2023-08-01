import { storage } from './storage';

export const UI = {
    initialLoad() { // initial page load
        const hideButton = document.querySelector('#sideBarCloserBtn');
        hideButton.addEventListener('click', UI.toggleSidebar);

        const projectToggleText = document.getElementById('projectsBtn');
        const projectToggleBtn = document.getElementById('projectsArrow');

        projectToggleText.addEventListener('click', UI.toggleProjectList);
        projectToggleBtn.addEventListener('click', UI.toggleProjectList);

        const homeBtn = document.getElementById('homeBtn');
        homeBtn.addEventListener('click', () => {
            this.loadAllTasks();
        });

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
                    node.style.display = 'none';
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
                    if (node.id =='projectsWrapper' || 'projectElementWrapper') {
                        node.style.display = 'flex';
                    } else {
                        node.style.display = 'block';
                    }
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
                e.style.display = 'none';
            });
            projectToggleBtn.classList.remove('up');
            projectToggleBtn.classList.add('down');
            projectToggleText.dataset.hidden = true;
        } else {
            projectElements.forEach( e => {
                e.style.display = 'block';
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
    loadProjectPage(id) { // load a specific project's todos
        UI.clearMainPage();
        let projects = Object.values(localStorage);
        let todos = [];
        let projectName = "";
        projects.forEach(element => {
            let e = JSON.parse(element);
            if (e.id == id) {
                projectName = e.name;
                todos.push(e.todos);
            }
        });
        UI.renderMainPage(projectName, id)        
        todos.forEach(element => {
            element.forEach(e => {
                this.loadTask(e);
            })
        })
    },
    loadAllTasks() { // loads all tasks to the grid from all projects
        UI.clearMainPage();
        UI.renderMainPage('allTasks')
        let projects = Object.values(localStorage);
        let todos = [];
        projects.forEach(element => { // put all todos in one array (todo lists the projects contain)
            let e = JSON.parse(element);
            todos.push(e.todos);
        })
        todos.forEach(element => { //render the rows
            element.forEach(e => {
                this.loadTask(e);
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
    loadTask(e) { //loads one specific task to the grid (called in a loop)
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
    },
    renderAddTaskPopUp() { // (WIP -> IMPLEMENT)
        UI.clearMainPage();
    },
    clearMainPage() { // clears the main page
        const mainpage = document.getElementById('mainpage');
        mainpage.innerHTML = '';
    },
    renderMainPage(name, projectId = null) { // renders the whole main page
        const mainpage = document.getElementById('mainpage');
        const mainTitle = document.createElement('h1');
        if(name == 'allTasks') {
            mainTitle.textContent = 'All tasks';
        } else {
            mainTitle.textContent = name;
        }
        mainpage.appendChild(mainTitle);
        const buttonDiv = document.createElement('div');
        if (name == 'allTasks') {
            buttonDiv.classList.remove('projectPage');
            buttonDiv.classList.add('allTasksPage');
        } else {
            buttonDiv.classList.remove('allTasksPage');
            buttonDiv.classList.add('projectPage');
        }
        buttonDiv.id = 'buttonDiv';
        mainpage.appendChild(buttonDiv);
        function renderTaskButton() {
            const addTaskButton = document.createElement('button');
            addTaskButton.classList.add('addTaskBtn');
            addTaskButton.classList.add('greenBtn');
            addTaskButton.id = 'addTask';
            addTaskButton.textContent = 'Add Task';
            addTaskButton.dataset.projectId = projectId;
            addTaskButton.onclick = () => {UI.renderAddTaskPopUp()};
            buttonDiv.appendChild(addTaskButton);
        }
        if (buttonDiv.classList.contains('projectPage')) {
            const editProjectButton = document.createElement('button');
            editProjectButton.classList.add('projectBtn');
            editProjectButton.classList.add('greenBtn');
            editProjectButton.id = 'editProject';
            editProjectButton.textContent = 'Edit Project';
            editProjectButton.onclick = () => {UI.handleProjectEdit};
            editProjectButton.dataset.projectId = projectId;
            buttonDiv.appendChild(editProjectButton);
            const projectDescriptionButton = document.createElement('button');
            projectDescriptionButton.classList.add('projectBtn');
            projectDescriptionButton.classList.add('greenBtn');
            projectDescriptionButton.id = 'projectDescription';
            projectDescriptionButton.textContent = 'Project Description';
            projectDescriptionButton.dataset.projectId = projectId;
            projectDescriptionButton.onclick = () => {UI.showProjectDescription};
            buttonDiv.appendChild(projectDescriptionButton);
            renderTaskButton();
        } else {
            renderTaskButton();
        }
        const gridWrapper = document.createElement('div');
        gridWrapper.id = 'gridWrapper';
        mainpage.appendChild(gridWrapper);
        const gridFirstRow = document.createElement('div');
        gridFirstRow.classList.add('gridElement');
        gridFirstRow.classList.add('titleRow');
        gridWrapper.appendChild(gridFirstRow);
        const checkBoxColumn = document.createElement('div');
        checkBoxColumn.classList.add('gridTextElement');
        gridFirstRow.appendChild(checkBoxColumn);
        const titleColumn = document.createElement('div');
        titleColumn.classList.add('gridTextElement');
        titleColumn.textContent = 'title';
        gridFirstRow.appendChild(titleColumn);
        const descriptionColumn = document.createElement('div');
        descriptionColumn.classList.add('gridTextElement');
        descriptionColumn.textContent = 'description';
        gridFirstRow.appendChild(descriptionColumn);
        const dueDateColumn = document.createElement('div');
        dueDateColumn.classList.add('gridTextElement');
        dueDateColumn.textContent = 'due date';
        gridFirstRow.appendChild(dueDateColumn);
        const priorityColumn = document.createElement('div');
        priorityColumn.classList.add('gridTextElement');
        priorityColumn.textContent = 'priority';
        gridFirstRow.appendChild(priorityColumn);
        const notesColumn = document.createElement('div');
        notesColumn.classList.add('gridTextElement');
        notesColumn.textContent = 'notes';
        gridFirstRow.appendChild(notesColumn);
        const editColumn = document.createElement('div');
        editColumn.classList.add('gridTextElement');
        editColumn.textContent = 'edit';
        gridFirstRow.appendChild(editColumn);
        const deleteColumn = document.createElement('div');
        deleteColumn.classList.add('gridTextElement');
        deleteColumn.textContent = 'delete';
        gridFirstRow.appendChild(deleteColumn);
    },
    handleProjectEdit() { // (WIP -> IMPLEMENT)

    },
    showProjectDescription () { // (WIP -> IMPLEMENT)

    },
};