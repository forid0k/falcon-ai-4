
function calculateEMA(candles, period = 10) {
  const k = 2 / (period + 1);
  let emaArray = [];
  let ema = candles[0].close;

  for (let i = 1; i < candles.length; i++) {
    ema = candles[i].close * k + ema * (1 - k);
    emaArray.push(ema);
  }

  return emaArray;
}

function calculateEMASignal(candles) {
  if (candles.length < 10) return null;

  const emaValues = calculateEMA(candles.slice(-10), 10);
  const lastPrice = candles[candles.length - 1].close;
  const lastEMA = emaValues[emaValues.length - 1];

  if (lastPrice > lastEMA) return 'CALL';
  if (lastPrice < lastEMA) return 'PUT';

  return null;
}

function priceActionSignal(candles) {
  if (candles.length < 2) return null;

  const last = candles[candles.length - 1];
  const prev = candles[candles.length - 2];

  if (last.close > last.open && prev.close < prev.open) {
    return 'CALL';
  } else if (last.close < last.open && prev.close > prev.open) {
    return 'PUT';
  }

  return null;
}

function volumeSignal(candles) {
  if (candles.length < 2) return null;

  const last = candles[candles.length - 1];
  const prev = candles[candles.length - 2];

  if (last.volume > prev.volume * 1.5) {
    if (last.close > last.open) return 'CALL';
    if (last.close < last.open) return 'PUT';
  }

  return null;
}
