const requestUrl = 'https://www.reddit.com/search.json?q=';

const addImages = (index,searchItem)=> {
    //create a new image, set the source, append to slideDisplay div
    let imageSlide = document.createElement('img');
    imageSlide.setAttribute('src',searchItem);
    imageSlide.classList.add('slide');
    imageSlide.classList.add('hidden');
    imageSlide.id =index;
    slideDisplay.appendChild(imageSlide);
};

// const checkUrl  = (index, source)=> {
//     //TESTING IMAGE LINKS
//     let listSource = document.createElement('li');
//     let testImage = document.createElement('img');
//     testImage.setAttribute('src',source);
//     listSource.appendChild(testImage);
//     tempList.appendChild(listSource);
// };

const fetchSlides = () => {
    fetch(requestUrl+input.value) //pending, resolved or rejected, then move onto the next...
        .then((responseData)=>{
            return responseData.json()
        })  
        .then((jsonData)=>{
            //<-- put the list-clearing loop here
            loading.style.display = 'none';
            let item = jsonData.data.children;
            item.forEach((child,index)=>{
            //check which image address to use 
                if (child.data.rpan_video) {
                    addImages(index,child.data.rpan_video.scrubber_media_url)
                } else  if (child.data.url.includes('//i.redd')) {
                    addImages(index,child.data.url);
                } else if (child.data.thumbnail.includes('//b.thumbs.')) {
                    addImages(index,child.data.thumbnail);
                }
             })
        })
        .catch((error)=>{
            console.log("ERROR MESSAGE: ",error)
        })
};

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
};





document.addEventListener('DOMContentLoaded',() => {
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        loading.style.display = 'block';
        console.log('user input is: '+input.value)
        fetchSlides();
    document.getElementById('GO').addEventListener('click',
        function(e) {
            e.preventDefault();
            setInterval(runSlideshow,2000)
        })
    })
    
    
})