import {Controller} from "./controller.ts";
//import { data } from "jquery";

(function($) {
    
    const config = {
        minValue: 0,
        maxValue: 1000,
        step: 1,
        range: true,
        vertical: false,
        showLabel: true,
        curMinValue: 0,
        curMaxValue: 1000
    };
    const methods = {
        init: function(opt) {
            if (!$(this).data("slider")) {
                const slider = new Controller(...Object.values($.extend(config, opt)));
                $(this).data("slider", slider);
                slider.append($(this));
            }
        },
        update: function(opt) {
            const slider = $(this).data("slider");
            slider.update(opt);
        },
        update2: function() {
            const slider = $(this).data("slider");
            slider.update2();
        }
    }
    
    $.fn.omfgslider = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод "' +  method + '" не найден в плагине jQuery.mySimplePlugin' );
        }
    };
    
})(jQuery);