const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split(".\r\n");
};

const parseLine = (line) => {
  let [bag, contents] = line.split(" bags contain ");
  contents = parseContents(contents.split(", "));
  return [bag, contents];
};

const parseContents = (contents) => {
  if (contents.includes("no other bags")) return null;
  const contentsHash = {};

  contents.forEach(content => {
    const [color, quantity] = parseContent(content);
    contentsHash[color] = quantity;
  });

  return contentsHash;
};

const parseContent = (content) => {
  content = content.split(" ");
  const [color, quantity] = [([content[1], content[2]].join(" ")), Number(content[0])];
  return [color, quantity];
};
  
const makeRulebook = (lines) => {
  const rulebook = {};

  lines.forEach(line => {
    const [bag, contents] = parseLine(line);
    rulebook[bag] = contents;
  });

  return rulebook;
};

const findContainedBags = (rulebook, color) => {
  let total = 0;

  for (let bag in rulebook[color]) {
    let bagTotal = rulebook[color][bag] * (findContainedBags(rulebook, bag) + 1);
    total += bagTotal;
  }

  return total;
};

const solve = async (color) => {
  const lines = await parseLines();
  const rulebook = makeRulebook(lines);
  return findContainedBags(rulebook, color);
};

solve("shiny gold").then(console.log);