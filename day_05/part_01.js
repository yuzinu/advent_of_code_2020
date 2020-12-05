const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split("\r\n");
};

const findId = (id) => {
  let [rstart, rend, cstart, cend] = [0, 127, 0, 7];
  let i = 0;
  while (rstart < rend || cstart < cend) {
    let char = id[i];
    let rstep = Math.ceil((rend - rstart) / 2);
    let cstep = Math.ceil((cend - cstart) / 2);
    switch (char) {
      case "B":
        rstart += rstep;
        break;
      case "F":
        rend -= rstep;
        break;
      case "R":
        cstart += cstep;
        break;
      case "L":
        cend -= cstep;
        break;
    }
    i++;
  }
  return rstart * 8 + cstart;
};

const solve = async () => {
  const lines = await parseLines();
  return lines.reduce((acc,el) => {
      return Math.max(acc, findId(el));
  }, 0);
};

solve().then(console.log);