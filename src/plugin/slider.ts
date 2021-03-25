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

const hasOwnProperty = <T, K extends PropertyKey>(obj: T, key: K)
  : obj is T & Record<K, unknown> => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const normalizeInitParameters = (parameters: unknown | types.Parameters) => {
  const normalizedParamters = defaultParameters;

  Object.keys(defaultParameters).forEach(key => {
    switch (key) {
      case 'minValue':
        if (hasOwnProperty(parameters, key)) {
          normalizedParamters[key] = Number.isFinite(parseFloat(String(parameters[key])))
            ? parseFloat(String(parameters[key]))
            : defaultParameters[key];
        }
        break;
      case 'maxValue':
        if (hasOwnProperty(parameters, key)) {
          normalizedParamters[key] = Number.isFinite(parseFloat(String(parameters[key])))
            ? parseFloat(String(parameters[key]))
            : defaultParameters[key];
        }
        break;
      case 'step':
        if (hasOwnProperty(parameters, key)) {
          normalizedParamters[key] = Number.isFinite(parseFloat(String(parameters[key])))
            ? parseFloat(String(parameters[key]))
            : defaultParameters[key];
        }
        break;
      case 'isRange':
        if (hasOwnProperty(parameters, key)) {
          normalizedParamters.isRange = typeof parameters.isRange === 'boolean'
            ? parameters.isRange
            : defaultParameters.isRange;
        }
        break;
      case 'isVertical':
        if (hasOwnProperty(parameters, key)) {
          normalizedParamters.isVertical = typeof parameters.isVertical === 'boolean'
            ? parameters.isVertical
            : defaultParameters.isVertical;
        }
        break;
      case 'showLabel':
        if (hasOwnProperty(parameters, key)) {
          normalizedParamters.showLabel = typeof parameters.showLabel === 'boolean'
            ? parameters.showLabel
            : defaultParameters.showLabel;
        }
        break;
      default: break;
    }
  });

  return normalizedParamters;
};

(function pluginWrapper($) {
  const methods: Methods = {
    init: function init(opt: types.Parameters) {
      if (!$(this).data('slider')) {
        const newConfig = { ...defaultParameters };
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
