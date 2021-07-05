import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.blockCarousel = new Carousel( slides );
    this.blockRibbon = new RibbonMenu( categories );
    this.blockSlider = new StepSlider({ steps: 5, value: 3 });
    this.blockCartIcon = new CartIcon();
    this.blockCart = new Cart( this.blockCartIcon );
  }

  async render() {
    const incrust = ( block, suffix ) => {
      document
        .querySelector(`[data-${ suffix }-holder]`)
        .append( block.elem );
    }
    incrust( this.blockCarousel, 'carousel' );
    incrust( this.blockRibbon, 'ribbon' );
    incrust( this.blockSlider, 'slider' );
    incrust( this.blockCartIcon, 'cart-icon' );
    
    await this.initProductsGrid();
    
    document.querySelector('.products-grid').remove();
    incrust( this.blockGrid, 'products-grid' );
    
    this.initFilterDefaults();
    this.initEventListeners();
  }
  
  async initProductsGrid() {
    const response = await fetch('products.json');
    
    this.productsArray = await response.json();
    this.blockGrid = new ProductsGrid( this.productsArray );
  }
  
  initFilterDefaults() {
    this.blockGrid.updateFilter({
      
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      
      maxSpiciness: this.blockSlider.value,
      category: this.blockRibbon.value
    });
  }
  
  initEventListeners() {
    
    document
      .body
      .addEventListener(
        'product-add', 
        ({ detail: id }) => {
          const product = this.productsArray.find( item => item.id == id );
          this.blockCart.addProduct( product );
        }
      );
    
    document
      .querySelector('#nuts-checkbox')
      .addEventListener(
        'change',
        ({ target }) => this.blockGrid.updateFilter({ noNuts: target.checked })
      );
    
    document
      .querySelector('#vegeterian-checkbox')
      .addEventListener(
        'change',
        ({ target }) => this.blockGrid.updateFilter({ vegeterianOnly: target.checked })
      );
    
    this.blockSlider
      .elem
      .addEventListener(
        'slider-change',
        ({ detail: value }) => this.blockGrid.updateFilter({ maxSpiciness: value })
      );
    
    this.blockRibbon
      .elem
      .addEventListener(
        'ribbon-select',
        ({ detail: id }) => this.blockGrid.updateFilter({ category: id })
      );
  }
}
