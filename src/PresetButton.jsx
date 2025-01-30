export function PresetButton({
    idx,
    presetIdx,
    setPresetIdx,
    children
}) {
    return (
        <button
            disabled={idx === presetIdx}
            onClick={() => setPresetIdx(idx)}
        >
            {children}
        </button>
    );
}