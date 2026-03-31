"use client";

import { useRef, useEffect, CSSProperties } from "react";
import { palette } from "../../styles/theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const FONT_DISPLAY = "'Instrument Serif', Georgia, serif";
const FONT_MONO = "'JetBrains Mono', 'Fira Code', monospace";
const FONT_BODY = "'DM Sans', 'Helvetica Neue', sans-serif";

/* ─── Infinity path data ─── */
// Left loop = MCP Registry, Right loop = Agent Registry
// Viewbox: 0 0 1200 520
const INFINITY_PATH =
  "M 600 260 C 600 80, 200 80, 200 260 C 200 440, 600 440, 600 260 C 600 80, 1000 80, 1000 260 C 1000 440, 600 440, 600 260";

/* ─── Label positions along the loops ─── */
interface LoopLabel {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle" | "end";
  side: "left" | "right";
}

const loopLabels: LoopLabel[] = [
  // Left loop — offset outside the path
  { x: 310, y: 58, text: "Submit", side: "left", anchor: "middle" },
  { x: 68, y: 260, text: "Evaluate", side: "left", anchor: "middle" },
  { x: 310, y: 462, text: "Publish", side: "left", anchor: "middle" },
  { x: 480, y: 430, text: "Install", side: "left", anchor: "middle" },

  // Right loop — offset outside the path
  { x: 720, y: 430, text: "Deploy", side: "right", anchor: "middle" },
  { x: 890, y: 462, text: "Score", side: "right", anchor: "middle" },
  { x: 1132, y: 260, text: "Monitor", side: "right", anchor: "middle" },
  { x: 890, y: 58, text: "Iterate", side: "right", anchor: "middle" },
];


/* ─── Vertical infinity path for mobile ─── */
// Viewbox: 0 0 520 1200 (swapped dimensions)
const VERTICAL_INFINITY_PATH =
  "M 260 600 C 80 600, 80 200, 260 200 C 440 200, 440 600, 260 600 C 80 600, 80 1000, 260 1000 C 440 1000, 440 600, 260 600";

const verticalLabels: { x: number; y: number; text: string; side: "top" | "bottom" }[] = [
  // Top loop (MCP Registry)
  { x: 260, y: 80, text: "Submit", side: "top" },
  { x: 50, y: 340, text: "Evaluate", side: "top" },
  { x: 260, y: 500, text: "Install", side: "top" },
  { x: 470, y: 340, text: "Publish", side: "top" },
  // Bottom loop (Agent Registry)
  { x: 260, y: 700, text: "Deploy", side: "bottom" },
  { x: 50, y: 860, text: "Score", side: "bottom" },
  { x: 260, y: 1120, text: "Iterate", side: "bottom" },
  { x: 470, y: 860, text: "Monitor", side: "bottom" },
];

export default function Lifecycle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const svgVertRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const ctx = gsap.context(() => {
      /* ─── Header reveal ─── */
      const header = section.querySelector<HTMLElement>(".lc-header");
      if (header) {
        gsap.from(header, {
          opacity: 0,
          y: 36,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: header, start: "top 85%" },
        });
      }

      /* ─── Card reveal ─── */
      const card = section.querySelector<HTMLElement>(".lc-card");
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
        });
      }

      /* ─── Infinity path draw ─── */
      const infinityPath = svg.querySelector<SVGPathElement>("#infinity-stroke");
      if (infinityPath) {
        const length = infinityPath.getTotalLength();
        gsap.set(infinityPath, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(infinityPath, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: { trigger: svg, start: "top 78%" },
        });
      }

      /* ─── Labels fade in sequentially ─── */
      const labels = svg.querySelectorAll<SVGGElement>(".loop-label");
      gsap.set(labels, { opacity: 0, y: 12 });
      gsap.to(labels, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: { trigger: svg, start: "top 72%" },
      });

      /* ─── Center badges ─── */
      const badges = svg.querySelectorAll<SVGGElement>(".center-badge");
      gsap.set(badges, { opacity: 0, scale: 0.85 });
      gsap.to(badges, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(1.4)",
        delay: 1.2,
        scrollTrigger: { trigger: svg, start: "top 72%" },
      });

      /* ─── Flowing dots along path (perpetual) ─── */
      const dots = svg.querySelectorAll<SVGCircleElement>(".flow-dot");
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          motionPath: {
            path: "#infinity-motion",
            align: "#infinity-motion",
            alignOrigin: [0.5, 0.5],
          },
          duration: 8,
          repeat: -1,
          ease: "none",
          delay: i * 2,
        });

        // Pulse
        gsap.to(dot, {
          attr: { r: 5 },
          opacity: 0.4,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.7,
        });
      });

      /* ─── Bottom cards stagger ─── */
      const bottomCards = section.querySelectorAll<HTMLElement>(".lc-bottom-card");
      gsap.set(bottomCards, { opacity: 0, y: 30 });
      gsap.to(bottomCards, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: bottomCards[0], start: "top 85%" },
      });

      /* ─── Vertical SVG animations (mobile) ─── */
      const vSvg = svgVertRef.current;
      if (vSvg) {
        const vPath = vSvg.querySelector<SVGPathElement>("#v-infinity-stroke");
        if (vPath) {
          const len = vPath.getTotalLength();
          gsap.set(vPath, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(vPath, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.inOut",
            scrollTrigger: { trigger: vSvg, start: "top 78%" },
          });
        }

        const vLabels = vSvg.querySelectorAll<SVGGElement>(".loop-label-v");
        gsap.set(vLabels, { opacity: 0 });
        gsap.to(vLabels, {
          opacity: 1,
          duration: 0.45,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: { trigger: vSvg, start: "top 72%" },
        });

        const vBadges = vSvg.querySelectorAll<SVGGElement>(".center-badge-v");
        gsap.set(vBadges, { opacity: 0, scale: 0.85 });
        gsap.to(vBadges, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(1.4)",
          delay: 1.2,
          scrollTrigger: { trigger: vSvg, start: "top 72%" },
        });

        const vDots = vSvg.querySelectorAll<SVGCircleElement>(".flow-dot-v");
        vDots.forEach((dot, i) => {
          gsap.to(dot, {
            motionPath: {
              path: "#v-infinity-motion",
              align: "#v-infinity-motion",
              alignOrigin: [0.5, 0.5],
            },
            duration: 8,
            repeat: -1,
            ease: "none",
            delay: i * 2,
          });
          gsap.to(dot, {
            attr: { r: 5 },
            opacity: 0.4,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.7,
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px" }} id="lifecycle">
      {/* Header */}
      <div className="lc-header">
        <div style={s.tag}>Platform Lifecycle</div>
        <h2 style={s.h2}>
          From submission to production.{" "}
          <span style={{ color: palette.textMuted, fontStyle: "italic" }}>One loop.</span>
        </h2>
        <p style={s.sub}>
          Developers submit. Observal evaluates, documents, and publishes. Agents deploy and get scored in production — continuously.
        </p>
      </div>

      {/* Main Infinity Diagram Card */}
      <div className="lc-card" style={{ ...s.card, background: "#0e1016", border: "1px solid #1e2130" }}>
        {/* Subtle background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, #1e2130 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            opacity: 0.3,
            pointerEvents: "none",
            borderRadius: "inherit",
          }}
        />

        {/* ─── Horizontal SVG (desktop) ─── */}
        <svg
          ref={svgRef}
          viewBox="0 0 1200 520"
          className="lc-svg-desktop"
          style={{ width: "100%", height: "auto", position: "relative", zIndex: 1 }}
          fill="none"
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowSoft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={palette.accent} />
              <stop offset="50%" stopColor={palette.textMuted} />
              <stop offset="100%" stopColor={palette.warn} />
            </linearGradient>
          </defs>

          {/* Background glow under infinity */}
          <ellipse cx="300" cy="260" rx="220" ry="180" fill={palette.accent} opacity="0.02" filter="url(#glowSoft)" />
          <ellipse cx="900" cy="260" rx="220" ry="180" fill={palette.warn} opacity="0.02" filter="url(#glowSoft)" />

          {/* Infinity path (hidden, for motion) */}
          <path id="infinity-motion" d={INFINITY_PATH} stroke="none" fill="none" />

          {/* Infinity path (visible, drawn on scroll) */}
          <path
            id="infinity-stroke"
            d={INFINITY_PATH}
            stroke="url(#pathGrad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Thicker ghost path for context */}
          <path
            d={INFINITY_PATH}
            stroke={palette.border}
            strokeWidth="48"
            fill="none"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* Flowing dots */}
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              className="flow-dot"
              r="3.5"
              fill={i < 2 ? palette.accent : palette.warn}
              opacity="0.8"
              filter="url(#glow)"
            />
          ))}

          {/* Center Hub Labels */}
          <g className="center-badge">
            <rect x="220" y="236" width="160" height="48" rx="10" fill="#13151c" stroke={palette.accent} strokeWidth="1" opacity="0.95" />
            <text x="300" y="256" textAnchor="middle" fill={palette.accent} fontSize="11" fontFamily="'DM Sans', sans-serif" fontWeight="700" letterSpacing="0.1em">
              MCP REGISTRY
            </text>
            <text x="300" y="273" textAnchor="middle" fill="#8b8fa6" fontSize="9" fontFamily="'JetBrains Mono', monospace">
              discover · install · monitor
            </text>
          </g>

          <g className="center-badge">
            <rect x="820" y="236" width="160" height="48" rx="10" fill="#13151c" stroke={palette.warn} strokeWidth="1" opacity="0.95" />
            <text x="900" y="256" textAnchor="middle" fill={palette.warn} fontSize="11" fontFamily="'DM Sans', sans-serif" fontWeight="700" letterSpacing="0.1em">
              AGENT REGISTRY
            </text>
            <text x="900" y="273" textAnchor="middle" fill="#8b8fa6" fontSize="9" fontFamily="'JetBrains Mono', monospace">
              deploy · evaluate · score
            </text>
          </g>

          {/* Crossover label */}
          <g className="center-badge">
            <rect x="548" y="240" width="104" height="40" rx="8" fill="#0e1016" stroke="#2c3050" strokeWidth="1" />
            <text x="600" y="257" textAnchor="middle" fill="#e4e5eb" fontSize="9" fontFamily="'DM Sans', sans-serif" fontWeight="600" letterSpacing="0.04em">
              OBSERVAL
            </text>
            <text x="600" y="270" textAnchor="middle" fill="#8b8fa6" fontSize="8" fontFamily="'JetBrains Mono', monospace">
              orchestrator
            </text>
          </g>

          {/* Loop labels */}
          {loopLabels.map((l, i) => {
            const isLeft = l.side === "left";
            const color = isLeft ? palette.accent : palette.warn;
            return (
              <g key={i} className="loop-label">
                <text
                  x={l.x}
                  y={l.y}
                  textAnchor="middle"
                  fill={color}
                  fontSize="18"
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight="700"
                  letterSpacing="0.06em"
                >
                  {l.text}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ─── Vertical SVG (mobile) ─── */}
        <svg
          ref={svgVertRef}
          viewBox="0 0 520 1200"
          className="lc-svg-mobile"
          style={{ width: "100%", height: "auto", position: "relative", zIndex: 1, display: "none" }}
          fill="none"
        >
          <defs>
            <filter id="glowV" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowSoftV" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="pathGradV" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor={palette.accent} />
              <stop offset="50%" stopColor={palette.textMuted} />
              <stop offset="100%" stopColor={palette.warn} />
            </linearGradient>
          </defs>

          {/* Background glows */}
          <ellipse cx="260" cy="300" rx="180" ry="220" fill={palette.accent} opacity="0.02" filter="url(#glowSoftV)" />
          <ellipse cx="260" cy="900" rx="180" ry="220" fill={palette.warn} opacity="0.02" filter="url(#glowSoftV)" />

          {/* Hidden motion path */}
          <path id="v-infinity-motion" d={VERTICAL_INFINITY_PATH} stroke="none" fill="none" />

          {/* Visible path */}
          <path
            id="v-infinity-stroke"
            d={VERTICAL_INFINITY_PATH}
            stroke="url(#pathGradV)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Ghost path */}
          <path
            d={VERTICAL_INFINITY_PATH}
            stroke={palette.border}
            strokeWidth="48"
            fill="none"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* Flowing dots */}
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              className="flow-dot-v"
              r="3.5"
              fill={i < 2 ? palette.accent : palette.warn}
              opacity="0.8"
              filter="url(#glowV)"
            />
          ))}

          {/* MCP Registry badge (top loop center) */}
          <g className="center-badge-v">
            <rect x="160" y="276" width="200" height="48" rx="10" fill="#13151c" stroke={palette.accent} strokeWidth="1" opacity="0.95" />
            <text x="260" y="296" textAnchor="middle" fill={palette.accent} fontSize="14" fontFamily="'DM Sans', sans-serif" fontWeight="700" letterSpacing="0.1em">
              MCP REGISTRY
            </text>
            <text x="260" y="314" textAnchor="middle" fill="#8b8fa6" fontSize="11" fontFamily="'JetBrains Mono', monospace">
              discover · install · monitor
            </text>
          </g>

          {/* Agent Registry badge (bottom loop center) */}
          <g className="center-badge-v">
            <rect x="150" y="876" width="220" height="48" rx="10" fill="#13151c" stroke={palette.warn} strokeWidth="1" opacity="0.95" />
            <text x="260" y="896" textAnchor="middle" fill={palette.warn} fontSize="14" fontFamily="'DM Sans', sans-serif" fontWeight="700" letterSpacing="0.1em">
              AGENT REGISTRY
            </text>
            <text x="260" y="914" textAnchor="middle" fill="#8b8fa6" fontSize="11" fontFamily="'JetBrains Mono', monospace">
              deploy · evaluate · score
            </text>
          </g>

          {/* Crossover badge (center) */}
          <g className="center-badge-v">
            <rect x="195" y="576" width="130" height="48" rx="8" fill="#0e1016" stroke="#2c3050" strokeWidth="1" />
            <text x="260" y="596" textAnchor="middle" fill="#e4e5eb" fontSize="12" fontFamily="'DM Sans', sans-serif" fontWeight="600" letterSpacing="0.04em">
              OBSERVAL
            </text>
            <text x="260" y="612" textAnchor="middle" fill="#8b8fa6" fontSize="10" fontFamily="'JetBrains Mono', monospace">
              orchestrator
            </text>
          </g>

          {/* Loop labels */}
          {verticalLabels.map((l, i) => {
            const color = l.side === "top" ? palette.accent : palette.warn;
            return (
              <g key={i} className="loop-label-v">
                <text
                  x={l.x}
                  y={l.y}
                  textAnchor="middle"
                  fill={color}
                  fontSize="22"
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight="700"
                  letterSpacing="0.06em"
                >
                  {l.text}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Loop Legend */}
        <div style={s.legend}>
          <div style={s.legendItem}>
            <div style={{ ...s.legendDot, background: palette.accent, boxShadow: `0 0 8px ${palette.accent}` }} />
            <span style={s.legendText}>MCP Registry Loop</span>
          </div>
          <div style={{ width: 1, height: 16, background: palette.border }} />
          <div style={s.legendItem}>
            <div style={{ ...s.legendDot, background: palette.warn, boxShadow: `0 0 8px ${palette.warn}` }} />
            <span style={s.legendText}>Agent Registry Loop</span>
          </div>
        </div>
      </div>

      {/* Bottom Detail Cards */}
      <div style={s.bottomGrid}>
        {/* MCP Card */}
        <div className="lc-bottom-card" style={s.bottomCard}>
          <div style={{ ...s.bottomStripe, background: palette.accent }} />
          <div style={s.bottomHeader}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            <span style={s.bottomTitle}>MCP Registry</span>
          </div>
          <div style={s.bottomBody}>
            <div style={s.step}>
              <span style={{ ...s.stepNum, color: palette.accent }}>01</span>
              <span style={s.stepText}>
                Submit via <code style={s.code}>/submit &lt;GIT_URL&gt;</code>
              </span>
            </div>
            <div style={s.step}>
              <span style={{ ...s.stepNum, color: palette.accent }}>02</span>
              <span style={s.stepText}>Auto-evaluate: security, schema validation, docs check</span>
            </div>
            <div style={s.step}>
              <span style={{ ...s.stepNum, color: palette.accent }}>03</span>
              <span style={s.stepText}>Published with docs, config file download, and setup steps</span>
            </div>
            <div style={s.step}>
              <span style={{ ...s.stepNum, color: palette.accent }}>04</span>
              <span style={s.stepText}>Track downloads &amp; tool calls per MCP in production</span>
            </div>
          </div>
        </div>

        {/* Agent Card */}
        <div className="lc-bottom-card" style={s.bottomCard}>
          <div style={{ ...s.bottomStripe, background: palette.warn }} />
          <div style={s.bottomHeader}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.warn} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22" />
              <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
              <path d="M5 14h14" />
              <path d="M6 18h12" />
            </svg>
            <span style={s.bottomTitle}>Agent Registry</span>
          </div>
          <div style={s.bottomBody}>
            <div style={s.step}>
              <span style={{ ...s.stepNum, color: palette.warn }}>01</span>
              <span style={s.stepText}>
                Submit via <code style={s.code}>/submit &lt;GIT_URL&gt;</code>
              </span>
            </div>
            <div style={s.step}>
              <span style={{ ...s.stepNum, color: palette.warn }}>02</span>
              <span style={s.stepText}>Auto-evaluate agent definition: Prompt + MCPs + Model</span>
            </div>
            <div style={s.step}>
              <span style={{ ...s.stepNum, color: palette.warn }}>03</span>
              <span style={s.stepText}>Document purpose, capabilities, and dependencies</span>
            </div>
            <div style={s.step}>
              <span style={{ ...s.stepNum, color: palette.warn }}>04</span>
              <span style={s.stepText}>SLM Judge scores production runs: acceptance, tool calls, CoT quality</span>
            </div>
          </div>
        </div>

        {/* Agent Composition Card */}
        <div className="lc-bottom-card" style={{ ...s.bottomCard, borderColor: palette.borderHi }}>
          <div style={{ ...s.bottomStripe, background: `linear-gradient(to right, ${palette.accent}, ${palette.warn})` }} />
          <div style={s.bottomHeader}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span style={s.bottomTitle}>Agent = Prompt + MCPs + Model</span>
          </div>
          <div style={s.bottomBody}>
            <div style={s.compositionRow}>
              <div style={s.compChip}>
                <span style={{ color: palette.accent, fontSize: "0.9rem" }}>Prompt</span>
                <span style={{ color: palette.textMuted, fontSize: "0.78rem" }}>system instructions</span>
              </div>
              <span style={{ color: palette.border, fontSize: "1.4rem", lineHeight: 1 }}>+</span>
              <div style={s.compChip}>
                <span style={{ color: palette.warn, fontSize: "0.9rem" }}>MCPs</span>
                <span style={{ color: palette.textMuted, fontSize: "0.78rem" }}>tool servers</span>
              </div>
              <span style={{ color: palette.border, fontSize: "1.4rem", lineHeight: 1 }}>+</span>
              <div style={s.compChip}>
                <span style={{ color: "#82aaff", fontSize: "0.9rem" }}>Model</span>
                <span style={{ color: palette.textMuted, fontSize: "0.78rem" }}>LLM config</span>
              </div>
            </div>
            <div style={{ fontSize: "0.95rem", color: palette.textMuted, lineHeight: 1.6, marginTop: 12 }}>
              Every agent is a declarative composition. Submit the repo, Observal handles the rest — evaluation, documentation, and production monitoring via SLM-as-a-judge.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Styles ─────────────────────── */

const s: Record<string, CSSProperties> = {
  tag: {
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: palette.accent,
    marginBottom: 14,
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
    maxWidth: 750,
    marginBottom: 12,
    color: palette.text,
  },
  sub: {
    fontSize: "1.05rem",
    color: palette.textMuted,
    maxWidth: 640,
    lineHeight: 1.7,
    fontFamily: FONT_BODY,
  },
  card: {
    marginTop: 48,
    background: palette.surface,
    borderRadius: 20,
    border: `1px solid ${palette.border}`,
    padding: "48px 40px 32px",
    position: "relative",
    overflow: "hidden",
  },
  legend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 12,
    position: "relative",
    zIndex: 1,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
  legendText: {
    fontSize: "0.75rem",
    color: palette.textMuted,
    fontFamily: FONT_MONO,
    letterSpacing: "0.04em",
  },

  /* Bottom cards */
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
    gap: 20,
    marginTop: 32,
  },
  bottomCard: {
    background: palette.surface,
    borderRadius: 14,
    border: `1px solid ${palette.border}`,
    padding: "28px 24px 24px",
    position: "relative",
    overflow: "hidden",
    transition: "border-color 0.3s",
  },
  bottomStripe: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  bottomHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  bottomTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: "1.5rem",
    color: palette.text,
    letterSpacing: "-0.01em",
  },
  bottomBody: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  step: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
  },
  stepNum: {
    fontFamily: FONT_MONO,
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    opacity: 0.7,
    flexShrink: 0,
    marginTop: 3,
  },
  stepText: {
    fontSize: "1rem",
    color: palette.textMuted,
    lineHeight: 1.6,
  },
  code: {
    fontFamily: FONT_MONO,
    fontSize: "0.9rem",
    background: "rgba(122,245,202,0.06)",
    color: palette.accent,
    padding: "2px 7px",
    borderRadius: 4,
    border: `1px solid rgba(122,245,202,0.12)`,
  },
  compositionRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  compChip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    padding: "10px 18px",
    borderRadius: 10,
    background: palette.bgAlt,
    border: `1px solid ${palette.border}`,
    fontFamily: FONT_MONO,
  },
};
