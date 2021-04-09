type updateData = {
  [index: string]: number|string|boolean|undefined|string[]
}

type ConfigParameters = {
  minValue: number,
  maxValue: number,
  step: number,
  isRange: boolean,
  isVertical: boolean,
  showLabel: boolean,
  isFloat: boolean,
  initMinValue?: number,
  initMaxValue?: number,
}

type InputsObject = {
  [index: string]: JQuery;
}

type MethodsName = 'init' | 'update' | 'renew' | 'setValues' | 'inputsAttach';

type sliderObject = (
  arg0: MethodsName | ConfigParameters,
  args?: updateData | InputsObject) => void;

interface JQuery {
  omfgslider: sliderObject;
}

interface Methods {
  [index: string]: <T>(arg: T) => void;
}
