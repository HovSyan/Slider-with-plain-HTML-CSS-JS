(function () {
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.dots-container');
const imagesURLs = [
  'sources/1.jpg', 'sources/2.jpg', 'sources/3.jpg', 'sources/4.jpg'
];
let currentImageIndex = 0;
const visibleImage = getImage(imagesURLs[currentImageIndex]);
const prev = getPrev();
const next = getNext();
sliderContainer.innerHTML = prev + visibleImage + next

imagesURLs.forEach(img => dotsContainer.appendChild(getDotForImage(img)));
dotsContainer.children[currentImageIndex].classList.add('selected-dot');

function getImage(url) {
  return `<div class="image inline" style="background-image: url(${url})"></div>`
}

function getPrev() {
  return `<div class="prev inline"></div>`
}

function getNext() {
  return `<div class="next inline"></div>`
}

function getDotForImage(image) {
  const dot = document.createElement('span');

  dot.className = 'dot';
  dot.addEventListener('click', () => {
    if(dot.classList.contains('selected-dot')) return;

    changeVisibleImage(image)
    changeSelectedDot(dot);
  });

  return dot;
}

function changeVisibleImage(imageToShow) {
  const imageToShowIndex = imagesURLs.indexOf(imageToShow);

  if(imageToShowIndex === currentImageIndex) return;

  imageToShowIndex < currentImageIndex ? showInPrev(imageToShow) : showInNext(imageToShow);
}

function changeSelectedDot(dot) {
  const selectedDot = document.querySelector('.selected-dot');

  if(selectedDot === dot) return;

  dot.classList.add('selected-dot');
  selectedDot.classList.remove('selected-dot');
}

function showInPrev(imageToShow) {
  const prev = document.querySelector('.prev');
  const current = document.querySelector('.image');

  let step = 0;
  prev.style.backgroundImage = `url(${imageToShow})`;
  prev.style.transform = 'translateX(-100%)';
  prev.classList.add('image');

  current.style.transform = 'translateX(-100%)';

  (function updateView() {
    if(step > 100) {
      updateCurrentImageFromPrev(current, prev)
      currentImageIndex = imagesURLs.indexOf(imageToShow);
      return;
    }

    current.style.transform = `translateX(${step - 100}%)`;
    prev.style.transform = `translateX(${step - 100}%)`;
    step += 5;
    requestAnimationFrame(updateView);
  })()
}

function showInNext(imageToShow) {
  const next = document.querySelector('.next');
  const current = document.querySelector('.image');

  let step = 0;
  next.style.backgroundImage = `url(${imageToShow})`;
  next.classList.add('image');

  (function updateView() {
    if(step > 100) {
      updateCurrentImageFromNext(current, next)
      currentImageIndex = imagesURLs.indexOf(imageToShow);
      return;
    }

    current.style.transform = `translateX(-${step}%)`;
    next.style.transform = `translateX(-${step}%)`;
    step += 5;
    requestAnimationFrame(updateView);
  })();
}

function updateCurrentImageFromNext(current, next) {
  current.parentNode.removeChild(current);
  next.classList.remove('next');
  next.style.transform = '';
  const newNext = getNext();
  next.parentNode.innerHTML += newNext;
}

function updateCurrentImageFromPrev(current, prev) {
  current.parentNode.removeChild(current);
  prev.classList.remove('prev');
  prev.style.transform = '';
  const newPrev = getPrev();
  prev.parentNode.innerHTML = newPrev + prev.parentNode.innerHTML;
}
})();
