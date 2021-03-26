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
  let normalizedParameters = defaultParameters;

  Object.keys(defaultParameters).forEach(key => {
    switch (key) {
      case 'minValue':
      case 'maxValue':
      case 'step':
        if (hasOwnProperty(parameters, key)) {
          normalizedParameters[key] = Number.isFinite(parseFloat(String(parameters[key])))
            ? parseFloat(String(parameters[key]))
            : defaultParameters[key];
        }
        break;
      case 'isRange':
      case 'isVertical':
      case 'showLabel':
        if (hasOwnProperty(parameters, key)) {
          normalizedParameters[key] = typeof parameters[key] === 'boolean'
            ? Boolean(parameters[key])
            : defaultParameters[key];
        }
        break;
      default: break;
    }
  });

  ['initMinValue', 'initMaxValue'].forEach(key => {
    if (hasOwnProperty(parameters, key)) {
      if (Number.isFinite(parseFloat(String(parameters[key])))) {
        normalizedParameters = {
          ...normalizedParameters,
          [key]: parseFloat(String(parameters[key]))
        };
      }
    }
  });

  return normalizedParameters;
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
