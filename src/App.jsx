import { Profiler  } from "react";
import { TimerWrapper } from "/src/components/Timer.jsx";

export function App() {
    return (
        <Profiler id="app" onRender={() => console.log(Date.now())}>
        <TimerWrapper></TimerWrapper>
        </Profiler>
    );
}