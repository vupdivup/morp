import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export function TimerVisual({ ratio }) {
    const theme = useContext(ThemeContext);

    // clamp ratio since arc cannot draw full circles
    // TODO: draw circle instead
    ratio = ratio >= 1 ? .9999 : ratio;

    const viewBoxSize = 100;
    const strokeWidth = 1.5;

    // circle origin
    const c = { x: viewBoxSize / 2, y: viewBoxSize / 2};

    const radius = (viewBoxSize - strokeWidth) / 2;

    const angle = ratio * 360;

    const rads = degToRad(-angle + 90);

    // starting point of arc
    // y needs to start a bit lower to display stroke in its full width
    const pointA = { x: c.x, y: strokeWidth / 2 };

    // end point of arc
    const pointB = {
        x: c.x + Math.cos(rads) * radius,
        y: c.y - Math.sin(rads) * radius
    };

    const largeArcFlag = angle > 180 ? 1 : 0;

    const d = `M ${pointA.x} ${pointA.y}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${pointB.x} ${pointB.y}`;

    function degToRad(d) {
        return d * Math.PI / 180;
    }

    return (
        <svg className="ring" viewBox="0 0 100 100">
            <circle
                cx={c.x}
                cy={c.y}
                r={radius}
                className="ring-background"
                strokeWidth={strokeWidth}
                stroke={theme.color2}
            />
            <path
                strokeWidth={strokeWidth}
                d={d}
            />
        </svg>
    );
}