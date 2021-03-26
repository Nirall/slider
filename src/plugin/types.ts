import Runner from './View/blocks/Runner/Runner';

export type FunctionCallbackData = <T>(data: T, eventName?: string) => void;

export type ObserverFunction = <T>(eventName: string, data?: T) => void;

export type RunnerObserver = (eventName: string, data: RunnerObserverData) => void;

export type ObserverTestResult<T> = {
  eventName: string,
  data?: T,
}

export type updateData = {
  [index: string]: number|string|boolean;
}

export type InputsObject = {
  [index: string]: JQuery;
}

export type RunnerMoveData = {
  runner: Runner,
  offset: number,
  value: number,
}

export type CurrentValues = {
  currentMinValue: number,
  currentMaxValue: number,
}

export type updateCurrentValues = {
  currentMinValue?: number,
  currentMaxValue?: number,
}

export type RunnerObserverData = {
  event: MouseEvent,
  runner: Runner,
}

export type BarObserverData = {
  event: MouseEvent,
}

export type ScaleObserverData = {
  value: number,
}

export type AppendingObserverData = {
  entry: HTMLElement,
}

export type Parameters = {
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

export type keyOfParameters = keyof Parameters;

export type RawParameters = {
  minValue?: number,
  maxValue?: number,
  step?: number,
  range?: string,
  vertical?: string,
  showLabel?: string,
  isFloat?: string
}

// TypeGuards

export const isRunnerObserverData = <T>(data: T | RunnerObserverData)
  : data is RunnerObserverData => {
  return (Object.hasOwnProperty.call(data, 'event') && Object.hasOwnProperty.call(data, 'runner'));
};

export const isBarObserverData = <T>(data: T | BarObserverData)
  : data is BarObserverData => {
  return (Object.hasOwnProperty.call(data, 'event'));
};

export const isScaleObserverData = <T>(data: T | ScaleObserverData)
  : data is ScaleObserverData => {
  return (Object.hasOwnProperty.call(data, 'value'));
};

export const isCurrentValues = <T>(data: T | CurrentValues)
  : data is CurrentValues => {
  return (Object.hasOwnProperty.call(data, 'currentMinValue') || Object.hasOwnProperty.call(data, 'currentMaxValue'));
};

export const isAppendingObserverData = <T>(data: T | AppendingObserverData)
  : data is AppendingObserverData => {
  return (Object.hasOwnProperty.call(data, 'entry'));
};

export const isParametersData = <T>(data: T | Parameters)
  : data is Parameters => {
  const keys = [
    'minValue',
    'maxValue',
    'step',
    'isRange',
    'isVertical',
    'showLabel',
    'isFloat'
  ];

  return (keys.every(key => Object.hasOwnProperty.call(data, key)));
};

export const isInputsData = <T>(data: T | InputsObject): data is InputsObject => {
  const keys = [
    'minValueInput',
    'maxValueInput',
    'maxValue',
    'minValue',
    'step'
  ];

  return (keys.every(key => Object.hasOwnProperty.call(data, key)));
};

export const isUpdateData = <T>(data: T | updateData): data is updateData => {
  return (typeof Object.keys(data)[0] === 'string');
};
