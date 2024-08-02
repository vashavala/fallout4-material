const { componentLinks, componentNames } = require('./componentLinks')
const fs = require('fs');
const puppeteer = require('puppeteer');
const BASIC_SRC = "https://fallout.fandom.com/wiki/";

(async () => {
  const browser = await puppeteer.launch({ timeout: 60000 });
  const page = await browser.newPage();

  // 0 - 10
  // componentLinks.splice(10)

  // 10 - 20
  // componentNames.splice(20)
  // componentNames.splice(0, 10)
  
  // componentLinks.splice(20)
  // componentLinks.splice(0, 10)

  // 20 ~
  // componentNames.splice(0, 20)
  // componentLinks.splice(0, 20)

  console.log(`componentNames`, componentNames.length, componentNames)
  console.log(`componentLinks`, componentLinks.length, componentLinks)

  const promises = Array(componentLinks.length).map(() => new Promise())
  for (let i = 0; i < componentLinks.length; i++) {
    const link = componentLinks[i]
    const componentName = componentNames[i]
    await page.goto(link, { waitUntil: 'networkidle2' });
    const table = await page.evaluate(() => {
      const _table = document.querySelector(`table.va-table`)
      if (!_table) return []
      const trs = _table.querySelectorAll(`tbody tr`)
      const materials = [].map.call(trs, tr => {
        const tds = tr.querySelectorAll('td');
        const rst = {
          name: tds[0].innerText,
          yield: tds[1].innerText,
          weight: tds[2].innerText,
          ratio: tds[3].innerText
        }
        return rst
      })
      return (_table && trs) ? materials : [];
    })
    promises[i] = { name: componentName, rows: table }
  }

  Promise
    .allSettled(promises)
    .then(() => {
      const content = `export const TABLES2 = ${JSON.stringify(promises)};`
      fs.writeFile('./garage/Tables2.js', content, err => {
        if (err) return console.error(err);
        console.log('tables has been created');
      });
      // console.log(`promises`, promises)
    })

  await browser.close();
})();
