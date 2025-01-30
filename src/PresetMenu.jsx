import { PresetButton } from "./PresetButton";

export function PresetMenu({ presets, presetIdx, setPresetIdx }) {
    return (
        <div>
            {presets.map((p, i) =>
                <PresetButton
                    key={i}
                    idx={i}
                    presetIdx={presetIdx}
                    setPresetIdx={setPresetIdx}
                >
                    {p.name}
                </PresetButton>
            )}
        </div>
    );
}