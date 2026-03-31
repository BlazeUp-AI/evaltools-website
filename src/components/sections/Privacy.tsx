"use client";
import { useState, useEffect, useRef, CSSProperties } from "react";
import { S, palette } from "../../styles/theme";
import Reveal from "../ui/Reveal";

const FONT_DISPLAY = "'Instrument Serif', Georgia, serif";
const FONT_MONO = "'JetBrains Mono', 'Fira Code', monospace";
const FONT_BODY = "'DM Sans', 'Helvetica Neue', sans-serif";

/* ── Vault ring SVG built in JSX ── */
function VaultRing() {
  const ringRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const ticks = Array.from({ length: 48 }, (_, i) => i);
  const labels = ["ZERO-RETAIN", "NO-TRAIN", "SOC-2-II", "VPC-READY"];

  return (
    <svg
      ref={ringRef}
      viewBox="0 0 400 400"
      style={{
        width: "100%",
        maxWidth: 460,
        height: "auto",
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.85)",
        transition: "opacity 1.2s cubic-bezier(.22,1,.36,1), transform 1.2s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* Outer glow */}
      <defs>
        <radialGradient id="vaultGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="200" cy="200" r="195" fill="url(#vaultGlow)" />

      {/* Outer ring */}
      <circle
        cx="200" cy="200" r="170"
        fill="none"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <circle
        cx="200" cy="200" r="170"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray="1068"
        strokeDashoffset={inView ? "0" : "1068"}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 2s cubic-bezier(.22,1,.36,1) 0.3s",
        }}
        filter="url(#glowFilter)"
      />

      {/* Tick marks */}
      {ticks.map((i) => {
        const angle = (i * 360) / 48 - 90;
        const rad = (angle * Math.PI) / 180;
        const r1 = 158;
        const r2 = i % 4 === 0 ? 148 : 153;
        return (
          <line
            key={i}
            x1={200 + r1 * Math.cos(rad)}
            y1={200 + r1 * Math.sin(rad)}
            x2={200 + r2 * Math.cos(rad)}
            y2={200 + r2 * Math.sin(rad)}
            stroke={i % 4 === 0 ? "var(--accent)" : "var(--border-hi)"}
            strokeWidth={i % 4 === 0 ? 2 : 1}
            opacity={inView ? 1 : 0}
            style={{
              transition: `opacity 0.4s ease ${0.5 + i * 0.02}s`,
            }}
          />
        );
      })}

      {/* Quadrant labels */}
      {labels.map((label, i) => {
        const angle = i * 90 - 45;
        const rad = (angle * Math.PI) / 180;
        const r = 133;
        return (
          <text
            key={label}
            x={200 + r * Math.cos((angle - 90) * Math.PI / 180)}
            y={200 + r * Math.sin((angle - 90) * Math.PI / 180)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--accent)"
            fontSize="11"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.12em"
            opacity={inView ? 0.7 : 0}
            style={{
              transition: `opacity 0.6s ease ${1 + i * 0.15}s`,
            }}
          >
            {label}
          </text>
        );
      })}

      {/* Inner ring */}
      <circle
        cx="200" cy="200" r="110"
        fill="none"
        stroke="var(--border)"
        strokeWidth="0.5"
        strokeDasharray="4 4"
        opacity={inView ? 0.5 : 0}
        style={{ transition: "opacity 0.8s ease 0.8s" }}
      />

      {/* Center lock icon */}
      <g
        opacity={inView ? 1 : 0}
        style={{ transition: "opacity 0.8s ease 1.2s" }}
      >
        {/* Shield shape */}
        <path
          d="M200 168 L228 182 L228 210 Q228 232 200 244 Q172 232 172 210 L172 182 Z"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          filter="url(#glowFilter)"
        />
        {/* Keyhole */}
        <circle cx="200" cy="202" r="6" fill="var(--accent)" opacity="0.9" />
        <rect x="197.5" y="207" width="5" height="12" rx="2" fill="var(--accent)" opacity="0.9" />
      </g>

      {/* Rotating dashed ring */}
      <circle
        cx="200" cy="200" r="185"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.5"
        strokeDasharray="3 12"
        opacity={inView ? 0.3 : 0}
        style={{
          transition: "opacity 1s ease 0.5s",
          animation: inView ? "vaultSpin 60s linear infinite" : "none",
          transformOrigin: "200px 200px",
        }}
      />
    </svg>
  );
}

/* ── Animated status line ── */
function StatusLine({ label, value, delay, status }: {
  label: string; value: string; delay: number; status: "active" | "verified";
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 0",
        borderBottom: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 9, height: 9, borderRadius: "50%",
          background: status === "active" ? "var(--accent)" : "#8b8fa6",
          boxShadow: status === "active" ? "0 0 12px var(--accent-glow)" : "none",
        }} />
        <span style={{
          fontFamily: FONT_MONO,
          fontSize: "0.92rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>
          {label}
        </span>
      </div>
      <span style={{
        fontFamily: FONT_MONO,
        fontSize: "0.88rem",
        letterSpacing: "0.04em",
        color: status === "active" ? "var(--accent)" : "var(--text)",
        background: status === "active" ? "var(--accent-08)" : "transparent",
        padding: "6px 14px",
        borderRadius: 4,
        border: status === "active" ? "1px solid var(--accent-20)" : "1px solid transparent",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Main component ── */
export default function Privacy() {
  return (
    <section style={S.section} id="privacy">
      {/* CSS keyframes for vault spin */}
      <style>{`
        @keyframes vaultSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <Reveal>
        <div style={S.sectionTag}>Enterprise Privacy & Security</div>
        <h2 style={S.sectionH2}>
          Your code stays yours. Period.
        </h2>
        <p style={S.sectionSub}>
          We evaluate your AI tools — we never train on your data, expose your proprietary logic, or retain your codebase beyond the evaluation window.
        </p>
      </Reveal>

      {/* Two-column layout: vault visual + status panel */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px, 6vw, 80px)",
        marginTop: 56,
        alignItems: "center",
      }}>
        {/* Left: Vault ring visualization */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}>
          <VaultRing />
        </div>

        {/* Right: Security status terminal */}
        <div>
          {/* Terminal header */}
          <Reveal delay={0.1}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
              paddingBottom: 16,
              borderBottom: "1px solid var(--border-hi)",
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 8px var(--accent-glow)",
              }} />
              <span style={{
                fontFamily: FONT_MONO,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}>
                security protocol — all systems nominal
              </span>
            </div>
          </Reveal>

          {/* Status lines */}
          <StatusLine
            label="Data retention"
            value="ZERO · EPHEMERAL"
            delay={0.2}
            status="active"
          />
          <StatusLine
            label="Model training on your data"
            value="BLOCKED"
            delay={0.3}
            status="active"
          />
          <StatusLine
            label="SOC 2 Type II compliance"
            value="VERIFIED"
            delay={0.4}
            status="verified"
          />
          <StatusLine
            label="Encryption (transit + rest)"
            value="AES-256 · TLS 1.3"
            delay={0.5}
            status="verified"
          />
          <StatusLine
            label="Deployment options"
            value="VPC · ON-PREM"
            delay={0.6}
            status="active"
          />
          <StatusLine
            label="Audit trail"
            value="FULL RBAC"
            delay={0.7}
            status="verified"
          />

          {/* Bottom note */}
          <Reveal delay={0.8}>
            <p style={{
              fontFamily: FONT_MONO,
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              marginTop: 28,
              lineHeight: 1.7,
              letterSpacing: "0.02em",
              opacity: 0.6,
            }}>
              All evaluation inputs are processed in isolated, ephemeral
              environments and purged immediately after scoring. Your proprietary
              code never leaves your security boundary.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
