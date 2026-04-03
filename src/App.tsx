import React from "react";
import { S } from "./styles/theme";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import Pillars from "./components/sections/Pillars";
import Scoring from "./components/sections/Scoring";
import Lifecycle from "./components/sections/Lifecycle";
import Proof from "./components/sections/Proof";
import Integration from "./components/sections/Integration";
import Privacy from "./components/sections/Privacy";
import Cta from "./components/sections/Cta";

function accentVars(r: number, g: number, b: number): React.CSSProperties {
  const rgb = `${r},${g},${b}`;
  return {
    "--accent": `rgb(${rgb})`,
    "--accent-rgb": rgb,
    "--accent-dim": `rgba(${rgb},0.10)`,
    "--accent-glow": `rgba(${rgb},0.25)`,
    "--accent-03": `rgba(${rgb},0.03)`,
    "--accent-06": `rgba(${rgb},0.06)`,
    "--accent-08": `rgba(${rgb},0.08)`,
    "--accent-12": `rgba(${rgb},0.12)`,
    "--accent-15": `rgba(${rgb},0.15)`,
    "--accent-18": `rgba(${rgb},0.18)`,
    "--accent-20": `rgba(${rgb},0.20)`,
  } as React.CSSProperties;
}

export default function App() {
  const pad = { padding: "80px 0" };

  return (
    <div style={S.page}>
      <Navbar />

      <div className="section-dark" style={accentVars(122, 245, 202)}>
        <Hero />
      </div>

      <div className="section-dark" style={{ ...pad, ...accentVars(100, 215, 175) }}>
        <Pillars />
      </div>

      <div className="section-dark" style={{ ...pad, ...accentVars(80, 185, 148) }}>
        <Scoring />
      </div>

      <div className="section-light" style={{ ...pad, ...accentVars(62, 158, 122) }}>
        <Lifecycle />
      </div>

      <div className="section-light" style={{ ...pad, ...accentVars(50, 190, 120) }}>
        <Proof />
      </div>

      <div className="section-light" style={{ ...pad, ...accentVars(34, 105, 76) }}>
        <Integration />
      </div>

      <div className="section-dark" style={{ ...pad, ...accentVars(30, 160, 90) }}>
        <Privacy />
      </div>

      <div className="section-dark" style={{ ...pad, ...accentVars(40, 180, 100) }}>
        <Cta />
      </div>

      <div className="section-dark" style={accentVars(14, 58, 38)}>
        <Footer />
      </div>
    </div>
  );
}
