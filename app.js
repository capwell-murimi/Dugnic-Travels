
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
itemActive = itemActive + 1;
if(itemActive >= countItem){
itemActive = 0;
}
showSlider();
}
//event prev click
prev.onclick = function(){
itemActive = itemActive - 1;
if(itemActive < 0){
itemActive = countItem - 1;
}
showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
next.click();
}, 5000)
function showSlider(){
// remove item active old
let itemActiveOld = document.querySelector('.slider .list .item.active');
let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
itemActiveOld.classList.remove('active');
thumbnailActiveOld.classList.remove('active');

// active new item
items[itemActive].classList.add('active');
thumbnails[itemActive].classList.add('active');

// clear auto time run slider
clearInterval(refreshInterval);
refreshInterval = setInterval(() => {
next.click();
}, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
thumbnail.addEventListener('click', () => {
itemActive = index;
showSlider();
})
})

// Function to check if an element is in the viewport
function isInViewport(element) {
const rect = element.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
}

// Function to handle the scroll event
// Function to handle the intersection observer callback
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}

// Create an Intersection Observer
const testimonialsObserver = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

// Observe the testimonials section
const testimonialsSection = document.getElementById('testimonials');
testimonialsObserver.observe(testimonialsSection);
