function uploadModal(type = "image") {
  $(".upload-modal").html(`
        <div class=" border border-dashed border-gray-500 relative bg-white top-0 z-50 " style="top: 50%;
        transform: translateY(-50%);">
            <input id="file-upload" accept="image/png, image/gif, image/jpeg" onchange="getFileUrl(this)" type="file" multiple class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50">
            <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                <h4>
                    Drop files anywhere to upload
                    <br/>or
                </h4>
                <p class="">Select Files</p>
            </div>
        </div>
    `);
  $(".upload-modal").toggle();
}

function uploadFileWithBase64(file, type, name = "image") {
  var uid = auth.currentUser.uid;
  var storage = firebase.storage().ref(uid + "/" + type);
  var storageChild = storage.child(name);
  var task = storageChild.putString(file, "data_url");

  return { task, storageChild };
}

// task.on(
//     'state_change',
//     function progress(snap) {
//         console.log(snap.bytesTransferred / snap.totalBytes * 100);
//         switch (snap.state) {
//             case firebase.storage.TaskState.PAUSED: // or 'paused'
//                 // console.log('Upload is paused');
//                 break;
//             case firebase.storage.TaskState.RUNNING: // or 'running'
//                 // console.log('Upload is running');
//                 break;
//         }
//     },
//     function error(error) {
//           // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//             case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                 break;

//             case 'storage/canceled':
//                 // User canceled the upload
//                 break;

//             case 'storage/unknown':
//                 // Unknown error occurred, inspect error.serverResponse
//                 break;
//         }
//     },
//     function completed() {
//         // removeFileStorage()
//         storageChild.getDownloadURL().then(url => {
//             console.log(url);
//             // document.querySelector('#background').src = url
//         })
//     }
// )
function downloadFile(url) {
  var httpsReference = firebase.storage().refFromURL(url);

  // Get the download URL
  httpsReference.getDownloadURL().then((url) => {
    console.log(url);
    // download image directly via url
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      var blob = xhr.response;
      //create a file from the returned blob
      var file = new File([blob], "image name", { type: blob.type });
      //grab the a tag
    var a1 = document.createElement("a");
      //set the download attribute of the a tag to the name stored in the file
      a1.download = file.name;
      //generate a temp url to host the image for download
      a1.href = URL.createObjectURL(file);
      a1.style = "display:none"
      document.body.append(a1)
      a1.click()
    };
    xhr.open("GET", url);
    xhr.send();
  });
}

function getStorageURL(uid, type, idFile) {
  var storage = firebase.storage().ref(uid + "/" + type);
  var storageChild = storage.child(idFile);

  return storageChild.getDownloadURL();
}

function decodeURL(url) {
  return unescape(decodeURI(url));
}

function getFilePathFromURL(url) {
  var path = url.split("/")[7].split("?")[0].replaceAll(/ /g, "");
  return decodeURL(path);
}

function getFileUrl(evt) {
  const type = "url";
  var files = evt.files;
  var file = files[0];

  var fileReader = new FileReader();

  fileReader.onload = function (progressEvent) {
    uploadFileWithBase64(fileReader.result, "background");
  };

  if (type === "text") {
    fileReader.readAsText(file);
  } else if (type === "url") {
    fileReader.readAsDataURL(file);
  } else if (type === "binary_string") {
    fileReader.readAsBinaryString(file);
  } else if (type === "array_buffer") {
    fileReader.readAsArrayBuffer(file);
  }
}
