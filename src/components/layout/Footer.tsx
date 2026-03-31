"use client";
import { useState, useEffect, MouseEvent } from "react";
import { S, palette } from "../../styles/theme";

export default function Footer() {
    return (
        <footer style={{ ...S.section, padding: "clamp(32px, 6vw, 60px) clamp(16px, 4vw, 32px) clamp(24px, 4vw, 40px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={S.logo}>
          <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="5" fill={palette.accent} opacity="0.9" />
            <circle cx="5" cy="8" r="2.5" fill={palette.accent} opacity="0.3" />
            <circle cx="21" cy="8" r="2.5" fill={palette.accent} opacity="0.3" />
            <circle cx="5" cy="18" r="2.5" fill={palette.accent} opacity="0.3" />
            <circle cx="21" cy="18" r="2.5" fill={palette.accent} opacity="0.3" />
          </svg>
          <span style={{ fontSize: "1.1rem" }}>Observal</span>
        </div>
        <div style={{ fontSize: "0.78rem", color: palette.textMuted }}>
          © 2026 Observal, Inc. · Privacy · Terms · SOC 2 Compliant
        </div>
      </footer>
    );
}