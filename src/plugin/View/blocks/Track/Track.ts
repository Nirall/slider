import * as types from '../../../types';
import Bar from '../Bar/Bar';
import Runner from '../Runner/Runner';
import ProgressBar from '../ProgressBar/ProgressBar';

class Track {
  parameters: types.Parameters;
  runnerMain: Runner;
  runnerAdditional: Runner;
  progressBar: ProgressBar;
  bar: Bar;

  constructor(data: types.TrackConstructorData) {
    this.bar = data.bar;
    this.runnerMain = data.runnerMain;
    this.runnerAdditional = data.runnerAdditional;
    this.progressBar = data.progressBar;
    this.parameters = data.parameters;
  }

  onMoveRunner = (eventMm: MouseEvent, runner: Runner): types.RunnerMoveData => {
    const coordinate = this.parameters.isVertical ? eventMm.clientY : eventMm.clientX;
    const offset = coordinate - this.bar.getPosition() - this.runnerAdditional.getWidth()/2;

    return this.offsetProcessing(offset, runner);
  }

  offsetProcessing = (offset: number, runner: Runner): types.RunnerMoveData => {
    let roundValue;
    let roundOffset;
    roundOffset = this.checkRunnerOffset(offset, runner);
    [roundOffset, roundValue] = this.roundOffsetButt(roundOffset);

    return {
      runner: runner,
      offset: roundOffset,
      value: roundValue,
    }
  }

  convertOffsetToValue = (value: number): number => {
    return ((value - this.parameters.minValue)/(this.parameters.maxValue - this.parameters.minValue)*this.bar.getDimension() - this.runnerMain.getWidth()/2);
  }

  getMainRunnerOffset = (): number => {
    const offset = this.runnerMain.getPosition() - this.bar.getPosition() + this.runnerMain.getWidth()/2;
    return offset < 0 ? 0 : offset;
  }

  getAdditionalRunnerOffset = (): number => {
    if (this.parameters.isRange) {
      return this.runnerAdditional.getPosition() - this.bar.getPosition() + this.runnerMain.getWidth()/2;
    }

    return 0;
  }

  updateProgressBar = (): void => {
    this.progressBar.init(this.parameters.isVertical);
    this.progressBar.setPosition(this.getAdditionalRunnerOffset());
    this.progressBar.setDimension(this.getMainRunnerOffset() - this.getAdditionalRunnerOffset());
  }

  init = (parameters: types.Parameters): void => {
    this.parameters = parameters;
  }

  private checkRunnerOffset = (offset: number, runner: Runner): number => {
    const stepWidth = this.parameters.step*this.bar.getDimension()/(this.parameters.maxValue - this.parameters.minValue);
    const minOffset = stepWidth/1.5 > this.runnerMain.getWidth() ? stepWidth/1.5 : this.runnerMain.getWidth();

    if (runner === this.runnerAdditional) {
      if (offset > this.runnerMain.getPosition() - this.bar.getPosition() - minOffset) {
        offset = this.runnerMain.getPosition() - this.bar.getPosition() - minOffset;
      }
    } else if (runner === this.runnerMain) {
      if (offset < this.runnerAdditional.getPosition() - this.bar.getPosition() + minOffset) {
        offset = this.runnerAdditional.getPosition() - this.bar.getPosition() + minOffset;
      }
    }

    return offset;
  }

  private roundOffsetButt = (currentOffset: number): [number, number] => {
    const currentValue = this.parameters.minValue + (currentOffset + this.runnerMain.getWidth()/2)*(this.parameters.maxValue - this.parameters.minValue)/this.bar.getDimension();
    let roundValue = this.round(currentValue, this.parameters.step);

    if (this.parameters.isFloat) {
      roundValue = parseFloat(roundValue.toFixed(2));
    }

    let roundOffset = this.convertOffsetToValue(roundValue);

    if (roundOffset < -this.runnerMain.getWidth()/2) {
      roundOffset = -this.runnerMain.getWidth()/2;
      roundValue = this.parameters.minValue;
    }

    if (roundOffset > this.bar.getDimension() - this.runnerMain.getWidth()/2) {
      roundOffset = this.bar.getDimension() - this.runnerMain.getWidth()/2;
      roundValue = this.parameters.maxValue;
    }

    return [roundOffset, roundValue];
  }

  private round = (value: number, step: number): number => {
    const whole = Math.trunc(value/step);
    const reminder = +(value - whole*step).toFixed(2);

    if (value < 0) {
      return Math.abs(reminder) < step/2 ? whole*step : (whole - 1)*step;
    }

    if (value <= this.parameters.minValue) {
      return this.parameters.minValue;
    } else if (value >= this.parameters.maxValue) {
      return this.parameters.maxValue;
    }

    return reminder < step/2 ? whole*step : (whole + 1)*step;
  }
}

export default Track;
