const axios = require('axios');
const cheeiro = require('cheerio');
const fs = require('fs');

const url = 'https://imdb.com/chart/top';

const movies: any = {};

const getHTML = async () => {
    const { data: html } = await axios.get(url);
    return html;
}

getHTML().then((res)=> {
    const $ = cheeiro.load(res);
    $('.lister-list>tr').each((i: number, movie: any) => { 
        const title = $(movie).find('.titleColumn>a').text();
        const rating = $(movie).find('.imdbRating>strong').text();
        movies[title]=rating;
    });
    saveFile(movies, 'movies');
});

const saveFile = (data: any, fileName: string) => { 
    fs.writeFile(`${fileName}.json`, JSON.stringify(data), (err: Error) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}