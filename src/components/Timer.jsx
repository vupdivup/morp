import { useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { ControlBar } from "./ControlBar";
import { Digits } from "./Digits";
import { ProgressBar } from "./ProgressBar";
import { Ring } from "./Ring";

// pomodoro mode presets
const presets = [
    {
        name: "Focus",
        duration: 25 * 60,
        autostart: false,
        drawProgress: true,
        color1: "#8c2c2c",
        color2: "#681f1f",
        sound: "break"
    },
    {
        name: "Short Break",
        duration: 5 * 60,
        autostart: true,
        drawProgress: false,
        color1: "#2f6a2f",
        color2: "#145025",
        sound: "focus"
    },
    {
        name: "Long Break",
        duration: 15 * 60,
        autostart: true,
        drawProgress: false,
        color1: "#3a4878",
        color2: "#252e60",
        sound: "focus"
    }
];

// ordered list of presets in cycle
const queue = [0, 1, 0, 1, 0, 1, 0, 2];

// sound effect collection
const sfx = {
    focus: new Audio("/morp/assets/sfx/focus.wav"),
    break: new Audio("/morp/assets/sfx/break.wav")
};

export function Timer() {
    const [state, setState] = useState("inactive");

    // index of current preset within preset queue
    const [queueIdx, setQueueIdx] = useState(0);

    const [worker, setWorker] = useState(null);

    // preset for current period
    const preset = presets[queue[queueIdx]];

    // time left, in seconds
    const [time, setTime] = useState(preset.duration);

    const theme = { color1: preset.color1, color2: preset.color2 };

    // terminate worker if timer is no longer active
    useEffect(() => {
        if (worker && state !== "active") {
            worker.terminate();
        }
    }, [state]);

    // terminate old worker if new one has been assigned (safeguard)
    useEffect(() => {
        return () => {
            if (worker) {
                worker.terminate();
            }
        }
    }, [worker]);

    // reattach worker message handler every render to access latest state
    useEffect(() => {
        if (worker) {
            worker.onmessage = handleMessage;
        };  
    });

    // reattach keydown handler every render as well
    useEffect(() => {
        window.onkeydown = handleKeydown;
    });

    document.body.style.backgroundColor = theme.color1;

    function start() {
        setState("active");
        
        let workerURL = new URL("/src/workers/worker.js", import.meta.url);
        let worker = new Worker(workerURL);

        setWorker(worker);
    }

    function pause() {
        setState("paused");
    }

    function reset() {
        setTime(preset.duration);
        setState("inactive");
    }

    // increment queue index to switch preset
    function shiftPreset(i, autostart) {
        let newQueueIdx;
        
        if (queueIdx + i < 0) {
            // loop queue from reverse direction
            newQueueIdx = queue.length - 1;
        } else {
            newQueueIdx = (queueIdx + i) % queue.length;
        }
        
        const newPreset = presets[queue[newQueueIdx]];

        setQueueIdx(newQueueIdx);
        setTime(newPreset.duration);

        // autostart if needed
        setState(
            newPreset.autostart && autostart ?
            "active" : "inactive"
        );
    }

    function skipForward() {
        shiftPreset(1, false);
    }

    function skipBack() {
        // reset but don't skip backwards if timer started
        if (state === "paused" && time < preset.duration) {
            reset();
        } else {
            shiftPreset(-1, false);
        }
    }

    function handleMessage(e) {
        const newTime = time - 1;

        if (newTime === 0) {
            // progress queue if timer has depleted
            sfx[preset.sound].play();
            shiftPreset(1, true);
        }
        else {
            setTime(time - 1);
        };
    }

    function handleKeydown(e) {
        switch(e.code) {
            // play/pause with spacebar
            case "Space":
                if (state === "active") {
                    pause();
                } else {
                    start();
                }
                return;
            // arrow keys to skip back and forth
            case "ArrowLeft":
                if (state !== "active") {
                    skipBack();
                }
                return;
            case "ArrowRight":
                if (state !== "active") {
                    skipForward();
                }
                return;
        }
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
                    handleSkipBack={skipBack}
                    handleStart={start}
                    handlePause={pause}
                    handleSkipForward={skipForward}
                />
            </div>
        </ThemeContext.Provider>
    )
}