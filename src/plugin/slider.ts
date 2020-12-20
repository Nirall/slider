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

    getConfig: function getConfig() {
      const slider = $(this).data('slider');
      return slider.getConfig();
    },

    setValues: function setValues(opt: types.CurrentValues) {
      const slider = $(this).data('slider');
      slider.setValues(opt);
    },

    inputsAttach: function inputsAttach(opt: InputsObject) {
      const slider = $(this).data('slider');
      slider.addObserver((eventName?: string, data?: any) => {
        if (eventName === 'SendingCurrentValuesForTracking') {
          opt.minValueInput.val(data.currentMinValue);
          opt.maxValueInput.val(data.currentMaxValue);
        }
        opt.maxValue.val(slider.getConfig().maxValue);
        opt.minValue.val(slider.getConfig().minValue);
        opt.step.val(slider.getConfig().step);
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
