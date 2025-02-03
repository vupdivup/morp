import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export function ControlButton({ icon, disable, enlarge, handleClick }) {
    const theme = useContext(ThemeContext);

    const path = "/assets/icons/feather/feather-sprite.svg";

    return (
        <svg
            className={`feather control-button ${enlarge ? "large" : "small"}`}
            onClick={handleClick}
            stroke={disable ? theme.color2 : "white"}
            style={{pointerEvents: disable ? "none" : "auto"}}
        >
            <use href={`${path}#${icon}`} />
        </svg>
    );
}