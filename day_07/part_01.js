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
  const contentsHash = {};

  if (!contents.includes("no other bags")) {
    contents.forEach(content => {
      const [color, quantity] = parseContent(content);
      contentsHash[color] = quantity;
    });
  }

  return contentsHash;
};

const parseContent = (content) => {
  content = content.split(" ");
  const [color, quantity] = [([content[1], content[2]].join(" ")), Number(content[0])];
  return [color, quantity];
};
  
const solve = async (color) => {
  const lines = await parseLines();
  const rulebook = {};

  lines.forEach(line => {
    const [bag, contents] = parseLine(line);
    rulebook[bag] = contents;
  });

  const allContainingBags = new Set();
  const search = new Set([color]);
  const rules = new Set();

  while (search.size > 0) {
    for (let item of search) {
      for (let rule in rulebook) {
        if (rulebook[rule][item]) {
          rules.add(rule);
          allContainingBags.add(rule);
        }
      }
    }

    search.clear();

    for (let found of rules) {
      search.add(found);
    }

    rules.clear();
  }

  return allContainingBags.size;
};

solve("shiny gold").then(console.log);