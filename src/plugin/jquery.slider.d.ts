type updateData = {
  [index: string]: number|string|boolean;
}

type InputsObject = {
  [index: string]: JQuery;
}

type MethodsName = 'init' | 'update' | 'renew' | 'setValues' | 'inputsAttach';

type sliderObject = (method: MethodsName, ...args: Array<updateData | InputsObject>) => void;

interface JQuery {
  omfgslider: sliderObject;
}

interface Methods {
  [index: string]: <T>(arg: T) => void;
}
