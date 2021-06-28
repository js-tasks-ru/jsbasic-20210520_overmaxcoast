import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  
  constructor(categories) {
    this._categories = categories;
    this._shift = 350;
    
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.elem.innerHTML = 
      this._layoutRibbonArrow('left') + 
      this._layoutCategories() + 
      this._layoutRibbonArrow('right'); 
      
    this._initRibbon();
  }
  
  _layoutRibbonArrow(way) {
    return `
      <button class="ribbon__arrow ribbon__arrow_${ way }">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;
  }
  
  _layoutCategories() {
    let aList = this._categories
      .map( item => `<a href="#" class="ribbon__item" data-id="${ item.id }">${ item.name }</a>` )
      .join('');
    return '<nav class="ribbon__inner">' + aList + '</nav>';
  }
  
  _ribbon = suffix => this.elem.querySelector(`.ribbon__${suffix}`);
  
  _initRibbon() {
    this._ribbon('arrow_right').classList.add('ribbon__arrow_visible');
    this.elem.addEventListener('click', this._onClickEvent);
  }
  
  _onClickEvent = event => {
    const aim = event.target;
    
    if ( aim.classList.contains('ribbon__item') )
      this._clickOnItem( aim );
    
    if ( aim.classList.contains('ribbon__arrow_left') )
      this._clickOnArrow( -1 );
    
    if ( aim.classList.contains('ribbon__arrow_right') )
      this._clickOnArrow( 1 );
  }
  
  _clickOnItem = (aimNew) => {
    event.preventDefault();
    
    const aimOld = this._ribbon('item_active');
    
    if ( aimOld !== aimNew ) {
      if ( aimOld !== null )
        aimOld.classList.remove('ribbon__item_active');
      aimNew.classList.add('ribbon__item_active');
      
      this._dispatchCustomEvent(aimNew);
    }
  }
  
  _clickOnArrow = multiplier => {
    const shift = this._shift;
    const arrowStyleSwitch = (scroll, mul, way) => {
      if ( scroll + ( mul * shift ) <= 1 ) {
        this._ribbon(`arrow_${way}`).classList.remove('ribbon__arrow_visible');
      } else {
        this._ribbon(`arrow_${way}`).classList.add('ribbon__arrow_visible');
      }
    }
    let menuWidth = 
      this._ribbon('inner').scrollWidth -
      this._ribbon('inner').clientWidth;
    
    let scrollLeft = this._ribbon('inner').scrollLeft;
    let scrollRight = menuWidth - scrollLeft;
    
    arrowStyleSwitch(scrollLeft, multiplier, 'left');
    arrowStyleSwitch(scrollRight, -multiplier, 'right');
    
    this._ribbon('inner').scrollBy( shift * multiplier, 0 );
  }
  
  _dispatchCustomEvent = aim => {
    const itemChosen = new CustomEvent('ribbon-select', {
      detail: aim.dataset.id,
      bubbles: true
    });
    this.elem.dispatchEvent(itemChosen);
  }
}
