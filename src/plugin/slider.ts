import Controller from './Controller/Controller';

(function($) {
  const config = {
    minValue: 0,
    maxValue: 1000,
    step: 1,
    isRange: false,
    isVertical: false,
    showLabel: false,
    isFloat: false,
  };

  const methods: Methods = {
    init: function(opt: Config) {
      if (!$(this).data('slider')) {
        const newConfig = { ...config };
        const slider = new Controller($.extend(newConfig, opt));
        $(this).data('slider', slider);

        slider.append($(this));
      }
    },

    update: function(opt: Config) {
      const slider = $(this).data('slider');
      slider.update(opt);
    },

    getConfig: function() {
      const slider = $(this).data('slider');
      return slider.getConfig();
    },

    setValues: function(opt: Config) {
      const slider = $(this).data('slider');
      slider.setValues(opt.curMinValue, opt.curMaxValue);
    },

    inputsAttach: function(opt: InputsObject) {
      const slider = $(this).data('slider');
      slider.addObserver(() => {
        opt.minValueIn.val(slider.getValues()[0]);
        opt.maxValueIn.val(slider.getValues()[1]);
        opt.max.val(slider.getConfig().maxValue);
        opt.min.val(slider.getConfig().minValue);
        opt.step.val(slider.getConfig().step);
      })
    },
  }

  $.fn.omfgslider = function(method: string) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error(`Метод ${method} не найден в плагине jQuery.omfgslider`);
    }
  };
})(jQuery);
