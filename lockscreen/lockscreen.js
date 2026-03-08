const ekran = document.getElementById('ekran');
const izadjiLinija = document.getElementById('izadjiLinija');
const telefon = document.getElementById('telefon');

telefon.style.background = 'radial-gradient(circle at 30% 20%,rgba(255,255,255,0.08),rgba(0,0,0,0) 40%),linear-gradient(135deg,#050505,#0b0b0b,#020202)';
ekran.style.display = 'none';
let iskljucen = true;



let ekranUkljucen = false;



document.addEventListener('keydown', (event) => {

    if (event.key === 'Control') {
        ukljuci();
        ekranUkljucen = !ekranUkljucen;
    }

    if (ekranUkljucen && event.key === 'ArrowUp') {
        event.preventDefault();

        ekran.style.animation = 'lockscreenUp 0.5s forwards';

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 400);
    }
});



const ukljuci = () => {
    if(iskljucen){
        ekran.style.display = 'block';
        iskljucen = false;
        telefon.style.background = ''   

    } else {
        ekran.style.display = 'none';
        iskljucen = true;
        telefon.style.background = 'radial-gradient(circle at 30% 20%,rgba(255,255,255,0.08),rgba(0,0,0,0) 40%),linear-gradient(135deg,#050505,#0b0b0b,#020202)';


    }
    
}

function updateClock() {
    const vreme = document.getElementById('vreme');
    const datum = document.getElementById('datum');

    const now = new Date();

    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');

    const day = now.getDate().toString().padStart(2, '0');
    const monthIndex = now.getMonth();

    const meseci = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
    const mesec = meseci[monthIndex];

    const nedelja_index = now.getDay();
    const dani = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'];
    const dan_u_nedelji = dani[nedelja_index]

    datum.textContent = `${dan_u_nedelji} ${day} ${mesec}`;
    vreme.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);


ekran.addEventListener('mouseenter', (event) => {
    document.body.style.cursor = 'default'
});

ekran.addEventListener('mouseleave', (event) => {
    document.body.style.cursor = 'none';
});


izadjiLinija.addEventListener('click', (event) => {
    ekran.style.animation = 'lockscreenUp 0.5s forwards';

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 200);
})