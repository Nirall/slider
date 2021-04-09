import * as types from '../../../types';
import Bar from '../Bar/Bar';
import Runner from '../Runner/Runner';
import Scale from '../Scale/Scale';
import ProgressBar from '../ProgressBar/ProgressBar';
import ObservableObject from '../../../observableObject/ObservableObject';

class Track {
  parameters: types.Parameters;

  runnerMain: Runner;

  runnerAdditional: Runner;

  progressBar: ProgressBar;

  bar: Bar;

  scale: Scale;

  observers: ObservableObject;

  constructor(parameters: types.Parameters, observer: types.ObserverFunction) {
    this.parameters = parameters;
    this.runnerMain = new Runner(this.parameters.isVertical, this.handleRunnerMove);
    this.runnerAdditional = new Runner(this.parameters.isVertical, this.handleRunnerMove);
    this.progressBar = new ProgressBar(this.parameters.isVertical);
    this.bar = new Bar(this.parameters.isVertical, this.handleBarClick);
    this.scale = new Scale(this.parameters, this.handleScaleClick);
    this.observers = new ObservableObject();
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

  observeViewFromTrack = <T>(
    eventName: string,
    data?: T | types.CurrentValues | types.Parameters | types.AppendingObserverData
    ): void => {
    switch (eventName) {
      case 'SendingCurrentValuesFromView':
        if (types.isCurrentValues(data)) {
          this.renewRunners(data);
        }
        break;
      case 'UpdatingConfig':
        if (types.isParametersData(data)) {
          this.update(data);
        }
        break;
      case 'AppendingToNode':
        if (types.isAppendingObserverData(data)) {
          this.appendToNode(data);
        }
        break;
      default:
        break;
    }
  }

  appendToNode = (data: types.AppendingObserverData): void => {
    const { entry } = data;
    entry.appendChild(this.bar.elem).appendChild(this.progressBar.elem);
    this.runnerMain.appendToNode(entry);
    this.runnerAdditional.appendToNode(entry);
    this.scale.appendToNode(entry);
    this.update(this.parameters);
    this.updateProgressBar();
  }

  private renewRunners({ currentMinValue, currentMaxValue }: types.CurrentValues): void {
    if (currentMinValue || currentMinValue === 0) {
      this.moveRunner(
        this.processRunnerOffset(
          this.convertValueToOffset(currentMinValue),
          this.runnerAdditional
        )
      );
    }

    if (currentMaxValue || currentMaxValue === 0) {
      this.moveRunner(
        this.processRunnerOffset(
          this.convertValueToOffset(currentMaxValue),
          this.runnerMain
        )
      );
    }
  }

  private convertValueToOffset = (value: number): number => {
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

  private handleRunnerMove = <T>(eventName: string,
    data: T | types.RunnerObserverData): void => {
    if (eventName === 'MovingRunner') {
      if (types.isRunnerObserverData(data)) {
        const { event, runner } = data;
        this.moveRunner(this.processRunnerMouseEvent(event, runner));
      }
    }
  }

  private moveRunner = ({ offset, value, runner }: types.RunnerMoveData): void => {
    runner.setPosition(offset, value);

    if (runner === this.runnerAdditional) {
      this.observers.notifyObservers('ChangingCurrentValueFromTrack', { currentMinValue: value });
    }

    if (runner === this.runnerMain) {
      this.observers.notifyObservers('ChangingCurrentValueFromTrack', { currentMaxValue: value });
    }

    this.updateProgressBar();
  }

  private processRunnerMouseEvent = (eventMm: MouseEvent, runner: Runner): types.RunnerMoveData => {
    const coordinate = this.parameters.isVertical ? eventMm.clientY : eventMm.clientX;
    const offset = coordinate - this.bar.getPosition() - this.runnerMain.getWidth() / 2;

    return this.processRunnerOffset(offset, runner);
  }

  private processRunnerOffset = (
    offset: number,
    runner: Runner,
    value?: number
  ): types.RunnerMoveData => {
    let currentValue;
    if (!value || value !== 0) {
      currentValue = this.parameters.minValue
      + ((offset + this.runnerMain.getWidth() / 2)
      * (this.parameters.maxValue - this.parameters.minValue))
      / this.bar.getDimension();
      currentValue = parseFloat(currentValue.toFixed(2));
    } else {
      currentValue = value;
    }

    let roundOffset = offset;

    if (roundOffset < -this.runnerMain.getWidth() / 2) {
      roundOffset = -this.runnerMain.getWidth() / 2;
      currentValue = this.parameters.minValue;
    }

    if (roundOffset > this.bar.getDimension() - this.runnerMain.getWidth() / 2) {
      roundOffset = this.bar.getDimension() - this.runnerMain.getWidth() / 2;
      currentValue = this.parameters.maxValue;
    }

    return {
      runner: runner,
      offset: roundOffset,
      value: currentValue
    };
  }

  private handleScaleClick = <T>(eventName: string, data: T | types.ScaleObserverData) => {
    if (eventName === 'ClickOnScale') {
      if (types.isScaleObserverData(data)) {
        const { value } = data;
        const offset = this.convertValueToOffset(value);
        let runner;

        if (this.parameters.isRange) {
          runner = this.checkRunnerCloser(offset);
        } else {
          runner = this.runnerMain;
        }

        this.moveRunner(this.processRunnerOffset(offset, runner));
      }
    }
  }

  private checkRunnerCloser = (offset: number): Runner => {
    if (Math.abs(offset - this.getMainRunnerOffset())
      < Math.abs(offset - this.getAdditionalRunnerOffset())) {
      return this.runnerMain;
    }

    return this.runnerAdditional;
  }

  private handleBarClick = <T>(eventName: string, data: T | types.BarObserverData): void => {
    if (eventName === 'ClickOnBar') {
      if (types.isBarObserverData(data)) {
        const { event } = data;
        const coordinate = this.parameters.isVertical ? event.clientY : event.clientX;
        const offset = coordinate - this.bar.getPosition() - this.runnerMain.getWidth() / 2;

        if (this.parameters.isRange) {
          this.moveRunner(this.processRunnerOffset(offset, this.checkRunnerCloser(offset)));
        } else {
          this.moveRunner(this.processRunnerOffset(offset, this.runnerMain));
        }
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
