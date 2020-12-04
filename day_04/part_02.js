const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split("\r\n\r\n");
};

const hashify = (array) => {
  const hash = {};
  array.forEach(param => {
    const [key, value] = param.split(":");
    hash[key] = value;
  });
  return hash;
};

const between = (data, start, end) => {
  return (start <= data && data <= end);
};

const validHeight = (data) => {
  const height = parseInt(data);
  if (data.includes("cm")) {
    return between(height, 150, 193);
  } else if (data.includes("in")) {
    return between(height, 59, 76);
  } else {
    return false;
  }
};

const validHairColor = (data) => {
  const validChars = new Set(["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]);
  return (data[0] === "#" && data.length === 7 && data.slice(1).split("").every(char => validChars.has(char)));
};

const validEyeColor = (data) => {
  const validColors = new Set(["amb","blu","brn","gry","grn","hzl","oth"]);
  return validColors.has(data);
};

const validPassport = (passport) => {
  return ((between(passport.byr, 1920, 2002)) &&
          (between(passport.iyr, 2010, 2020)) &&
          (between(passport.eyr, 2020, 2030)) &&
          (validHeight(passport.hgt)) &&
          (validHairColor(passport.hcl)) &&
          (validEyeColor(passport.ecl)) &&
          (passport.pid.length === 9 && Number(passport.pid))
  );
};

const solve = async (...fields) => {
  let valid = 0;
  const lines = await parseLines();
  const passports = lines.map(line => {
    return hashify(line.split("\r\n").join(" ").split(" "));
  });

  passports.forEach(passport => {
    if (fields.every(field => passport[field]) && validPassport(passport)) {
      valid += 1;
    }
  });

  return valid;
};

solve("byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid").then(console.log);