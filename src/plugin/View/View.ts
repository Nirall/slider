import * as types from '../types';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import Track from './blocks/Track/Track';


class View {
  parameters: types.Parameters;
  currentValues: types.CurrentValues;
  observers: MakeObservableObject;
  track: Track;

  constructor(parameters = types.defaultParameters) {
    this.currentValues = {
      currentMinValue: parameters.minValue,
      currentMaxValue: parameters.maxValue,
    }

    this.observers = new MakeObservableObject();
    this.parameters = parameters;
    this.track = new Track(this.parameters);
  }

  init = (): void => {
    this.track.init(this.parameters);
    this.track.renewRunners(this.currentValues);
    this.track.observers.addObserver(this.handleTrackValueChanging);
  }

  handleTrackValueChanging = (data: types.CurrentValueChangingData) => {
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
}

export default View;
