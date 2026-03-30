"use client";

import { S } from "../styles/theme";

// Layout Components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Section Components
import Hero from "../components/sections/Hero";
import Pillars from "../components/sections/Pillars";
import Scoring from "../components/sections/Scoring";
import Proof from "../components/sections/Proof";
import Integration from "../components/sections/Integration";
import Privacy from "../components/sections/Privacy";
import Cta from "../components/sections/Cta";

export default function LandingPage() {
  return (
    <div style={S.page}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <Navbar />

      <Hero />
      <div style={S.section}><div style={S.divider} /></div>

      <Pillars />
      <div style={S.section}><div style={S.divider} /></div>

      <Scoring />
      <div style={S.section}><div style={S.divider} /></div>

      <Proof />
      <div style={S.section}><div style={S.divider} /></div>

      <Integration />
      <div style={S.section}><div style={S.divider} /></div>

      <Privacy />
      <div style={S.section}><div style={S.divider} /></div>

      <Cta />

      <Footer />
    </div>
  );
}