import { ControlButton } from "./ControlButton"

export function ControlBar({
    timerState,
    handleSkipBack,
    handleStart,
    handlePause,
    handleSkipForward
}) {
    const controls = [
        {
            icon: "skip-back",
            render: true,
            disable: timerState === "active",
            enlarge: false,
            handleClick: handleSkipBack
        },
        {
            icon: "play",
            render: timerState !== "active",
            disable: false,
            enlarge: true,
            handleClick: handleStart
        },
        {
            icon: "pause",
            render: timerState === "active",
            disable: false,
            enlarge: true,
            handleClick: handlePause
        },
        {
            icon: "skip-forward",
            render: true,
            disable: timerState === "active",
            enlarge: false,
            handleClick: handleSkipForward
        }
    ]

    const buttons = controls.filter(c => c.render).map((c, i) => {
        return <ControlButton
            key={i}
            icon={c.icon}
            disable={c.disable}
            enlarge={c.enlarge}
            handleClick={c.handleClick}
        />
    });

    return (
        <div className="control-bar">
            {buttons}
        </div>
    )
}