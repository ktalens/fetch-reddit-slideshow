const requestUrl = 'https://www.reddit.com/search.json?q=kittens'

const addImages = (searchItem)=> {
    //create a new image, set the source, append to ul
    let imageSlide = document.createElement('img');
    imageSlide.setAttribute('src',searchItem);
    imageSlide.style.height = '200px';
    slideShow.appendChild(imageSlide)
}

const fetchSlides = () => {
    fetch(requestUrl) //pending, resolved or rejected, then move onto the next...
        .then((responseData)=>{
            return responseData.json()
        })  
        .then((jsonData)=>{
            //<-- put the list-clearing loop here
            let item = jsonData.data.children
            item.forEach((child,index)=>{
                //console.log(index,child.data.url,child.data.thumbnail);
                addImages(child.data.thumbnail);
            })
        })
        .catch((error)=>{
            console.log("oh no, theres been an error",error)
        })
}

document.addEventListener('DOMContentLoaded',() => {
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        console.log('user input is: '+input.value)
        fetchSlides();
    })
})