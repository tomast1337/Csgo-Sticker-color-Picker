import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./index.scss";
try {
    createRoot(document.getElementById("root")).render(<App />);
} catch (e) {
    console.log(e);
}