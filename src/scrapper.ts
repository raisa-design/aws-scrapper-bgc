import Puppeteer from 'puppeteer';
import Cheerio from 'cheerio';

import {PutItemCommand} from "@aws-sdk/client-dynamodb";
import {client} from "./services/connection";

const TABLE_NAME = process.env.DYNAMODB_TABLE;

type Product = {
  title,
  priceFormat,
}

const handler = async (event) => {
  const browser = await Puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.goto('https://empresas.americanas.com.br/hotsite/produtos-mais-vendidos', {waitUntil: 'load', timeout: 0});

  const html = await page.content();

  await browser.close();

  const products: Product[] = [];

  const $ = Cheerio.load(html);

  const data = $('.inStockCard__Wrapper-sc-1ngt5zo-0').slice(0, 3);

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const titleElement = $(element).find('.product-name__Name-sc-1shovj0-0');
    const priceElement = $(element).find('.price-info__Container-sc-1xm1xzb-3 > span').first();

    const title = titleElement.text();
    const priceFormat = priceElement.text();

    try {
      const input = {
        TableName: TABLE_NAME,
        Item: {
          id: { N: (i + 1).toString()},
          title: { S: title },
          price_format: { S: priceFormat },
          created_at: { S: (new Date()).toDateString() },
        }
      };

      const command = new PutItemCommand(input);
      await client.send(command);
    }catch(err){
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: err.message
        }),
      };
    }

    products.push({
      title,
      priceFormat,
    })    
  }

  return {
    statusCode: 200,
    body: JSON.stringify([
        ...products,
    ]),
  };
};

export { 
  handler
}