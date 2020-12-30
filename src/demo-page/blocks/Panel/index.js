/* global $ */

import Panel from './Panel';

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

$('.js-panel').each((index, elem) => {
  // eslint-disable-next-line no-new
  new Panel(elem, parameters[index]);
});
