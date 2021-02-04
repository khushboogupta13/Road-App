const puppeteer = require('puppeteer');

async function getCoord(address){
    var URL = "https://www.google.com/maps"

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        headless: true
        });
    
    const page = await browser.newPage();
    await page.goto(URL, {waitUntil:"networkidle2"});

    await page.waitForSelector('#searchboxinput');
    await page.type('#searchboxinput', address)
    await page.click('.searchbox-searchbutton-container');
    await delay(5000);
    const data = await page.url();
    browser.close();
    let arr = data.split('@')[1].split(',').slice(0, 2);
    //console.log(arr);
    return arr;
}

//getCoord("2/324, Jankipuram Vistar, Sitapur Road, Lucknow, Uttar Pradesh, India")

function delay(time){
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

module.exports = getCoord;