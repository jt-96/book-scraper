const scraperObject = {
    url: 'http://books.toscrape.com',
    async scraper(browser) {
        //Create new page
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        //Navigate to selected url
        await page.goto(this.url);

        //Wait for selector
        await page.waitForSelector('.page_inner');
        //Get the Link for all books
        let urls = await page.$$eval('section ol > li', links => {
            //check if books is in stock
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== 'In stock');

            //extract the links
            links = links.map(el => el.querySelector('h3 > a').href)
            return links;
        })

        console.log(urls);
    }
}

module.exports = scraperObject;