import { ControlButton } from "./ControlButton"

export function TimerControls({
    timerState,
    queueIdx,
    handleSkipBack,
    handleStart,
    handlePause,
    handleSkipForward
}) {
    const controls = [
        {
            // TODO: only shift back to start of current preset if paused
            icon: "ri-skip-back-fill",
            render: true,
            disable: timerState === "active" || queueIdx === 0,
            handleClick: handleSkipBack
        },
        {
            icon: "ri-play-fill",
            render: timerState !== "active",
            disable: false,
            handleClick: handleStart
        },
        {
            icon: "ri-pause-fill",
            render: timerState === "active",
            disable: false,
            handleClick: handlePause
        },
        {
            icon: "ri-skip-forward-fill",
            render: true,
            disable: timerState === "active",
            handleClick: handleSkipForward
        }
    ]

    const buttons = controls.filter(c => c.render).map((c, i) => {
        return <ControlButton
            key={i}
            icon={c.icon}
            disable={c.disable}
            handleClick={c.handleClick}
        />
    });

    return (
        <div className="control-panel">
            {buttons}
        </div>
    )
}