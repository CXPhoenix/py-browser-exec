import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js";
import "ace-builds/src-noconflict/mode-python";

createApp(App).mount("#app");
