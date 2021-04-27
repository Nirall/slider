import * as types from './types';

const normalizeInitParameters = (parameters: unknown, defaultParameters: types.Parameters)
    : types.Parameters => {
  const normalizedParameters = { ...defaultParameters };
  if (types.isParametersData(parameters)) {
    const { minValue, maxValue, step } = parameters;
    const isInitDataCorrect = minValue < maxValue && step > 0 && step < maxValue - minValue;
    if (!isInitDataCorrect) {
      return normalizedParameters;
    }

    Object.keys(defaultParameters).forEach(key => {
      switch (key) {
        case 'minValue':
        case 'maxValue':
        case 'step':
        case 'initMinValue':
        case 'initMaxValue':
          if (typeof parameters[key] === 'number') normalizedParameters[key] = Number(Number(parameters[key]).toFixed(2));
          break;
        case 'isRange':
        case 'isVertical':
        case 'showLabel':
          if (typeof parameters[key] === 'boolean') normalizedParameters[key] = Boolean(parameters[key]);
          break;
        default: break;
      }
    });
  }

  return normalizedParameters;
};

const normalizeUpdateConfig = (parameters: unknown)
    : types.RawParameters => {
  if (types.isUpdateData(parameters)) {
    const key = Object.keys(parameters)[0];
    switch (key) {
      case 'minValue':
      case 'maxValue':
      case 'step':
        return { [key]: Number(Number(parameters[key]).toFixed(2)) };
      case 'range':
      case 'vertical':
      case 'showLabel':
        return { [key]: parameters[key] ? 'toggle' : '' };
      default:
        break;
    }
  }

  return {};
};

const normalizeSetValues = (values: unknown): types.CurrentValues | null => {
  if (types.isCurrentValues(values)) {
    const snapValues = { ...values };
    Object.keys(values).forEach((key) => {
      switch (key) {
        case 'currentMinValue':
        case 'currentMaxValue':
          snapValues[key] = Number(values[key]);
          break;
        default: break;
      }
    });

    return snapValues;
  }

  return null;
};

export { normalizeInitParameters, normalizeUpdateConfig, normalizeSetValues };
