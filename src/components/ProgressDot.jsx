export function ProgressDot({ filled }) {
    return (
        <svg className="progress-dot-container" viewBox="0 0 100 100">
            <circle
                className="progress-dot"
                data-filled={filled}
                cx="50"
                cy="50"
                r="50"
            />
        </svg>
    );
}