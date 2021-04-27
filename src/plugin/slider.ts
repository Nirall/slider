import * as jQuery from 'jquery';
import * as types from './types';
import { normalizeInitParameters, normalizeUpdateConfig, normalizeSetValues } from './helpers';
import Controller from './Controller/Controller';

const defaultParameters = {
  minValue: 0,
  maxValue: 1000,
  step: 1,
  isRange: false,
  isVertical: false,
  showLabel: true,
  isFloat: false,
  initMinValue: NaN,
  initMaxValue: NaN
};

(function pluginWrapper($) {
  const methods: Methods = {
    init: function init(opt: unknown) {
      if (!$(this).data('slider')) {
        const newConfig = normalizeInitParameters(opt, defaultParameters);
        const slider = new Controller(newConfig, $(this));
        $(this).data('slider', slider);
      }
    },

    update: function update(opt: unknown) {
      const slider = $(this).data('slider');
      slider.update(normalizeUpdateConfig(opt));
    },

    renew: function renew() {
      const slider = $(this).data('slider');
      return slider.renew();
    },

    setValues: function setValues(opt: unknown) {
      const slider = $(this).data('slider');
      slider.setValues(normalizeSetValues(opt));
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
