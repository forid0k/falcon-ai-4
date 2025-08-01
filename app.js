
const tableBody = document.querySelector("#signalTable tbody");
function addSignalRow({ time, market, asset, timeframe, signal, strategy }) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${time}</td><td>${market}</td><td>${asset}</td><td>${timeframe}</td><td>${signal}</td><td>${strategy}</td>`;
  tableBody.prepend(row);
}
setInterval(() => {
  const now = new Date().toLocaleTimeString();
  const asset = document.getElementById("marketSelect").value;
  const strategy = "EMA";
  const signal = Math.random() > 0.5 ? "BUY" : "SELL";
  addSignalRow({
    time: now,
    market: "Real Market",
    asset,
    timeframe: "1m",
    signal,
    strategy
  });
}, 120000); // 2 minutes
