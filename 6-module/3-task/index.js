import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  
  constructor(slides) {
    this._slides = slides;
    
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.elem.innerHTML = 
      this._layoutArrows() + 
      this._layoutSlides();
    
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
    let slidesStack = this._slides
      .map(item => `
        <div class="carousel__slide" data-id="${ item.id }">
          <img src="/assets/images/carousel/${ item.image }" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${ item.price.toFixed(2) }</span>
            <div class="carousel__title">${ item.name }</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`)
      .join('');
      
    return '<div class="carousel__inner">' + slidesStack + '</div>';
  }
  
  _carousel = suffix => this.elem.querySelector(`.carousel__${suffix}`);
  
  _initCarousel() {
    let currentSlide = 0;
    
    this._slidesCount = this._carousel('inner').querySelectorAll('.carousel__slide').length;
    this._carousel('arrow_left').style.display = 'none';
    
    this.elem.addEventListener('click', event => {
      const slidesWidth = this._carousel('slide').offsetWidth;
      const clickLocClass = event.target.classList;
      
      if ( clickLocClass.contains('carousel__button') ) 
          this._dispatchCustomEvent( currentSlide );
        
      if ( clickLocClass.contains('carousel__arrow_left') ) 
          this._arrowStyleSwitcher( --currentSlide );
        
      if ( clickLocClass.contains('carousel__arrow_right') ) 
          this._arrowStyleSwitcher( ++currentSlide );
      
      this._carousel('inner').style.transform = 'translateX(-' + currentSlide * slidesWidth + 'px)';
    });
  }
  
  _arrowStyleSwitcher = num => {
    this._carousel('arrow_left').style.display = num == 0 ? 'none' : '' ;
    this._carousel('arrow_right').style.display = num == this._slidesCount - 1 ? 'none' : '' ;
  }
  
  _dispatchCustomEvent = num => {
    const addItemToCart = new CustomEvent('product-add', {
      detail: this._slides[num].id,
      bubbles: true
    });
    this.elem.dispatchEvent( addItemToCart );
  }
}
