const poziv = document.getElementsByClassName('poziv')[0];
const brojTelefona = document.getElementById('brojTelefona');
const obrisi_broj = document.getElementById('obrisi_broj');
const ekran = document.getElementById('ekran');
const izadjiLinija = document.getElementById('izadjiLinija');


obrisi_broj.style.display = 'none';
let iskljucen = true;


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
        window.location.href = '../lockscreen/lockscreen.html'
    }
    
}

const formatirajBroj = () => {
    let v = brojTelefona.value;

    // ukloni sve razmake
    v = v.replace(/\s+/g, '');

    // +381 varijanta
    if (v.startsWith('+381')) {
        let ostatak = v.slice(4); // ukloni +381
        if (ostatak.length > 0) {
            // grupiši: 2 cifre (mreža) + 4 cifre + 3 cifre
            ostatak = ostatak.replace(/^(\d{2})(\d{4})(\d{3})?/, '$1 $2 $3');
        }
        brojTelefona.value = '+381 ' + ostatak.trim();
    }
    // 06X varijanta
    else if (/^06[1-9]/.test(v)) {
        // grupiši: 3 cifre (mreža) + 4 cifre + 3 cifre
        v = v.replace(/^(\d{3})(\d{4})(\d{3})?/, '$1 $2 $3');
        brojTelefona.value = v.trim();
    }
};

const dodajBroj = (dugme) => {
    const element = dugme.innerText;
    let v = brojTelefona.value.replace(/\s+/g, ''); // ukloni razmake

    // limit +381
    if (v.startsWith('+381') && v.length >= 13) return; 
    // +381 (3) + 9 cifara = 12 znakova ukupno (bez razmaka)

    if (/^06[1-9]/.test(v) && v.length >= 10) return; 
    // 06X (3) + 7 cifara = 10 znakova ukupno

    // ako nije prešao limit, dodaj karakter
    brojTelefona.value += element;

    // formatiraj broj
    formatirajBroj();

    // dugme za brisanje
    obrisi_broj.style.display = 'flex';
    brojTelefona.focus();
};
const obrisi_br = () => {

    brojTelefona.value = brojTelefona.value.slice(0, -1);

    if (brojTelefona.value.length === 0) {
        obrisi_broj.style.display = 'none';
    }

    brojTelefona.focus();
};

izadjiLinija.addEventListener('click', (event) => {
    ekran.style.animation = 'lockscreenUp 0.5s forwards';

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 400);
})