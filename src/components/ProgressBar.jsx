import { ProgressDot } from "./ProgressDot";

export function ProgressBar({ presets, queue, queueIdx }) {
    const dots = [];

    queue.forEach((presetIdx, i) => {
        const preset = presets[presetIdx];
        if (!preset.drawProgress) return;

        dots.push(<ProgressDot
            key={i}
            filled={i < queueIdx}
        />);
    })

    return (
        <div className="progress-bar">
            {dots}
        </div>
    )
}