export const getRandomSymbolIndex = (symbols: string[]): number => {
    return Math.floor(Math.random() * symbols.length);
  };