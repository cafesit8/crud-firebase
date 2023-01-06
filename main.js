import {saveTask, onGetTasks, deleteTask, getTask, updateTask} from './firebase.js'

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('tasks-container')
let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async ()=>{
    onGetTasks((data)=>{
        taskContainer.innerHTML = '';

        data.forEach(doc=>{
            const task = doc.data()
            taskContainer.innerHTML += `
                <div class="task">
                    <h4>${task.title}</h4>
                    <p>${task.description}</p>
                    <button class="btn-delete" data-id="${doc.id}">Delete</button>
                    <button class="btn-edit" data-id="${doc.id}">Edit</button>
                </div>
            `
        })

        const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn=>{
            btn.addEventListener('click', (e)=>{
                // console.log(e.target.dataset.id)
                deleteTask(e.target.dataset.id)
            })
        })

        const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn=>{
            btn.addEventListener('click', async (e)=>{
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()

                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description

                editStatus = true;
                id = e.target.dataset.id

                taskForm['btn-task-save'].textContent = 'Update'
            })
        })
    })
}) 

taskForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const title = taskForm['task-title']
    const description = taskForm['task-description']
    
    if (!editStatus) {
        saveTask(title.value, description.value)
    }else{
        updateTask(id, {title: title.value, description: description.value})
        editStatus = false
        taskForm['btn-task-save'].textContent = 'Save'
    }
    taskForm.reset()
})