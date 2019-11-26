const { BehaviorSubject, fromEvent, Observable } = rxjs;
const { tap, switchMap } = rxjs.operators;

const file = document.getElementById('archivo');

fromEvent(file, 'input').pipe(
  tap(() => console.log('start')),
  switchMap(x =>  uploadXHR(x.srcElement.files, '', [], 'http://localhost:3000/upload')),
  tap(donePercent => console.log(donePercent))
)
.subscribe(
  (result) => {
    const path = result.path;
    if (!path) return;
    const img = document.createElement('IMG');
    img.src = path;
    img.style.width="80%";
    document.body.appendChild(img);
    console.log(img, img.src);
  },
  (err) => { console.log('an error ', JSON.stringify(err))},
  () => { 
    console.log('complete');
  }
);


function uploadXHR(files, token, appends, urlBackend) {
  return new Observable(obs => {

    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }
    if (appends !==  undefined ) {
      appends.forEach(element => {
        formData.append(element.name, element.value);
      });
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', urlBackend, true);
    
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        percentComplete = (e.loaded / e.total) * 100;
        obs.next({done:percentComplete + '% uploaded'});
      }
    };
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        obs.next({path:JSON.parse(xhr.responseText).path});
        obs.complete();
      } else {
        obs.error('An error occurred!');
      }
    };
    if (token !== '') {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
    xhr.send(formData);

  })
}

