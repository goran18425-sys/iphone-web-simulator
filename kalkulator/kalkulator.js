const brojevi = document.querySelectorAll('.broj');
const znaci = document.querySelectorAll('.znak');

const calc_input = document.getElementById('calc_input');
const brisiJedan = document.getElementById('brisiJedan');
const jednako = document.getElementById('jednako');
const ac = document.getElementById('ac');
const negativ = document.getElementById('negativ');
const izadjiLinija = document.getElementById('izadjiLinija');

let currentResult = null;
let isNewNumber = false;


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


/* ======================
   BROJEVI
====================== */
brojevi.forEach(btn => {
    btn.addEventListener('click', e => {
        const tekst = e.target.innerText;

        if (isNewNumber) {
            calc_input.value += tekst;
            isNewNumber = false;
        } else {
            calc_input.value += tekst;
        }
    });
});

/* ======================
   ZNACI (+ - X ÷)
====================== */
znaci.forEach(btn => {
    btn.addEventListener('click', e => {
        const noviZnak = e.target.innerText;
        const delovi = calc_input.value.trim().split(' ');

        if (delovi.length === 3) {
            const a = Number(delovi[0]);
            const b = Number(delovi[2]);
            const op = delovi[1];

            switch (op) {
                case 'X': currentResult = a * b; break;
                case '+': currentResult = a + b; break;
                case '-': currentResult = a - b; break;
                case '÷': currentResult = a / b; break;
            }

            calc_input.value = `${currentResult} ${noviZnak} `;
        } 
        else if (delovi.length === 1) {
            calc_input.value += ` ${noviZnak} `;
        }

        isNewNumber = true;
    });
});

/* ======================
   JEDNAKO =
====================== */
jednako.addEventListener('click', () => {
    const delovi = calc_input.value.trim().split(' ');
    if (delovi.length !== 3) return;

    const a = Number(delovi[0]);
    const b = Number(delovi[2]);
    const op = delovi[1];

    switch (op) {
        case 'X': currentResult = a * b; break;
        case '+': currentResult = a + b; break;
        case '-': currentResult = a - b; break;
        case '÷': currentResult = a / b; break;
    }

    calc_input.value = currentResult;
    isNewNumber = true;
});

/* ======================
   BRISI JEDAN
====================== */
brisiJedan.addEventListener('click', () => {
    calc_input.value = calc_input.value.slice(0, -1);
});

ac.addEventListener('click', () => {
    calc_input.value = ''
})

negativ.addEventListener('click', () => {
    value = calc_input.value.trim()
    
    if(value === '') return;
    
        let num = Number(value)
        num = -num
        
        calc_input.value = num

    
})

izadjiLinija.addEventListener('click', (event) => {
    ekran.style.animation = 'lockscreenUp 0.5s forwards';

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 400);
})