/* global $ */

import SliderWrapper from './blocks/slider-wrapper/Slider-wrapper';

const parameters = [
  { showLabel: true },
  {
    minValue: -1000,
    maxValue: 0,
    step: 100,
    isRange: true,
    showLabel: true
  },
  {
    minValue: 0,
    maxValue: 1,
    step: 0.05,
    isVertical: true,
    showLabel: true,
    isFloat: true
  },
  {
    minValue: -3,
    maxValue: 0,
    step: 0.1,
    isRange: true,
    isVertical: true,
    showLabel: true,
    isFloat: true
  }
];

$('.js-slider-wrapper').each((index, elem) => {
  new SliderWrapper(elem, parameters[index]);
});
