/* eslint-disable */
const express = require("express");
const cors = require("cors");
const { generateMockSymbols, generateMockIncomeStatements } = require("./data");

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

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
