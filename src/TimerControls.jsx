export function TimerControls({ timerState, handleStart, handlePause, handleReset }) {
    return (
        <div>
            <button
                onClick={handleStart}
                disabled={timerState === "active"}
            >
                Start
            </button>
            <button onClick={handlePause}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}