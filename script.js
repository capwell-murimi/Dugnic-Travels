const body = document.body;
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
let activeSlide = 0;

function nextSlide() {
    activeSlide++;
    if (activeSlide > slides.length - 1) {
        activeSlide = 0;
    }
    setBgToBody();
    setActiveSlide();
}

function setBgToBody() {
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage;
}

function setActiveSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[activeSlide].classList.add('active');
}

// Automatically advance to the next slide every 3 seconds
const intervalId = setInterval(nextSlide, 3000);

// Stop the auto-advance when left or right button is clicked
leftBtn.addEventListener('click', () => clearInterval(intervalId));
rightBtn.addEventListener('click', () => clearInterval(intervalId));

leftBtn.addEventListener('click', () => {
    activeSlide--;
    if (activeSlide < 0) {
        activeSlide = slides.length - 1;
    }
    setBgToBody();
    setActiveSlide();
});

rightBtn.addEventListener('click', () => {
    nextSlide();
});

setBgToBody();


/*document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('show'); // Toggle the .show class on nav-links
  });
}); */

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Toggle menu function
  function toggleMenu() {
      navLinks.classList.toggle('show'); // Toggle the .show class on nav-links
  }

  menuToggle.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent body click event from firing
      toggleMenu(); // Toggle menu when menu button is clicked
  });

  // Hide menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
          toggleMenu(); // Hide the menu
      });
  });

  // Hide menu when clicking elsewhere on the screen
  document.body.addEventListener('click', function(event) {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
          navLinks.classList.remove('show'); // Hide the menu if clicked outside of nav-links or menu-toggle
      }
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});