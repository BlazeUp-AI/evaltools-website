import { useRef, useEffect, useState, CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const scaleWrap = useRef<HTMLDivElement>(null);

  /* Responsive scaling: base design is 750px wide.
     On viewports wider than ~1200px, scale the whole animation up proportionally. */
  const [scale, setScale] = useState(1);
  useEffect(() => {
    function calc() {
      const vw = window.innerWidth;
      if (vw >= 2200) setScale(1.55);
      else if (vw >= 1800) setScale(1.3);
      else if (vw >= 1440) setScale(1.1);
      else setScale(1);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const leftTerminal = useRef<HTMLDivElement>(null);
  const terminalCmd = useRef<HTMLDivElement>(null);
  const publishLine = useRef<HTMLDivElement>(null);
  const publishDot = useRef<HTMLDivElement>(null);

  const centerHub = useRef<HTMLDivElement>(null);
  const mcpCount = useRef<HTMLSpanElement>(null);
  const newMcpBadge = useRef<HTMLSpanElement>(null);

  const rightAgents = useRef<HTMLDivElement>(null);
  const agentLines = useRef<HTMLDivElement[]>([]);
  const trafficDots = useRef<HTMLDivElement[]>([]);
  const logEntries = useRef<HTMLDivElement[]>([]);

  const addAgentLine = (el: HTMLDivElement | null) => { if (el && !agentLines.current.includes(el)) agentLines.current.push(el); };
  const addTrafficDot = (el: HTMLDivElement | null) => { if (el && !trafficDots.current.includes(el)) trafficDots.current.push(el); };
  const addLogEntry = (el: HTMLDivElement | null) => { if (el && !logEntries.current.includes(el)) logEntries.current.push(el); };

  useGSAP(() => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.set([leftTerminal.current, centerHub.current, rightAgents.current], { opacity: 0, y: 15 })
        .set(terminalCmd.current, { width: 0 })
        .set(publishLine.current, { scaleY: 0, transformOrigin: "top center" })
        .set(publishDot.current, { opacity: 0, top: "0%" })
        .set(newMcpBadge.current, { opacity: 0, scale: 0.8, x: -10 })
        .set(agentLines.current, { scaleX: 0, transformOrigin: "left center" })
        .set(trafficDots.current, { opacity: 0, left: "100%" })
        .set(logEntries.current, { opacity: 0, x: -10 })
        .set(mcpCount.current, { innerText: "12" });

      tl.to(leftTerminal.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(terminalCmd.current, { width: "100%", duration: 1.2, ease: "steps(20)" });

      tl.to(centerHub.current, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }, "+=0.2");

      tl.to(publishLine.current, { scaleY: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.2")
        .fromTo(publishDot.current,
            { opacity: 0, top: "0%" },
            { opacity: 1, top: "100%", duration: 0.8, ease: "power1.inOut" },
            "<"
        )
        .to(publishDot.current, { opacity: 0, duration: 0.1 });

      tl.to(mcpCount.current, { innerText: "13", duration: 0.2, snap: "innerText" })
        .to(newMcpBadge.current, { opacity: 1, scale: 1, x: 0, duration: 0.4, ease: "back.out(2)" })
        .to(centerHub.current, { boxShadow: "0 0 30px rgba(122, 245, 202, 0.1)", duration: 0.4 });

      tl.to(rightAgents.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "+=0.3")
        .to(agentLines.current, { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power2.inOut" }, "-=0.3")
        .fromTo(trafficDots.current,
            { opacity: 0, left: "100%" },
            { opacity: 1, left: "0%", duration: 1, stagger: 0.2, ease: "power1.inOut" },
            "-=0.2"
        )
        .to(trafficDots.current, { opacity: 0, duration: 0.1 });

      tl.to(logEntries.current, { opacity: 1, x: 0, duration: 0.4, stagger: 0.25, ease: "power2.out" }, "-=0.5");

      tl.to({}, { duration: 4 })
        .to([leftTerminal.current, centerHub.current, rightAgents.current, agentLines.current, publishLine.current], {
            opacity: 0, y: -10, duration: 0.8, ease: "power2.inOut"
        });

  }, { scope: container });

  return (
      <div ref={scaleWrap} style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        transition: "transform 0.3s ease",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div ref={container} style={s.container}>
          <style>{`
            .cursor-blink { animation: blink 1s step-end infinite; }
            @keyframes blink { 50% { opacity: 0; } }
          `}</style>

          {/* Connection Tracks (Hub → Agents) */}
          <div style={s.trackContainer}>
              {/* Top track */}
              <div style={{ ...s.trackBase, left: 280, right: 220, width: "auto", top: "calc(50% - 40px)" }}>
                  <div ref={addAgentLine} style={{ ...s.trackLine, background: "rgba(122,245,202,0.6)", boxShadow: "0 0 10px rgba(122,245,202,0.3)" }} />
                  <div ref={addTrafficDot} style={{ ...s.trafficDot, background: "#7af5ca", boxShadow: "0 0 10px #7af5ca" }} />
              </div>
              {/* Bottom track */}
              <div style={{ ...s.trackBase, left: 280, right: 220, width: "auto", top: "calc(50% + 40px)" }}>
                  <div ref={addAgentLine} style={{ ...s.trackLine, background: "rgba(245,200,122,0.6)", boxShadow: "0 0 10px rgba(245,200,122,0.3)" }} />
                  <div ref={addTrafficDot} style={{ ...s.trafficDot, background: "#f5c87a", boxShadow: "0 0 10px #f5c87a" }} />
              </div>
          </div>

          {/* Layout: Hub (left) + Agents (right) */}
          <div style={s.mainLayout}>

              {/* Hub Column: Terminal on top, Hub below */}
              <div style={s.hubColumn}>

                  {/* Terminal */}
                  <div ref={leftTerminal} style={s.terminal}>
                      <div style={s.termLabel}>Platform Eng</div>
                      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                          <div style={s.termDot} />
                          <div style={s.termDot} />
                      </div>
                      <div style={s.termBody}>
                          <span style={{ color: "#8b8fa6" }}>~/observal-cli</span>
                          <div style={{ display: "flex", alignItems: "center", marginTop: 6 }}>
                              <span style={{ color: "rgba(122,245,202,0.8)", marginRight: 8, flexShrink: 0 }}>❯</span>
                              <div ref={terminalCmd} style={{ overflow: "hidden", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center" }}>
                                  <span style={{ color: "#e4e5eb" }}>mcp register db-core</span>
                                  <span className="cursor-blink" style={{ display: "inline-block", width: 6, height: 14, background: "rgba(228,229,235,0.8)", marginLeft: 2, flexShrink: 0 }} />
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Vertical Connector */}
                  <div style={s.connectorWrap}>
                      <div ref={publishLine} style={s.connectorLine} />
                      <div ref={publishDot} style={s.connectorDot} />
                  </div>

                  {/* Hub Panel */}
                  <div ref={centerHub} style={s.hub}>
                      {/* Header */}
                      <div style={s.hubHeader}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={s.hubIcon}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                              </div>
                              <div>
                                  <h3 style={{ color: "#e4e5eb", fontWeight: 700, fontSize: 13, margin: 0 }}>Observal Hub</h3>
                                  <p style={{ fontSize: 9, color: "#8b8fa6", letterSpacing: "0.05em", marginTop: 2 }}>CENTRAL REGISTRY</p>
                              </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 18, fontWeight: 700, color: "#e4e5eb", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                                  <span ref={mcpCount}>12</span>
                                  <span style={{ fontSize: 9, color: "#8b8fa6", fontWeight: 400, marginTop: 3 }}>MCPs</span>
                              </div>
                          </div>
                      </div>

                      {/* MCP List */}
                      <div style={s.mcpList}>
                          <span style={s.mcpChip}>stripe-mcp</span>
                          <span style={s.mcpChip}>git-mcp</span>
                          <span ref={newMcpBadge} style={s.mcpChipNew}>db-core ✓</span>
                      </div>

                      {/* Telemetry */}
                      <div style={s.telemetry}>
                          <div style={s.telemetryHeader}>
                              <span>Live Telemetry</span>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#7af5ca" }} /> Rec
                              </span>
                          </div>

                          <div style={s.logArea}>
                              <div style={s.logTimeline} />

                              <div ref={addLogEntry} style={s.logRow}>
                                  <div style={{ ...s.logDot, background: "#8b8fa6" }} />
                                  <span style={s.logTime}>14:02</span>
                                  <span style={{ color: "#e4e5eb" }}>Health check: db-core</span>
                              </div>

                              <div ref={addLogEntry} style={s.logRow}>
                                  <div style={{ ...s.logDot, background: "#7af5ca", boxShadow: "0 0 5px #7af5ca" }} />
                                  <span style={s.logTime}>14:03</span>
                                  <span><span style={{ color: "#e4e5eb" }}>CodeBot</span> → <span style={{ color: "#7af5ca" }}>git-mcp</span></span>
                              </div>

                              <div ref={addLogEntry} style={s.logRow}>
                                  <div style={{ ...s.logDot, background: "#f5c87a", boxShadow: "0 0 5px #f5c87a" }} />
                                  <span style={s.logTime}>14:03</span>
                                  <span><span style={{ color: "#e4e5eb" }}>SalesBot</span> → <span style={{ color: "#f5c87a" }}>stripe-mcp</span></span>
                              </div>

                              <div ref={addLogEntry} style={{ ...s.logRow, marginTop: 2 }}>
                                  <span style={{ width: 40 }} />
                                  <span style={s.warnBadge}>⚠ Rate Limit</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Agent Fleet Column */}
              <div style={s.agentColumn}>
                  <div ref={rightAgents} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div style={s.agentLabel}>AI Agent Fleet</div>

                      {/* Agent 1 */}
                      <div style={s.agentCard}>
                          <div style={{ ...s.agentStripe, background: "rgba(122,245,202,0.5)" }} />
                          <div style={s.agentHeader}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: "#e4e5eb" }}>CodeBot Agent</span>
                              <span style={s.agentVersion}>v2.4</span>
                          </div>
                          <div style={s.agentBody}>
                              <div>Using: <span style={{ color: "#7af5ca" }}>git-mcp</span></div>
                              <div>Status: <span style={{ color: "#e4e5eb" }}>Processing...</span></div>
                          </div>
                      </div>

                      {/* Agent 2 */}
                      <div style={s.agentCard}>
                          <div style={{ ...s.agentStripe, background: "rgba(245,200,122,0.5)" }} />
                          <div style={s.agentHeader}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: "#e4e5eb" }}>SalesBot Agent</span>
                              <span style={s.agentVersion}>v1.1</span>
                          </div>
                          <div style={s.agentBody}>
                              <div>Using: <span style={{ color: "#f5c87a" }}>stripe-mcp</span></div>
                              <div>Status: <span style={{ color: "#f5c87a" }}>Rate limited</span></div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
      </div>
  );
}

const s: Record<string, CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    maxWidth: 750,
    height: 580,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: 12,
    overflow: "visible",
    userSelect: "none",
    color: "#e4e5eb",
  },
  trackContainer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  trackBase: {
    position: "absolute",
    height: 1,
    background: "transparent",
  },
  trackLine: {
    width: "100%",
    height: "100%",
  },
  trafficDot: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 7,
    height: 7,
    borderRadius: "50%",
    marginLeft: -3,
  },
  mainLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    zIndex: 10,
    gap: 20,
  },
  hubColumn: {
    flex: "0 0 280px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  terminal: {
    background: "#13151c",
    border: "1px solid #1e2130",
    borderRadius: 10,
    padding: "18px 18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  termLabel: {
    fontSize: 9,
    color: "#8b8fa6",
    marginBottom: 14,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderBottom: "1px solid rgba(30,33,48,0.5)",
    paddingBottom: 8,
  },
  termDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#1e2130",
  },
  termBody: {
    color: "#e4e5eb",
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    lineHeight: 1.8,
    gap: 2,
  },
  connectorWrap: {
    width: 1,
    height: 28,
    margin: "0 auto",
    position: "relative",
    background: "transparent",
  },
  connectorLine: {
    width: "100%",
    height: "100%",
    background: "rgba(228,229,235,0.6)",
    boxShadow: "0 0 10px rgba(228,229,235,0.3)",
  },
  connectorDot: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#e4e5eb",
    boxShadow: "0 0 10px #e4e5eb",
    marginTop: -3,
  },
  hub: {
    background: "#0b0c10",
    border: "1px solid #1e2130",
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: 280,
  },
  hubHeader: {
    background: "#13151c",
    padding: "12px 14px",
    borderBottom: "1px solid #1e2130",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hubIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    background: "#08090c",
    border: "1px solid #1e2130",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#7af5ca",
    boxShadow: "0 0 10px rgba(122,245,202,0.1)",
  },
  mcpList: {
    padding: "10px 14px",
    borderBottom: "1px solid rgba(30,33,48,0.5)",
    display: "flex",
    gap: 6,
    overflow: "hidden",
  },
  mcpChip: {
    fontSize: 9,
    background: "#08090c",
    border: "1px solid #1e2130",
    color: "#8b8fa6",
    padding: "3px 7px",
    borderRadius: 4,
  },
  mcpChipNew: {
    fontSize: 9,
    background: "rgba(122,245,202,0.1)",
    border: "1px solid rgba(122,245,202,0.5)",
    color: "#7af5ca",
    padding: "3px 7px",
    borderRadius: 4,
    fontWeight: 700,
  },
  telemetry: {
    padding: 14,
    flex: 1,
    background: "#0b0c10",
    display: "flex",
    flexDirection: "column",
  },
  telemetryHeader: {
    fontSize: 9,
    color: "#8b8fa6",
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  logArea: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: 10,
    overflow: "hidden",
    flex: 1,
    position: "relative",
  },
  logTimeline: {
    position: "absolute",
    top: 0,
    left: 10,
    bottom: 0,
    width: 1,
    background: "rgba(30,33,48,0.5)",
  },
  logRow: {
    display: "flex",
    gap: 8,
    position: "relative",
    paddingLeft: 20,
  },
  logDot: {
    position: "absolute",
    left: -1,
    top: 5,
    width: 5,
    height: 5,
    borderRadius: "50%",
    border: "1px solid #0b0c10",
  },
  logTime: {
    color: "#8b8fa6",
    width: 36,
    flexShrink: 0,
  },
  warnBadge: {
    fontSize: 9,
    color: "#f5c87a",
    background: "rgba(245,200,122,0.1)",
    padding: "2px 6px",
    borderRadius: 4,
    border: "1px solid rgba(245,200,122,0.2)",
  },
  agentColumn: {
    flex: "0 0 220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  agentLabel: {
    fontSize: 9,
    color: "#8b8fa6",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 4,
    paddingLeft: 8,
    borderLeft: "2px solid #1e2130",
  },
  agentCard: {
    background: "#13151c",
    border: "1px solid #1e2130",
    borderRadius: 10,
    padding: 14,
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    position: "relative",
    overflow: "hidden",
  },
  agentStripe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 3,
    height: "100%",
  },
  agentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  agentVersion: {
    fontSize: 9,
    background: "#08090c",
    padding: "2px 5px",
    borderRadius: 3,
    border: "1px solid #1e2130",
    color: "#8b8fa6",
  },
  agentBody: {
    fontSize: 11,
    color: "#8b8fa6",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
};
