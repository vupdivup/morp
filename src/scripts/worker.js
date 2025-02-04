const startTime = Date.now();
const tickInterval = 1000;

let tickCount = 0;

setTimeout(tick, tickInterval);

function tick() {
    tickCount++;

    postMessage(null);

    const elapsed = Date.now() - startTime;
    const drift = elapsed - tickInterval * tickCount

    setTimeout(tick, tickInterval - drift);
}