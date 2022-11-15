const randomString = (length: number) => {
  const STR_DICTIONARY =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const dictionaryLength = STR_DICTIONARY.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * dictionaryLength);
    result += STR_DICTIONARY.charAt(randomIndex);
  }
  return result;
};

export default randomString;
