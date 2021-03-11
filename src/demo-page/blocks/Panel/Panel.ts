import * as $ from 'jquery';
import * as types from '../../../plugin/types';

class Panel {
  node: JQuery;

  inputs: types.InputsObject;

  constructor(elem: HTMLElement, parameters: types.Parameters) {
    this.node = $(elem);
    this.inputs = {};
    this.init(parameters);
  }

  private init = (parameters: types.Parameters) => {
    const slider = $(this.node).siblings('.js-slider');
    const currentMinValueInput = this.node.find('.js-panel__current-minvalue');
    const currentMaxValueInput = this.node.find('.js-panel__current-maxvalue');
    const minValueInput = this.node.find('.js-panel__minValue');
    const maxValueInput = this.node.find('.js-panel__maxValue');
    const stepInput = this.node.find('.js-panel__step');
    const rangeInput = this.node.find('.js-panel__range');
    const orientationInput = this.node.find('.js-panel__orientation');
    const showingLabelsInput = this.node.find('.js-panel__showing-labels');

    this.inputs = {
      slider: slider,
      currentMinValueInput: currentMinValueInput,
      currentMaxValueInput: currentMaxValueInput,
      minValueInput: minValueInput,
      maxValueInput: maxValueInput,
      stepInput: stepInput,
      rangeInput: rangeInput,
      orientationInput: orientationInput,
      showingLabelsInput: showingLabelsInput
    };

    slider.omfgslider(parameters);

    slider.omfgslider('inputsAttach', {
      minValueInput: currentMinValueInput,
      maxValueInput: currentMaxValueInput,
      maxValue: maxValueInput,
      minValue: minValueInput,
      step: stepInput
    });

    slider.omfgslider('renew');

    currentMinValueInput.on('focusout', this.handleCurrentMinValueInputFocusout);
    currentMaxValueInput.on('focusout', this.handleCurrentMaxValueInputFocusout);
    minValueInput.on('focusout', this.handleMinValueInputFocusout);
    maxValueInput.on('focusout', this.handleMaxValueInputFocusout);
    stepInput.on('focusout', this.handleStepInputFocusout);

    rangeInput.on('change', this.handleRangeButtonChange);
    orientationInput.on('change', this.handleVerticalButtonChange);
    showingLabelsInput.on('change', this.handleLabelButtonChange);
  }

  private handleCurrentMinValueInputFocusout = () => {
    this.inputs.slider.omfgslider('setValues', { currentMinValue: parseFloat(this.inputs.currentMinValueInput.val() + '') });
  };

  private handleCurrentMaxValueInputFocusout = () => {
    this.inputs.slider.omfgslider('setValues', { currentMaxValue: parseFloat(this.inputs.currentMaxValueInput.val() + '') });
  };

  private handleMinValueInputFocusout = () => {
    this.inputs.slider.omfgslider('update', { minValue: parseFloat(this.inputs.minValueInput.val() + '') });
  };

  private handleMaxValueInputFocusout = () => {
    this.inputs.slider.omfgslider('update', { maxValue: parseFloat(this.inputs.maxValueInput.val() + '') });
  };

  private handleStepInputFocusout = () => {
    this.inputs.slider.omfgslider('update', { step: parseFloat(this.inputs.stepInput.val() + '') });
  };

  private handleRangeButtonChange = () => {
    this.inputs.slider.omfgslider('update', { isRange: 'toggle' });
  };

  private handleVerticalButtonChange = () => {
    this.inputs.slider.omfgslider('update', { isVertical: 'toggle' });
  };

  private handleLabelButtonChange = () => {
    this.inputs.slider.omfgslider('update', { showLabel: 'toggle' });
  };
}

export default Panel;
