import { useEffect, useState } from "react";
import { Timer } from "/src/components/Timer.jsx";

export function App() {
    // wakelock to keep screen active
    const [wakeLock, setWakeLock] = useState(null);

    // clean up previous wakelock
    useEffect(() => {
        return () => {
            if (wakeLock) wakeLock.release();
        }
    }, [wakeLock]);

    // request wakelock when page becomes visible
    async function handleVisibilityChange() {
        if (document.visibilityState !== "visible") return;

        try {
            setWakeLock(await navigator.wakeLock.request("screen"));
        } catch {}
    }

    // attach wakelock-init handlers
    useEffect(() => {
        document.onvisibilitychange = handleVisibilityChange;
        window.onload = handleVisibilityChange;
    }, []);

    return (<Timer />);
}