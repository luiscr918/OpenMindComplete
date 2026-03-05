import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import css from "./styles/tailwind.css?inline"; // ← importa el CSS como string
import Highcharts from "highcharts";
Highcharts.setOptions({ accessibility: { enabled: false } });

class OpenMindDashboard extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    // Inyecta Tailwind dentro del shadow DOM como <style>
    const style = document.createElement("style");
    style.textContent = css;
    shadow.appendChild(style);

    const container = document.createElement("div");
    container.style.height = "100%";
    container.style.width = "100%";
    shadow.appendChild(container);

    this.root = ReactDOM.createRoot(container);
    this.root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
  }
}

if (!customElements.get("openmind-dashboard")) {
  customElements.define("openmind-dashboard", OpenMindDashboard);
}
