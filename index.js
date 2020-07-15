// env.js has firebase config keys
// contact.js has user information

//******************* BRAUCHE ICH DAS?*******************************
//*******************************************************************
//fetch(`./public/bigproject1/index.html`);
//*******************************************************************
//*******************************************************************

let map;
const content = document.getElementById("content");

// Blog cards
const blogPost = (post) =>
`<div class="container mx-auto max-w-sm max-h-8 rounded-md overflow-hidden shadow-lg justify-center bg-yellow-300">
<img class="w-full" src="${ post.image.src }" alt =" ${ post.image.alt }">
<div><div class="p-6">
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
</div>
</div>`

// Map and marker
function initMap() {
    const db = firebase.firestore();

    const infoWindows = [];

    const hamburg = {lat: 53.651920, lng: 9.817860};
    map = new google.maps.Map(document.getElementById('map'), {
        center: hamburg,
        zoom: 3
    });
    
    db.collection("post").get().then((mark) => {
        mark.forEach((post) => {
            const json = post.data();
            //console.log("title", json.title)
            const placeInfo = blogPost(json);

            let infowindow = new google.maps.InfoWindow({
                content: placeInfo
            })

            const marker = new google.maps.Marker({
                position: json.location.coordinates,
                map: map,
                title: json.title
            })

            const closeInfoWindows = () => {
                for (let i = 0; i < infoWindows.length; i++) {
                    const infoWindow = infoWindows[i];
                    infoWindow.close();
                }
            }
    
            marker.addListener('click', () => {
                closeInfoWindows();
                infowindow.open(map, marker);
            });

            map.addListener("click", () => {
                closeInfoWindows();
            });

            infoWindows.push(infowindow);
        });
    });
}
initMap();











// IMAGES IN FIREBASE STORAGE

//const storage = firebase.storage();
//const storageRef = storage.ref();
//storageRef.fullPath;
    







// NICHT MEHR GEBRAUCHT

// BLOG CONTENT IN LOCAL ARRAY
/*const post = [
    {
        title: "Two Brothers",
        text: "Lorem Impsum",
        image: {
            src: "img/Rio de Janeiro.jpg",
            alt: "Rio de Janeiro"
        },
        location: {
            city: "Rio de Janeiro",
            country: "Brazil",
            coordinates: {lat: -22.986726, lng: -43.203588}
        },
        author: {
            src: "img/myAvatar.png",
            name: "Eva Dressel",
            alt: "Avatar Eva Dressel"
        }
    },
    {
        title: "Mountains By The Sea",
        text: "Lorem Impsum",
        image: {
            src: "img/Dahab.jpg",
            alt: "Dahab"
        },
        location: {
            city: "Dahab",
            country: "Egypt",
            coordinates: {lat: 28.488930, lng: 34.501560}
        },
        author: {
            src: "img/myAvatar.png",
            name: "Eva Dressel",
            alt: "Avatar Eva Dressel"
        }    
    }
]*/

// REINE BLOGPOSTS VON const post AUF SEITE 
/*for (let i = 0; i < post.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = blogPost(post[i]);
    content.append(div.firstChild);
}*/

// BLOGPOSTS VON FIREBASE AUF SEITE
/*const db = firebase.firestore();
db.collection("post").get().then((mark) => {
    mark.forEach((post) => {
        const json = post.data();

        const div = document.createElement("div");
        div.innerHTML = blogPost(json);
        content.append(div.firstChild);
    });
});*/

// INFO WINDOWS AUS LOCAL ARRAY
//const infoWindows = new Array(post.length);
/*for (let i = 0; i < post.length; i++) {
        const placeInfo = blogPost(post[i]);

        let infowindow = new google.maps.InfoWindow({
            content: placeInfo
        });

        const marker = new google.maps.Marker({
            position: post[i].location.coordinates,
            map: map,
            title: post[i].title
        });

        marker.addListener('click', () => {
            closeInfoWindows();
            infowindow.open(map, marker);
        });
        infoWindows[i] = infowindow;
    }
}
*/
/*const closeInfoWindows = () => {
    for (let i = 0; i < infoWindows.length; i++) {
        const infoWindow = infoWindows[i];
        infoWindow.close();
    }
}*/