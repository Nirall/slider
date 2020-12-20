/* global $ */

const handleCurrentMinValueInputFocusout = (e) => {
  const elementID = e.data.elementName;
  $(`${elementID}`).omfgslider('setValues', { currentMinValue: parseFloat(e.data.inputElement.val()) });
};

const handleCurrentMaxValueInputFocusout = (e) => {
  const elementID = e.data.elementName;
  $(`${elementID}`).omfgslider('setValues', { currentMaxValue: parseFloat(e.data.inputElement.val()) });
};

const handleMinValueInputFocusout = (e) => {
  const elementID = e.data.elementName;
  $(`${elementID}`).omfgslider('update', { minValue: parseFloat($(`${elementID} + .input-wrapper .minValue`).val()) });
};

const handleMaxValueInputFocusout = (e) => {
  const elementID = e.data.elementName;
  $(`${elementID}`).omfgslider('update', { maxValue: parseFloat($(`${elementID} + .input-wrapper .maxValue`).val()) });
};

const handleStepInputFocusout = (e) => {
  const elementID = e.data.elementName;
  $(`${elementID}`).omfgslider('update', { step: parseFloat($(`${elementID} + .input-wrapper .step`).val()) });
};

const handleRangeButtonChange = (e) => {
  const elementID = e.data.elementName;
  const conf = $(`${elementID}`).omfgslider('getConfig');
  if (conf.isRange === false) {
    $(`${elementID}`).omfgslider('update', { isRange: true });
  } else {
    $(`${elementID}`).omfgslider('update', { isRange: false });
  }
};

const handleVerticalButtonChange = (e) => {
  const elementID = e.data.elementName;
  const conf = $(`${elementID}`).omfgslider('getConfig');
  if (conf.isVertical === false) {
    $(`${elementID}`).omfgslider('update', { isVertical: true });
  } else {
    $(`${elementID}`).omfgslider('update', { isVertical: false });
  }
};

const handleLabelButtonChange = (e) => {
  const elementID = e.data.elementName;
  const conf = $(`${elementID}`).omfgslider('getConfig');
  if (conf.showLabel === false) {
    $(`${elementID}`).omfgslider('update', { showLabel: true });
  } else {
    $(`${elementID}`).omfgslider('update', { showLabel: false });
  }
};

$('#s1').omfgslider({ showLabel: true });
$('#s2').omfgslider({
  minValue: -1000, maxValue: 0, step: 100, isRange: true, showLabel: true
});
$('#s3').omfgslider({
  minValue: 0, maxValue: 1, step: 0.05, isVertical: true, showLabel: true, isFloat: true
});
$('#s4').omfgslider({
  minValue: -3,
  maxValue: 0,
  step: 0.1,
  isRange: true,
  isVertical: true,
  showLabel: true,
  isFloat: true
});
['#s1', '#s2', '#s3', '#s4'].forEach((i) => {
  const config = $(`${i}`).omfgslider('getConfig');
  const currentMinValueInput = $(`${i} + .input-wrapper .minValueIn`);
  const currentMaxValueInput = $(`${i} + .input-wrapper .maxValueIn`);
  const minValue = $(`${i} + .input-wrapper .minValue`);
  const maxValue = $(`${i} + .input-wrapper .maxValue`);
  const step = $(`${i} + .input-wrapper .step`);
  currentMinValueInput.val(config.minValue);
  currentMaxValueInput.val(config.maxValue);
  $(`${i} + .input-wrapper .minValue`).val(config.minValue);
  $(`${i} + .input-wrapper .maxValue`).val(config.maxValue);
  $(`${i} + .input-wrapper .step`).val(config.step);
  $(`${i}`).omfgslider('inputsAttach', {
    minValueInput: currentMinValueInput,
    maxValueInput: currentMaxValueInput,
    maxValue: maxValue,
    minValue: minValue,
    step: step
  });

  currentMinValueInput.on('focusout', { elementName: i, inputElement: currentMinValueInput }, handleCurrentMinValueInputFocusout);
  currentMaxValueInput.on('focusout', { elementName: i, inputElement: currentMaxValueInput }, handleCurrentMaxValueInputFocusout);
  minValue.on('focusout', { elementName: i }, handleMinValueInputFocusout);
  maxValue.on('focusout', { elementName: i }, handleMaxValueInputFocusout);
  step.on('focusout', { elementName: i }, handleStepInputFocusout);

  $(`${i} + .input-wrapper input[name = "range"]`).on('change', { elementName: i }, handleRangeButtonChange);
  $(`${i} + .input-wrapper input[name = "vertical"]`).on('change', { elementName: i }, handleVerticalButtonChange);
  $(`${i} + .input-wrapper input[name = "showLabel"]`).on('change', { elementName: i }, handleLabelButtonChange);
});
