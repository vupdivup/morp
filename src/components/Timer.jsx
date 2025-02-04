import { useDeferredValue, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Digits } from "./Digits";
import { ProgressBar } from "./ProgressBar";
import { ControlBar } from "./ControlBar";
import { Ring } from "./Ring";

export function TimerWrapper() {
    const [state, setState] = useState("inactive");

    const [queueIdx, setQueueIdx] = useState(0);

    const [worker, setWorker] = useState(null);

    const presets = [
        {
            name: "Focus",
            duration: 300,
            drawProgress: true,
            color1: "#972d2d",
            color2: "#641a1a"
        },
        {
            name: "Short Break",
            duration: 3,
            drawProgress: false,
            color1: "#467638",
            color2: "#205220"
        },
        {
            name: "Long Break",
            duration: 4,
            drawProgress: false,
            color1: "#3f5883",
            color2: "#1d3964"
        }
    ];

    // ordered list of presets in cycle
    const queue = [0, 1, 0, 1, 0, 1, 0, 2];

    const preset = presets[queue[queueIdx]]

    const [time, setTime] = useState(preset.duration);

    // terminate timer worker if no longer active
    useEffect(() => {
        if (state !== "active") {
            worker?.terminate();
        }
    }, [state]);

    // reattach worker message handler every render to access latest state
    useEffect(() => {
        if (!worker) return;

        worker.addEventListener("message", handleMessage);
        
        return () => {
            worker.removeEventListener("message", handleMessage);
        }
    });

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        }
    });

    const theme = { color1: preset.color1, color2: preset.color2 };

    document.body.style.backgroundColor = theme.color1;

    function start() {
        setState("active");
        
        let workerURL = new URL("/src/scripts/worker.js", import.meta.url);
        let worker = new Worker(workerURL);

        setWorker(worker);
    }

    function pause() {
        setState("paused");
    }

    function shiftPreset(i) {
        const newQueueIdx = (queueIdx + i) % queue.length;
        const newPreset = presets[queue[newQueueIdx]];

        setQueueIdx(newQueueIdx);
        setTime(newPreset.duration);
        setState("inactive");
    }

    function handleMessage(e) {
        const newTime = time - 1;

        if (newTime === 0) {
            shiftPreset(1);
        }
        else {
            setTime(time - 1);
        };
    }

    function handleKeydown(e) {
        if (e.code !== "Space") return;

        if (state === "active") { pause(); }
        else { start(); }
    }

    return (
        <ThemeContext.Provider value={theme}>
            <div className="timer">
                <div className="timer-face">
                    <Digits time={time} />
                    <div className="preset-name">
                        {preset.name}
                    </div>
                    <ProgressBar
                        presets={presets}
                        queue={queue}
                        queueIdx={queueIdx}
                    />
                    <Ring time={time} preset={preset} />
                </div>
                <ControlBar
                    timerState={state}
                    queueIdx={queueIdx}
                    handleSkipBack={() => shiftPreset(-1)}
                    handleStart={start}
                    handlePause={pause}
                    handleSkipForward={() => shiftPreset(1)}
                />
            </div>
        </ThemeContext.Provider>
    )
}