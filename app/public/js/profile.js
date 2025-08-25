const profilePicContainer = document.getElementById('profilePicContainer')
const picMenu = document.getElementById('pictureMenu');
const profilePicDiv = document.getElementById('profilePicDiv')

window.onload = async() => {
    
    const res = await fetch('user/avatar', {
        method: 'PUT',
        credentials: 'include'
    })

    if(!res.ok) throw new Error('avatar post hatası');

    const data = await res.json()
    console.log(data)
    const imgEl = profilePicDiv.querySelector('img')
    imgEl.src = data.thumbnail
}

window.addEventListener('click', (e) => {
    if(picMenu.style.display == "block"){
        picMenu.style.display = "none"
    }
})

profilePicContainer.addEventListener('click', (e) => {
            e.stopPropagation()
            picMenu.style.display = (picMenu.style.display == 'block') ? 'none' : 'block'
        if(e.target.textContent == "upload"){
            const picInputEl = document.createElement('input')
            picInputEl.type = 'file'
            picInputEl.accept = "image/*"
            picInputEl.click()

            picInputEl.addEventListener('change', async(e) => {
                const formData = new FormData();
                formData.append('avatar', e.target.files[0])

                const res = await fetch('/user/avatar', {
                    method: 'POST',
                    credentials:'include',
                    body: formData
                })

                if(!res.ok) throw new Error('avatar post hatası');

                const data = await res.json()
                console.log(data)

                const imgEl = profilePicDiv.querySelector('img')
                imgEl.src = data.thumbnail
            })
        }
        if(e.target.textContent == 'delete'){
            const deleteBtn = document.createElement('button')
            deleteBtn.onclick = async() => {
                try {
                    const res= await fetch('/user/avatar',{
                        method: 'DELETE',
                        credentials: 'include'
                    })

                    if(!res.ok) throw new Error('avatar delete error')

                    const data = await res.json();
                    const imgEl = profilePicContainer.querySelector('img')
                    imgEl.src = data.thumbnail;

                } catch (error) {
                    console.error(error)
                }
            }
            deleteBtn.click();
            deleteBtn.remove();
        }

})

