const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split("\r\n\r\n");
};

const findGroupSum = (group) => {
  const answers = {};
  let allAnswered = 0;

  group.forEach(member => {
    for (let question of member) {
      if (answers[question]) {
        answers[question] += 1;
      } else {
        answers[question] = 1;
      }
    }
  });

  for (let question in answers) {
    if (answers[question] === group.length) {
      allAnswered += 1;
    }
  }

  return allAnswered;
};

const solve = async () => {
  const lines = await parseLines();
  const groups = new Set();
  let count = 0;

  lines.forEach(group => {
    return groups.add(group.split("\r\n"));
  });

  for (let group of groups) {
    count += findGroupSum(group);
  }

  return count;
};

solve().then(console.log);