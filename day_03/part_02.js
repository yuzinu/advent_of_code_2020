const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\r\n');
};

const solve = async () => {
  const vectors = [ [1,1], [3,1], [5,1], [7,1], [1,2] ];
  const lines = await parseLines();
  const size = lines[0].length;
  // let allTrees = [];
  let allTrees = 1;
  
  vectors.forEach( vector => {
    let posX = 0, posY = 0, trees = 0;
    const [right, down] = [...vector];
    while (posY < lines.length) {
      let line = lines[posY];

      if (line[posX] === "#") {
        trees +=1 ;
      }

      posX = (posX + right) % size;
      posY = posY + down;
    };

    // allTrees.push(trees);
    allTrees *= trees;
  });

  //return allTrees.reduce((acc, el) => acc * el);
  return allTrees;
};

solve().then(console.log);