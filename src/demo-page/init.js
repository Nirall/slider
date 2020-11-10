$("#s1").omfgslider({showLabel: true});
        $("#s2").omfgslider({minValue: -1000, maxValue: 0, step: 100, isRange: true, showLabel: true});
        $("#s3").omfgslider({minValue: 0, maxValue: 1, step: 0.05, isVertical: true, showLabel: true, isFloat: true});
        $("#s4").omfgslider({minValue: -3, maxValue: 0, step: 0.1, isRange: true, isVertical: true, showLabel: true, isFloat: true});
        for (let i of ["#s1", "#s2", "#s3", "#s4"]) {
            $(`${i}`).omfgslider();
            let conf = $(`${i}`).omfgslider("getConfig");
            const minValueIn = $(`${i} + .input-wrapper .minValueIn`);
            const maxValueIn = $(`${i} + .input-wrapper .maxValueIn`);
            const min = $(`${i} + .input-wrapper .minValue`);
            const max = $(`${i} + .input-wrapper .maxValue`);
            const step = $(`${i} + .input-wrapper .step`);
            minValueIn.val(conf.minValue);
            maxValueIn.val(conf.maxValue);
            $(`${i} + .input-wrapper .minValue`).val(conf.minValue);
            $(`${i} + .input-wrapper .maxValue`).val(conf.maxValue);
            $(`${i} + .input-wrapper .step`).val(conf.step);
            $(`${i}`).omfgslider("inputsAttach", { minValueIn: minValueIn, maxValueIn: maxValueIn, max: max, min: min, step: step });

            minValueIn.focusout(() => {
                if ($(`${i}`).omfgslider("getConfig").isFloat) {
                    $(`${i}`).omfgslider("setValues", {curMinValue: parseFloat(minValueIn.val())});
                } else {
                    $(`${i}`).omfgslider("setValues", {curMinValue: parseInt(minValueIn.val())});
                }
            });

            maxValueIn.focusout(() => {
                if ($(`${i}`).omfgslider("getConfig").isFloat) {
                    $(`${i}`).omfgslider("setValues", {curMaxValue: parseFloat(maxValueIn.val())});
                } else {
                    $(`${i}`).omfgslider("setValues", {curMaxValue: parseInt(maxValueIn.val())});
                }
            });

            min.focusout(() => {
                $(`${i}`).omfgslider("update", {minValue: $(`${i} + .input-wrapper .minValue`).val()})
            });

            max.focusout(() => {
                $(`${i}`).omfgslider("update", {maxValue: $(`${i} + .input-wrapper .maxValue`).val()})
            });

            step.focusout(() => {
                $(`${i}`).omfgslider("update", {step: $(`${i} + .input-wrapper .step`).val()});
            });

            $(`${i} + .input-wrapper input[name = "range"]`).change(() => {
                let conf = $(`${i}`).omfgslider("getConfig");
                (conf.isRange === false) ? $(`${i}`).omfgslider("update", {isRange: true}) : $(`${i}`).omfgslider("update", {isRange: false});
            });

            $(`${i} + .input-wrapper input[name = "vertical"]`).change(() => {
                let conf = $(`${i}`).omfgslider("getConfig");
                (conf.isVertical === false) ? $(`${i}`).omfgslider("update", {isVertical: true}) : $(`${i}`).omfgslider("update", {isVertical: false});
            });

            $(`${i} + .input-wrapper input[name = "showLabel"]`).change(() => {
                let conf = $(`${i}`).omfgslider("getConfig");
                (conf.showLabel === false) ? $(`${i}`).omfgslider("update", {showLabel: true}) : $(`${i}`).omfgslider("update", {showLabel: false});
            });
        }