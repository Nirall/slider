$("#s1").omfgslider({showLabel: true});
        $("#s2").omfgslider({minValue: -1000, maxValue: 0, step: 100, isRange: true, showLabel: true});
        $("#s3").omfgslider({minValue: 0, maxValue: 1, step: 0.05, isVertical: true, showLabel: true, isFloat: true});
        $("#s4").omfgslider({minValue: -3, maxValue: 0, step: 0.1, isRange: true, isVertical: true, showLabel: true, isFloat: true});
        for (let i of ["#s1", "#s2", "#s3", "#s4"]) {
            $(`${i}`).omfgslider();
            let config = $(`${i}`).omfgslider("getConfig");
            const minValueInput = $(`${i} + .input-wrapper .minValueIn`);
            const maxValueInput = $(`${i} + .input-wrapper .maxValueIn`);
            const minValue = $(`${i} + .input-wrapper .minValue`);
            const maxValue = $(`${i} + .input-wrapper .maxValue`);
            const step = $(`${i} + .input-wrapper .step`);
            minValueInput.val(config.minValue);
            maxValueInput.val(config.maxValue);
            $(`${i} + .input-wrapper .minValue`).val(config.minValue);
            $(`${i} + .input-wrapper .maxValue`).val(config.maxValue);
            $(`${i} + .input-wrapper .step`).val(config.step);
            $(`${i}`).omfgslider("inputsAttach", { minValueInput: minValueInput, maxValueInput: maxValueInput, maxValue: maxValue, minValue: minValue, step: step });

            minValueInput.focusout(() => {
                if ($(`${i}`).omfgslider("getConfig").isFloat) {
                    $(`${i}`).omfgslider("setValues", {currentMinValue: parseFloat(minValueInput.val())});
                } else {
                    $(`${i}`).omfgslider("setValues", {currentMinValue: parseInt(minValueInput.val())});
                }
            });

            maxValueInput.focusout(() => {
                if ($(`${i}`).omfgslider("getConfig").isFloat) {
                    $(`${i}`).omfgslider("setValues", {currentMaxValue: parseFloat(maxValueInput.val())});
                } else {
                    $(`${i}`).omfgslider("setValues", {currentMaxValue: parseInt(maxValueInput.val())});
                }
            });

            minValue.focusout(() => {
                $(`${i}`).omfgslider("update", {minValue: $(`${i} + .input-wrapper .minValue`).val()})
            });

            maxValue.focusout(() => {
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