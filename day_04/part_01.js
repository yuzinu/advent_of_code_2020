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

const solve = async (...fields) => {
  let valid = 0;
  const lines = await parseLines();
  const passports = lines.map(line => {
    return hashify(line.split("\r\n").join(" ").split(" "));
  });

  passports.forEach(passport => {
    if (fields.every( field => passport[field] )) {
      valid += 1;
    }
  });

  return valid;
};

solve("byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid").then(console.log);