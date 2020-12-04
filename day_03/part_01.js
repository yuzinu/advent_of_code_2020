const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\r\n');
};

const solve = async () => {
  const lines = await parseLines();
  const size = lines[0].length;
  let trees = 0;
  let pos = 0;
  lines.forEach(line => {
    if (line[pos] === "#") {
      trees +=1 ;
    }
    pos = (pos + 3) % size;
  });
  return trees;
};

solve().then(console.log);