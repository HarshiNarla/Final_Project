function openOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'flex';
}

function closeOverlay() {
    const overlays = document.getElementsByClassName('overlay');
    for (let i = 0; i < overlays.length; i++) {
        overlays[i].style.display = 'none';
    }
}

window.addEventListener('click', function(event) {
    // Check if the clicked element is the overlay (not the overlay content)
    const overlays = document.getElementsByClassName('overlay');
    for (let i = 0; i < overlays.length; i++) {
        if (event.target === overlays[i]) {
            overlays[i].style.display = 'none';
        }
    }
});

const formProfilePic = document.getElementById('form-profile-pic')

formProfilePic.addEventListener('submit', async (event)=>{
    event.preventDefault();
    //console.log('axios')
        
    const formData = new FormData(formProfilePic)

    try{
        const response = await axios.put('/user/edit-profile-pic', formData)
        
        alert(`${response.data.message}`)
    }catch(err){
        console.log(err.message)
    }  

}) 
