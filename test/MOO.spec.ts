import MakeObservableObject from "../src/assets/MakeObservableObject";

describe("MakeObservableObject", () => {
  it("constructor() should make .observers = []", () => {
    const item = new MakeObservableObject();
    expect(item.observers).toEqual([]);
  });

  it("addObserver() should add an observer", () => {
    const item = new MakeObservableObject();
    function observer() {
        console.log("asdf")
    }

    item.addObserver(observer);
    expect(item.observers[0]).toEqual(observer);
  });

  it("addObserver() should throw an error if the observer already exist", () => {
    const item = new MakeObservableObject();
    function observer() {
        console.log("asdf")
    }
    
    item.addObserver(observer);
    expect(function() { item.addObserver(observer) }).toThrow(new Error('observer already in the list'));
  });

  it("removeObserver() should remove the certain observer", () => {
    const item = new MakeObservableObject();
    function observer() {
        console.log("asdf")
    }
    
    item.addObserver(observer);
    item.removeObserver(observer);
    expect(item.observers[0]).toEqual(undefined);
  });
  
  it("notifyObservers() should call the observers", () => {
    const item = new MakeObservableObject();
    let value = 0;
    function observer() {
        value++;
    }

    item.addObserver(observer);
    item.notifyObservers();
    expect(value).toEqual(1);
  });
})