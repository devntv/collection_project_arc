export const FormatKg = (val = 0) => {
  if (Number.isNaN(val)) return null
  return `${val / 1000} kg`;
};

export default { FormatKg };
