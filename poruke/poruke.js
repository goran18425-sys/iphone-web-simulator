
const telefon = document.getElementById('telefon');
const input = document.getElementById('tastaturaInput');
const porukeDiv = document.getElementById('poruke');
const obrisi_prozor = document.getElementById('obrisi_prozor');
const tasteri = document.querySelectorAll('.taster');
const pravatastarura = document.getElementById('pravatastarura');
const tastaturaUpali = document.getElementById('tastaturaUpali');
const kucanje = document.getElementById('kucanje');
const obrisi_sve_prozor = document.getElementById('obrisi_sve_prozor');
const prazan_chat = document.getElementById('prazan_chat');
const ekran = document.getElementById('ekran');
const autor = document.getElementById('autor');
const overlay = document.getElementById('overlay');
const izadjiLinija = document.getElementById('izadjiLinija');



ekran.style.backgroundImage = "url('../img/b71d7334027875e29884e5f6e8881850.jpg')";
ekran.style.backgroundSize = 'cover';
ekran.style.display = 'block';


obrisi_prozor.style.display = 'none';
obrisi_sve_prozor.style.display = 'none';
pravatastarura.style.display = 'none';
prazan_chat.style.display = 'none'
autor.style.display = 'none';
overlay.style.display = 'none';

porukeDiv.innerHTML = '';
porukeDiv.style.height = '660px'

let porukaZaBrisanje = null;
let uppercase = true; 
let tastatura_gore = true;
let obrisan = true;
let otvoren_autor = true;
let iskljucen = true;
let ima_broja = true
let karakteri = 0;

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

function posalji() {
    const porukaTekst = input.value.trim();
    if (!porukaTekst) return;

    // napravi novi element za poruku
    const novaPoruka = document.createElement('div');
    novaPoruka.classList.add('porukajs');
    novaPoruka.textContent = porukaTekst;

    // dodaj klik listener za brisanje
    novaPoruka.addEventListener('click', () => {
        porukaZaBrisanje = novaPoruka;
        obrisi_prozor.style.display = 'block';
        
    });

    // dodaj u div
    porukeDiv.appendChild(novaPoruka);

    // očisti input
    input.value = '';

    // automatski scroll
    skrolujDoDole();
}

function updateClock() {
    const clock = document.getElementById('realTime');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');

    clock.textContent = `${hours}:${minutes}`;
}

// start odmah i update svakih 1s
updateClock();
setInterval(updateClock, 1000);






const ne = () => {
    porukaZaBrisanje = null;        
    obrisi_prozor.style.display = 'none';
}

const da = () => {
    if(porukaZaBrisanje){
        porukaZaBrisanje.remove();  
        porukaZaBrisanje = null;
        obrisi_prozor.style.display = 'none';
    }
}

const upper = () => {
    tasteri.forEach(t => {
        if(t.id !== 'upper' && t.id !== 'backspace' && t.id !== 'space' && t.id !== 'enter'){
            t.textContent = uppercase ? t.textContent.toLowerCase() : t.textContent.toUpperCase();
        }
    });
    uppercase = !uppercase; 
}

const tastaturaDown = () => {
    pravatastarura.style.animation = 'tastaturaClose 0.3s ease forwards';
    tastatura_gore = true;
    tastaturaUpali.innerText = '↑';
    input.style.width = '100px';
    input.style.border =  '2px solid black';
    kucanje.style.bottom = '40px';
    porukeDiv.style.height = '660px'
}

const tastaturaUp = () => {
    pravatastarura.style.display = 'flex'
    pravatastarura.style.animation = 'tastaturaOpen 0.3s ease forwards';
    tastatura_gore = false;
    tastaturaUpali.innerText = '↓';
    input.style.width = '300px';
    input.style.border =  '2px solid #fefefe';
    kucanje.style.bottom = '280px';
    porukeDiv.style.height = '410px'
}

document.addEventListener('keydown', event => {
    strelica = event.key;
    if(event.key === 'ArrowDown'){
        tastaturaDown()
    } else if(event.key === 'ArrowUp'){
        tastaturaUp()
    }
    console.log(strelica)
})



otvoriTastaturu = () => {
    if(!tastatura_gore) {
        tastaturaDown()

    } else{
        tastaturaUp()
    }

}

let brojeviAktivni = false;

const slova = {
    prviRed:  ['Q','W','E','R','T','Y','U','I','O','P'],
    drugiRed: ['A','S','D','F','G','H','J','K','L'],
    treciRed: ['Z','X','C','V','B','N','M']
};

const brojevi = {
    prviRed:  ['1','2','3','4','5','6','7','8','9','0'],
    drugiRed: ['-','/',';',':','(',')','€','&','@'],
    treciRed: ['_','"','\\','|','~','<','>']
};

function toggleBrojeve() {
    brojeviAktivni = !brojeviAktivni;

    const layout = brojeviAktivni ? brojevi : slova;

    ['prviRed', 'drugiRed', 'treciRed'].forEach(redClass => {
        const red = document.querySelector('.' + redClass);
        const tasteri = red.querySelectorAll('.taster:not(#upper):not(#backspace)');

        tasteri.forEach((taster, i) => {
            taster.textContent = layout[redClass][i];
        });
    });

    document.getElementById('brojeviKey').textContent =
        brojeviAktivni ? 'ABC' : '123';
}


// Selektujemo sve tastere osim specijalnih koji imaju svoju funkciju
document.querySelectorAll('.taster:not(#upper):not(#backspace):not(#space):not(#enter):not(#brojeviKey)')
    .forEach(taster => {
        taster.addEventListener('click', () => {
            input.value += taster.textContent; // dodaje znak u input
            input.focus(); // opcionalno da ostane fokus
        });
    });

// SPACE dugme
document.getElementById('space').addEventListener('click', () => {
    input.value += ' ';
    input.focus();
});

// BACKSPACE dugme
document.getElementById('backspace').addEventListener('click', () => {
    input.value = input.value.slice(0, -1);
    input.focus();
});

// ENTER dugme
document.getElementById('enter').addEventListener('click', () => {
    posalji(); // tvoja funkcija za slanje poruke
});



input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {  // detektuješ Enter taster
        e.preventDefault();   // sprečava default submit ili novi red
        posalji();            // poziva tvoju funkciju za slanje poruke
    }
});


function skrolujDoDole() {
    const porukeDiv = document.getElementById('poruke');
    porukeDiv.scrollTop = porukeDiv.scrollHeight;
}

function skrolujDoDole() {
    const porukeDiv = document.getElementById('poruke');
    porukeDiv.scrollTo({
        top: porukeDiv.scrollHeight,
        behavior: 'smooth'
    });
}

obrisi_sve = () => {

    if(porukeDiv.innerHTML === '') {
        prazan_chat.focus();
        prazan_chat.style.display = 'inline-block';
    } else{
        if(obrisan){
            obrisi_sve_prozor.style.display = 'inline-block';
            obrisan = false;
    } else{
        obrisi_sve_prozor.style.display = 'none';
        obrisan = true;
    }
    }

}   

da_sve = () => {
    porukeDiv.innerHTML = '';
    obrisi_sve_prozor.style.display = 'none';
    obrisan = true;
}

ne_sve = () => {
    obrisi_sve_prozor.style.display = 'none';
    obrisan = true;
}

zatvori_prozor = () => {
    prazan_chat.style.display = 'none'
}

const otvori_autor = () => {
    if(otvoren_autor){
        autor.style.display = 'inline-block';
        otvoren_autor = false;
        pravatastarura.style.animation = 'tastaturaClose 0.3s ease forwards';
        tastatura_gore = true;
        tastaturaUpali.innerText = '↑';
        input.style.width = '100px';
        input.style.border =  '2px solid black';
        kucanje.style.bottom = '40px';
        porukeDiv.style.height = '660px';
        overlay.style.display = 'block';
    } else{
        autor.style.display = 'none';
        otvoren_autor = true;
    }
    
}

const zatvori_autor = () =>{
    autor.style.display = 'none';
    overlay.style.display = 'none';

}


ekran.addEventListener('mouseenter', (event) => {
    document.body.style.cursor = 'default'
})

ekran.addEventListener('mouseleave', (event) => {
    document.body.style.cursor = 'none';
})


izadjiLinija.addEventListener('click', (event) => {
    ekran.style.animation = 'lockscreenUp 0.5s forwards';

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 400);
})