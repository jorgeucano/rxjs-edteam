var count = 0;
var rate = 1000;
var lastClick = Date.now() - rate;
var button = document.getElementById('boton');
button.addEventListener('click', () => {
    if(Date.now() - lastClick >= rate) {
        console.log(++count);
    }
    lastClick = Date.now();
});

const { fromEvent, Observable } = rxjs;
const { throttleTime, scan } = rxjs.operators;

fromEvent(button, 'click').pipe(
    throttleTime(100),
    scan(count => count + 1, 0)
)
.subscribe(console.log(count));





var foo = Observable( function (observer) {
    console.log('rxjs');
    observer.next(42);
})

foo.subscribe(function (x) {
    console.log(x);
})