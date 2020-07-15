/***** HOMEWORK 2
Posts nicht von Firebase laden, sondern von node.js API /posts aus server.js*/
const content = document.getElementById("content");  
const blogPost = (post) =>
   `<div class="container mt-8 max-w-sm rounded-md overflow-hidden shadow-lg justify-center bg-yellow-300">
   <img id="myimg" class="w-full" src="${ post.image }">
   <div class="px-6 pt-6 pb-4">
       <h1 class="font-bold text-xl mb-2">${ post.title }</h1>
       <p class="text-gray-700 text-base">${ post.text }</p>
   </div>
   <div class="px-6 flex items-center">
       <img class="w-10 h-10 rounded-full mr-4" src="img/myAvatar.png">
       <div class="text-sm">
           <p class="text-gray-700 leading-none">post.author</p>
           <p class="text-gray-700">today</p>
       </div>
   </div>
   <div class="px-6 pb-6 pt-4">
       <div class="text-sm">
           <p class="text-gray-700 leading-none">${ post.city}, ${ post.country }</p>
       </div>
   </div>
   </div>`

// '/posts' aufrufen, response zu json transformieren, response json in content darstellen
const handleGetJson = () => {
    fetch('/posts', { method: 'GET'})
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.forEach((post) => {
                const div = document.createElement("div");
                div.innerHTML = blogPost(post);
                content.append(div.firstChild);
            });
        });
}
handleGetJson()

/***** HOMEWORK 3 
Posts aus MongoDB laden und nach MongoDB speichern */
const postButton = document.getElementById("myBtn");
const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const imageInput = document.getElementById("image");
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const latInput = document.getElementById("coordinates-lat");
const lngInput = document.getElementById("coordinates-lng");

postButton.addEventListener('click', () => {
    const post = {
        title: titleInput.value,
        text: textInput.value,
        image: imageInput.value,
        city: cityInput.value,
        country: countryInput.value,
        lat: latInput.value,
        lng: lngInput.value
    };
    fetch('/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 401) {
            response.text()
            .then(responseBody => alert(responseBody));
        }
    });
});






/*fetch(`posts?newJson=${JSON.stringify(newJson)}`)
    .then((response) => response.json())
    //.then((messages) => {console.log("messages");})
    //FEHLT VON CLEMENS*/