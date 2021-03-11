/* global jQuery */
import * as types from './types';
import Controller from './Controller/Controller';

const defaultParameters = {
  minValue: 0,
  maxValue: 1000,
  step: 1,
  isRange: false,
  isVertical: false,
  showLabel: true,
  isFloat: false
};

(function pluginWrapper($) {
  const methods: Methods = {
    init: function init(opt: types.Parameters) {
      if (!$(this).data('slider')) {
        const newConfig = { ...defaultParameters };
        const slider = new Controller($.extend(newConfig, opt), $(this));
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
  $.fn.omfgslider = function processMethod(method: string, ...args: Array<types.configUpdateData>) {
    if (methods[method]) {
      return methods[method].apply(this, [args[0]]);
    } if (typeof method === 'object' || !method) {
      return methods.init.apply(this, [method]);
    }
    $.error(`Метод ${method} не найден в плагине jQuery.omfgslider`);
    return null;
  };
}(jQuery));
