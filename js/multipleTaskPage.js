import BASE_URL from '../url/baseurl.js'

const topicName = document.querySelector('.topic-name')
const {topicName: currentTopicName} = JSON.parse(localStorage.getItem('currentTopic'))
topicName.textContent = currentTopicName
console.log(topicName,currentTopicName,'ff')


function appendTasks() {
    const taskList = document.querySelector('.tasks-list')
    const topicId = localStorage.getItem('currentTopicId')
    const query = { topicId }
    console.log(query)
    const url = `${BASE_URL}/task/get`
    const allTasks = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })

    
    allTasks.then(async (res) => {
        const response = await res.json()
        if (res.status == 200) {
            localStorage.setItem('currentTaskArray', JSON.stringify(response.allTaskInfo))

            const allTasks = response.allTaskInfo
            console.log(response)
            console.log(allTasks)
            allTasks.map((task) => {
                const taskCard = document.createElement('div')
                const taskName = document.createElement('span')
                const dropdownMenu = document.createElement('div')
                const menuButton = document.createElement('button')
                const menuImg = document.createElement('img')
                const dropdownContent = document.createElement('div')
                const deleteBtn = document.createElement('button')
                const updateBtn = document.createElement('button')
                taskCard.className = 'task'
                taskCard.id = task._id
                deleteBtn.id = task._id
                updateBtn.id = task._id

                taskName.textContent = task.taskName
                taskName.className = 'task-name'
                dropdownMenu.className = 'dropdown'
                menuButton.className = 'menu-btn'
                dropdownContent.className = 'dropdown-content'

                deleteBtn.textContent = 'Delete'
                updateBtn.textContent = 'Update'

                dropdownContent.append(updateBtn)
                dropdownContent.append(deleteBtn)

                menuImg.src = '../assets/icons8-menu-vertical-25.png'
                menuButton.append(menuImg)
                dropdownMenu.append(menuButton)
                dropdownMenu.append(dropdownContent)
                
                taskCard.append(taskName)
                taskCard.append(dropdownMenu)


                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation()
                    const taskId = e.target.id
                    console.log(taskId)
                    const query = { taskId }
                    const url = `${BASE_URL}/task/delete`
                    const deletedTask = fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(query)
                    })

                    deletedTask.then(async (res) => {
                        const response = await res.json();
                        if (res.status == 200) {
                            window.location.reload()
                            console.log(response)
                        }
                    })
                    deletedTask.catch((err) => {
                        console.log('taskPage deleteTask Error: ', err)
                    })

                })

                updateBtn.addEventListener('click', (e) => {
                    e.stopPropagation()
                    const taskModal = document.querySelector('#taskModal')
                    const taskForm = document.querySelector('#taskForm')
                    const saveBtn = document.querySelector('#saveBtn')
                    const cancleBtn = document.querySelector('#cancleBtn')
                    const taskInput = document.querySelector('#taskInput')
                    const taskType = document.querySelector('#taskType')
                    const taskDescription = document.querySelector('#task-description')
                    console.log(allTasks)
                    const task = allTasks.find((task) => {
                        if (e.target.id == task._id) {
                            return task
                        }
                    })
                    console.log('Task: ',task)
                    taskInput.value = task.taskName
                    taskType.value = task.taskType
                    taskDescription.value = task.taskDescription
                    taskModal.style.display = 'flex'

                    cancleBtn.addEventListener('click', (e) => {
                        taskModal.style.display = 'none'
                    })

                    saveBtn.addEventListener('click', (e) => {
                        e.preventDefault()
                        console.log(task)
                        const taskId = task._id
                        const taskName = taskInput.value
                        const taskType = document.querySelector('#taskType').value
                        const taskDescription = document.querySelector('#task-description').value
                        const query = { taskId ,taskName,taskType,taskDescription}
                        console.log('update query',query)
                        const url = `${BASE_URL}/task/update`
                        const updatedTask = fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(query)
                        })

                        updatedTask.then(async (res) => {
                        const response = await res.json()
                        if(res.status == 200){
                            window.location.reload()
                        }
                    })
                    .catch((err) => {
                        console.log('taskPage updateTask Error: ',err)
                    })


                    })
                    
                })

                menuButton.addEventListener("click", (e) => {
                    e.stopPropagation();
                    // Close others
                    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
                    dropdownMenu.classList.toggle("active");
                });

                document.addEventListener("click", () => {
                    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
                });
                taskCard.addEventListener('click', (e) => {
                    console.log(e.target.id)
                     const task = allTasks.find((task) => {
                        if (e.target.id == task._id) {
                            return task
                        }
                    })
                    localStorage.setItem('currentTask',JSON.stringify(task))
                    window.location.href = '../pages/mainTaskPage.html'
                })
                taskList.append(taskCard)
                console.log(taskCard)
            })


        }
    })
        .catch((err) => {
            console.log('taskPage appendTask Error: ', err)
        })


}



appendTasks()




const addTaskBtn = document.querySelector('#addTask')
const taskModal = document.querySelector('#taskModal')
const taskForm = document.querySelector('#taskForm')

addTaskBtn.addEventListener('click', (e) => {
    taskModal.style.display = 'flex'
    const saveBtn = document.querySelector('#saveBtn')
    const cancleBtn = document.querySelector('#cancleBtn')
    const taskType = document.querySelector('#taskType')
    const taskDescription = document.querySelector('#task-description')
    const taskInput = document.querySelector('#taskInput')

    cancleBtn.addEventListener('click', (e) => taskModal.style.display = 'none')

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const {_id: accountId} = JSON.parse(localStorage.getItem('localUserInfo'))
        const taskName = taskInput.value
        const subjectId = localStorage.getItem('currentSubjectId')
        const topicId = localStorage.getItem('currentTopicId')
        const taskType = document.querySelector('#taskType').value
        const taskDescription = document.querySelector('#task-description').value
        const query = { subjectId,taskType,taskDescription,topicId,taskName,accountId }
        console.log(query)
        const url = `${BASE_URL}/task/create`
        const createTask = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })

        createTask.then(async (res) => {
            const response = await res.json()
            taskModal.style.display = 'none'
            console.log(response)
            window.location.reload()
        })
            .catch((err) => {
                taskModal.style.display = 'none'
                console.log('taskPage createTask Error: ', err)
            })

    })

})
