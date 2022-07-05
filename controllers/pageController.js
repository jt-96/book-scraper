const pageScraper = require('../utils/pageScraper')
const fs = require('fs');

async function scrapeAll(browserInstance) {

    let browser;

    try {
        browser = await browserInstance;
        let scrapedData = {};
        scrapedData = await pageScraper.scraper(browser);
        await browser.close();
        console.log(scrapedData);
        fs.writeFile("data.json", JSON.stringify(scrapedData, null, '\t'), 'utf-8', function(err) {
            if(err) {
                return console.log(err);
            }

            console.log('Data saved!');
        })
    
    } catch (err) {
        console.log('Could not resolve the browser instance => ', err);
    }
}

module.exports = {scrapeAll};