import { createRoot } from "react-dom/client";
import { App } from "./components/App.jsx";
import "/src/styles/style.css";

let root = createRoot(document.getElementById("root"));
root.render(<App />);