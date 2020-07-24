import {Controller} from "./controller.ts";

(function($) {
    $.fn.omfgslider = function(options) {
        var config = $.extend({
            minValue: 0,
            maxValue: 1000,
            step: 1,
            range: false,
            vertical: false,
            showLabel: false,
            curMinValue: 0,
            curMaxValue: 1000
        }, options);
        
        function main(e) {
            const slider = new Controller();
            e.addClass("slider");
            e.init() = slider.view.init();
            slider.append(e);
        }
        this.each(function() { main($(this)); });
        return this;
    };
})(jQuery);