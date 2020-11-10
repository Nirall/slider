import createElem from '../src/plugin/View/blocks/createElem/createElem';

describe('function createElem', () => {
  it('should have the certain class', () => {
    const newItem = createElem('classCustom');
    expect(newItem.classList.contains('classCustom')).toEqual(true);
  });
});
