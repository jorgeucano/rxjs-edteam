/*
Observable 
 => next => recibe de un valor futuro
 => error => recibe un error vos definis que haces
 => complete
*/
const observer = {
    next:(newValue) => { // variable opcional
       if(!isNaN(newValue)) {
           return newValue * 1000;
       }
    },
    error: (err) => { // variable opcional
        //aca se hace lo que ustedes quieren
    },
    complete: () => {

    }
};

 const obs = new Observable.create(observer);

const observer2 = new Observable.create();


 obs.next('hola como estas?');

 const obs1 = obs.subscribe();
 const obs2 = obs.subscribe();
 const obs3 = obs.subscribe();

 obs1.unsubscribe(); // cuando quiero dejar de recibir datos
 obs.complete(); // cuando la logica de esta 
                // observable no se necesita mas