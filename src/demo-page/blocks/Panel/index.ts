import * as $ from 'jquery';
import Panel from './Panel';

const parameters = [
  {
    minValue: 0,
    maxValue: 1000,
    step: 1,
    isVertical: false,
    isRange: false,
    showLabel: true,
    isFloat: false,
    initMinValue: 200,
    initMaxValue: 777
  },
  {
    minValue: -1000,
    maxValue: 0,
    step: 100,
    isVertical: false,
    isRange: true,
    showLabel: true,
    isFloat: false
  },
  {
    minValue: 0,
    maxValue: 1,
    step: 0.05,
    isVertical: true,
    isRange: false,
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

$('.js-panel').each((index, elem) => {
  // eslint-disable-next-line no-new
  new Panel(elem, parameters[index]);
});
