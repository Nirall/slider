const roundValue = (value: number, step: number): number => {
  const whole = Math.trunc(value / step);
  const reminder = Number((value - whole * step).toFixed(2));

  if (value < 0) {
    return Math.abs(reminder) < step / 2 ? whole * step : (whole - 1) * step;
  }

  return reminder < step / 2 ? whole * step : (whole + 1) * step;
};

export default roundValue;
