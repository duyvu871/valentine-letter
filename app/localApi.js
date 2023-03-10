const createElement = domString => new DOMParser().parseFromString(domString, 'text/html').body.firstChild

const setLocalStorageItems = (key,items) => {
    let value = JSON.stringify(items)
    localStorage.setItem(key,value)
}

function waitForElement(querySelector, timeout, typeElement){
    return new Promise((resolve, reject)=>{
      var timer = false;
      if(document.querySelectorAll(querySelector).length) return resolve();
      const observer = new MutationObserver((m)=>{
        console.log(m);
        if(document.querySelectorAll(querySelector).length){
          observer.disconnect();
          if(timer !== false) clearTimeout(timer);
          return resolve();
        }
      });
      observer.observe(document.body, {
        childList: true, 
        subtree: true
      });
      if(timeout) timer = setTimeout(()=>{
        observer.disconnect();
        reject();
      }, timeout);
    });
  }
  

const deleteLocalStorageItems = (key) => {
    localStorage.removeItem(key)
}

class API_Firebase {
    constructor(firebase) {
        this.firebase = firebase
    }

    getLogin() {
        //Get current user when they login
        const currentUser = this.firebase?.auth()?.currentUser
        if (currentUser) {
            return ({
                displayName: currentUser.displayName,
                email: currentUser.email,
                emailVerified: currentUser.emailVerified,
                photoURL:currentUser.photoURL,
                uid:currentUser.uid
            })
        } else return undefined
    }

    signOut() {
        //logout 
        this.firebase.auth().signOut()
    }

    signIn() {
        //Google singin provider
        var ggProvider = new firebase.auth.GoogleAuthProvider();
         //Sing in with Google
        this.firebase.auth().signInWithPopup(ggProvider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log('User>>Goole>>>>', user);
            userId = user.uid;

        }).catch(function(error) {
            console.error('Error: hande error here>>>', error.code)
        })
    }
    currentTime() {
        var currentTime = new Date();
        var date = currentTime.toLocaleDateString();
        var time = currentTime.toLocaleTimeString();
        return ({
            date,
            time,
            timeFormat: `${time} - ${date}`
        })
    }
}