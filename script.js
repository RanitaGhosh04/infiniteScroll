const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const API_KEY = 'RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw';
const API_URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;

// check if all images were loaded

function imageLoaded(){
    console.log(imagesLoaded);
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        loader.hidden = true;
        ready = true;
        console.log('ready = ',ready);
    }

    // console.log('image loaded');
}

// Helper function to Set Attributes on DOM 

function setAttributes(element,Attributes){
    for(const key in Attributes){
        element.setAttribute(key, Attributes[key]);
    }
}

function displayPhotos(){

    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images',totalImages);
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        
        setAttributes(item,{
            href:photo.links.html,
            target:'blank',  
        });
        const img = document.createElement('img');
        

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //Event Listener, check when each photo is finished loading
        img.addEventListener('load',imageLoaded);
        // put image inside a tag
        item.appendChild(img);
        // console.log(item);
        imageContainer.appendChild(item);
    });
}
async function getPhotos(){
    try{
        const response = await fetch(API_URL);
        photosArray = await response.json();
        displayPhotos();
        // console.log(photosArray);
    }

    catch(error){

    }
}


window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});
getPhotos();