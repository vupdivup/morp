import { PresetButton } from "./PresetButton";

export function PresetMenu({ presets, presetIdx, setPresetIdx }) {
    return (
        <div>
            {presets.map((p, i) =>
                <PresetButton
                    key={i}
                    idx={i}
                    name={p.name}
                    presetIdx={presetIdx}
                    setPresetIdx={setPresetIdx}
                />
            )}
        </div>
    );
}