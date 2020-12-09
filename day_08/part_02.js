const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split("\r\n");
};

const isCyclical = (instructions) => {
  const visited = new Set();
  // let acc = 0;
  let i = 0;

  while (!visited.has(i) && i !== instructions.length) {
    const [operator, quantity] = instructions[i].split(" ");
    switch (operator) {
      case "acc":
        // acc += Number(quantity);
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

  return i < instructions.length;
};

const runProgram = (instructions) => {
  let acc = 0;
  let i = 0;

  while (i < instructions.length) {
    const [operator, quantity] = instructions[i].split(" ");
    switch (operator) {
      case "acc":
        acc += Number(quantity);
        i += 1;
        break;
      case "jmp":
        i += Number(quantity);
        break;
      case "nop":
        i += 1;
        break;
    }
  }

  return acc;
};

const solve = async () => {
  const lines = await parseLines();
  let i = 0;
  
  while (i < lines.length) {
    let [operator, quantity] = lines[i].split(" ");

    if (operator === "nop") {
      lines[i] = `jmp ${quantity}`;
      if (!isCyclical(lines)) {
        return runProgram(lines);
      } else {
        lines[i] = `nop ${quantity}`;
      }
    } else if (operator === "jmp") {
      lines[i] = `nop ${quantity}`;
      if (!isCyclical(lines)) {
        return runProgram(lines);
      } else {
        lines[i] = `jmp ${quantity}`;
      }
    }

    i += 1;
  }

  return "this didn't work";
};

solve().then(console.log);