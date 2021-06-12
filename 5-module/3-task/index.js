function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselInner = carousel.querySelector('.carousel__inner');
  
  const arrowR = carousel.querySelector('.carousel__arrow_right');
  const arrowL = carousel.querySelector('.carousel__arrow_left');
  
  const slidesCount = carouselInner.querySelectorAll('.carousel__slide').length;
  const slidesWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;
  
  let currentSlide = 0;
  
  arrowL.style.display = 'none';
  
  carousel.addEventListener('click', event => {
    event
      .target
      .closest('.carousel__arrow')
      .classList
      .contains('carousel__arrow_left') 
        ? ( currentSlide--, arrowL.style.display = currentSlide == 0 ? 'none' : '' )  
        : ( currentSlide++, arrowR.style.display = currentSlide == slidesCount - 1 ? 'none' : '' );
    carouselInner.style.transform = 'translateX(-' + (currentSlide * slidesWidth) + 'px)';
  });
}
