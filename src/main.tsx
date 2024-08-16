import React from "react";
import ReactDOM from "react-dom/client";
import core from "./core/index";
import "./App.css";

const App = () => core.render();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
