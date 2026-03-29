import { CSSProperties } from "react";

const FONT_DISPLAY: string = "'Instrument Serif', Georgia, serif";
const FONT_BODY: string = "'DM Sans', 'Helvetica Neue', sans-serif";
const FONT_MONO: string = "'JetBrains Mono', 'Fira Code', monospace";

export interface Palette {
  bg: string;
  bgAlt: string;
  surface: string;
  border: string;
  borderHi: string;
  text: string;
  textMuted: string;
  accent: string;
  accentDim: string;
  accentGlow: string;
  warn: string;
  red: string;
}

export const palette: Palette = {
  bg: "#08090c",
  bgAlt: "#0e1016",
  surface: "#13151c",
  border: "#1e2130",
  borderHi: "#2c3050",
  text: "#e4e5eb",
  textMuted: "#8b8fa6",
  accent: "#7af5ca",
  accentDim: "rgba(122,245,202,0.10)",
  accentGlow: "rgba(122,245,202,0.25)",
  warn: "#f5c87a",
  red: "#f57a7a",
};

export interface Styles {
  page: CSSProperties;
  nav: CSSProperties;
  logo: CSSProperties;
  navLinks: CSSProperties;
  navLink: CSSProperties;
  navCta: CSSProperties;
  section: CSSProperties;
  hero: CSSProperties;
  heroLabel: CSSProperties;
  heroH1: CSSProperties;
  heroSub: CSSProperties;
  heroCtas: CSSProperties;
  btnPrimary: CSSProperties;
  btnGhost: CSSProperties;
  heroStats: CSSProperties;
  statNum: CSSProperties;
  statLabel: CSSProperties;
  pillarsGrid: CSSProperties;
  pillarCard: CSSProperties;
  pillarNum: CSSProperties;
  pillarH3: CSSProperties;
  pillarP: CSSProperties;
  proofGrid: CSSProperties;
  proofProblem: CSSProperties;
  proofSolution: CSSProperties;
  proofTag: CSSProperties;
  proofH3: CSSProperties;
  codeWrap: CSSProperties;
  codeBar: CSSProperties;
  codeDot: (c: string) => CSSProperties;
  codeBody: CSSProperties;
  privacyGrid: CSSProperties;
  privacyCard: CSSProperties;
  ctaBox: CSSProperties;
  sectionTag: CSSProperties;
  sectionH2: CSSProperties;
  sectionSub: CSSProperties;
  divider: CSSProperties;
}

export const S: Styles = {
  page: {
    fontFamily: FONT_BODY,
    color: palette.text,
    background: palette.bg,
    minHeight: "100vh",
    overflowX: "hidden",
    lineHeight: 1.65,
    WebkitFontSmoothing: "antialiased",
  } as CSSProperties,
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 40px",
    background: "rgba(8,9,12,0.82)",
    backdropFilter: "blur(18px)",
    borderBottom: `1px solid ${palette.border}`,
  },
  logo: {
    fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: palette.accent,
    letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 10,
  },
  navLinks: {
    display: "flex", gap: 28, alignItems: "center",
  },
  navLink: {
    color: palette.textMuted, fontSize: "0.82rem", textDecoration: "none",
    letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
    transition: "color 0.2s",
    cursor: "pointer",
  },
  navCta: {
    padding: "9px 22px", borderRadius: 6,
    background: palette.accent, color: palette.bg,
    fontWeight: 700, fontSize: "0.82rem", border: "none", cursor: "pointer",
    letterSpacing: "0.04em", textTransform: "uppercase",
    transition: "transform 0.15s, box-shadow 0.2s",
  },
  section: {
    maxWidth: 1440, margin: "0 auto", padding: "0 32px",
  },

  // ─ Hero ─
  hero: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    justifyContent: "center", position: "relative", paddingTop: 100,
  },
  heroLabel: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "6px 16px", borderRadius: 50,
    border: `1px solid ${palette.borderHi}`,
    background: palette.accentDim,
    color: palette.accent, fontSize: "0.78rem", fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase",
    marginBottom: 28,
    width: "fit-content",
  },
  heroH1: {
    fontFamily: FONT_DISPLAY, fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
    lineHeight: 1.08, letterSpacing: "-0.03em", fontWeight: 400,
    maxWidth: 900, marginBottom: 24,
  },
  heroSub: {
    fontSize: "1.15rem", color: palette.textMuted, maxWidth: 620,
    marginBottom: 40, lineHeight: 1.7,
  },
  heroCtas: {
    display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center",
  },
  btnPrimary: {
    padding: "16px 36px", borderRadius: 8,
    background: palette.accent, color: palette.bg,
    fontWeight: 700, fontSize: "0.92rem", border: "none", cursor: "pointer",
    letterSpacing: "0.03em",
    boxShadow: `0 0 40px ${palette.accentGlow}`,
    transition: "transform 0.15s",
  },
  btnGhost: {
    padding: "16px 36px", borderRadius: 8,
    background: "transparent", color: palette.text,
    fontWeight: 600, fontSize: "0.92rem",
    border: `1px solid ${palette.borderHi}`, cursor: "pointer",
    transition: "border-color 0.2s",
  },
  heroStats: {
    display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap",
  },
  statNum: {
    fontFamily: FONT_DISPLAY, fontSize: "2.6rem", color: palette.accent,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.8rem", color: palette.textMuted, marginTop: 6,
    letterSpacing: "0.05em", textTransform: "uppercase",
  },

  // ─ Pillars ─
  pillarsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24, marginTop: 48,
  },
  pillarCard: {
    background: palette.surface, borderRadius: 16,
    border: `1px solid ${palette.border}`, padding: "40px 32px",
    position: "relative", overflow: "hidden",
    transition: "border-color 0.3s, transform 0.25s",
  },
  pillarNum: {
    fontFamily: FONT_MONO, fontSize: "0.72rem", color: palette.accent,
    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
    opacity: 0.7,
  },
  pillarH3: {
    fontFamily: FONT_DISPLAY, fontSize: "1.55rem", marginBottom: 16,
    lineHeight: 1.2, letterSpacing: "-0.02em",
  },
  pillarP: {
    fontSize: "0.95rem", color: palette.textMuted, lineHeight: 1.7,
  },

  // ─ Proof ─
  proofGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 48,
  },
  proofProblem: {
    background: "rgba(245,122,122,0.04)",
    border: `1px solid rgba(245,122,122,0.15)`,
    borderRadius: 16, padding: "40px 36px",
  },
  proofSolution: {
    background: palette.accentDim,
    border: `1px solid rgba(122,245,202,0.18)`,
    borderRadius: 16, padding: "40px 36px",
  },
  proofTag: {
    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", marginBottom: 16,
  },
  proofH3: {
    fontFamily: FONT_DISPLAY, fontSize: "1.65rem", marginBottom: 16,
    lineHeight: 1.2, letterSpacing: "-0.02em",
  },

  // ─ Code ─
  codeWrap: {
    background: "#0c0d12", borderRadius: 16,
    border: `1px solid ${palette.border}`, overflow: "hidden",
    marginTop: 48, maxWidth: 760, marginLeft: "auto", marginRight: "auto",
  },
  codeBar: {
    display: "flex", alignItems: "center", gap: 8, padding: "14px 20px",
    background: "#101218", borderBottom: `1px solid ${palette.border}`,
  },
  codeDot: (c: string): CSSProperties => ({
    width: 11, height: 11, borderRadius: "50%", background: c,
  }),
  codeBody: {
    padding: "28px 28px", fontFamily: FONT_MONO, fontSize: "0.88rem",
    lineHeight: 1.9, overflowX: "auto", color: palette.textMuted,
  },

  // ─ Privacy ─
  privacyGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20, marginTop: 48,
  },
  privacyCard: {
    background: palette.surface, borderRadius: 14,
    border: `1px solid ${palette.border}`, padding: "32px 28px",
  },

  // ─ CTA ─
  ctaBox: {
    textAlign: "center", padding: "80px 32px",
    background: `radial-gradient(ellipse at 50% 0%, ${palette.accentDim} 0%, transparent 70%)`,
    borderRadius: 24, border: `1px solid ${palette.border}`,
    marginTop: 48,
  },

  // ─ Section header ─
  sectionTag: {
    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: palette.accent, marginBottom: 14,
  },
  sectionH2: {
    fontFamily: FONT_DISPLAY, fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)",
    lineHeight: 1.1, letterSpacing: "-0.025em", maxWidth: 700, marginBottom: 12,
  },
  sectionSub: {
    fontSize: "1.05rem", color: palette.textMuted, maxWidth: 580, lineHeight: 1.7,
  },
  divider: {
    height: 1, background: palette.border, margin: "100px 0",
  },
};