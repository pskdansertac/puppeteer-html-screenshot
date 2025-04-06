const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
app.use(express.json({ limit: '2mb' }));

app.post('/screenshot', async (req, res) => {
  const html = req.body.html;

  if (!html) return res.status(400).send("HTML eksik.");

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1350 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const buffer = await page.screenshot({ type: 'png' });
  await browser.close();

  res.set('Content-Type', 'image/png');
  res.send(buffer);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Puppeteer sunucusu ${port} portunda çalışıyor`));
