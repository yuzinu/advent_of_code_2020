const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split("\r\n");
};

const solve = async () => {
  const lines = await parseLines();
  const visited = new Set();
  let acc = 0;
  let i = 0;

  while (!visited.has(i)) {
    const [operator, quantity] = lines[i].split(" ");
    switch (operator) {
      case "acc":
        acc += Number(quantity);
        visited.add(i);
        i += 1;
        break;
      case "jmp":
        visited.add(i);
        i += Number(quantity);
        break;
      case "nop":
        visited.add(i);
        i += 1;
        break;
    }
  }

  return acc;
};

solve().then(console.log);