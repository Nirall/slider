/* global jQuery */
import * as types from './types';
import Controller from './Controller/Controller';

(function pluginWrapper($) {
  const methods: Methods = {
    init: function init(opt: types.Parameters) {
      if (!$(this).data('slider')) {
        const newConfig = { ...types.defaultParameters };
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

  $.fn.omfgslider = function processMethod(method: string, // eslint-disable-line no-param-reassign
    ...args: Array<types.configUpdateData>) {
    if (methods[method]) {
      return methods[method].apply(this, args);
    } if (typeof method === 'object' || !method) {
      return methods.init.apply(this, [method]);
    }
    $.error(`Метод ${method} не найден в плагине jQuery.omfgslider`);
    return null;
  };
}(jQuery));
