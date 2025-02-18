export const colorVotos = (sumaVotos) => {
  if (!sumaVotos || sumaVotos === 0) {
      return 'text-[#404040]';
  } else if (sumaVotos > 0) {
      return 'text-green-500';
  } else if (sumaVotos < 0) {
      return 'text-red-500';
  }
  return 'text-[#404040]';
};