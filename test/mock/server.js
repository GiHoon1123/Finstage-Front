/* eslint-disable */
const express = require("express");
const cors = require("cors");
const {
  generateMockSymbols,
  generateMockIncomeStatements,
  generateMockNewsItems,
} = require("./data");

const app = express();
const port = 4000;

app.use(cors());

app.get("/api/income/:symbol", (req, res) => {
  const { symbol } = req.params;
  const count = parseInt(req.query.count) || 25;
  const data = generateMockIncomeStatements(symbol, count);
  res.json(data);
});

app.get("/api/symbols", (req, res) => {
  const count = parseInt(req.query.count) || 25;
  const data = generateMockSymbols(count);
  res.json(data);
});

app.post("/financials/request", (req, res) => {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      data: "symbol 쿼리 파라미터가 필요합니다.",
    });
  }

  console.log(`[MOCK] Received symbol request for: ${symbol}`);

  return res.json({
    status: 200,
    message: "Success",
    data: "요청이 성공적으로 접수되었습니다.",
  });
});

app.get("/contents", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 20;
  const total = 100; // ✅ 고정값

  const totalPages = Math.ceil(total / size);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const items = generateMockNewsItems(null, size);

  res.json({
    status: 200,
    message: "Success",
    data: {
      total,
      page,
      size,
      totalPages,
      hasNext,
      hasPrev,
      items,
    },
  });
});

app.get("/contents/:symbol", (req, res) => {
  const symbol = req.params.symbol;
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 20;
  const total = 100; // ✅ 고정값

  const totalPages = Math.ceil(total / size);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const items = generateMockNewsItems(symbol, size);

  res.json({
    status: 200,
    message: "Success",
    data: {
      total,
      page,
      size,
      totalPages,
      hasNext,
      hasPrev,
      items,
    },
  });
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
