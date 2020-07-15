// env.js has firebase config keys
// contact.js has user information

// Login
const mismatch = document.getElementById("mismatch");

const login = (e) => {
    e.preventDefault();
    
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then( () => {
            console.log("Success!");
            window.location.href = "admin.html";
        })
        .catch((error) => {
            mismatch.innerHTML = `Email and password do not match.`

        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage)
    });   
}

document.getElementById("loginForm").addEventListener("submit", login);

// User name from Firebase
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.updateProfile({
      displayName: "Eva",
      //displayName: "Eva Dressel",
      photoURL: "img/myAvatar.png"
    }).then(function() {
    }).catch(function(error) {
    });
  } 
});


/* COMMENT: Remaining problem:
    Image from Firebase user does not display in const logged
    I know the issue is that const logged does not get Firebase user passed in
    I have not extended the user profile to the blog posts
*/ 