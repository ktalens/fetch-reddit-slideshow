const requestUrl = 'https://www.reddit.com/search.json?q='

const addImages = (searchItem,index)=> {
    //create a new image, set the source, append to slideDisplay div
    let imageSlide = document.createElement('img');
    imageSlide.setAttribute('src',searchItem);
    imageSlide.classList.add('slide');
    imageSlide.classList.add('hidden');
    imageSlide.id =index;
    slideDisplay.appendChild(imageSlide);
}

const fetchSlides = () => {
    fetch(requestUrl+input.value) //pending, resolved or rejected, then move onto the next...
        .then((responseData)=>{
            return responseData.json()
        })  
        .then((jsonData)=>{
            //<-- put the list-clearing loop here
            let item = jsonData.data.children
            item.forEach((child,index)=>{
                //console.log(index,child.data.url,child.data.thumbnail);
                addImages(child.data.thumbnail,index);
                //addImages(child.data.url,index);
                //if ((child.data.url).includes('i.imgur')){
                //    addImages(child.data.url,index);
                //} else {
                //    addImages(child.data.thumbnail,index);
                //}
            })
        })
        .catch((error)=>{
            console.log("oh no, theres been an error",error)
        })
}

var currentSlide = 0
const runSlideshow =()=> {
    let slides = document.querySelectorAll('.slide')
    slides[currentSlide].classList.remove('hidden');
    if (currentSlide>0) {
        slides[currentSlide-1].classList.add('hidden')
    } else if (currentSlide===0 ) {
        slides[(slides.length)-1].classList.add('hidden')
    }; 
    if (currentSlide<slides.length-1) {
        currentSlide += 1
    } else {
        currentSlide = 0
    }
}





document.addEventListener('DOMContentLoaded',() => {
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        console.log('user input is: '+input.value)
        fetchSlides();
    document.getElementById('GO').addEventListener('click',
        function(e) {
            e.preventDefault();
            setInterval(runSlideshow,2000)
        })
    })
    
})