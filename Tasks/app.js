class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // console.log("tasks en el localstorage", localStorage.getItem('tasks'));
        this.renderTasks();
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        console.log(this.tasks.length);
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    updateTask(id,description) {
        const task = this.tasks.find(task => task.id === id);
        task.description = description;
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            const taskInstance = new Task(task.id, task.description, task.completed);
            taskInstance.toggleComplete();
            this.tasks = this.tasks.map(t => (t.id === id ? taskInstance : t));
            this.saveTasks();
            this.renderTasks();
        }else{
            alert("tarea no encontrada")
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // loadTasks() {
    //     this.renderTasks();
    // }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';
            
            const deleteButton = document.createElement('BUTTON');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });

            const updateButton = document.createElement('BUTTON');
            updateButton.textContent = 'Actualizar Nombre';
            updateButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const $inputNewName = document.createElement('INPUT');
                const $buttonSend = document.createElement('BUTTON');
                $buttonSend.textContent = 'Send'
                $buttonSend.addEventListener('click', () => {
                    this.updateTask(task.id, $inputNewName.value);
                })


                item.append($inputNewName, $buttonSend);
                



            });

            const changeStatus = document.createElement("BUTTON");
            changeStatus.textContent = 'Cambiar Estado';
            changeStatus.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTaskComplete(task.id);
            });

            const statusTask = document.createElement("P");
            if(!task.completed){
                statusTask.textContent = 'No completado' 
            }else{
                statusTask.textContent = 'Completado'
            }

            item.append(deleteButton, updateButton, changeStatus, statusTask);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});