import { useState } from "react";
import { Digits } from "./Digits";
import { PresetMenu } from "./PresetMenu";
import { TimerControls } from "./TimerControls";

export function TimerWrapper() {
    const [presetIdx, setPresetIdx] = useState(0);
    const [time, setTime] = useState(100);
    const [state, setState] = useState("inactive");
    const [worker, setWorker] = useState(null);

    const presets = [
        { name: "Work", duration: 25},
        { name: "Short Break", duration: 100 }
    ]

    const presetDuration = presets[presetIdx].duration

    const minutes = Math.floor(time / 60);
    const seconds = Math.ceil(time % 60);

    function handleReset(e) {
        setTime(presetDuration);
        setState("inactive");
        worker.terminate();
    }

    function handleStart(e) {
        setState("active");
        
        let workerURL = new URL("./worker.js", import.meta.url);
        let worker = new Worker(workerURL);

        worker.onmessage = handleMessage;

        setWorker(worker);
    }

    function handlePause(e) {
        setState("paused");
        worker.terminate();
    }

    function handleMessage(e) {
        setTime(time => time - 1);
    }

    return (
        <div className="timer">
            <Digits value={minutes} />
            <Digits value={seconds} />
            <TimerControls
                timerState={state}
                handleStart={handleStart}
                handlePause={handlePause}
                handleReset={handleReset}
            />
            <PresetMenu
                presets={presets}
                presetIdx={presetIdx}
                setPresetIdx={setPresetIdx}
            />
            {state}
        </div>
    )
}