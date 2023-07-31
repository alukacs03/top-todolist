import { Project } from './projects';
import { UI } from './pageRenderer';

const storage = {
    saveProject(project) {
        localStorage.setItem(JSON.stringify(project.id), JSON.stringify(project));
    },
    deleteTodo(todoId, projectId) {
        let project = JSON.parse(localStorage.getItem(projectId));
        let discardedTodos = [];
        project.todos.forEach(e => {
            if (e.id == todoId) {
                discardedTodos = project.todos.splice(project.todos.indexOf(e), 1);
            }
        });
        let freshProject = new Project(project.name, project.notes, project.id, project.todos)
        storage.saveProject(freshProject)
    },
}

export {storage};