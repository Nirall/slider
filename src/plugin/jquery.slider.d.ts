interface JQuery {
  omfgslider: (...args: any) => void;
}

interface Methods {
  [index: string]: <T>(arg: T) => void;
}

type MethodsName = 'init' | 'update' | 'renew' | 'setValues' | 'inputsAttach'
