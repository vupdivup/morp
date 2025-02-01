import { ControlButton } from "./ControlButton"

export function TimerControls({
    timerState,
    handleStart,
    handlePause,
    handleReset
}) {
    return (
        // todo: refactor this with objects
        <div>
            <ControlButton
                timerState={timerState}
                disableStates={["active"]}
                handleClick={handleStart}
            >
                Start
            </ControlButton>
            <ControlButton
                timerState={timerState}
                disableStates={["inactive", "paused"]}
                handleClick={handlePause}
            >
                Pause
            </ControlButton>
            <ControlButton
                timerState={timerState}
                disableStates={["active", "inactive"]}
                handleClick={handleReset}
            >
                Reset
            </ControlButton>
        </div>
    )
}