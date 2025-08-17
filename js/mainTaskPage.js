const currentTask = JSON.parse(localStorage.getItem('currentTask'))
const taskInfo = document.querySelector('.task-info')
const taskDetails = document.querySelector('.task-details')
const dateList = document.querySelector('.date-list')

const taskName = document.createElement('div')
const taskType = document.createElement('div')
const taskTopic = document.createElement('div')
const taskSubject = document.createElement('div')

taskName.textContent = `Task: ${currentTask.taskName}`
taskType.textContent = `Type: ${currentTask.taskType}`
taskTopic.textContent = `Topic: ${currentTask.topicId.topicName}`
taskSubject.textContent = `Subject: ${currentTask.subjectId.subjectName}`

taskInfo.append(taskName)
taskInfo.append(taskTopic)
taskInfo.append(taskSubject)
taskInfo.append(taskType)

if(currentTask.taskDescription != ""){
    const taskDescription = document.createElement('div')
    taskDescription.className = 'task-description'
    taskDescription.textContent = currentTask.taskDescription
    taskDetails.append(taskDescription)
    console.log('appended')
}

currentTask.taskDueDates.map((date) => {
    
    const dateDiv = document.createElement('div')
    const dateSpan = document.createElement('span')

    dateDiv.className = 'date'
    dateDiv.textContent = date.dueDate
    
    function compareWithToday(dateStr) {
  // Parse "Monday, 12 Aug 2025" → "12 Aug 2025"
  const parts = dateStr.split(', ')[1]; 
  const date = new Date(parts);

  // Get today's date without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Also reset parsed date time
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return 'today';
  } else if (date.getTime() < today.getTime()) {
    return 'past';
  } else {
    return 'future';
  }
}

const day = compareWithToday(date.dueDate)

    if(date.isCompleted == false && day == 'past'){
        dateSpan.className = 'missed-date'
        dateSpan.textContent = 'Missed'
    }else if(date.isCompleted == false && day == 'future'){
        dateSpan.className = 'pending-date'
        dateSpan.textContent = 'Pending'
    } else if(date.isCompleted == false && day == 'today'){
        dateSpan.className = 'burning-date'
        dateSpan.textContent = 'Burning'
    }else if(date.isCompleted == true){
        dateSpan.className = 'completed-date'
        dateSpan.textContent = 'Completed'
    }

    dateDiv.append(dateSpan)
    dateList.append(dateDiv)

})

 console.log(currentTask)