class ParsingDigits {
  static parsing = (item: string|number): number|null => {
    if (typeof item === 'number') {
      return item;
    }

    if (typeof item === 'string') {
      if (/^-?\d+[\.,]\d+$/.test(item)) {
        return parseFloat(item);
      } else if (/^-?\d+$/.test(item)) {
        return parseInt(item);
      }
    }

    return null;
  }
}

export default ParsingDigits;