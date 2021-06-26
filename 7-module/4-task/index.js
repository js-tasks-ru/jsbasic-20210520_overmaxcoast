export default class StepSlider {
  
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value; 
    
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = this._layout();
    
    this._eventChainInit();
  }
  
  _layout() {
    return `
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">0</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps">
        <span class="slider__step-active"></span>
        ${'<span class></span>'.repeat(this._steps - 1)}
      </div>
    `;
  }
  
  _slider = suffix => this.elem.querySelector(`.slider__${suffix}`);
  
  _eventChainInit() {
    this._slider('thumb').ondragstart = () => false;
    this._slider('thumb').style.position = 'absolute';
    this._slider('thumb').style.zIndex = 1000;
    this._slider('thumb').addEventListener('pointerdown', this._onPointerDown);
    
    this.elem.addEventListener('click', this._onClick);
  }
  
  _onPointerDown = eventDown => {
    eventDown.preventDefault();
    
    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
  }
  
  _onPointerMove = eventMove => {
    eventMove.preventDefault();
    
    this.elem.classList.add('slider_dragging');
    
    const sliderRect = this.elem.getBoundingClientRect();
    const sliderSegments = this._steps - 1;
    
    const shiftByWidth = (eventMove.clientX - sliderRect.left) / this.elem.offsetWidth;
    const rawValue = Math.round( shiftByWidth * sliderSegments );
    
    this._value = numLimiter(rawValue, sliderSegments);
    this._slider('progress').style.width = numLimiter(shiftByWidth, 1) * 100 + '%';
    this._slider('thumb').style.left = numLimiter(shiftByWidth, 1) * 100 + '%';
    this._slider('value').textContent = this._value;
    
    this._stepClassSwitcher();
    
    function numLimiter(shift, x) {
      if (shift < 0) shift = 0;
      if (shift > x) shift = x;
      return shift;
    }
  }
  
  _onPointerUp = eventUp => {
    document.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerup', this._onPointerUp);
    
    this.elem.classList.remove('slider_dragging');
    
    this._customEvent();
  }
  
  _onClick = eventClick => {
    const sliderRect = this.elem.getBoundingClientRect();
    const sliderSegments = this._steps - 1;
    
    this._value = Math.round( (eventClick.clientX - sliderRect.left) / this.elem.offsetWidth * sliderSegments );
    this._slider('value').textContent = this._value;
    
    this._stepClassSwitcher();
    this._thumbMagnetToSocket();
    this._customEvent();
  }
  
  _stepClassSwitcher = () => {
    const sliderSegmentOld = this._slider('step-active');
    const sliderSegmentNew = this._slider('steps').children.item( this._value );
    
    if (sliderSegmentNew == sliderSegmentOld) {
      this._sameValue = true;
    } else {
      sliderSegmentOld.classList.remove('slider__step-active');
      sliderSegmentNew.classList.add('slider__step-active');
      this._sameValue = false;
    }
  }
  
  _thumbMagnetToSocket = () => {
    const percentsByValue = 100 * this._value / ( this._steps - 1 );
    
    this._slider('thumb').style.left = Math.round( percentsByValue ) + '%';
    this._slider('progress').style.width = Math.round( percentsByValue ) + '%';
  }
  
  _customEvent = () => {
    const changeSlideEvent = new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true
    });
    if (!this._sameValue) this.elem.dispatchEvent(changeSlideEvent);
  }
}
