export function calculateGenderAndChecksum(year, gender, code) {
  const Gender = {
    female: 0,
    male: 1,
  };

  const calculateG = (year, gender) =>
    Math.floor(year / 100) * 2 - 34 - Gender[gender.toLowerCase()];

  const checksum = (code) => {
    let b = 1,
      c = 3,
      d = 0,
      e = 0,
      i,
      digit;

    for (i = 0; i < 10; i++) {
      digit = parseInt(code[i]);
      d += digit * b;
      e += digit * c;
      b++;
      if (b === 10) b = 1;
      c++;
      if (c === 10) c = 1;
    }

    d = d % 11;
    e = e % 11;

    if (d < 10) {
      return d;
    } else if (e < 10) {
      return e;
    } else {
      return 0;
    }
  };

  const genderCenturyValue = calculateG(year, gender);
  const calculatedChecksum = checksum(code);

  return {
    genderCenturyValue,
    calculatedChecksum,
  };
}
