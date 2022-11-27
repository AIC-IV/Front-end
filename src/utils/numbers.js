const max = 27;
const min = 1;

const getRandomNumber = () => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const abbreviateNumber = (number) => {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(number);
};

export { getRandomNumber, abbreviateNumber };