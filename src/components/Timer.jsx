import { useEffect, useState, useRef } from "react";
import { Digits } from "./Digits";
import { TimerControls } from "./TimerControls";
import { TimerVisual } from "./TimerVisual";

export function TimerWrapper() {
    const [queueIdx, setQueueIdx] = useState(0)
    
    const [state, setState] = useState("inactive");

    const [worker, setWorker] = useState(null);
    // ensure worker is terminated when state is changed
    useEffect(() => {
        return () => { worker?.terminate() }
    },
        [worker]
    )

    const presets = [
        { name: "Work", duration: 1000 },
        { name: "Short Break", duration: 3 }
    ]

    // ordered list of presets in cycle
    const queue = [0, 1, 0, 1];

    const preset = presets[queue[queueIdx]]

    const [time, setTime] = useState(preset.duration);

    // to provide current time value within async handlers
    const timeRef = useRef(time);
    useEffect(() => {timeRef.current = time}, [time]);

    const workerRef = useRef(null);
    useEffect(() => {workerRef.current = worker}, [worker]);

    function start() {
        setState("active");
        
        let workerURL = new URL("/src/scripts/worker.js", import.meta.url);
        let worker = new Worker(workerURL);

        worker.onmessage = handleMessage;

        setWorker(worker);
    }

    function pause() {
        setState("paused");
        worker.terminate();
    }

    function reset() {
        setState("inactive");
        // TODO: check if this is the proper value
        setTime(preset.duration);
        workerRef.current.terminate();
    }

    function handleMessage(e) {
        let futureTime = timeRef.current - 1

        setTime(futureTime);

        if (futureTime === 0) {
            setQueueIdx((queueIdx + 1) % queue.length);
            reset();
        }
    }

    return (
        <div className="timer">
            {preset.name}
            <br />
            {queueIdx + 1}/{queue.length}
            {time}
            <Digits time={time} />
            <TimerControls
                timerState={state}
                handleStart={start}
                handlePause={pause}
                handleReset={reset}
            />
            {state}
            <TimerVisual ratio={ time / preset.duration }/>
            { time / preset.duration }
        </div>
    )
}