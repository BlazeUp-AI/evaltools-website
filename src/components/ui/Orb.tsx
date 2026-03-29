"use client";

import { palette } from "../../styles/theme";

interface OrbProps {
  top: string;
  left: string;
  size?: number;
  color?: string;
}

export default function Orb({ top, left, size = 500, color = palette.accentGlow }: OrbProps) {
  return (
    <div style={{
      position: "absolute", top, left, width: size, height: size,
      borderRadius: "50%", background: color, filter: "blur(140px)",
      opacity: 0.18, pointerEvents: "none", zIndex: 0,
    }} />
  );
}