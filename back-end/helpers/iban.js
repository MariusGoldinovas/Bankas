export const generateRandomAccountNumber = () => {
  return Math.floor(10000000000 + Math.random() * 90000000000).toString();
};

export const generateRandomBankCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const generateLithuanianIBAN = (bankCode, accountNumber) => {
  const countryCode = "LT";

  let ibanWithoutCheckDigits = `${countryCode}00${bankCode}${accountNumber}`;

  const numericIBAN =
    ibanWithoutCheckDigits
      .split("")
      .map((char) =>
        isNaN(char) ? (char.charCodeAt(0) - 55).toString() : char
      )
      .join("") + "271500";

  const ibanBigInt = BigInt(numericIBAN);

  const checkDigits = (98n - (ibanBigInt % 97n)).toString();

  return `${countryCode}${checkDigits.padStart(
    2,
    "0"
  )}${bankCode}${accountNumber}`;
};
