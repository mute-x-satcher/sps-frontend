import BASE_URL from "../url/baseurl.js";
import setLoading from "../components/setLoading.js";
import showMessage from "../components/showMessage.js";
const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const userName = document.querySelector('#userName').value
    const userEmail = document.querySelector('#userEmail').value
    const userPassword = document.querySelector('#userPassword').value

    const query = {userName,userEmail,userPassword}
    console.log(query)
    setLoading(true,'Signing Up !')
    const url = `${BASE_URL}/user/signup`
    const signupAccount = fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)

    })

    signupAccount.then(async (res) => {
        const response = await res.json()
        console.log(response)
        setLoading(false)
       if(res.status == 200){
            showMessage('Signup Successful','success')
            localStorage.setItem('localUserInfo',JSON.stringify(response.userInfo))
            window.location.href = '../pages/dashboardPage.html'
        }
        else{
            showMessage(response.msg,'error')
        }
    })
    .catch((err) => {
        setLoading(false)
        console.log('signup page error: ',err)
    })


})
