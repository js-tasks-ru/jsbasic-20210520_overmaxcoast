import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  
  constructor(categories) {
    this._categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.elem.innerHTML = 
      this._layoutRibbonArrow('left') + 
      this._layoutCategories() + 
      this._layoutRibbonArrow('right'); 
    this._clickEvents();
  }
  
  _layoutRibbonArrow(way) {
    return `
      <button class="ribbon__arrow ribbon__arrow_${ way }">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;
  }
  
  _layoutCategories() {
    let aList = this._categories.map(item => 
      `<a href="#" class="ribbon__item" data-id="${ item.id }">${ item.name }</a>` 
    );
    return '<nav class="ribbon__inner">' + aList + '</nav>';
  }
  
  _clickEvents() {
    const ribbon = this.elem;
    const ribbonInner = ribbon.querySelector('.ribbon__inner');
    const scrollWidth = ribbonInner.scrollWidth;
    const arrowL = ribbon.querySelector('.ribbon__arrow_left');
    const arrowR = ribbon.querySelector('.ribbon__arrow_right');
    arrowR.classList.add('ribbon__arrow_visible');
    
    ribbon.addEventListener('click', e => {
      const aim = e.target;
      const showMe = item => {
        if (!(item.classList.contains('ribbon__arrow_visible')))
          item.classList.add('ribbon__arrow_visible');
      }

      if (aim.classList.contains('ribbon__item')) {
        e.preventDefault();
        
        const itemLastActive = ribbonInner.querySelector('.ribbon__item_active');
        if (itemLastActive !== null)
          itemLastActive.classList.remove('ribbon__item_active');
        aim.classList.add('ribbon__item_active');
          
        const itemChosen = new CustomEvent('ribbon-select', {
          detail: aim.dataset.id,
          bubbles: true
        });
        ribbon.dispatchEvent(itemChosen);
        
      } else if (aim.classList.contains('ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0);
        ribbonInner.scrollLeft === 0 
          ? arrowL.classList.remove('ribbon__arrow_visible') 
          : showMe(arrowR);
          
      } else if (aim.classList.contains('ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0);
        ribbonInner.scrollLeft === scrollWidth 
          ? arrowR.classList.remove('ribbon__arrow_visible') 
          : showMe(arrowL);
      }
    });
  }
}
