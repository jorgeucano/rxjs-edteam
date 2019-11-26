var button = document.getElementById('boton');
button.addEventListener('click', () => {
    console.log('hice click');
});

var button2 = document.getElementById('boton2');
var eventoClick = fromEvent(button2, 'click');

eventoClick.subscribe(
    () => {
        console.log('hice click en rxjs');
    }
)

eventoClick.subscribe(
    () => {
        console.log('segundo click');
    }
)

