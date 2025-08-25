
const loginForm = document.getElementById('loginForm')
loginForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    const fd = new FormData(loginForm)
    
    const payload = {
        username : fd.get('username'),
        password: fd.get('password')
    }

    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(payload)
        })

        if(!res.ok) throw new Error ('login authentication errored');

        window.location.href = "/profile"
        
    } catch (error) {
        console.log('login.js gets error', error)
    }
})

    
    

    

