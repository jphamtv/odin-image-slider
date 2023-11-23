// imageSlider.js

/**
 * This is my original code 
 */

const images = [
  {
    id: 'img1',
    position: 'translate(100px)'
  },
  {
    id: 'img2',
    position: 'translate(-520px)'
  },
  {
    id: 'img3',
    position: 'translate(-1060px)'
  },
  {
    id: 'img4',
    position: 'translate(-1560px)'
  },
  {
    id: 'img5',
    position: 'translate(-2200px)'
  },
];

let currentImage = images[0].position;
let intervalId = null;

const prevButton = document.querySelector('.previous-image-btn')
const nextButton = document.querySelector('.next-image-btn');
const imageContainer = document.querySelector('.image-container');
const navDotButtons = document.querySelectorAll('.nav-dot');

function handleNextButtonClick() {
  nextButton.addEventListener('click', () => {
    let nextImage = '';
    let navDotId = '';
    clearInterval(intervalId);
    
    if (currentImage === images[0].position) {
      nextImage = images[1].position;
      navDotId = images[1].id;
      currentImage = nextImage;
    } else if (currentImage === images[1].position) {
      nextImage = images[2].position;
      navDotId = images[2].id;
      currentImage = nextImage;
    } else if (currentImage === images[2].position) {
      nextImage = images[3].position;
      navDotId = images[3].id;
      currentImage = nextImage;
    } else if (currentImage === images[3].position) {
      nextImage = images[4].position;
      navDotId = images[4].id;
      currentImage = nextImage;
    } else if (currentImage === images[4].position) {
      nextImage = images[0].position;
      navDotId = images[0].id;
      currentImage = nextImage;
    }

    navDotButtons.forEach((button) => {
      button.classList.remove('current');
    });
    
    imageContainer.style.setProperty('transform', nextImage);
    document.querySelector(`#${navDotId}`).classList.add('current');
    startAutoImageSlide();
  });
}

function handlePreviousButtonClick() {
  prevButton.addEventListener('click', () => {
    let prevImage = '';
    clearInterval(intervalId);

    if (currentImage === images[4].position) {
      prevImage = images[3].position;
      navDotId = images[3].id;
      currentImage = prevImage;
    } else if (currentImage === images[3].position) {
      prevImage = images[2].position;
      navDotId = images[2].id;
      currentImage = prevImage;
    } else if (currentImage === images[2].position) {
      prevImage = images[1].position;
      navDotId = images[1].id;
      currentImage = prevImage;
    } else if (currentImage === images[1].position) {
      prevImage = images[0].position;
      navDotId = images[0].id;
      currentImage = prevImage;
    } else if (currentImage === images[0].position) {
      prevImage = images[4].position;
      navDotId = images[4].id;
      currentImage = prevImage;
    }

    navDotButtons.forEach((button) => {
      button.classList.remove('current');
    });

    imageContainer.style.setProperty('transform', prevImage);
    document.querySelector(`#${navDotId}`).classList.add('current');
    startAutoImageSlide();
  });
}

function handleNavDotButtonClick() {
  navDotButtons.forEach((button) => {
    button.addEventListener('click', () => {
      clearInterval(intervalId);
      const imgId = button.getAttribute('id');
      const selectedImage = images.find((image) => image.id === imgId);
      currentImage = selectedImage.position;

      navDotButtons.forEach((button) => {
      button.classList.remove('current');
      });

      imageContainer.style.setProperty('transform', selectedImage.position);
      document.querySelector(`#${imgId}`).classList.add('current');
      startAutoImageSlide();
    });
  });
}

function triggerNextButtonClick() {
  nextButton.click();
}

function startAutoImageSlide() {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(triggerNextButtonClick, 5000);
}

function initializeEventListeners() {
  handleNextButtonClick();
  handlePreviousButtonClick();
  handleNavDotButtonClick();
  startAutoImageSlide();
}

initializeEventListeners();