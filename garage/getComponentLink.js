const fs = require('fs');
const puppeteer = require('puppeteer');
const BASIC_SRC = "https://fallout.fandom.com/wiki/";

(async () => {
  const browser = await puppeteer.launch({ timeout: 60000 });
  const page = await browser.newPage();

  const componentPageSrc = `${BASIC_SRC}Fallout_4_junk_items`
  await page.goto(componentPageSrc, { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    const CUR_DIN = 5
    const _table = document.querySelector(`table[data-index-number="${CUR_DIN}"]`)
    const trs = _table.querySelectorAll(`tbody tr`)
    const componentName = [].map.call(trs, tr => tr.querySelector('td').innerText)
    return (_table && trs) ? componentName : 'Element not found';
  });

  if (!Array.isArray(result)) return console.error(`element error`)
  const AFTER_FIX = `_(Fallout_4)`
  const componentLinks = [...result].map(name => `${BASIC_SRC}${name.replace(/ /ig, '_')}${AFTER_FIX}`)

  const content = `
    const componentNames = ${JSON.stringify(result)};
    const componentLinks = ${JSON.stringify(componentLinks)};
    module.exports = { componentNames, componentLinks }
  `
  fs.writeFile('./garage/componentLinks.js', content, err => {
    if (err) return console.error(err);
    console.log('File has been created');
  });

  await browser.close();
})();
