/* global jQuery */
import Controller from './Controller/Controller';

(function pluginWrapper($) {
  const config = {
    minValue: 0,
    maxValue: 1000,
    step: 1,
    isRange: false,
    isVertical: false,
    showLabel: false,
    isFloat: false
  };

  const methods: Methods = {
    init: function init(opt: Config) {
      if (!$(this).data('slider')) {
        const newConfig = { ...config };
        const slider = new Controller($.extend(newConfig, opt));
        $(this).data('slider', slider);

        slider.appendToNode($(this));
      }
    },

    update: function update(opt: Config) {
      const slider = $(this).data('slider');
      slider.updateConfig(opt);
    },

    getConfig: function getConfig() {
      const slider = $(this).data('slider');
      return slider.getConfig();
    },

    setValues: function setValues(opt: Config) {
      const slider = $(this).data('slider');
      slider.setValues(opt.currentMinValue, opt.currentMaxValue);
    },

    inputsAttach: function inputsAttach(opt: InputsObject) {
      const slider = $(this).data('slider');
      slider.addObserver(() => {
        opt.minValueInput.val(slider.getValues().currentMinValue);
        opt.maxValueInput.val(slider.getValues().currentMaxValue);
        opt.maxValue.val(slider.getConfig().maxValue);
        opt.minValue.val(slider.getConfig().minValue);
        opt.step.val(slider.getConfig().step);
      });
    }
  };

  $.fn.omfgslider = function processMethod(method: string) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
    $.error(`Метод ${method} не найден в плагине jQuery.omfgslider`);
  };
}(jQuery));
