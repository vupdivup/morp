import { useEffect, useState, useRef } from "react";
import { Digits } from "./Digits";
import { TimerControls } from "./TimerControls";
import { TimerVisual } from "./TimerVisual";

export function TimerWrapper() {
    const [state, setState] = useState("inactive");

    const [time, setTime] = useState(0);

    const [queueIdx, setQueueIdx] = useState(0);

    const [worker, setWorker] = useState(null);

    const presets = [
        { name: "Focus", duration: 2 },
        { name: "Short Break", duration: 3 },
        { name: "Long Break", duration: 4 }
    ];

    // ordered list of presets in cycle
    const queue = [0, 1, 0, 2];

    const preset = presets[queue[queueIdx]]

    // terminate timer worker if no longer active
    useEffect(() => {
        if (state !== "active") worker?.terminate();
    }, [state]);

    // reset time if preset is switched
    useEffect(() => { setTime(preset.duration) }, [queueIdx]);

    // switch preset if timer reaches 0
    useEffect(() => {
        if (time === 0) {
            setQueueIdx((queueIdx + 1) % queue.length);
        }
    });

    function start() {
        setState("active");
        
        let workerURL = new URL("/src/scripts/worker.js", import.meta.url);
        let worker = new Worker(workerURL);

        worker.onmessage = handleMessage;

        setWorker(worker);
    }

    function pause() {
        setState("paused");
    }

    function reset() {
        setState("inactive");
        setQueueIdx((queueIdx + 1) % 4);
    }

    function handleMessage(e) {
        setTime(time => time - 1);
    }

    return (
        <div className="timer">
            {queueIdx + 1}/{queue.length}
            <div className="timer-panel">
                <Digits time={time} />
                <div className="presetName">
                    {preset.name}
                </div>
                <TimerVisual ratio={ time / preset.duration }/>
            </div>
            <TimerControls
                timerState={state}
                handleStart={start}
                handlePause={pause}
                handleReset={reset}
            />
            {state}
            { time / preset.duration }
            <br />{time}
            <br />{preset.duration}
        </div>
    )
}