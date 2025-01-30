export function ControlButton({
    timerState,
    disableStates,
    handleClick,
    children
}) {
    return (
        <button
            onClick={handleClick}
            disabled={disableStates.includes(timerState)}
        >
            {children}
        </button>
    );
}