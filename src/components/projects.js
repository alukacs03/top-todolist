import { storage } from './storage';

class Project {
    constructor(name, notes = "", id = Date.now(), todos = []) {
        //id based on the current date, breaks if user creates more than one project in a millisecond, but that is unlikely
        this.id = id;
        this.name = name;
        this.todos = todos;
        this.notes = notes;
        //automatically add project to localStorage
        storage.saveProject(this);
    };
    getId () {
        return this.id;
    }
    getName () {
        return this.name;
    };
    getTodos() {
        return this.todos;
    };
    addTodo(todo) {
        this.todos.push(todo); // add todo to the object
        storage.saveProject(this); // immediately update the object in localStorage
    };
}

const ProjectManager = {
    createProject(name, notes = "", id = Date.now(), todos = []) {
        let project = new Project(name, notes, id, todos);
        return project;
    }
}

export { Project, ProjectManager }