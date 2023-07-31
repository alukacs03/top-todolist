import { storage } from './storage';

export class Project {
    constructor(name, notes = "", id = Date.now(), todos = []) {
        //id based on the current date, breaks if user creates more than one project in a millisecond, but that is unlikely
        this.id = id;
        this.name = name;
        this.todos = todos;
        this.notes = notes;
        //automatically add project to localStorage
        storage.saveProject(this);
    };
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
