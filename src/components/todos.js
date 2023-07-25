import {format} from 'date-fns';

export class Todo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(dueDate), 'dd-MM-yyyy');
        this.priority = priority;
        this.notes = notes;
        this.complete = false;
    };
}