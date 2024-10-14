import moment from "moment";

const randomDate = (start, end) => {
  const endTime = +moment(end);
  const randomNumber = (to, from = 0) =>
    Math.floor(Math.random() * (to - from) + from);

  if (start) {
    const startTime = +moment(start);
    if (startTime > endTime) {
      throw new Error("End date is before start date!");
    }
    return moment(randomNumber(endTime, startTime));
  }
  return moment(randomNumber(endTime));
};

const getPersonControlNumber = (value) => {
  const numbersArray = value.split("").map((i) => Number(i));

  const firstControlNumber = getControlNumber(numbersArray);

  if (firstControlNumber < 10) {
    return firstControlNumber;
  }

  let secondControlNumber = getControlNumber(numbersArray, 3);

  if (secondControlNumber === 10) {
    secondControlNumber = 0;
  }

  return secondControlNumber;
};

export function validate(code) {
  if (!code) {
    return resultHandler(VALIDATION_ERRORS.EMPTY);
  }

  if (!/^[1-6|9][0-9]{10}$/.test(code)) {
    return resultHandler(VALIDATION_ERRORS.INVALID);
  }

  const regex = /^([1-6|9])([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9])$/;

  const match = regex.exec(code);
  if (!match) {
    return resultHandler(VALIDATION_ERRORS.INVALID);
  }

  const [_, centurySex, yearShort, month, day, controlNumber] = match;

  let year;
  if (Number(centurySex) < 3) {
    year = `18${yearShort}`;
  } else if (Number(centurySex) < 5) {
    year = `19${yearShort}`;
  } else if (Number(centurySex) < 7) {
    year = `20${yearShort}`;
  }

  const monthDayException = !Number(month) || !Number(day);

  if (!year || monthDayException) {
    return resultHandler(VALIDATION_ERRORS.INVALID_DATE);
  }

  const dateIsValid = moment(`${year}-${month}-${day}`, "YYYY-MM-DD").isValid();

  if (!dateIsValid) {
    return resultHandler(VALIDATION_ERRORS.INVALID_DATE);
  }

  const generatedControlNumber = getPersonControlNumber(
    code.slice(0, code.length - 1)
  );

  if (generatedControlNumber === Number(controlNumber)) {
    return resultHandler();
  }

  return resultHandler(VALIDATION_ERRORS.INVALID_CONTROL_NUMBER);
}

export function generate() {
  const randDate = randomDate("1900-01-01", moment());

  const randSex = Math.floor(Math.random() * 2);
  let sexes = [5, 6];
  if (randDate.year() < 2000) {
    sexes = [3, 4];
  }

  const randQueueNumber = randomNumberToString(3);
  const date = randDate.format("YYMMDD");

  const withoutControlNumber = `${sexes[randSex]}${date}${randQueueNumber}`;

  const generatedControlNumber = getPersonControlNumber(withoutControlNumber);

  return `${withoutControlNumber}${generatedControlNumber}`;
}

export function getControlNumber(numbers, firstMultiplier = 1) {
  return (
    numbers
      .map((item, index) => item * (((index + firstMultiplier - 1) % 9) + 1))
      .reduce((acc, item) => acc + item, 0) % 11
  );
}

export function resultHandler(errorType = "", isException = false) {
  if (!errorType) {
    return { isValid: true, isException };
  }

  return {
    isValid: false,
    error: errorType,
  };
}

export function randomNumberToString(length = 3) {
  const maxNumber = Math.pow(10, length);
  const randNumber = Math.floor(Math.random() * maxNumber).toString();
  return randNumber.padStart(length, "0");
}

export const VALIDATION_ERRORS = {
  EMPTY: "No ID number provided",
  INVALID: "Invalid ID number format",
  INVALID_CONTROL_NUMBER: "Gender is invalid",
  INVALID_DATE: "Date is invalid",
};
