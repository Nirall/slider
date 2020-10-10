import createElem from './createElem';

class Graduation {
  gradElem: HTMLElement;
  mark1: HTMLElement;
  mark2: HTMLElement;
  mark3: HTMLElement;
  mark4: HTMLElement;

  constructor() {
    this.gradElem = createElem('slider__graduation');
    this.mark1 = createElem('slider__graduation-mark');
    this.mark2 = createElem('slider__graduation-mark');
    this.mark3 = createElem('slider__graduation-mark');
    this.mark4 = createElem('slider__graduation-mark');
    this.gradElem.appendChild(this.mark1);
    this.gradElem.appendChild(this.mark2);
    this.gradElem.appendChild(this.mark3);
    this.gradElem.appendChild(this.mark4);
  }

  init = (minValue: number, maxValue: number, isVertical: boolean, isFloat = false): void => {
    this.mark1.innerHTML = minValue + '';
    this.mark4.innerHTML = maxValue + '';

    if (isFloat) {
      this.mark2.innerHTML = (minValue + (maxValue - minValue)/3).toFixed(2);
      this.mark3.innerHTML = (minValue + (maxValue - minValue)*2/3).toFixed(2);
    } else {
      this.mark2.innerHTML = minValue + Math.round((maxValue - minValue)/3) + '';
      this.mark3.innerHTML = minValue + Math.round((maxValue - minValue)*2/3) + '';
    }

    if (!isVertical) {
      this.mark1.classList.add('slider__graduation-mark_offset_left');
      this.mark1.classList.remove('slider__graduation-mark_offset_top');
      this.mark4.classList.add('slider__graduation-mark_offset_right');
      this.mark4.classList.remove('slider__graduation-mark_offset_bottom');
      this.gradElem.classList.remove('slider__graduation_position_vertical');
    } else {
      this.mark1.classList.remove('slider__graduation-mark_offset_left');
      this.mark1.classList.add('slider__graduation-mark_offset_top');
      this.mark4.classList.remove('slider__graduation-mark_offset_right');
      this.mark4.classList.add('slider__graduation-mark_offset_bottom');
      this.gradElem.classList.add('slider__graduation_position_vertical');
    }
  }
}

export default Graduation;