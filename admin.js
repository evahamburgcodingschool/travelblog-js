// env.js has firebase config keys
// contact.js has user information

// Blog cards
const content = document.getElementById("content");  

const blogPost = (post) =>
`<div class="container mt-8 max-w-sm rounded-md overflow-hidden shadow-lg justify-center bg-yellow-300">
<img id="myimg" class="w-full" src="${ post.image.src }" alt =" ${ post.image.alt }">
<div class="px-6 pt-6 pb-4">
    <h1 class="font-bold text-xl mb-2">${ post.title }</h1>
    <p class="text-gray-700 text-base">${ post.text }</p>
</div>
<div class="px-6 flex items-center">
    <img class="w-10 h-10 rounded-full mr-4" src="${ post.author.src }" alt="${ post.author.alt }">
    <div class="text-sm">
        <p class="text-gray-700 leading-none">${ post.author.name }</p>
        <p class="text-gray-700">${ post.date.toDate ? post.date.toDate().toDateString() : post.date }</p>
    </div>
</div>
<div class="px-6 pb-6 pt-4">
    <div class="text-sm">
        <p class="text-gray-700 leading-none">${ post.location.city}, ${ post.location.country }</p>
    </div>
</div>
</div>`

// iterate through firebase ordered by city name
const db = firebase.firestore();
db.collection("post").orderBy("location.city").get().then((mark) => {
    mark.forEach((post) => {
        const json = post.data();
        const div = document.createElement("div");
        div.innerHTML = blogPost(json);
        content.append(div.firstChild);
    });
});

// Create new blog post
const createNewBlogPost = (e) => {
    // parameter e when using addEventListener
    e.preventDefault();
    // get values from form
    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;
    const image = document.getElementById("image").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const lat = document.getElementById("coordinates-lat").value;
    const lng = document.getElementById("coordinates-lng").value;
    const date = new Date();

    // send to Firestore
    db.collection("post").add({
        title: title,
        text: text,
        image: {
            src: image,
            alt: city
        },
        location: {
            city: city,
            country: country,
            coordinates: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
        },
        author: {
            name: "Eva Dressel",
            //name: name + "Dressel",
            src: "img/myAvatar.png",
            alt: "Avatar of Eva Dressel"
            //alt: "Avatar of " + name
        },
        date: date
    })
    .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = "admin.html";
    })
    .catch(error => {
        console.error("Error adding document: ", error);
    });
}

document.getElementById("newPostForm").addEventListener("submit", createNewBlogPost);

// Limit text input to 120 characters 
const textareaCounter = document.getElementById("textCounter");
const textarea = document.getElementById("text");
const buttonWarning = document.getElementById("btnDisabled");

const limitText = () => {
  textareaCounter.innerHTML = 120 + `/120`;
  let text_remaining = 10 - parseInt(textarea.value.length) -1;

  if (text_remaining < 0){
    textareaCounter.classList.add("text-red-500");
    document.getElementById("myBtn").disabled = true;
    //console.log("Button disabled");
    buttonWarning.innerHTML = `Your text needs to be <= 120 characters.`;
  } else {
    textareaCounter.classList.remove("text-red-500");
    document.getElementById("myBtn").disabled = false;
    //console.log("Button enabled");
    buttonWarning.innerHTML =``;
  } 
  textareaCounter.innerHTML = text_remaining + `/120`;
};
textarea.addEventListener("keydown", limitText, true);

/* COMMENT: Remaining problem:
   The number does not go back to 120 but only to 119 bc I subtracted 1 from text_remaining
   OR
   The first character is not recorded without subtracting 1 */








// get image url from firebase storage
/*const imageurl = () => {
    const storage = firebase.storage();
    const imageRef = storage.ref().child(`Images/Dahab.jpg`);   //Images/${city}.jpg      ${json.location.city}

    imageRef.getDownloadURL().then(function(url) {
    //storedImage = url;
    //console.log(storedImage)
    var img = document.getElementById('myimg');
    img.src = url;
    }).catch(function(error) {
      switch (error.code) {
        case 'storage/object-not-found':
          break;
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    });
}  */ 

//const imageRef = storage.ref().child(`Images/${json.location.city}.jpg`);
