const ekran = document.getElementById('ekran');

let iskljucen = true;

window.addEventListener('DOMContentLoaded', () => {
    const stanje = localStorage.getItem('telefon');

    if (stanje === 'on') {
        ekran.style.display = 'block';
        iskljucen = false;
    } else {
        ekran.style.display = 'none';
        iskljucen = true;
    }
});


document.addEventListener('keydown', (event) => {
    let ctrl = event.key;
    if(ctrl === 'Control'){
        ukljuci()
        
    }
})

ukljuci = () => {
    if(iskljucen){
        ekran.style.display = 'block';
        iskljucen = false;
    } else {
        ekran.style.display = 'none';
        iskljucen = true;
        window.location.href = 'lockscreen/lockscreen.html'
    }
    
}

function updateClock() {
    const vreme = document.getElementById('realTime');

    const now = new Date();

    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');


    vreme.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);

ekran.addEventListener('mouseenter', (event) => {
    document.body.style.cursor = 'default'
})

ekran.addEventListener('mouseleave', (event) => {
    document.body.style.cursor = 'none';
})


