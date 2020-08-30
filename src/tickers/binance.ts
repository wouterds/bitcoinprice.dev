import WebSocket from 'ws';

const url = 'wss://fstream.binance.com/stream?streams=btcusdt@markPrice';
const connection = new WebSocket(url);

connection.onmessage = (e: { data: any }) => {
  const data = JSON.parse(e.data);

  console.log({ data });
};
