/**
 * Entry point of the application.
 * Initializes React 18's createRoot API for concurrent rendering features
 * and mounts the main App component to the DOM.
 */

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
