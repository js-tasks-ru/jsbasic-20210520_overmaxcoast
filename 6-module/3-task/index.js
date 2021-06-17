import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  
  constructor(slides) {
    this._slides = slides;
    
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.elem.innerHTML = this._layoutArrows() + this._layoutSlides();
    
    this._initCarousel();
  }
  
  _layoutArrows() {
    return `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `;
  }
  
  _layoutSlides() {
    let slidesStack = this._slides.map(item => `
      <div class="carousel__slide" data-id="${ item.id }">
        <img src="/assets/images/carousel/${ item.image }" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${ item.price.toFixed(2) }</span>
          <div class="carousel__title">${ item.name }</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
    return '<div class="carousel__inner">' + slidesStack + '</div>';
  }
  
  _initCarousel() {
    const carousel = this.elem;
    const carouselInner = carousel.querySelector('.carousel__inner');
    const arrowR = carousel.querySelector('.carousel__arrow_right');
    const arrowL = carousel.querySelector('.carousel__arrow_left');
    const slidesCount = carouselInner.querySelectorAll('.carousel__slide').length;
    let currentSlide = 0;
    
    arrowL.style.display = 'none';
    
    carousel.addEventListener('click', event => {
      const slidesWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;
      const clickLocClass = event.target.classList;
      
      if ( clickLocClass.contains('carousel__button') ) {
        const addItemToCart = new CustomEvent('product-add', {
          detail: this._slides[currentSlide].id,
          bubbles: true
        });
        carousel.dispatchEvent(addItemToCart);
      } else if (clickLocClass.contains('carousel__arrow_left')) {
        arrowL.style.display = --currentSlide == 0 ? 'none' : '' ;
      } else if (clickLocClass.contains('carousel__arrow_right')) {
        arrowR.style.display = ++currentSlide == slidesCount - 1 ? 'none' : '' ;
      }
      carouselInner.style.transform = 'translateX(-' + currentSlide * slidesWidth + 'px)';
    });
  }
  
}
