const saveProject = (project) => {
    sessionStorage.setItem(JSON.stringify(project.id), JSON.stringify(project));
}

export {saveProject};