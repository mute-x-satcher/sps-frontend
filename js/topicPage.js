import BASE_URL from '../url/baseurl.js'

function appendTopics() {
    const topicList = document.querySelector('.topics-list')
    const subjectId = localStorage.getItem('currentSubjectId')
    const query = { subjectId }
    console.log(query)
    const url = `${BASE_URL}/topic/get`
    const allTopics = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })

    
    allTopics.then(async (res) => {
        const response = await res.json()
        if (res.status == 200) {
            localStorage.setItem('currentTopicArray', JSON.stringify(response.allTopicsInfo))

            const allTopics = response.allTopicInfo
            console.log(response)
            console.log(allTopics)
            allTopics.map((topic) => {
                const topicCard = document.createElement('div')
                const topicName = document.createElement('span')
                const dropdownMenu = document.createElement('div')
                const menuButton = document.createElement('button')
                const menuImg = document.createElement('img')
                const dropdownContent = document.createElement('div')
                const deleteBtn = document.createElement('button')
                const updateBtn = document.createElement('button')
                topicCard.className = 'topic'
                topicCard.id = topic._id
                deleteBtn.id = topic._id
                updateBtn.id = topic._id

                topicName.textContent = topic.topicName
                topicName.className = 'topic-name'
                dropdownMenu.className = 'dropdown'
                menuButton.className = 'menu-btn'
                dropdownContent.className = 'dropdown-content'

                deleteBtn.textContent = 'Delete'
                updateBtn.textContent = 'Update'
                // menuButton.textContent = '⋮'

                dropdownContent.append(updateBtn)
                dropdownContent.append(deleteBtn)

                menuImg.src = '../assets/icons8-menu-vertical-25.png'
                menuButton.append(menuImg)
                dropdownMenu.append(menuButton)
                dropdownMenu.append(dropdownContent)

                topicCard.append(topicName)
                topicCard.append(dropdownMenu)


                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation()
                    const topicId = e.target.id
                    console.log(topicId)
                    const query = { topicId }
                    const url = `${BASE_URL}/topic/delete`
                    const deletedTopic = fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(query)
                    })

                    deletedTopic.then(async (res) => {
                        const response = await res.json();
                        if (res.status == 200) {
                            window.location.reload()
                            console.log(response)
                        }
                    })
                    deletedTopic.catch((err) => {
                        console.log('topicPage deleteTopic Error: ', err)
                    })

                })

                updateBtn.addEventListener('click', (e) => {
                    e.stopPropagation()
                    const topicModal = document.querySelector('#topicModal')
                    const topicForm = document.querySelector('#topicForm')
                    const saveBtn = document.querySelector('#saveBtn')
                    const cancleBtn = document.querySelector('#cancleBtn')
                    const topicInput = document.querySelector('#topicInput')
                    console.log(allTopics)
                    const topic = allTopics.find((topic) => {
                        if (e.target.id == topic._id) {
                            return topic
                        }
                    })
                    topicInput.value = topic.topicName
                    topicModal.style.display = 'flex'

                    cancleBtn.addEventListener('click', (e) => {
                        topicModal.style.display = 'none'
                    })

                    saveBtn.addEventListener('click', (e) => {
                        console.log(topic)
                        const topicId = topic._id
                        const topicName = topicInput.value
                        const query = { topicId ,topicName}
                        const url = `${BASE_URL}/topic/update`
                        const updatedTopic = fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(query)
                        })

                        updatedTopic.then(async (res) => {
                        const response = await res.json()
                        if(res.status == 200){
                            window.location.reload()
                        }
                    })
                    .catch((err) => {
                        console.log('topicPage updateTopic Error: ',err)
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
                topicCard.addEventListener('click', (e) => {
                    console.log(e.target.id)
                    localStorage.setItem('currentTopicId', e.target.id)
                    const currentTopic = allTopics.find((topic) => topic._id == e.target.id)
                    localStorage.setItem('currentTopic',JSON.stringify(currentTopic))
                    window.location.href = '../pages/multipleTaskPage.html'
                })
                topicList.append(topicCard)
                console.log(topicCard)
            })


        }
    })
        .catch((err) => {
            console.log('topicPage appendTopic Error: ', err)
        })


}



appendTopics()




const addTopicBtn = document.querySelector('#addTopic')
const topicModal = document.querySelector('#topicModal')
const topicForm = document.querySelector('#topicForm')
const subjectName = document.querySelector('.subject-name')


    const {subjectName: currentSubjectName} = JSON.parse(localStorage.getItem('currentSubject'))
    // console.log('subject:',subjectName)
    subjectName.textContent = currentSubjectName


addTopicBtn.addEventListener('click', (e) => {
    topicModal.style.display = 'flex'
    const saveBtn = document.querySelector('#saveBtn')
    const cancleBtn = document.querySelector('#cancleBtn')
    const topicInput = document.querySelector('#topicInput')

    cancleBtn.addEventListener('click', (e) => topicModal.style.display = 'none')

    topicForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const topicName = topicInput.value
        const subjectId = localStorage.getItem('currentSubjectId')
        const query = { subjectId, topicName }
        const url = `${BASE_URL}/topic/create`
        const createTopic = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })

        createTopic.then(async (res) => {
            const response = await res.json()
            topicModal.style.display = 'none'
            console.log(response)
            window.location.reload()
        })
            .catch((err) => {
                topicModal.style.display = 'none'
                console.log('topicPage createTopic Error: ', err)
            })

    })

})
