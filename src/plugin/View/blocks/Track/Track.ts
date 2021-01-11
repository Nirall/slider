import * as types from '../../../types';
import Bar from '../Bar/Bar';
import Runner from '../Runner/Runner';
import Scale from '../Scale/Scale';
import ProgressBar from '../ProgressBar/ProgressBar';
import MakeObservableObject from '../../../makeObservableObject/MakeObservableObject';

class Track {
  parameters: types.Parameters;

  runnerMain: Runner;

  runnerAdditional: Runner;

  progressBar: ProgressBar;

  bar: Bar;

  scale: Scale;

  observers: MakeObservableObject;

  constructor(parameters: types.Parameters, observer: types.ObserverFunction) {
    this.parameters = parameters;
    this.runnerMain = new Runner(this.parameters.isVertical, this.handleRunnerMove);
    this.runnerAdditional = new Runner(this.parameters.isVertical, this.handleRunnerMove);
    this.progressBar = new ProgressBar(this.parameters.isVertical);
    this.bar = new Bar(this.parameters.isVertical, this.handleBarClick);
    this.scale = new Scale(this.parameters, this.handleScaleClick);
    this.observers = new MakeObservableObject();
    this.observers.addObserver(observer);
  }

  update = (parameters: types.Parameters): void => {
    this.parameters = parameters;
    this.bar.update(this.parameters.isVertical);
    this.progressBar.update(this.parameters.isVertical);
    this.runnerAdditional.update(this.parameters.isVertical);
    this.runnerMain.update(this.parameters.isVertical);
    this.scale.update(this.parameters);
    this.runnerAdditional.hideRunner();

    if (this.parameters.showLabel) {
      this.runnerAdditional.showLabel();
      this.runnerMain.showLabel();
    } else {
      this.runnerAdditional.hideLabel();
      this.runnerMain.hideLabel();
    }

    if (this.parameters.isRange) {
      this.runnerAdditional.showRunner();
    } else {
      this.runnerAdditional.hideRunner();
    }

    this.runnerAdditional.setPosition(
      -this.runnerAdditional.getWidth() / 2,
      this.parameters.minValue
    );
    this.runnerMain.setPosition(
      this.bar.getDimension() - this.runnerMain.getWidth() / 2,
      this.parameters.maxValue
    );
  }

  observeViewFromTrack = (eventName: string, data?: any): void => {
    if (eventName === 'SendingCurrentValues') {
      this.renewRunners(data);
    } if (eventName === 'UpdatingConfig') {
      this.update(data);
    } if (eventName === 'AppendingToNode') {
      this.appendToNode(data);
    }
  }

  appendToNode = (entry: HTMLElement): void => {
    entry.appendChild(this.bar.elem).appendChild(this.progressBar.elem);
    this.runnerMain.appendToNode(entry);
    this.runnerAdditional.appendToNode(entry);
    this.scale.appendToNode(entry);
    this.update(this.parameters);
    this.updateProgressBar();
  }

  private renewRunners(currentValues: types.CurrentValues): void {
    this.moveRunner(
      this.processRunnerOffset(
        this.convertOffsetToValue(currentValues.currentMaxValue),
        this.runnerMain
      )
    );
    this.moveRunner(
      this.processRunnerOffset(
        this.convertOffsetToValue(currentValues.currentMinValue),
        this.runnerAdditional
      )
    );
  }

  private convertOffsetToValue = (value: number): number => {
    return (((value - this.parameters.minValue) * this.bar.getDimension())
      / (this.parameters.maxValue - this.parameters.minValue)
      - this.runnerMain.getWidth() / 2);
  }

  private getMainRunnerOffset = (): number => {
    const offset = this.runnerMain.getPosition() - this.bar.getPosition()
      + this.runnerMain.getWidth() / 2;
    return offset < 0 ? 0 : offset;
  }

  private getAdditionalRunnerOffset = (): number => {
    if (this.parameters.isRange) {
      return this.runnerAdditional.getPosition() - this.bar.getPosition()
        + this.runnerMain.getWidth() / 2;
    }

    return 0;
  }

  private handleRunnerMove = (eventName: string,
    { event, runner }: types.RunnerObserverData): void => {
    if (eventName === 'MovingRunner') {
      this.moveRunner(this.processRunnerMouseEvent(event, runner));
    }
  }

  private moveRunner = (obj: types.RunnerMoveData): void => {
    obj.runner.setPosition(obj.offset, obj.value);

    if (obj.runner === this.runnerAdditional) {
      this.observers.notifyObservers('ChangingCurrentValueFromTrack', { currentMinValue: obj.value });
    }

    if (obj.runner === this.runnerMain) {
      this.observers.notifyObservers('ChangingCurrentValueFromTrack', { currentMaxValue: obj.value });
    }

    this.updateProgressBar();
  }

  private processRunnerMouseEvent = (eventMm: MouseEvent, runner: Runner): types.RunnerMoveData => {
    const coordinate = this.parameters.isVertical ? eventMm.clientY : eventMm.clientX;
    const offset = coordinate - this.bar.getPosition() - this.runnerMain.getWidth() / 2;

    return this.processRunnerOffset(offset, runner);
  }

  private processRunnerOffset = (offset: number, runner: Runner): types.RunnerMoveData => {
    let roundValue = 0;
    let roundOffset;
    roundOffset = this.checkRunnerOffset(offset, runner);
    [roundOffset, roundValue] = this.roundOffsetRunner(roundOffset);
    return {
      runner: runner,
      offset: roundOffset,
      value: roundValue
    };
  }

  private checkRunnerOffset = (offset: number, runner: Runner): number => {
    const stepWidth = (this.parameters.step * this.bar.getDimension())
      / (this.parameters.maxValue - this.parameters.minValue);
    const minOffset = stepWidth / 1.5 > this.runnerMain.getWidth()
      ? stepWidth / 1.5
      : this.runnerMain.getWidth();
    let newOffset = offset;

    if (runner === this.runnerAdditional) {
      if (offset > this.runnerMain.getPosition() - this.bar.getPosition() - minOffset) {
        newOffset = this.runnerMain.getPosition() - this.bar.getPosition() - minOffset;
      }
    } else if (runner === this.runnerMain) {
      if (offset < this.runnerAdditional.getPosition() - this.bar.getPosition() + minOffset) {
        newOffset = this.runnerAdditional.getPosition() - this.bar.getPosition() + minOffset;
      }
    }

    return newOffset;
  }

  private roundOffsetRunner = (currentOffset: number): [number, number] => {
    const currentValue = this.parameters.minValue
      + ((currentOffset + this.runnerMain.getWidth() / 2)
      * (this.parameters.maxValue - this.parameters.minValue))
      / this.bar.getDimension();
    let roundValue = this.round(currentValue, this.parameters.step);

    if (this.parameters.isFloat) {
      roundValue = parseFloat(roundValue.toFixed(2));
    }

    let roundOffset = this.convertOffsetToValue(roundValue);

    if (roundOffset < -this.runnerMain.getWidth() / 2) {
      roundOffset = -this.runnerMain.getWidth() / 2;
      roundValue = this.parameters.minValue;
    }

    if (roundOffset > this.bar.getDimension() - this.runnerMain.getWidth() / 2) {
      roundOffset = this.bar.getDimension() - this.runnerMain.getWidth() / 2;
      roundValue = this.parameters.maxValue;
    }

    return [roundOffset, roundValue];
  }

  private round = (value: number, step: number): number => {
    const whole = Math.trunc(value / step);
    const reminder = +(value - whole * step).toFixed(2);

    if (value < 0) {
      return Math.abs(reminder) < step / 2 ? whole * step : (whole - 1) * step;
    }

    if (value <= this.parameters.minValue) {
      return this.parameters.minValue;
    } if (value >= this.parameters.maxValue) {
      return this.parameters.maxValue;
    }

    return reminder < step / 2 ? whole * step : (whole + 1) * step;
  }

  private handleScaleClick = (eventName: string, value: number) => {
    if (eventName === 'ClickOnScale') {
      const offset = this.convertOffsetToValue(value);
      let runner;

      if (this.parameters.isRange) {
        runner = this.checkRunnerCloser(offset);
      } else {
        runner = this.runnerMain;
      }

      this.moveRunner(this.processRunnerOffset(offset, runner));
    }
  }

  private checkRunnerCloser = (offset: number): Runner => {
    if (Math.abs(offset - this.getMainRunnerOffset())
      < Math.abs(offset - this.getAdditionalRunnerOffset())) {
      return this.runnerMain;
    }

    return this.runnerAdditional;
  }

  private handleBarClick = (eventName: string, event: MouseEvent): void => {
    if (eventName === 'ClickOnBar') {
      const coordinate = this.parameters.isVertical ? event.clientY : event.clientX;
      const offset = coordinate - this.bar.getPosition() - this.runnerMain.getWidth() / 2;

      if (this.parameters.isRange) {
        this.moveRunner(this.processRunnerOffset(offset, this.checkRunnerCloser(offset)));
      } else {
        this.moveRunner(this.processRunnerOffset(offset, this.runnerMain));
      }
    }
  }

  private updateProgressBar = (): void => {
    this.progressBar.update(this.parameters.isVertical);
    this.progressBar.setPosition(this.getAdditionalRunnerOffset());
    this.progressBar.setDimension(this.getMainRunnerOffset() - this.getAdditionalRunnerOffset());
  }
}

export default Track;
