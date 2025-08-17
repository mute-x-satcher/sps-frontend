import BASE_URL from "../url/baseurl.js"
import setLoading from "../components/setLoading.js"
import showMessage from "../components/showMessage.js"
const loginForm = document.querySelector('#loginForm')

if(localStorage.getItem('localUserInfo')){
const {userEmail,userPassword} = JSON.parse(localStorage.getItem('localUserInfo'))


    const query = {userEmail,userPassword}

    const url = `${BASE_URL}/user/login`
    setLoading(true,'Login in Progress ')
    const loginAccount = fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
    })

    loginAccount.then(async (res) => {
        const response = await res.json();
        console.log(response)
        setLoading(false)
        window.location.href = '../pages/dashboardPage.html'
    })
    .catch((err) => {
        setLoading(false)
        console.log('login page error: ',err)
    })

}

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("sdsd")
    const userEmail = document.querySelector('#userEmail').value
    const userPassword = document.querySelector('#userPassword').value

    const query = {userEmail,userPassword}

    const url = `${BASE_URL}/user/login`
    setLoading(true,'Login in Progress ')
    const loginAccount = fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
    })

    loginAccount.then(async (res) => {
        const response = await res.json();
        console.log(response)
        setLoading(false)
        if(res.status == 200){
            showMessage('Login Successful','success')
            window.location.href = '../pages/dashboardPage.html'
        }
        else{
            showMessage(response.msg,'error')
        }
    })
    .catch((err) => {
        setLoading(false)
        console.log('login page error: ',err)
    })
})