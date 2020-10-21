interface JQuery {
  omfgslider: Function,
}

interface Config {
  minValue: number,
  maxValue: number,
  step: number,
  isRange: boolean,
  isVertical: boolean,
  showLabel: boolean,
  isFloat: boolean,
  curMinValue: number,
  curMaxValue: number
}

interface InputsObject {
  [index: string]: JQuery;
}

interface Methods {
  [index: string]: Function;
}
