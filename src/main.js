import Controller from "./controller.ts";

(function($) {
  const config = {
    minValue: 0,
    maxValue: 1000,
    step: 1,
    isRange: false,
    isVertical: false,
    showLabel: false,
    float: false,
  };

  const methods = {
    init: function(opt) {
      if (!$(this).data("slider")) {
        const newConfig = JSON.parse(JSON.stringify(config));
        const slider = new Controller(...Object.values($.extend(newConfig, opt)));
        $(this).data("slider", slider);
        slider.append($(this));
      }
    },

    update: function(opt) {
      const slider = $(this).data("slider");
      slider.update(opt);
    },

    getConfig: function() {
      const slider = $(this).data("slider");
      return slider.getConfig();
    },

    setValues: function(opt) {
      const slider = $(this).data("slider");
      slider.setValues(opt.curMinValue, opt.curMaxValue);
    },

    inputsAttach: function(opt) {
      const slider = $(this).data("slider");
      slider.addObserver(() => {
        opt.minValueIn.val(slider.getValues()[0]);
        opt.maxValueIn.val(slider.getValues()[1]);
      })
    },
  }
  
  $.fn.omfgslider = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Метод "' +  method + '" не найден в плагине jQuery.mySimplePlugin');
    }
  };
})(jQuery);