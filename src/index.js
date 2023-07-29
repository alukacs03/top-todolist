import { Project } from '../src/components/projects';
import { Todo } from '../src/components/todos';
import { saveProject } from '../src/components/storage';


// const inputField = document.querySelector('#projectName');
// const makeButton = document.querySelector('#makeProject');
// const getButton = document.querySelector('#getAllProjects');
// const projectsDropDown = document.querySelector('#projectsDropDown');
// const refreshButton = document.querySelector('#refreshButton');
// const addTodoButton = document.querySelector('#addTodo');

// (function () {
//     let projects = Object.values(sessionStorage);
//     projects.forEach( e=> {
//         if (JSON.parse(e).id) {
//             let element = JSON.parse(e);
//             let tempProjectOption = document.createElement('option');
//             tempProjectOption.value = element.id;
//             tempProjectOption.textContent = element.name;
//             projectsDropDown.appendChild(tempProjectOption);
//         }
//     })
// })();

// addTodoButton.addEventListener("click", () => {
//     let todoTitle = document.querySelector('#todoTitle').value;
//     let todoDescription = document.querySelector('#todoDescription').value;
//     let todoDueDate = document.querySelector('#todoDueDate').value;
//     let todoPriority = document.querySelector('#todoPriority').value;
//     let todoNotes = document.querySelector('#todoNotes').value;
//     let selectedProject = JSON.parse(sessionStorage.getItem(projectsDropDown.value));
//     let newTodo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes);
//     selectedProject.todos.push(newTodo);
//     saveProject(selectedProject)
// })


// makeButton.addEventListener('click', () => {
//     let projects = Object.values(sessionStorage);
//     let projectNames = [];
//     projects.forEach( (e) => {
//         let elem = JSON.parse(e);
//         if (elem.name) {
//             projectNames.push(elem.name);
//         }
//     })
//     if (!projectNames.includes(inputField.value)) {
//         let newProject = new Project(inputField.value);
//         saveProject(newProject);
//     } else {
//         alert('Project with that name already exists!');
//     }

// });

// getButton.addEventListener('click', () => {
//     let projects = Object.values(sessionStorage);
//     projects.forEach( e => {
//         if (JSON.parse(e).id) {
//             console.log(JSON.parse(e))
//         }
//     })
// });

const hideButton = document.querySelector('#sideBarCloserBtn');
const sideBar = document.getElementById('sidebar');
hideButton.addEventListener('click', () => {
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
});

const projectToggleText = document.getElementById('projectsBtn');
const projectToggleBtn = document.getElementById('projectsArrow');
const projectElementWrapper = document.getElementById('projectElementWrapper');

projectToggleText.addEventListener('click', () => {
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

})