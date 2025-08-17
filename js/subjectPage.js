import BASE_URL from '../url/baseurl.js'

function appendSubjects() {
    const subjectList = document.querySelector('.subjects-list')
    const { _id: accountId } = JSON.parse(localStorage.getItem('localUserInfo'))
    const query = { accountId }
    const url = `${BASE_URL}/subject/get`
    const allSubjects = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })


    allSubjects.then(async (res) => {
        const response = await res.json()
        if (res.status == 200) {
            localStorage.setItem('currentSubjectArray', JSON.stringify(response.allSubjectsInfo))

            const allSubjects = response.allSubjectsInfo

            allSubjects.map((subject) => {
                const subjectCard = document.createElement('div')
                const subjectName = document.createElement('span')
                const dropdownMenu = document.createElement('div')
                const menuImg = document.createElement('img')
                const menuButton = document.createElement('button')
                const dropdownContent = document.createElement('div')
                const deleteBtn = document.createElement('button')
                const updateBtn = document.createElement('button')
                subjectCard.className = 'subject'
                subjectCard.id = subject._id
                deleteBtn.id = subject._id
                updateBtn.id = subject._id

                subjectName.textContent = subject.subjectName
                subjectName.className = 'subject-name'
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

                subjectCard.append(subjectName)
                subjectCard.append(dropdownMenu)


                deleteBtn.addEventListener('click', (e) => {
                    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
                    e.stopPropagation()
                    const subjectId = e.target.id
                    console.log(subjectId)
                    const query = { subjectId }
                    const url = `${BASE_URL}/subject/delete`
                    const deletedSubject = fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(query)
                    })

                    deletedSubject.then(async (res) => {
                        const response = await res.json();
                        if (res.status == 200) {
                            window.location.reload()
                            console.log(response)
                        }
                    })
                    deletedSubject.catch((err) => {
                        console.log('subjectPage deleteSubject Error: ', err)
                    })

                })

                updateBtn.addEventListener('click', (e) => {
                    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
                    e.stopPropagation()
                    const subjectModal = document.querySelector('#subjectModal')
                    const subjectForm = document.querySelector('#subjectForm')
                    const saveBtn = document.querySelector('#saveBtn')
                    const cancleBtn = document.querySelector('#cancleBtn')
                    const subjectInput = document.querySelector('#subjectInput')
                    console.log(allSubjects)
                    const subject = allSubjects.find((subject) => {
                        if (e.target.id == subject._id) {
                            return subject
                        }
                    })
                    // console.log('ss',subject)
                    subjectInput.value = subject.subjectName
                    subjectModal.style.display = 'flex'

                    cancleBtn.addEventListener('click', (e) => {
                        subjectModal.style.display = 'none'
                    })

                    saveBtn.addEventListener('click', (e) => {
                        console.log(subject)
                        const subjectId = subject._id
                        const subjectName = subjectInput.value
                        const query = { subjectId ,subjectName}
                        const url = `${BASE_URL}/subject/update`
                        const updatedSubject = fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(query)
                        })

                        updatedSubject.then(async (res) => {
                        const response = await res.json()
                        if(res.status == 200){
                            window.location.reload()
                        }
                    })
                    .catch((err) => {
                        console.log('subjectPage updateSubject Error: ',err)
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
                subjectCard.addEventListener('click', (e) => {
                    console.log(e.target.id)
                    localStorage.setItem('currentSubjectId', e.target.id)
                    const subject = allSubjects.find((subject) => subject._id == e.target.id)
                    localStorage.setItem('currentSubject',JSON.stringify(subject))
                    window.location.href = '../pages/topicPage.html'
                })
                // console.log(deleteSubjectBtn)
                // subjectCard.append(deleteSubjectBtn)
                subjectList.append(subjectCard)
                console.log(subjectCard)
            })


        }
    })
        .catch((err) => {
            console.log('subjectPage appendSubject Error: ', err)
        })


}



appendSubjects()




const addSubjectBtn = document.querySelector('#addSubject')
const subjectModal = document.querySelector('#subjectModal')
const subjectForm = document.querySelector('#subjectForm')

addSubjectBtn.addEventListener('click', (e) => {
    subjectModal.style.display = 'flex'
    const saveBtn = document.querySelector('#saveBtn')
    const cancleBtn = document.querySelector('#cancleBtn')
    const subjectInput = document.querySelector('#subjectInput')

    cancleBtn.addEventListener('click', (e) => subjectModal.style.display = 'none')

    subjectForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const subjectName = subjectInput.value
        const { _id: accountId } = JSON.parse(localStorage.getItem('localUserInfo'))
        const query = { accountId, subjectName }
        const url = `${BASE_URL}/subject/create`
        const createSubject = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })

        createSubject.then(async (res) => {
            const response = await res.json()
            subjectModal.style.display = 'none'
            console.log(response)
            window.location.reload()
        })
            .catch((err) => {
                subjectModal.style.display = 'none'
                console.log('subjectPage createSubject Error: ', err)
            })

    })

})

