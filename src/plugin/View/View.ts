import * as types from '../types';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import Track from './blocks/Track/Track';

class View {
  parameters: types.Parameters;

  currentValues: types.CurrentValues;

  observers: MakeObservableObject;

  track: Track;

  constructor(parameters = types.defaultParameters) {
    this.parameters = parameters;
    this.observers = new MakeObservableObject();
    this.track = new Track(this.parameters);
    this.init();
  }

  update = (): void => {
    this.track.update(this.parameters);
    this.track.renewRunners(this.currentValues);
  }

  handleTrackValueChanging = (data: types.CurrentValueChangingData): void => {
    if (data.typeOfValue === 'minValue') {
      this.currentValues.currentMinValue = data.value;
    } else if (data.typeOfValue === 'maxValue') {
      this.currentValues.currentMaxValue = data.value;
    }

    this.observers.notifyObservers();
  }

  appendToNode = (entry: HTMLElement): void => {
    this.track.appendToNode(entry);
  }

  private init = (): void => {
    this.currentValues = {
      currentMinValue: this.parameters.minValue,
      currentMaxValue: this.parameters.maxValue
    };

    this.track.observers.addObserver(this.handleTrackValueChanging);
  }
}

export default View;
