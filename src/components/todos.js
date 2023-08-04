import {format} from 'date-fns';

class Todo {
    constructor(title, dueDate, projectId, description = '', priority = '', notes = '') {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(dueDate), 'yyyy-MM-dd');
        this.priority = priority;
        this.notes = notes;
        this.complete = false;
        this.id = Date.now();
        this.projectId = projectId;
    };
}

const TodoManager = {
    createTodo(title, dueDate, projectId, description = '', priority = '', notes = '') {
        let todo = new Todo(title, dueDate, projectId, description, priority, notes);
        return todo;
    },
}

export { Todo, TodoManager }