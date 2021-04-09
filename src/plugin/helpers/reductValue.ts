const reductValue = (value: number, step: number): number => {
  const whole = Math.trunc(value / step);
  const reminder = Number((value - whole * step).toFixed(2));

  if (value < 0) {
    return Math.abs(reminder) < step / 2 ? whole * step : (whole - 1) * step;
  }

  const result = reminder < step / 2 ? whole * step : (whole + 1) * step;
  return Number((result).toFixed(2));
};

export default reductValue;
