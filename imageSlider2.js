// imageSlider.js

/**
 * This is after refactoring the handling of next and prev button clicks
 * and refactoring the handling of nav dot buttons
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

function getNextImageIndex(currentIndex, direction) {
  if (direction === 'next') {
    return (currentIndex + 1) % images.length;
  } else if (direction === 'prev') {
    return (currentIndex - 1 + images.length) % images.length; 
  }
}

function updateNavigationDots(newIndex) {
  navDotButtons.forEach((button, index) => {
    if (index === newIndex) {
      button.classList.add('current');
    } else {
      button.classList.remove('current');
    } 
  });
}

function updateImageSlider(selectedImageIndex) {
  const selectedImage = images[selectedImageIndex];
  currentImage = selectedImage.position;

  imageContainer.style.setProperty('transform', selectedImage.position);
  updateNavigationDots(selectedImageIndex);
}

function handleButtonClick(direction) {
  clearInterval(intervalId);
  const currentIndex = images.findIndex((image) => image.position === currentImage);
  const newIndex = getNextImageIndex(currentIndex, direction);
  updateImageSlider(newIndex);
  startAutoImageSlide();
}

prevButton.addEventListener('click', () => {
  handleButtonClick('prev');
});

nextButton.addEventListener('click', () => {
  handleButtonClick('next');
});

function handleNavDotButtonClick() {
  navDotButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      clearInterval(intervalId);
      updateImageSlider(index);
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
  handleNavDotButtonClick();
  startAutoImageSlide();
}

initializeEventListeners();