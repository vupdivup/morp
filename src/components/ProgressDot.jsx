import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export function ProgressDot({ filled }) {
    const theme = useContext(ThemeContext);

    return (
        <svg
            className="progress-dot"
            viewBox="0 0 100 100"
            fill={filled ? "white" : theme.color2 }    
        >
            <circle 
                cx="50"
                cy="50"
                r="50"
            />
        </svg>
    );
}