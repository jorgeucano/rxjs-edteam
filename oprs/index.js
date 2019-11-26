const { of, combineLatest } = rxjs;
const { tap, switchMap, map, filter } = rxjs.operators;

function mergeAllObservables(obs) {
    console.log(...obs);
    return combineLatest(...obs)
        .pipe(
            tap(x => console.log(x)),
            filter(data => data.length > 4),
            switchMap(allData => {
                const combined = [];
                combined.push([].concat(...allData));
                return of(combined[0]);
            }),
            map(actions => {
                const idx = Math.floor(Math.random() * 6) +1;
                return {idx, ...actions}
            })
        )
}

const gets = [
    { id: 1, txt: 'ultimo' }, 
    { id: 2, txt: 'ejercicio' }, 
    { id: 3, txt: 'de' }, 
    { id: 4, txt: 'rxjs', otra: 'cosa' }
];
const allDataObs = [];

gets.forEach(obsData =>{
    allDataObs.push(of(obsData));
});

const obs = mergeAllObservables(allDataObs);

obs.subscribe(
    x => console.log(x)
);