function createElem(className: string) :HTMLElement {
  const elem = document.createElement('div');
  elem.ondragstart = () => false;
  elem.classList.add(className);
  return elem;
}

export default createElem;