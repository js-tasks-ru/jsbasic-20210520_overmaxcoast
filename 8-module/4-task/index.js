import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
  
  addProduct( product ) {
    if ( this.cartItems.some( item => item.product.id == product.id ) ) {
      this.updateProductCount( product.id, 1 );
      
    } else {
      const length = this.cartItems.push({
        product: product,
        count: 1
      });
      this.onProductUpdate( this.cartItems[ length - 1 ] );
    }
  }
  
  updateProductCount( productId, amount ) {
    const prop = this.cartItems.find( item => item.product.id === productId );
    
    if ( (prop.count += amount) < 1 )
      this.cartItems = this.cartItems.filter( item => item.count > 0 );
    
    this.onProductUpdate(prop);
  }
  
  isEmpty = () => this.cartItems.length === 0 ? true : false;
  
  getTotalCount = () => this.cartItems.reduce( (acc, x) => acc + x.count, 0 );
  
  getTotalPrice = () => this.cartItems.reduce( (acc, x) => acc + (x.product.price * x.count), 0 );
  
  renderProduct(product, count) {
    return `
      <div class="cart-product" data-product-id="${ product.id }">
        <div class="cart-product__img">
          <img src="/assets/images/products/${ product.image }" alt="product">
        </div>
        <div class="cart-product__info">
          <div class="cart-product__title">${ escapeHtml( product.name ) }</div>
          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>
              <span class="cart-counter__count">${ count }</span>
              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>
            <div class="cart-product__price">€${ (product.price * count).toFixed(2) }</div>
          </div>
        </div>
      </div>`;
  }
  
  renderOrderForm() {
    return `
      <form class="cart-form">
        <h5 class="cart-form__title">Delivery</h5>
        <div class="cart-form__group cart-form__group_row">
          <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
          <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
          <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
        </div>
        <div class="cart-form__group">
          <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
        </div>
        <div class="cart-buttons">
          <div class="cart-buttons__buttons btn-group">
            <div class="cart-buttons__info">
              <span class="cart-buttons__info-text">total</span>
              <span class="cart-buttons__info-price">€${ this.getTotalPrice().toFixed(2) }</span>
            </div>
            <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
          </div>
        </div>
      </form>`;
  }
  
  modalSub = suffix => this.modal.modal.querySelector(`.modal__${suffix}`);
  
  renderModal() {
    this.modal = new Modal();
    this.modalSub('title').textContent = 'Your order';
    this.modalDiv = this.modalSub('body').appendChild( document.createElement('div') );
    
    const modalSetLayout = txt => this.modalDiv.insertAdjacentHTML( 'beforeend', txt );
    
    this.cartItems.forEach( item =>
      modalSetLayout( this.renderProduct( item.product, item.count ) ) 
    );
    modalSetLayout( this.renderOrderForm() );
    
    this.modalDiv
      .querySelector('form')
      .addEventListener('submit', this.onSubmit.bind(this));
      
    this.modalDiv
      .addEventListener('click', this.onProductCountButton);
    
    this.modal.open();
  }
  
  onProductCountButton = ({target}) => {
    if ( target.closest('.cart-counter__button') ) {
      this.updateProductCount( 
        target.closest('[data-product-id]').dataset.productId, 
        target.closest('.cart-counter__button_minus') ? -1 : 1
      );
    }
  }
  
  onProductUpdate = cartItem => {
    this.cartIcon.update(this);
    
    if ( document.querySelector('.is-modal-open') ) {
      const producByDataNClass = cls => this.modalDiv.querySelector(`[data-product-id="${ cartItem.product.id }"] ${ cls }`);
      
      const productCount = producByDataNClass('.cart-counter__count');
      const productPrice = producByDataNClass('.cart-product__price');
      const infoPrice = this.modalDiv.querySelector('.cart-buttons__info-price');
      
      productCount.textContent = cartItem.count;
      productPrice.textContent = '€' + ( cartItem.product.price * cartItem.count ).toFixed(2);
      infoPrice.textContent = '€' + this.getTotalPrice().toFixed(2);
      
      if ( cartItem.count < 1 ) producByDataNClass('').remove(); 
    }
    if ( this.cartItems.length == 0 ) this.modal.close();
  }
  
  async onSubmit(event) {
    event.preventDefault();
    
    const form = this.modalDiv.querySelector('.cart-form');
    
    const submitButton = this.modalDiv.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');
    
    await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    });
    submitButton.classList.remove('is-loading');
    
    this.modalSub('title').textContent = 'Success!';
    this.modalDiv.innerHTML = this.onSubmitSuccessMessage();
    
    this.cartItems = [];
    this.cartIcon.update(this);
  };
  
  onSubmitSuccessMessage() {
    return `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `;
  }
}
