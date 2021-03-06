const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\r\n');
};

const solve = async () => {
  let valid = 0;
  const lines = await parseLines();
  const ranges = new Set();
  const passwords = new Set();
  for (let line of lines) {
    line = line.split(" ");
    const range = line[0].split("-");
    const key = line[1].slice(0,1);
    const password = line[2];
    const legend = {};
    legend[key] = password;

    ranges.add(range);
    passwords.add(legend);
  }

  for (let i = 0; i < [...ranges].length; i++) {
    const [pos1, pos2] = [...ranges][i];
    const [letter, string] = [Object.keys([...passwords][i])[0], Object.values([...passwords][i])[0]];

    if ((string[pos1 - 1] === letter && string[pos2 - 1] !== letter) ||
        (string[pos1 - 1] !== letter && string[pos2 - 1] === letter)) {
      valid ++;
    }
  }

  return valid;
};

solve().then(console.log);