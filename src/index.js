import { Project } from '../src/components/projects';
import { Todo } from '../src/components/todos';
import { storage } from '../src/components/storage';
import { UI } from '../src/components/pageRenderer';

UI.initialLoad();

// const inputField = document.querySelector('#projectName');
// const makeButton = document.querySelector('#makeProject');
// const getButton = document.querySelector('#getAllProjects');
// const projectsDropDown = document.querySelector('#projectsDropDown');
// const refreshButton = document.querySelector('#refreshButton');
// const addTodoButton = document.querySelector('#addTodo');

// (function () {
//     let projects = Object.values(localStorage);
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
//     let selectedProject = JSON.parse(localStorage.getItem(projectsDropDown.value));
//     let projectId = selectedProject.id;
//     let newTodo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes, projectId);
//     selectedProject.todos.push(newTodo);
//     storage.saveProject(selectedProject)
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
