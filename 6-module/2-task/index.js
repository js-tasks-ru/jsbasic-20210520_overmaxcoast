import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  
  constructor(product) {
    this.product = product;
    this.elem = createElement( this.layout() );
    
    this.clickEvent();
  }
  
  layout() {
    return `
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${ this.product.image }" class="card__image" alt="product">
          <span class="card__price">€${ this.product.price.toFixed(2) }</span>
        </div>
        <div class="card__body">
          <div class="card__title">${ this.product.name }</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }
  
  clickEvent() {
    const addItemToCart = new CustomEvent('product-add', {
      detail: this.product.id,
      bubbles: true
    });
    this.elem.addEventListener('click', event => {
      if (event.target.classList.contains('card__button'))
        this.elem.dispatchEvent(addItemToCart);
    });
  }
}
