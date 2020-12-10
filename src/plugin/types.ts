import Runner from './View/blocks/runner/Runner';
import Bar from './View/blocks/bar/Bar';
import ProgressBar from './View/blocks/progressBar/ProgressBar';


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
  minValue: string|number,
  maxValue: string|number,
  step: string|number,
  isRange: boolean,
  isVertical: boolean,
  showLabel: boolean,
  isFloat: boolean
}

export type TrackConstructorData = {
  runnerMain: Runner,
  runnerAdditional: Runner,
  bar: Bar,
  progressBar: ProgressBar,
  parameters: Parameters;
}

export const defaultParameters = {
  minValue: 0,
  maxValue: 1000,
  step: 1,
  isRange: false,
  isVertical: false,
  showLabel: false,
  isFloat: false
}