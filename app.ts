const axios = require("axios");
const cheeiro = require("cheerio");
const fs = require("fs");

const url =
  "https://loterialeidsadehoy.com/quiniela-pale-del-15-de-abril-del-2023/";

const lottery: any[] = [];

const getHTML = async () => {
  const { data: html } = await axios.get(url);
  return html;
};

getHTML().then((res) => {
  const $ = cheeiro.load(res);

  const $title = $(".entry-title").text();
  const $results = $(".n-resultados").text();

  lottery.push({ title: $title, results: $results });

  console.log(lottery);

  saveFile(lottery, "lottery");
});

const saveFile = (data: any, fileName: string) => {
  fs.writeFile(`${fileName}.json`, JSON.stringify(data), (err: Error) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};
