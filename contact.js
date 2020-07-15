// Firebase


import { firebaseConfig } from './env.js';
firebaseConfig;

// Restricted 
var name, email, photoUrl;
const restricted = document.getElementById("restricted");
const restrictedBtn = document.getElementById("restrictedBtn");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      
      restricted.innerHTML = logged;
      restricted.classList.add("h-8");
      restrictedBtn.innerHTML = "Logout";
      restrictedBtn.addEventListener ("click", logout)
    } 
    console.log("this would be the name: " + name + " " + email + " " + photoUrl)
});

const logout = () => {
  firebase.auth().signOut().then(function() {
    console.log("logout successful!");
    window.location.href = "index.html"
  }).catch(function(error) {
    console.log("logout not successful");
  });
}

const logged =
`<a href="admin.html" class="block mt-4 lg:inline-block lg:mt-1 text-teal-200 hover:text-white">
    <p class="inline-block mr-1">Admin:</p>
    <p class="inline-block mr-1">Hi Eva</p>
    <img class="inline-block ml-1 mr-4 mb-1 w-8 h-8 rounded-full" src="img/myAvatar.png">
 </a>`

//<p class="inline-block mr-1">Hi ${ name }</p>

