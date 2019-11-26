const { of, combineLatest, Observable } = rxjs;
const { switchMap, map, tap } = rxjs.operators;



function mergeAllObservables(obs) {
    return combineLatest(...obs)
    .pipe(
        tap(x => console.log(x)),
        switchMap(allData => {
            const combined = [];
            combined.push([].concat(...allData));
            return of(combined[0]);
        }),
        tap(x => console.log(x)),
        map(actions => {
            const idx = Math.floor(Math.random() * 6) + 1;
            return { idx, ...actions };
        })
    );
}


const gets = [{id: 1, txt: 'ultimo'}, {id: 1, txt: 'ejercicio'}, {id: 1, txt: 'de'}, {id: 1, txt: 'rxjs'}];

const allDataObs = [];

gets.forEach(txt => {
    allDataObs.push(of(txt));
});

const obs = mergeAllObservables(allDataObs);
obs.subscribe(
    (x) => {
        console.log(x);
    }
)

