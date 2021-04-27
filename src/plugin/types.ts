import Runner from './View/blocks/Runner/Runner';

export type ObserverFunction = (eventName: string, data?: unknown) => void;

export type RunnerObserver = (eventName: string, data: RunnerObserverData) => void;

export type ObserverTestResult = {
  eventName: string,
  data?: unknown,
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
  initMinValue?: number,
  initMaxValue?: number,
}

export type RawParameters = {
  minValue?: number,
  maxValue?: number,
  step?: number,
  range?: string,
  vertical?: string,
  showLabel?: string,
}

export type ModelCreateParameters = {
  currentMinValue: number;
  currentMaxValue: number;
  maxValue: number;
  minValue: number;
  step: number;
  observer: ObserverFunction;
}

export type updateData = {
  [index: string]: number|string|boolean;
}

export type InputsObject = {
  [index: string]: JQuery;
}

// TypeGuards

export const isRunnerObserverData = (data: unknown): data is RunnerObserverData => {
  return (Object.hasOwnProperty.call(data, 'event') && Object.hasOwnProperty.call(data, 'runner'));
};

export const isBarObserverData = (data: unknown): data is BarObserverData => {
  return (Object.hasOwnProperty.call(data, 'event'));
};

export const isScaleObserverData = (data: unknown): data is ScaleObserverData => {
  return (Object.hasOwnProperty.call(data, 'value'));
};

export const isCurrentValues = (data: unknown): data is CurrentValues => {
  return (Object.hasOwnProperty.call(data, 'currentMinValue') || Object.hasOwnProperty.call(data, 'currentMaxValue'));
};

export const isAppendingObserverData = (data: unknown): data is AppendingObserverData => {
  return (Object.hasOwnProperty.call(data, 'entry'));
};

export const isParametersData = (data: unknown): data is Parameters => {
  const keys = [
    'minValue',
    'maxValue',
    'step',
    'isRange',
    'isVertical',
    'showLabel'
  ];

  return (keys.every(key => Object.hasOwnProperty.call(data, key)));
};

export const isRawParametersData = (data: unknown): data is RawParameters => {
  const keys = [
    'minValue',
    'maxValue',
    'step',
    'range',
    'vertical',
    'showLabel'
  ];

  return (keys.some(key => Object.hasOwnProperty.call(data, key)));
};

export const isInputsData = (data: unknown): data is InputsObject => {
  const keys = [
    'minValueInput',
    'maxValueInput',
    'maxValue',
    'minValue',
    'step'
  ];

  return (keys.every(key => Object.hasOwnProperty.call(data, key)));
};

export const isUpdateData = (data: unknown): data is updateData => {
  const keys = [
    'minValue',
    'maxValue',
    'step',
    'range',
    'vertical',
    'showLabel'
  ];

  return (keys.some(key => Object.hasOwnProperty.call(data, key)));
};

type MethodsName = 'init' | 'update' | 'renew' | 'setValues' | 'inputsAttach';

export const isMethodName = (data: unknown): data is MethodsName => {
  let isName = false;
  if (typeof data === 'string') {
    isName = ['init', 'update', 'renew', 'setValues', 'inputsAttach'].includes(data);
  }

  return isName;
};
