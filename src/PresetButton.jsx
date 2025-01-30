export function PresetButton({ idx, name, presetIdx, setPresetIdx }) {
    return (
        <button
            disabled={idx === presetIdx}
            onClick={() => setPresetIdx(idx)}
        >
            {name}
        </button>
    );
}