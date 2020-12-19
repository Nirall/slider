import * as types from '../types';
import MakeObservableObject from '../makeObservableObject/MakeObservableObject';
import Track from './blocks/Track/Track';

class View {
  parameters: types.Parameters;

  currentValues: types.CurrentValues;

  observers: MakeObservableObject;

  track: Track;

  constructor(parameters = types.defaultParameters, observer: types.ObserverFunction) {
    this.parameters = parameters;
    this.observers = new MakeObservableObject();
    this.track = new Track(this.parameters, this.handleTrackValueChanging);
    this.observers.addObserver(observer);
    this.observers.addObserver(this.track.observeViewFromTrack);
  }

  update = (): void => {
    this.track.update(this.parameters);
  }

  handleTrackValueChanging = (eventName: string, data: types.CurrentValueChangingData): void => {
    if (eventName === 'ChangingCurrentValueFromTrack') {
      this.observers.notifyObservers('ChangingCurrentValueFromView', data);
    }
  }

  observeControllerFromView = (eventName: string, data: types.CurrentValues): void => {
    if (eventName === 'SendingCurrentValues') {
      this.observers.notifyObservers('SendingCurrentValues', data);
    }
  }

  appendToNode = (entry: HTMLElement): void => {
    this.track.appendToNode(entry);
  }
}

export default View;
