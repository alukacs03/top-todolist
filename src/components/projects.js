import { saveProject } from './storage';

export class Project {
    constructor(name) {
        //id based on the current date, breaks if user creates more than one project in a millisecond, but that is unlikely
        this.id = Date.now();
        this.name = name;
        this.todos = [];
        //automatically add project to localStorage
        saveProject(this);
    };
    getName () {
        return this.name;
    };
    getTodos() {
        return this.todos;
    };
    addTodo(todo) {
        this.todos.push(todo);
    };
}
