import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./app/globals.css";

const container = document.getElementById("root")!;

// If SSR-rendered HTML exists, hydrate; otherwise do a full client render
if (container.innerHTML.trim().length > 0 && container.innerHTML !== "<!--ssr-outlet-->") {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
