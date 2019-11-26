const { BehaviorSubject, fromEvent } = rxjs;

let percentComplete;
let percentUpload$;
let nameUpload$;
let isUpload$;
const file = document.getElementById('archivo');

fromEvent(file, 'input')
.subscribe(
  (x) => {
    createSubjects(x.srcElement.files);
  }
)

function createSubjects(file) {
  percentUpload$ = new BehaviorSubject(0);
  nameUpload$ = new BehaviorSubject('');
  isUpload$ = new BehaviorSubject(false);
  console.log(file);
  uploadXHR(file, '', [], 'http://localhost:3000/upload');
}

function unsubscribeSubjects() {
  if(percentUpload$ !== undefined) {
    percentUpload$.unsubscribe();
    nameUpload$.unsubscribe();
    isUpload$.unsubscribe();
  }
}
function uploadXHR(files, token, appends, urlBackend) {

  isUpload$.next(true);
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
    console.log(e);
    if (e.lengthComputable) {
      percentComplete = (e.loaded / e.total) * 100;
      console.log(percentComplete + '% uploaded');
      percentUpload$.next(percentComplete);
    }
  };

  xhr.onload = () => {
      if (xhr.status === 200) {
          console.log(xhr.responseText);
          nameUpload$.next('blah');
      } else {
          alert('An error occurred!');
      }
      isUpload$.next(false);
  };
  if (token !== '') {
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  }
  xhr.send(formData);
}

