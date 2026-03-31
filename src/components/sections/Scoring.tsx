"use client";

import { useRef, useEffect, CSSProperties } from "react";
import { palette } from "../../styles/theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FONT_DISPLAY = "'Instrument Serif', Georgia, serif";
const FONT_MONO = "'JetBrains Mono', 'Fira Code', monospace";
const FONT_BODY = "'DM Sans', 'Helvetica Neue', sans-serif";

/* ─────────────────────── EGG Animation ─────────────────────── */

function EggAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Elements
      const commits = el.querySelectorAll<HTMLElement>(".egg-commit");
      const arrows = el.querySelectorAll<HTMLElement>(".egg-arrow");
      const patternBox = el.querySelector<HTMLElement>(".egg-pattern-box");
      const matchLines = el.querySelectorAll<HTMLElement>(".egg-match-line");
      const scoreBar = el.querySelector<HTMLElement>(".egg-score-fill");
      const scoreNum = el.querySelector<HTMLElement>(".egg-score-num");
      const verdict = el.querySelector<HTMLElement>(".egg-verdict");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // Init
      tl.set(commits, { opacity: 0, x: -20 })
        .set(arrows, { scaleX: 0, transformOrigin: "left center" })
        .set(patternBox, { opacity: 0, scale: 0.92 })
        .set(matchLines, { opacity: 0, scaleX: 0, transformOrigin: "left center" })
        .set(scoreBar, { scaleX: 0, transformOrigin: "left center" })
        .set(scoreNum, { innerText: "0", opacity: 0 })
        .set(verdict, { opacity: 0, y: 8 });

      // Step 1: Commits appear in sequence
      tl.to(commits, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Step 2: Arrows animate
      tl.to(arrows, {
        scaleX: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.inOut",
      }, "-=0.15");

      // Step 3: Pattern box appears
      tl.to(patternBox, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.4)",
      }, "-=0.1");

      // Step 4: Match lines connect
      tl.to(matchLines, {
        opacity: 1,
        scaleX: 1,
        duration: 0.35,
        stagger: 0.12,
        ease: "power2.out",
      });

      // Step 5: Score fills
      tl.to(scoreBar, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.1")
        .to(scoreNum, {
          opacity: 1,
          innerText: "94",
          duration: 0.6,
          snap: { innerText: 1 },
          ease: "power2.out",
        }, "<");

      // Step 6: Verdict
      tl.to(verdict, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="egg-anim-box" style={styles.animBox}>
      {/* Commits Column */}
      <div className="egg-commits-col" style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 120 }}>
        <div style={styles.miniLabel}>Git History</div>
        {[
          { hash: "a3f2c1d", status: "merged", color: palette.accent },
          { hash: "e7b91fa", status: "reverted", color: palette.red },
          { hash: "1c4d8e2", status: "merged", color: palette.accent },
        ].map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              className="egg-commit"
              style={{
                ...styles.commitChip,
                borderColor: c.color === palette.accent ? "var(--accent-20)" : "rgba(245,122,122,0.25)",
              }}
            >
              <span style={{ color: c.color, fontSize: "0.65rem" }}>{c.status === "merged" ? "✓" : "✗"}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: palette.textMuted }}>{c.hash}</span>
            </div>
            <div
              className="egg-arrow"
              style={{
                width: 24,
                height: 1,
                background: `linear-gradient(to right, ${palette.border}, ${palette.textMuted})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Pattern Box (center) */}
      <div className="egg-pattern-box" style={styles.patternBox}>
        <div style={{ fontSize: "0.6rem", color: palette.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          Team Pattern Model
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["naming conventions", "error handling", "test coverage"].map((label, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                className="egg-match-line"
                style={{
                  width: 20,
                  height: 2,
                  background: palette.accent,
                  borderRadius: 1,
                  boxShadow: `0 0 6px ${palette.accentGlow}`,
                }}
              />
              <span style={{ fontSize: "0.62rem", color: palette.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Score Output */}
      <div className="egg-score-col" style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 90, alignItems: "flex-end" }}>
        <div style={styles.miniLabel}>EGG Score</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
          <span className="egg-score-num" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: palette.accent, lineHeight: 1 }}>
            0
          </span>
          <span style={{ fontSize: "0.65rem", color: palette.textMuted }}>/100</span>
        </div>
        <div style={{ width: "100%", height: 3, background: palette.border, borderRadius: 2, overflow: "hidden" }}>
          <div className="egg-score-fill" style={{ width: "94%", height: "100%", background: `linear-gradient(to right, ${palette.accent}, ${palette.warn})`, borderRadius: 2 }} />
        </div>
        <div className="egg-verdict" style={{ fontSize: "0.58rem", color: palette.accent, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", background: palette.accentDim, padding: "2px 8px", borderRadius: 4, border: `1px solid var(--accent-20)` }}>
          MATCHES TEAM STYLE
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── IOD Animation ─────────────────────── */

function IodAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const saidLines = el.querySelectorAll<HTMLElement>(".iod-said-line");
      const didLines = el.querySelectorAll<HTMLElement>(".iod-did-line");
      const connector = el.querySelector<HTMLElement>(".iod-connector");
      const divergeItems = el.querySelectorAll<HTMLElement>(".iod-diverge-item");
      const scoreBadge = el.querySelector<HTMLElement>(".iod-score-badge");
      const scanLine = el.querySelector<HTMLElement>(".iod-scan-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.set(saidLines, { opacity: 0, x: -12 })
        .set(didLines, { opacity: 0, x: 12 })
        .set(connector, { scaleY: 0, transformOrigin: "top center" })
        .set(divergeItems, { opacity: 0, scale: 0.8 })
        .set(scoreBadge, { opacity: 0, scale: 0.8 })
        .set(scanLine, { top: "0%", opacity: 0 });

      // Step 1: "Said" column types in
      tl.to(saidLines, {
        opacity: 1,
        x: 0,
        duration: 0.35,
        stagger: 0.12,
        ease: "power2.out",
      });

      // Step 2: "Did" column types in
      tl.to(didLines, {
        opacity: 1,
        x: 0,
        duration: 0.35,
        stagger: 0.12,
        ease: "power2.out",
      }, "-=0.25");

      // Step 3: Scan line sweeps down
      tl.to(scanLine, {
        opacity: 0.6,
        duration: 0.1,
      })
        .to(scanLine, {
          top: "100%",
          duration: 1,
          ease: "power1.inOut",
        })
        .to(scanLine, { opacity: 0, duration: 0.2 });

      // Step 4: Connector grows
      tl.to(connector, {
        scaleY: 1,
        duration: 0.4,
        ease: "power2.inOut",
      }, "-=0.6");

      // Step 5: Divergence items highlight
      tl.to(divergeItems, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: "back.out(1.6)",
      });

      // Step 6: Score badge
      tl.to(scoreBadge, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="iod-anim-box" style={styles.animBox}>
      {/* "Said" Column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...styles.miniLabel, color: palette.accent }}>AI Reasoning</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative" as const }}>
          {/* Scan line */}
          <div
            className="iod-scan-line"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(to right, transparent, ${palette.accent}, transparent)`,
              boxShadow: `0 0 8px ${palette.accent}`,
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          {[
            "\"update button color\"",
            "\"no side effects\"",
            "\"CSS-only change\"",
          ].map((line, i) => (
            <div key={i} className="iod-said-line" style={styles.codeLine}>
              <span style={{ color: palette.accent, opacity: 0.5, marginRight: 6, fontSize: "0.58rem" }}>{i + 1}</span>
              <span style={{ color: palette.text, fontSize: "0.66rem", fontFamily: "'JetBrains Mono', monospace" }}>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Connector */}
      <div className="iod-connector-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 32, gap: 4, position: "relative" as const }}>
        <div
          className="iod-connector"
          style={{
            width: 1,
            height: 60,
            background: `linear-gradient(to bottom, ${palette.accent}, ${palette.warn}, ${palette.red})`,
          }}
        />
        {[palette.accent, palette.warn].map((c, i) => (
          <div
            key={i}
            className="iod-diverge-item"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: c,
              boxShadow: `0 0 8px ${c}`,
              position: "absolute" as const,
              top: i === 0 ? "30%" : "65%",
            }}
          />
        ))}
      </div>

      {/* "Did" Column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...styles.miniLabel, color: palette.warn }}>Actual Diff</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { text: "+ color: #3b82f6", color: palette.accent },
            { text: "+ onClick: checkout()", color: palette.red },
            { text: "+ import stripe", color: palette.red },
          ].map((line, i) => (
            <div key={i} className="iod-did-line" style={{ ...styles.codeLine, borderColor: i > 0 ? "rgba(245,122,122,0.2)" : "var(--accent-15)" }}>
              <span style={{ color: line.color, fontSize: "0.66rem", fontFamily: "'JetBrains Mono', monospace" }}>{line.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Score Badge */}
      <div
        className="iod-score-badge"
        style={{
          marginTop: 12,
          background: "rgba(245,122,122,0.08)",
          border: "1px solid rgba(245,122,122,0.25)",
          borderRadius: 6,
          padding: "3px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <span style={{ fontSize: "0.58rem", color: palette.red, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>
          IOD: DIVERGENCE DETECTED
        </span>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: palette.red }}>⚠</span>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Section ─────────────────────── */

export default function Scoring() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const header = el.querySelector<HTMLElement>(".scoring-header");
      const cards = el.querySelectorAll<HTMLElement>(".scoring-card");

      gsap.from(header, {
        opacity: 0,
        y: 36,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.65,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px" }} id="scoring">
      {/* Header */}
      <div className="scoring-header">
        <div style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: palette.accent,
          marginBottom: 14,
        }}>
          Scoring Engine
        </div>
        <h2 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          maxWidth: 700,
          marginBottom: 12,
          color: palette.text,
        }}>
          Two signals. Zero blind spots.
        </h2>
        <p style={{
          fontSize: "1.05rem",
          color: palette.textMuted,
          maxWidth: 620,
          lineHeight: 1.7,
          fontFamily: FONT_BODY,
        }}>
          Pattern-match against your team&apos;s actual review history. Then verify if the AI did what it claimed.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={styles.grid}>
        {/* EGG Card */}
        <div className="scoring-card" style={styles.card}>
          {/* Accent stripe */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${palette.accent}, transparent)` }} />

          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h3 style={{ ...styles.cardTitle, fontSize: "1.8rem", marginBottom: 8 }}>Evolutionary Grading</h3>
            <span style={styles.cardTag}>EGG</span>
          </div>

          <p style={styles.cardDesc}>
            Learns from your team&apos;s merged PRs and reverts. Scores AI output against{" "}
            <em style={{ color: palette.accent }}>your actual review patterns</em> — not a generic rubric.
          </p>

          <EggAnimation />

          <div style={styles.cardFooter}>
            <span style={footerDot(palette.accent)} />
            Code that matches team style scores high. Foreign patterns get flagged.
          </div>
        </div>

        {/* IOD Card */}
        <div className="scoring-card" style={styles.card}>
          {/* Accent stripe */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${palette.warn}, transparent)` }} />

          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h3 style={{ ...styles.cardTitle, fontSize: "1.8rem", marginBottom: 8 }}>Intent-Outcome Divergence</h3>
            <span style={{ ...styles.cardTag, color: palette.warn, background: "rgba(245,200,122,0.08)", borderColor: "rgba(245,200,122,0.2)" }}>IOD</span>
          </div>

          <p style={styles.cardDesc}>
            Diffs the AI&apos;s stated reasoning against the actual code change. If the{" "}
            <em style={{ color: palette.warn }}>intent doesn&apos;t match the outcome</em>, IOD catches it.
          </p>

          <IodAnimation />

          <div style={styles.cardFooter}>
            <span style={footerDot(palette.warn)} />
            &quot;Update button color&quot; but also added checkout logic? Divergence score spikes.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Styles ─────────────────────── */

const footerDot = (color: string): CSSProperties => ({
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: color,
  boxShadow: `0 0 6px ${color}`,
  flexShrink: 0,
});

const styles: Record<string, CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))",
    gap: 24,
    marginTop: 48,
  } as CSSProperties,

  card: {
    background: palette.surface,
    borderRadius: 16,
    border: `1px solid ${palette.border}`,
    padding: "36px 32px 28px",
    position: "relative",
    overflow: "hidden",
    transition: "border-color 0.3s",
  } as CSSProperties,

  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  } as CSSProperties,

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: palette.accentDim,
    border: `1px solid var(--accent-20)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  cardTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: "1.35rem",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    color: palette.text,
    margin: 0,
  } as CSSProperties,

  cardTag: {
    fontFamily: FONT_MONO,
    fontSize: "0.62rem",
    color: palette.accent,
    letterSpacing: "0.1em",
    background: palette.accentDim,
    padding: "2px 8px",
    borderRadius: 4,
    border: `1px solid var(--accent-18)`,
  } as CSSProperties,

  cardDesc: {
    fontSize: "0.92rem",
    color: palette.textMuted,
    lineHeight: 1.65,
    marginBottom: 24,
    fontFamily: FONT_BODY,
  } as CSSProperties,

  animBox: {
    background: "#0b0c10",
    borderRadius: 12,
    border: `1px solid ${palette.border}`,
    padding: "20px 16px",
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 16,
    position: "relative",
    overflow: "hidden",
    minHeight: 130,
  } as CSSProperties,

  miniLabel: {
    fontSize: "0.56rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: palette.textMuted,
    marginBottom: 8,
    fontFamily: FONT_MONO,
  } as CSSProperties,

  commitChip: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "3px 10px",
    borderRadius: 6,
    background: "rgba(255,255,255,0.02)",
    border: `1px solid ${palette.border}`,
  } as CSSProperties,

  patternBox: {
    background: "rgba(122,245,202,0.03)",
    border: `1px solid var(--accent-12)`,
    borderRadius: 8,
    padding: "12px 14px",
    flex: 1,
  } as CSSProperties,

  codeLine: {
    padding: "3px 8px",
    borderRadius: 4,
    background: "rgba(255,255,255,0.015)",
    border: `1px solid var(--accent-08)`,
  } as CSSProperties,

  cardFooter: {
    marginTop: 18,
    fontSize: "0.78rem",
    color: palette.textMuted,
    fontFamily: FONT_BODY,
    display: "flex",
    alignItems: "center",
    gap: 8,
    lineHeight: 1.5,
  } as CSSProperties,

};
