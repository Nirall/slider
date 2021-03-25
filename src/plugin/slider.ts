import * as types from './types';
import Controller from './Controller/Controller';
import * as jQuery from 'jquery';

const defaultParameters = {
  minValue: 0,
  maxValue: 1000,
  step: 1,
  isRange: false,
  isVertical: false,
  showLabel: true,
  isFloat: false
};

const isParametersCorrect = (parameters: types.Parameters | unknown)
  : parameters is types.Parameters => {
  let isCorrect = false;
  if (parameters && typeof parameters === 'object') {
    Object.keys(defaultParameters).forEach(key => {
      if (key in parameters) isCorrect = true;
    });
  }

  return isCorrect;
};

const normalizeInitParameters = (parameters: unknown | types.Parameters) => {
  const normalizedParamters = defaultParameters;
  if (isParametersCorrect(parameters)) {
    Object.keys(defaultParameters).forEach(key => {
      switch (key) {
        case 'minValue':
          normalizedParamters.minValue = Number.isFinite(parseFloat(String(parameters.minValue)))
            ? parseFloat(String(parameters.minValue))
            : defaultParameters.minValue;
          break;
        case 'maxValue':
          normalizedParamters.maxValue = Number.isFinite(parseFloat(String(parameters.maxValue)))
            ? parseFloat(String(parameters.maxValue))
            : defaultParameters.maxValue;
          break;
        case 'step':
          normalizedParamters.step = Number.isFinite(parseFloat(String(parameters.step)))
            ? parseFloat(String(parameters.step))
            : defaultParameters.step;
          break;
        case 'isRange':
          normalizedParamters.isRange = typeof parameters.isRange === 'boolean'
            ? parameters.isRange
            : defaultParameters.isRange;
          break;
        case 'isVertical':
          normalizedParamters.isVertical = typeof parameters.isVertical === 'boolean'
            ? parameters.isVertical
            : defaultParameters.isVertical;
          break;
        case 'showLabel':
          normalizedParamters.showLabel = typeof parameters.showLabel === 'boolean'
            ? parameters.showLabel
            : defaultParameters.showLabel;
          break;
        default: break;
      }
    });
  }

  return normalizedParamters;
};

(function pluginWrapper($) {
  const methods: Methods = {
    init: function init(opt: types.Parameters) {
      if (!$(this).data('slider')) {
<<<<<<< HEAD
        const newConfig = { ...defaultParameters };
=======
        const newConfig = {...defaultParameters};
>>>>>>> 883bcebdce72bb25e1aca3756765d98761054e75
        const slider = new Controller($.extend(newConfig, normalizeInitParameters(opt)), $(this));
        $(this).data('slider', slider);
      }
    },

    update: function update(opt: types.Parameters) {
      const slider = $(this).data('slider');
      slider.update(opt);
    },

    renew: function renew() {
      const slider = $(this).data('slider');
      return slider.renew();
    },

    setValues: function setValues(opt: types.CurrentValues) {
      const slider = $(this).data('slider');
      slider.setValues(opt);
    },

    inputsAttach: function inputsAttach(opt: types.InputsObject) {
      const slider = $(this).data('slider');
      slider.observers.addObserver((eventName?: string, data?: any) => {
        if (eventName === 'SendingCurrentValuesForTracking') {
          opt.minValueInput.val(data.currentMinValue);
          opt.maxValueInput.val(data.currentMaxValue);
        } if (eventName === 'SendingConfig') {
          opt.maxValue.val(data.maxValue);
          opt.minValue.val(data.minValue);
          opt.step.val(data.step);
        }
      });
    }
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.omfgslider = function processMethod(method: string, ...args: Array<types.updateData>) {
    if (methods[method]) {
      return methods[method].apply(this, [args[0]]);
    } if (typeof method === 'object' || !method) {
      return methods.init.apply(this, [method]);
    }
    $.error(`Метод ${method} не найден в плагине jQuery.omfgslider`);
    return null;
  };
}(jQuery));
