import { CSSProperties } from "react";

const FONT_DISPLAY: string = "'Playfair Display', Georgia, serif";
const FONT_BODY: string = "'Outfit', 'Helvetica Neue', sans-serif";
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
  accent03: string;
  accent06: string;
  accent08: string;
  accent12: string;
  accent15: string;
  accent18: string;
  accent20: string;
  warn: string;
  red: string;
}

/* All theme-dependent colors are now CSS variables.
   Dark / light values are set via .section-dark / .section-light classes in globals.css.
   The accent family is animated by GSAP on scroll. */
export const palette: Palette = {
  bg: "var(--bg)",
  bgAlt: "var(--bg-alt)",
  surface: "var(--surface)",
  border: "var(--border)",
  borderHi: "var(--border-hi)",
  text: "var(--text)",
  textMuted: "var(--text-muted)",
  accent: "var(--accent)",
  accentDim: "var(--accent-dim)",
  accentGlow: "var(--accent-glow)",
  accent03: "var(--accent-03)",
  accent06: "var(--accent-06)",
  accent08: "var(--accent-08)",
  accent12: "var(--accent-12)",
  accent15: "var(--accent-15)",
  accent18: "var(--accent-18)",
  accent20: "var(--accent-20)",
  warn: "#f5c87a",
  red: "#f57a7a",
};

/* Raw hex values for edge cases that cannot use CSS variables
   (e.g. JS color math, canvas rendering). */
export const rawPalette = {
  bg: "#08090c",
  surface: "#13151c",
  border: "#1e2130",
  accent: "#7af5ca",
  text: "#e4e5eb",
  textMuted: "#8b8fa6",
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
  /* Nav is always dark — hardcoded background */
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 40px",
    background: "rgba(8,9,12,0.82)",
    backdropFilter: "blur(18px)",
    borderBottom: `1px solid transparent`,
  },
  logo: {
    fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: palette.accent,
    letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 10,
  },
  navLinks: {
    display: "flex", gap: 28, alignItems: "center",
  },
  navLink: {
    color: "#8b8fa6", fontSize: "0.82rem", textDecoration: "none",
    letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
    cursor: "pointer",
  },
  navCta: {
    padding: "9px 22px", borderRadius: 6,
    background: palette.accent, color: "#08090c",
    fontWeight: 700, fontSize: "0.82rem", border: "none", cursor: "pointer",
    letterSpacing: "0.04em", textTransform: "uppercase",
    transition: "transform 0.15s, box-shadow 0.2s",
  },
  section: {
    maxWidth: 1800, margin: "0 auto", padding: "0 clamp(16px, 5vw, 64px)",
  },

  // ─ Hero ─
  hero: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    justifyContent: "center", position: "relative", paddingTop: 80,
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
    fontFamily: FONT_DISPLAY, fontSize: "clamp(2.6rem, 5.5vw, 5.4rem)",
    lineHeight: 1.08, letterSpacing: "-0.03em", fontWeight: 400,
    maxWidth: 960, marginBottom: 28,
  },
  heroSub: {
    fontSize: "clamp(1.1rem, 1.3vw, 1.35rem)", color: palette.textMuted, maxWidth: 660,
    marginBottom: 44, lineHeight: 1.75,
  },
  heroCtas: {
    display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center",
  },
  btnPrimary: {
    padding: "14px clamp(20px, 4vw, 40px)", borderRadius: 8,
    background: palette.accent, color: "#08090c",
    fontWeight: 700, fontSize: "clamp(0.9rem, 1vw, 1.05rem)", border: "none", cursor: "pointer",
    letterSpacing: "0.03em",
    boxShadow: `0 0 40px ${palette.accentGlow}`,
    transition: "transform 0.15s",
  },
  btnGhost: {
    padding: "14px clamp(20px, 4vw, 40px)", borderRadius: 8,
    background: "transparent", color: palette.text,
    fontWeight: 600, fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
    border: `1px solid ${palette.borderHi}`, cursor: "pointer",
    transition: "border-color 0.2s",
  },
  heroStats: {
    display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap",
  },
  statNum: {
    fontFamily: FONT_DISPLAY, fontSize: "clamp(2.4rem, 3vw, 3.2rem)", color: palette.accent,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.8rem", color: palette.textMuted, marginTop: 6,
    letterSpacing: "0.05em", textTransform: "uppercase",
  },

  // ─ Pillars ─
  pillarsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
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
    fontFamily: FONT_DISPLAY, fontSize: "clamp(1.5rem, 1.8vw, 1.8rem)", marginBottom: 16,
    lineHeight: 1.2, letterSpacing: "-0.02em",
  },
  pillarP: {
    fontSize: "clamp(0.92rem, 1vw, 1.05rem)", color: palette.textMuted, lineHeight: 1.75,
  },

  // ─ Proof ─
  proofGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "clamp(20px, 4vw, 40px)", marginTop: 48,
  },
  proofProblem: {
    background: "#ffffff",
    border: "1px solid #e2e4ea",
    borderRadius: 16, padding: "clamp(24px, 4vw, 40px) clamp(20px, 3vw, 36px)",
    color: "#0d0f14",
  },
  proofSolution: {
    background: palette.accentDim,
    border: `1px solid ${palette.accent18}`,
    borderRadius: 16, padding: "clamp(24px, 4vw, 40px) clamp(20px, 3vw, 36px)",
  },
  proofTag: {
    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", marginBottom: 16,
  },
  proofH3: {
    fontFamily: FONT_DISPLAY, fontSize: "clamp(1.6rem, 1.9vw, 2rem)", marginBottom: 16,
    lineHeight: 1.2, letterSpacing: "-0.02em",
  },

  // ─ Code ─
  codeWrap: {
    background: "#0c0d12", borderRadius: 16,
    border: `1px solid #1e2130`, overflow: "hidden",
    marginTop: 48, maxWidth: 960, marginLeft: "auto", marginRight: "auto",
  },
  codeBar: {
    display: "flex", alignItems: "center", gap: 8, padding: "16px 24px",
    background: "#101218", borderBottom: `1px solid #1e2130`,
  },
  codeDot: (c: string): CSSProperties => ({
    width: 11, height: 11, borderRadius: "50%", background: c,
  }),
  codeBody: {
    padding: "36px 36px", fontFamily: FONT_MONO, fontSize: "clamp(0.92rem, 1.1vw, 1.08rem)",
    lineHeight: 2, overflowX: "auto", color: "#8b8fa6",
  },

  // ─ Privacy ─
  privacyGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
    gap: 20, marginTop: 48,
  },
  privacyCard: {
    background: palette.surface, borderRadius: 14,
    border: `1px solid ${palette.border}`, padding: "32px 28px",
  },

  // ─ CTA ─
  ctaBox: {
    textAlign: "center", padding: "clamp(40px, 8vw, 80px) clamp(16px, 4vw, 32px)",
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
    fontFamily: FONT_DISPLAY, fontSize: "clamp(1.9rem, 3.4vw, 3.4rem)",
    lineHeight: 1.1, letterSpacing: "-0.025em", maxWidth: 800, marginBottom: 14,
  },
  sectionSub: {
    fontSize: "clamp(1rem, 1.2vw, 1.2rem)", color: palette.textMuted, maxWidth: 640, lineHeight: 1.75,
  },
  divider: {
    height: 1, background: palette.border, margin: "100px 0",
  },
};
