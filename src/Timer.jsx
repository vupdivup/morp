import { useState } from "react";
import { TimerControls } from "./TimerControls";
import { Digits } from "./Digits";

export function TimerWrapper() {
    const [preset, setPreset] = useState(30);
    const [time, setTime] = useState(100);
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = Math.ceil(time % 60);

    function handleReset(e) {
        setTime(preset);
    }

    function handleStart(e) {
        setActive(true);
    }

    function handleStop(e) {
        setActive(false);
    }

    return (
        <div className="timer">
            <Digits value={minutes} />
            <Digits value={seconds} />
            <TimerControls
                handleStart = {handleStart}
                handleStop = {handleStop}
                handleReset={handleReset}
            />
        </div>
    )
}