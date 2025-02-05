import { useLayoutEffect } from "react";

export function Digits({ time }) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.ceil(time % 60);

    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");

    const text = minutesStr + ":" + secondsStr;

    // set document title to display digits
    useLayoutEffect(() => {
        document.title = "Morp " + text;
    }, [text]);

    return (
        <div className="digits">
            {text}
        </div>
    )
}