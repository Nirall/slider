import Runner from './View/blocks/Runner/Runner';

export type FunctionCallbackData = (data: any, eventName?: string) => void;

export type ObserverFunction = (eventName: string, data?: any,) => void;

export type ObserverTestResult = {
  eventName: string,
  data?: any,
}

export type configUpdateData = {
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

export type RunnerObserverData = {
  event: MouseEvent,
  runner: Runner,
}

export type Parameters = {
  minValue: number,
  maxValue: number,
  step: number,
  isRange: boolean,
  isVertical: boolean,
  showLabel: boolean,
  isFloat: boolean
}

export type RawParameters = {
  minValue: number,
  maxValue: number,
  step: number,
  isRange: string,
  isVertical: string,
  showLabel: string,
  isFloat: string
}

export const defaultParameters = {
  minValue: 0,
  maxValue: 1000,
  step: 1,
  isRange: false,
  isVertical: false,
  showLabel: true,
  isFloat: false
};
