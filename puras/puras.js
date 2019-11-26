var boton = document.getElementById('boton');

var contadorImpura = 0;

boton.addEventListener('click', () => {
    console.log(++contadorImpura);
})

const { Observable, fromEvent } = rxjs;
const { scan } = rxjs.operators;

fromEvent(boton, 'click')
    .pipe(
        scan(cont => cont +1, 0)
    )
    .subscribe(
        cont => {
            console.log('puro: ' + cont)
        }
    );