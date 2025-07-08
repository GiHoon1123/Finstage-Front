/* eslint-disable */
const { faker } = require("@faker-js/faker");

function generateMockIncomeStatements(symbol, count) {
  return Array.from({ length: count }).map((_, idx) => {
    const revenue = faker.number.int({ min: 100000000, max: 1000000000 });
    const cost = faker.number.int({ min: 40000000, max: revenue - 100000 });
    const gross = revenue - cost;
    const operating = faker.number.int({ min: gross * 0.4, max: gross });
    const net = faker.number.int({ min: operating * 0.6, max: operating });

    return {
      symbol,
      id: idx + 1,
      date: faker.date.past({ years: 5 }).toISOString().split("T")[0],
      revenue,
      cost_of_revenue: cost,
      gross_profit: gross,
      operating_income: operating,
      net_income: net,
      eps: faker.number.float({ min: 0.1, max: 10, precision: 0.01 }),
    };
  });
}

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

function generateMockNewsItems(symbol = null, count = 3) {
  const symbols = ["AAPL", "GOOGL", "TSLA", "NVDA", "AMZN"];

  return Array.from({ length: count }).map((_, idx) => {
    const finalSymbol =
      symbol || symbols[Math.floor(Math.random() * symbols.length)];

    return {
      id: 1 + idx,
      symbol: finalSymbol,
      title: `${finalSymbol} News`,
      summary: `Comprehensive up-to-date news coverage, ${faker.lorem.sentence(
        10,
      )}`,
      url: faker.internet.url(),
      date: faker.date.recent({ days: 30 }).toISOString(),
    };
  });
}

let lastPrice = 100;
function generateMockCandle(prev = null) {
  const time = Math.floor(Date.now() / 1000);
  const open = lastPrice;
  const close = parseFloat((open + (Math.random() - 0.5) * 2).toFixed(2));
  const high = parseFloat((Math.max(open, close) + Math.random()).toFixed(2));
  const low = parseFloat((Math.min(open, close) - Math.random()).toFixed(2));

  lastPrice = close;

  return {
    time,
    open,
    high,
    low,
    close,
  };
}

let lastValue = 100;
function generateMockVolumeCandle(prev = null) {
  const time = Math.floor(Date.now() / 1000);
  const value = parseFloat((lastValue + (Math.random() - 0.5) * 2).toFixed(2));
  const color = lastValue < value ? "#ef5350" : "#0067a3";
  lastValue = value;

  return {
    time,
    value,
    color,
  };
}

module.exports = {
  generateMockIncomeStatements,
  generateMockSymbols,
  generateMockNewsItems,
  generateMockCandle,
  generateMockVolumeCandle,
};
