export const getFirstSymbol = (string) => string.slice(0, 1);

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (templateSymbol) => {
      const randomNumber = (Math.random() * 16) | 0;

      const uuid =
        templateSymbol === "x" ? randomNumber : (randomNumber & 0x3) | 0x8;

      return uuid.toString(16);
    }
  );
};
