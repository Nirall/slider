import * as types from '../types';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import createElem from './blocks/createElem/createElem';
import Bar from './blocks/bar/Bar';
import Scale from './blocks/scale/Scale';
import Runner from './blocks/runner/Runner';
import Track from './blocks/track/Track';
import ProgressBar from './blocks/progressBar/ProgressBar';

class View {
  bar: Bar;
  progressBar: ProgressBar;
  runnerAdditional: Runner;
  runnerMain: Runner;
  parameters: types.Parameters;
  currentValues: types.CurrentValues;
  observers: MakeObservableObject;
  scale: Scale;
  track: Track;

  constructor(parameters = types.defaultParameters) {
    this.bar = new Bar(parameters.isVertical);
    this.progressBar = new ProgressBar(parameters.isVertical);
    this.currentValues = {
      currentMinValue: parameters.minValue,
      currentMaxValue: parameters.maxValue,
    }
    this.observers = new MakeObservableObject();
    this.parameters = parameters;

    this.scale = new Scale(parameters, this.graduationObserver);
    this.runnerAdditional = new Runner(parameters.isVertical, this.runnerObserver);
    this.runnerMain = new Runner(parameters.isVertical, this.runnerObserver);

    this.track = new Track({
      runnerMain: this.runnerMain,
      runnerAdditional: this.runnerAdditional,
      progressBar: this.progressBar,
      bar: this.bar,
      parameters: this.parameters,
    });
  }

  graduationObserver = (value: number) => {
    let offset = this.track.offsetValueConverter(value);
    let roundOffset, roundValue;
    [roundOffset, roundValue] = this.track.roundOffsetButt(offset);

    if (this.parameters.isRange) {
      this.runnerMove({
        runner: this.runnerCheck(offset),
        offset: roundOffset,
        value: roundValue
      });
    } else {
      this.runnerMove({
        runner: this.runnerMain,
        offset: roundOffset,
        value: roundValue
      });
    }
  }

  runnerObserver = ({ event, runner }: types.RunnerObserverData): void => {
    this.runnerMove(this.track.onRunnerMove(event, runner));
  }

  runnerMove = (obj: types.RunnerMoveData): void => {
    obj.runner.setPosition(obj.offset, obj.value);

    if (obj.runner === this.runnerAdditional) {
      this.currentValues.currentMinValue = obj.value;
    }

    if (obj.runner === this.runnerMain) {
      this.currentValues.currentMaxValue = obj.value;
    }

    this.track.updateProgressBar();
    this.observers.notifyObservers();
  }

  runnerCheck = (offset: number): Runner => {
    if (Math.abs(offset - this.track.getMainRunnerOffset()) < Math.abs(offset - this.track.getAdditionalRunnerOffset())) {
      return this.runnerAdditional;
    }

    return this.runnerMain;
  }

  onClickBar = (event: MouseEvent): void => {
    const coordinate = this.parameters.isVertical ? event.clientY : event.clientX;
    const offset = coordinate - this.bar.getPosition() - this.runnerMain.getWidth()/2;

    this.runnerMove(this.track.offsetProcessing(offset, this.runnerCheck(offset)));
  }

  init = (): void => {
    this.bar.init(this.parameters.isVertical);
    this.progressBar.init(this.parameters.isVertical);
    this.runnerAdditional.init(this.parameters.isVertical);
    this.runnerMain.init(this.parameters.isVertical);
    this.track.init(this.parameters);

    this.scale.init(this.parameters);

    this.runnerAdditional.hide();

    if (this.parameters.showLabel) {
      this.runnerAdditional.showLabel();
      this.runnerMain.showLabel();
    } else {
      this.runnerAdditional.hideLabel();
      this.runnerMain.hideLabel();
    }

    if (this.parameters.isRange) {
      this.runnerAdditional.show();
    } else {
      this.runnerAdditional.hide();
    }

    this.runnerAdditional.setPosition(-this.runnerAdditional.getWidth()/2, this.parameters.minValue);
    this.runnerMain.setPosition(this.bar.getDimension() - this.runnerMain.getWidth()/2, this.parameters.maxValue);

    this.renew();
  }

  renew() {
    this.runnerMove(this.track.offsetProcessing(this.track.offsetValueConverter(this.currentValues.currentMaxValue), this.runnerMain));
    this.runnerMove(this.track.offsetProcessing(this.track.offsetValueConverter(this.currentValues.currentMinValue), this.runnerAdditional));
  }

  append = (entry: HTMLElement): void => {
    entry.appendChild(this.bar.elem).appendChild(this.progressBar.elem);
    this.runnerMain.append(entry);
    this.runnerAdditional.append(entry);

    this.scale.marks.map((mark) => {
      entry.appendChild(mark.elem);
    });

    this.scale.moveMarks();

    this.bar.elem.onclick = this.onClickBar;
  }
}

export {createElem, Bar, View, Scale as Graduation};
