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

const normalizeInitParameters = (parameters: unknown) => {
  let normalizedParameters = defaultParameters;

  if (types.isParametersData(parameters)) {
    Object.keys(defaultParameters).forEach(key => {
      switch (key) {
        case 'minValue':
        case 'maxValue':
        case 'step':
          normalizedParameters[key] = Number.isFinite(parseFloat(String(parameters[key])))
            ? parseFloat(String(parameters[key]))
            : defaultParameters[key];
          break;
        case 'isRange':
        case 'isVertical':
        case 'showLabel':
          normalizedParameters[key] = typeof parameters[key] === 'boolean'
            ? Boolean(parameters[key])
            : defaultParameters[key];
          break;
        default: break;
      }
    });
  }

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
    init: function init(opt: unknown) {
      if (!$(this).data('slider')) {
        const newConfig = { ...defaultParameters };
        const slider = new Controller($.extend(newConfig, normalizeInitParameters(opt)), $(this));
        $(this).data('slider', slider);
      }
    },

    update: function update(opt: unknown) {
      const slider = $(this).data('slider');
      slider.update(opt);
    },

    renew: function renew() {
      const slider = $(this).data('slider');
      return slider.renew();
    },

    setValues: function setValues(opt: unknown) {
      const slider = $(this).data('slider');
      slider.setValues(opt);
    },

    inputsAttach: function inputsAttach(opt: unknown) {
      if (types.isInputsData(opt)) {
        const slider = $(this).data('slider');
        slider.observers.addObserver(
          (eventName: string, data: unknown) => {
            if (eventName === 'SendingCurrentValues') {
              if (types.isCurrentValues(data)) {
                const { currentMinValue, currentMaxValue } = data;
                opt.minValueInput.val(currentMinValue);
                opt.maxValueInput.val(currentMaxValue);
              }
            } if (eventName === 'SendingConfig') {
              if (types.isParametersData(data)) {
                const { minValue, maxValue, step } = data;
                opt.maxValue.val(maxValue);
                opt.minValue.val(minValue);
                opt.step.val(step);
              }
            }
          }
        );
      }
    }
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.omfgslider = function processMethod(
    method: unknown,
    args?: unknown
  ) {
    if (types.isMethodName(method)) {
      if (methods[method]) {
        return methods[method].apply(this, [args]);
      }
    }

    if (typeof method === 'object' || !method) {
      return methods.init.apply(this, [method]);
    }
    $.error(`Метод ${method} не найден в плагине jQuery.omfgslider`);
    return null;
  };
}(jQuery));
