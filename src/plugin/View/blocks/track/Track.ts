import * as types from '../../../types';
import Bar from '../bar/Bar';
import Runner from '../../blocks/runner/Runner';
import ProgressBar from '../../blocks/progressBar/ProgressBar';

class Track {
  parameters: types.Parameters;
  runnerMain: Runner;
  runnerAdditional: Runner;
  progressBar: ProgressBar;
  scale: Bar;

  constructor(data: types.TrackConstructorData) {
    this.scale = data.bar;
    this.runnerMain = data.runnerMain;
    this.runnerAdditional = data.runnerAdditional;
    this.progressBar = data.progressBar;
    this.parameters = data.parameters;
  }

  onRunnerMove = (eventMm: MouseEvent, runner: Runner): types.RunnerMoveData => {
    const coordinate = this.parameters.isVertical ? eventMm.clientY : eventMm.clientX;
    const offset = coordinate - this.scale.getPosition() - this.runnerAdditional.getWidth()/2;

    return this.offsetProcessing(offset, runner);
  }

  offsetProcessing(offset: number, runner: Runner): types.RunnerMoveData {
    let roundValue;
    let roundOffset;
    [roundOffset, roundValue] = this.runnerOffsetCheck(offset, runner);

    if (typeof roundValue === 'undefined') {
      [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);
    }

    return {
      runner: runner,
      offset: roundOffset,
      value: roundValue,
    }
  }

  runnerOffsetCheck = (newOffset: number, runner: Runner): Array<number> => {
    let roundValue;

    if (newOffset < -this.runnerAdditional.getWidth()/2) {
      newOffset = -this.runnerAdditional.getWidth()/2;
      roundValue = this.parameters.minValue;
    }

    if (newOffset > this.scale.getDimension() - this.runnerMain.getWidth()/2) {
      newOffset = this.scale.getDimension() - this.runnerMain.getWidth()/2;
      roundValue = this.parameters.maxValue;
    }

    const stepWidth = this.parameters.step*this.scale.getDimension()/(this.parameters.maxValue - this.parameters.minValue);
    const minOffset = stepWidth/1.5 > this.runnerMain.getWidth() ? stepWidth/1.5 : this.runnerMain.getWidth();

    if (runner === this.runnerAdditional) {
      if (newOffset > this.runnerMain.getPosition() - this.scale.getPosition() - minOffset) {
        newOffset = this.runnerMain.getPosition() - this.scale.getPosition() - minOffset;
      }
    } else if (runner === this.runnerMain) {
      if (newOffset < this.runnerAdditional.getPosition() - this.scale.getPosition() + minOffset) {
        newOffset = this.runnerAdditional.getPosition() - this.scale.getPosition() + minOffset;
      }
    }

    return [newOffset, roundValue];
  }

  roundOffsetButt = (currOffset: number): Array<number> => {
    const currValue = this.parameters.minValue + (currOffset + this.runnerMain.getWidth()/2)*(this.parameters.maxValue - this.parameters.minValue)/this.scale.getDimension();
    let roundValue = this.round(currValue, this.parameters.step);

    if (this.parameters.isFloat) {
      roundValue = parseFloat(roundValue.toFixed(2));
    }

    const roundOffset = this.offsetValueConverter(roundValue);
    return [roundOffset, roundValue];
  }

  offsetValueConverter = (value: number): number => {
    return ((value - this.parameters.minValue)/(this.parameters.maxValue - this.parameters.minValue)*this.scale.getDimension() - this.runnerMain.getWidth()/2);
  }

  round = (val: number, step: number): number => {
    const whole = Math.trunc(val/step);
    const reminder = +(val - whole*step).toFixed(2);

    if (val < 0) {
      return Math.abs(reminder) < step/2 ? whole*step : (whole - 1)*step;
    }

    if (val <= this.parameters.minValue) {
      return this.parameters.minValue;
    } else if (val >= this.parameters.maxValue) {
      return this.parameters.maxValue;
    }

    return reminder < step/2 ? whole*step : (whole + 1)*step;
  }

  getMainRunnerOffset = (): number => {
    if (this.parameters.isRange) {
      return this.runnerAdditional.getPosition() - this.scale.getPosition() + this.runnerAdditional.getWidth()/2;
    }

    return 0;
  }

  getAdditionalRunnerOffset = (): number => {
    return this.runnerMain.getPosition() - this.scale.getPosition() + this.runnerMain.getWidth()/2;
  }

  updateProgressBar = (): void => {
    this.progressBar.init(this.parameters.isVertical);
    this.progressBar.setPosition(this.getMainRunnerOffset());
    this.progressBar.setDimension(this.getAdditionalRunnerOffset() - this.getMainRunnerOffset());
  }

  init = (parameters: types.Parameters): void => {
    this.parameters = parameters;
  }
}

export default Track;
