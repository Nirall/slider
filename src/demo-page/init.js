/* global $ */

const handleCurrentMinValueInputFocusout = (e) => {
  e.data.entry.omfgslider('setValues', { currentMinValue: parseFloat(e.data.inputElement.val()) });
};

const handleCurrentMaxValueInputFocusout = (e) => {
  e.data.entry.omfgslider('setValues', { currentMaxValue: parseFloat(e.data.inputElement.val()) });
};

const handleMinValueInputFocusout = (e) => {
  e.data.entry.omfgslider('update', { minValue: parseFloat(e.data.inputElement.val()) });
};

const handleMaxValueInputFocusout = (e) => {
  e.data.entry.omfgslider('update', { maxValue: parseFloat(e.data.inputElement.val()) });
};

const handleStepInputFocusout = (e) => {
  e.data.entry.omfgslider('update', { step: parseFloat(e.data.inputElement.val()) });
};

const handleRangeButtonChange = (e) => {
  e.data.entry.omfgslider('update', { isRange: 'toggle' });
};

const handleVerticalButtonChange = (e) => {
  e.data.entry.omfgslider('update', { isVertical: 'toggle' });
};

const handleLabelButtonChange = (e) => {
  e.data.entry.omfgslider('update', { showLabel: 'toggle' });
};

const params = [
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

const slidersWrappers = $('.js-slider-wrapper');
slidersWrappers.each((index, elem) => {
  const slider = $(elem).find('.js-slider');
  slider.omfgslider(params[index]);
  const currentMinValueInput = $(elem).find('.js-minValueIn');
  const currentMaxValueInput = $(elem).find('.js-maxValueIn');
  const minValue = $(elem).find('.js-minValue');
  const maxValue = $(elem).find('.js-maxValue');
  const step = $(elem).find('.js-step');
  slider.omfgslider('inputsAttach', {
    minValueInput: currentMinValueInput,
    maxValueInput: currentMaxValueInput,
    maxValue: maxValue,
    minValue: minValue,
    step: step
  });
  slider.omfgslider('renew');

  currentMinValueInput.on('focusout', { entry: slider, inputElement: currentMinValueInput }, handleCurrentMinValueInputFocusout);
  currentMaxValueInput.on('focusout', { entry: slider, inputElement: currentMaxValueInput }, handleCurrentMaxValueInputFocusout);
  minValue.on('focusout', { entry: slider, inputElement: minValue }, handleMinValueInputFocusout);
  maxValue.on('focusout', { entry: slider, inputElement: maxValue }, handleMaxValueInputFocusout);
  step.on('focusout', { entry: slider, inputElement: step }, handleStepInputFocusout);

  $(elem).find('.js-range').on('change', { entry: slider }, handleRangeButtonChange);
  $(elem).find('.js-vertical').on('change', { entry: slider }, handleVerticalButtonChange);
  $(elem).find('.js-label').on('change', { entry: slider }, handleLabelButtonChange);
});
