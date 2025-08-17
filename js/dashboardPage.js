import BASE_URL from "../url/baseurl.js";

const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const subjectButton = document.querySelector('.fab')

subjectButton.addEventListener('click',(e) => {
  window.location.href = '../pages/subjectPage.html'
})

const taskContainer = document.querySelector('.task-container')

// Toggle dropdown when clicking menu button
menuBtn.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// Close dropdown when clicking outside
window.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

// Handle logout click
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem('localUserInfo')
  window.location.href = '../index.html'
});

function appendDasTask(){
  const {_id: accountId} = JSON.parse(localStorage.getItem('localUserInfo'))
  const query = {accountId}
  console.log(query)
  const url = `${BASE_URL}/dashboard/get`
  const dashTasks = fetch(url,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(query)
  })

  dashTasks.then(async (res) => {
    const response = await res.json()
    if(res.status == 200){
      console.log('Response: ',response)
      response.allDashTaskInfo.map((task) => {
        const taskCard = document.createElement('div')
        taskCard.className = 'task-card'
        const taskHeader = document.createElement('div')
        taskHeader.className = 'task-header'
        const taskName = document.createElement('h2')
        taskName.className = 'task-name'
        taskName.textContent = task.taskName
        const taskType = document.createElement('p')
        taskType.className = 'task-type'
        taskType.textContent = `Type: ${task.taskType}`
        const taskDetails = document.createElement('button')
        taskDetails.className = 'details-btn'
        const taskDetailsImg = document.createElement('img')
        taskDetailsImg.src = '../assets/icons8-view-details-30.png'
        const taskFooter = document.createElement('div')
        taskFooter.className = 'task-footer'
        const taskCompleteBtn = document.createElement('button')
        taskCompleteBtn.className = 'complete-btn'
        taskCompleteBtn.textContent = 'Mark as completed'

        const taskHeaderDiv = document.createElement('div')

        taskHeaderDiv.append(taskName)
        taskHeaderDiv.append(taskType)

        taskDetails.addEventListener('click',(e) => {
          localStorage.setItem('currentTask',JSON.stringify(task))
          console.log(task)
          window.location.href = '../pages/mainTaskPage.html'
        })

        taskCompleteBtn.addEventListener('click',(e) => {
          const taskId = task._id
          const query = {taskId}
          const url = `${BASE_URL}/dashboard/mark`
          const makredTask = fetch(url,{
            method: 'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(query)
          })

          makredTask.then(async (res) => {
            if(res.status == 200) window.location.reload()
          })
        .catch((err) => console.log('dashboardPage markTask Error: ',err))
        })

        taskDetails.append(taskDetailsImg)
        taskHeader.append(taskHeaderDiv)
        taskHeader.append(taskDetails)
        
        const isCompleted = task.taskDueDates.find((date) => {
          console.log(date)
          if(date.dueDate == response.dateString && date.isCompleted == true){
            return date
          }
        })
        console.log(isCompleted)
        if(isCompleted){
          taskCompleteBtn.disabled = true
          taskCompleteBtn.textContent = 'Completed'
        }

        taskFooter.append(taskCompleteBtn)

        taskCard.append(taskHeader)
        taskCard.append(taskFooter)

        taskContainer.append(taskCard)
      })
    }
  }) 
  .catch((err) => {
    console.log('dashboardPage Error: ',err)
  })


}

appendDasTask()