import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export function ControlButton({ icon, disable, handleClick }) {
    const theme = useContext(ThemeContext);

    const sheet = "/src/assets/icons/remix/remixicon.symbol.svg";

    return (
        <svg
            className="remix control-button"
            fill={ disable ? theme.color2 : "white" }
            onClick={ handleClick }
            style={{pointerEvents: disable ? "none" : "auto"}}
        >
            <use href={`${sheet}#${icon}`} />
        </svg>
    );
}