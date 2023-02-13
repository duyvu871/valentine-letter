function uploadModal(type = 'image') {
    $('.upload-modal').html(`
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
    `)
    $('.upload-modal').toggle()
}

function uploadFileWithBase64(file,type,timeStamp) {
    var uid = auth.currentUser.uid
    var storage = firebase.storage().ref(type + '/' + uid )
    var storageChild = storage.child('background')
     var task = storageChild.putString(file,'data_url')

    task.on(
        'state_change',
        function progress(snap) {
            // console.log(snap.bytesTransferred / snap.totalBytes * 100);
            switch (snap.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    // console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    // console.log('Upload is running');
                    break;
            }
        },
        function error(error) {
              // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function completed() {
            // removeFileStorage()
            storageChild.getDownloadURL().then(url => {
                document.querySelector('#background').src = url
            })
        }
    )

}
function decodeURL (url) {
    return unescape(decodeURI(url))
}

function getFilePathFromURL(url) {
    var path = url.split('/')[7].split('?')[0].replaceAll(/ /g,'')
    return decodeURL(path)
}


function getFileUrl(evt) {
    const type = 'url';
    var files = evt.files;
    var file = files[0];
    
    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent) {
        uploadFileWithBase64(fileReader.result, 'img')
    }

    if (type === 'text') {
       fileReader.readAsText(file)
    } else if (type === 'url') {
        fileReader.readAsDataURL(file)
    } else if (type === 'binary_string') {
       fileReader.readAsBinaryString(file)
    } else if (type === 'array_buffer') {
        fileReader.readAsArrayBuffer(file)
    }

}
