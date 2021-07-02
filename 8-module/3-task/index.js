export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }
  
  addProduct( product ) {
    if ( this.cartItems.some( item => item.product.id == product.id ) ) {
      this.updateProductCount( product.id, 1 );
      
    } else {
      const length = this.cartItems.push({
        product: product,
        count: 1
      });
      this.onProductUpdate( this.cartItems[length - 1] );
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
  
  onProductUpdate = cartItem => this.cartIcon.update(this);
}
