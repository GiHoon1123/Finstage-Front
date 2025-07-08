/* eslint-disable */
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const {
  generateMockSymbols,
  generateMockIncomeStatements,
  generateMockNewsItems,
  generateMockCandle,
  generateMockVolumeCandle,
} = require("./data");

const app = express();
const port = 4000;
const server = http.createServer(app); // 기존 express 감싸기

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("📡 socket.io client connected");

  const sendMockCandle = () => {
    const candle = generateMockCandle();
    const volumeCandle = generateMockVolumeCandle();
    socket.emit("candle", candle);
    socket.emit("volumeCandle", volumeCandle);
  };

  const interval = setInterval(sendMockCandle, 1000);

  socket.on("disconnect", () => {
    console.log("❌ client disconnected");
    clearInterval(interval);
  });
});

app.use(cors());

// ✅ 이하 기존 REST API 유지
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
  const total = 100;

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
  const total = 100;

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

// ✅ express + ws 통합 서버 실행
server.listen(port, () => {
  console.log(
    `Mock API server + WebSocket running at http://localhost:${port}`,
  );
});
