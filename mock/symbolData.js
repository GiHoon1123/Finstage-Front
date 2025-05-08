/* eslint-disable */
const { faker } = require("@faker-js/faker");

function generateMockSymbols(count) {
  return Array.from({ length: count }, () => {
    const symbol =
      faker.finance.currencyCode().toUpperCase() +
      faker.string.alpha({ length: 2 }).toUpperCase();

    return {
      symbol,
      name: faker.company.name() + " Inc.",
      lastsale: `$${faker.finance.amount({ min: 5, max: 500, dec: 2 })}`,
      netchange: faker.finance.amount({ min: -5, max: 5, dec: 2 }),
      pctchange: `${faker.finance.amount({ min: -10, max: 10, dec: 2 })}%`,
      volume: faker.number.int({ min: 10000, max: 1000000 }).toLocaleString(),
      marketCap: faker.finance.amount({
        min: 100000000,
        max: 5000000000,
        dec: 0,
      }),
      country: faker.location.country(),
      ipoyear: faker.date.past({ years: 10 }).getFullYear().toString(),
      industry: faker.commerce.department(),
      sector: faker.commerce.productAdjective(),
      url: `/market-activity/stocks/${symbol.toLowerCase()}`,
    };
  });
}

module.exports = { generateMockSymbols };
