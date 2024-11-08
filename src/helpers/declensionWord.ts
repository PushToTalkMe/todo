export const declensionWord = (number: number, words: string[]) => {
  number = Math.abs(number) % 100;
  const num = number % 10;

  if (number > 10 && number < 20) {
    return words[2];
  }
  if (num > 1 && num < 5) {
    return words[1];
  }
  if (num === 1) {
    return words[0];
  }
  return words[2];
};
