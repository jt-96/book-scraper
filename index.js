const browser = require('./utils/browser');
const controller = require('./controllers/pageController');

let browserInstance = browser.startBrowser();

controller.scrapeAll(browserInstance);