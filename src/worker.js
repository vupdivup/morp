const startTime = Date.now();
const tickInterval = 1000;

let tickCount = 0;

setInterval(tick, 1000);

function tick() {
    console.log("posting");
    postMessage(null);
}