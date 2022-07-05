const scraperObject = {
    url: 'http://books.toscrape.com',
    async scraper(browser) {
        //Create new page
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        //Navigate to selected url
        await page.goto(this.url);
        let scrapedData = [];
        
        //Wait for selector
        await page.waitForSelector('.page_inner');
        //Get the Link for all books
        let urls = await page.$$eval('section ol > li', links => {
            //check if books is in stock
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== 'In stock');
            
            //extract the links
            links = links.map(el => el.querySelector('h3 > a').href)
            return links;
        });
        // console.log(urls);
        
        //Now we click in every scraped link and extract their information.
        //Loop through each of those links, open a new page instance and get the relevant data.
        let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
            dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
            dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => img.src);
            // dataObj['bookDescription'] = await newPage.$eval('.product_page > p', text => text.textContent);
            dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
            resolve(dataObj);
            await newPage.close();
        });

        for(link in urls) {
            let currentDataPage = await pagePromise(urls[link]);
            scrapedData.push(currentDataPage);
            // console.log(currentDataPage);
        }
        
        // console.log('UTILS PAGESCRAPER', scrapedData);

        return scrapedData;
    }
}

module.exports = scraperObject;