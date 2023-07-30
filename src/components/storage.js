const storage = {
    saveProject(project) {
        localStorage.setItem(JSON.stringify(project.id), JSON.stringify(project));

    },
    deleteTodo(todoId, projectId) {
        let project = JSON.parse(localStorage.getItem(projectId));
        project.todos.forEach(e => {
            console.log(e)
        });
        console.log(todoId, projectId)
    },
}

export {storage};