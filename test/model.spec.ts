import Model from "../src/model";
import MakeObservableObject from "../src/assets/MakeObservableObject";

describe("Class Model", () => {
	it("constructor() should create .curMinValue", () => {
		const item = new Model(100);
		expect(item.curMinValue).toEqual(100);
	});

	it("constructor() should create .curMinValue prop with value = 0 on default", () => {
		const item = new Model();
		expect(item.curMinValue).toEqual(0);
	});

	it("constructor() should create .curMaxValue prop", () => {
		const item = new Model(0, 9999);
		expect(item.curMaxValue).toEqual(9999);
	});

	it("constructor() should create .curMaxValue prop with value = 1000 on default", () => {
		const item = new Model();
		expect(item.curMaxValue).toEqual(1000);
	});

	it("constructor() should create .observers prop with type MakeObservableObject", () => {
		const item = new Model();
		expect(item.observers instanceof MakeObservableObject).toBeTrue();
	});

	it("setCurMinValue() should set .curMinValue", () => {
		const item = new Model();
		item.setCurMinValue(100);
		expect(item.curMinValue).toEqual(100);
	});

	it("setCurMinValue() should call .notifyObservers()", () => {
		const item = new Model();
		let value = 0;
		item.observers.addObserver(() => value++);
		item.setCurMinValue(100);
		expect(value).toEqual(1);
	});

	it("setCurMinValue() shouldn't call .notifyObservers() if data the same", () => {
		const item = new Model();
		let value = 0;
		item.observers.addObserver(() => value++);
		item.setCurMinValue(0);
		expect(value).toEqual(0);
	});

	it("setCurMaxValue() should set .curMaxValue", () => {
		const item = new Model();
		item.setCurMaxValue(9999);
		expect(item.curMaxValue).toEqual(9999);
	});

	it("setCurMaxValue() should call .notifyObservers()", () => {
		const item = new Model();
		let value = 0;
		item.observers.addObserver(() => value++);
		item.setCurMaxValue(9999);
		expect(value).toEqual(1);
	});
	
	it("setCurMaxValue() shouldn't call .notifyObservers() if data the same", () => {
		const item = new Model();
		let value = 0;
		item.observers.addObserver(() => value++);
		item.setCurMaxValue(1000);
		expect(value).toEqual(0);
	});
})