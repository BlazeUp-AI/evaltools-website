"use client";

import { useRef, CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);

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
      <div ref={container} style={s.container}>
          <style>{`
            .cursor-blink { animation: blink 1s step-end infinite; }
            @keyframes blink { 50% { opacity: 0; } }
            .log-scroll::-webkit-scrollbar { width: 4px; }
            .log-scroll::-webkit-scrollbar-track { background: transparent; }
            .log-scroll::-webkit-scrollbar-thumb { background: #1e2130; border-radius: 4px; }
          `}</style>

          {/* Background Grid */}
          <div style={s.bgGrid} />

          {/* Connection Tracks */}
          <div style={s.trackContainer}>
              {/* Top Agent Track */}
              <div style={{ ...s.trackBase, left: "58%", top: "calc(50% - 45px)" }}>
                  <div ref={addAgentLine} style={{ ...s.trackLine, background: "rgba(122,245,202,0.6)", boxShadow: "0 0 10px rgba(122,245,202,0.3)" }} />
                  <div ref={addTrafficDot} style={{ ...s.trafficDot, background: "#7af5ca", boxShadow: "0 0 10px #7af5ca" }} />
              </div>
              {/* Bottom Agent Track */}
              <div style={{ ...s.trackBase, left: "58%", top: "calc(50% + 45px)" }}>
                  <div ref={addAgentLine} style={{ ...s.trackLine, background: "rgba(245,200,122,0.6)", boxShadow: "0 0 10px rgba(245,200,122,0.3)" }} />
                  <div ref={addTrafficDot} style={{ ...s.trafficDot, background: "#f5c87a", boxShadow: "0 0 10px #f5c87a" }} />
              </div>
          </div>

          {/* Main Layout */}
          <div style={s.mainLayout}>

              {/* Spacer */}
              <div style={{ width: 280, pointerEvents: "none" }} />

              {/* Center Column: Terminal + Hub */}
              <div style={s.centerColumn}>

                  {/* Terminal */}
                  <div style={s.terminalWrap}>
                      <div ref={leftTerminal} style={s.terminal}>
                          <div style={s.termLabel}>Platform Eng</div>
                          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                              <div style={s.termDot} />
                              <div style={s.termDot} />
                          </div>
                          <div style={s.termBody}>
                              <span style={{ color: "#8b8fa6" }}>~/observal-cli</span>
                              <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                                  <span style={{ color: "rgba(122,245,202,0.8)", marginRight: 8 }}>❯</span>
                                  <div ref={terminalCmd} style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                                      <span style={{ color: "#e4e5eb" }}>mcp register db-core</span>
                                  </div>
                                  <span className="cursor-blink" style={{ display: "inline-block", width: 6, height: 12, background: "rgba(228,229,235,0.8)", marginLeft: 4 }} />
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
                      {/* Hub Header */}
                      <div style={s.hubHeader}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div style={s.hubIcon}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                              </div>
                              <div>
                                  <h3 style={{ color: "#e4e5eb", fontWeight: 700, fontSize: 14, margin: 0 }}>Observal Hub</h3>
                                  <p style={{ fontSize: 10, color: "#8b8fa6", letterSpacing: "0.05em", marginTop: 2 }}>CENTRAL REGISTRY</p>
                              </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 20, fontWeight: 700, color: "#e4e5eb", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
                                  <span ref={mcpCount}>12</span>
                                  <span style={{ fontSize: 10, color: "#8b8fa6", fontWeight: 400, marginTop: 4 }}>MCPs</span>
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
                                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7af5ca" }} /> Rec
                              </span>
                          </div>

                          <div className="log-scroll" style={s.logArea}>
                              <div style={s.logTimeline} />

                              <div ref={addLogEntry} style={s.logRow}>
                                  <div style={{ ...s.logDot, background: "#8b8fa6" }} />
                                  <span style={s.logTime}>14:02</span>
                                  <span style={{ color: "#e4e5eb" }}>Health check: db-core</span>
                              </div>

                              <div ref={addLogEntry} style={s.logRow}>
                                  <div style={{ ...s.logDot, background: "#7af5ca", boxShadow: "0 0 5px #7af5ca" }} />
                                  <span style={s.logTime}>14:03</span>
                                  <span><span style={{ color: "#e4e5eb" }}>CodeBot</span> → <span style={{ color: "#7af5ca" }}>git-mcp</span> (12ms)</span>
                              </div>

                              <div ref={addLogEntry} style={s.logRow}>
                                  <div style={{ ...s.logDot, background: "#f5c87a", boxShadow: "0 0 5px #f5c87a" }} />
                                  <span style={s.logTime}>14:03</span>
                                  <span><span style={{ color: "#e4e5eb" }}>SalesBot</span> → <span style={{ color: "#f5c87a" }}>stripe-mcp</span></span>
                              </div>

                              <div ref={addLogEntry} style={{ ...s.logRow, marginTop: 4 }}>
                                  <span style={{ ...s.logTime, width: 48 }} />
                                  <span style={s.warnBadge}>⚠ Rate Limit Approaching</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Right: Agent Fleet */}
              <div style={{ width: 280, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
                  <div ref={rightAgents} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={s.agentLabel}>AI Agent Fleet</div>

                      {/* Agent 1 */}
                      <div style={s.agentCard}>
                          <div style={{ ...s.agentStripe, background: "rgba(122,245,202,0.5)" }} />
                          <div style={s.agentHeader}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: "#e4e5eb" }}>CodeBot Agent</span>
                              <span style={s.agentVersion}>v2.4</span>
                          </div>
                          <div style={s.agentBody}>
                              <div>Using: <span style={{ color: "#7af5ca" }}>git-mcp</span></div>
                              <div>Status: <span style={{ color: "#e4e5eb" }}>Processing task...</span></div>
                          </div>
                      </div>

                      {/* Agent 2 */}
                      <div style={s.agentCard}>
                          <div style={{ ...s.agentStripe, background: "rgba(245,200,122,0.5)" }} />
                          <div style={s.agentHeader}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: "#e4e5eb" }}>SalesBot Agent</span>
                              <span style={s.agentVersion}>v1.1</span>
                          </div>
                          <div style={s.agentBody}>
                              <div>Using: <span style={{ color: "#f5c87a" }}>stripe-mcp</span></div>
                              <div>Status: <span style={{ color: "#f5c87a" }}>Waiting on rate limit</span></div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
  );
}

/* ─── All styles as inline CSSProperties ─── */
const s: Record<string, CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    maxWidth: 1152,
    margin: "0 auto",
    height: 650,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: 14,
    overflow: "hidden",
    userSelect: "none",
    color: "#e4e5eb",
  },
  bgGrid: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage: "radial-gradient(circle at center, rgba(30,33,48,0.3) 1px, transparent 1px)",
    backgroundSize: "24px 24px",
    opacity: 0.4,
  },
  trackContainer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    display: "flex",
    alignItems: "center",
    width: "100%",
    pointerEvents: "none",
    transform: "translateY(12px)",
  },
  trackBase: {
    position: "absolute",
    width: "24%",
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
    width: 8,
    height: 8,
    borderRadius: "50%",
    marginLeft: -4,
  },
  mainLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    zIndex: 10,
    padding: "0 32px",
    gap: 16,
    transform: "translateY(12px)",
  },
  centerColumn: {
    width: 380,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
  terminalWrap: {
    position: "absolute",
    bottom: "calc(100% + 32px)",
    left: "50%",
    transform: "translateX(-50%)",
    width: 280,
  },
  terminal: {
    background: "#13151c",
    border: "1px solid #1e2130",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    position: "relative",
  },
  termLabel: {
    fontSize: 10,
    color: "#8b8fa6",
    marginBottom: 16,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderBottom: "1px solid rgba(30,33,48,0.5)",
    paddingBottom: 8,
  },
  termDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#1e2130",
  },
  termBody: {
    color: "#e4e5eb",
    height: 40,
    display: "flex",
    flexDirection: "column",
    fontSize: 12,
    lineHeight: 1.6,
  },
  connectorWrap: {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 1,
    height: 32,
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
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#e4e5eb",
    boxShadow: "0 0 10px #e4e5eb",
    marginTop: -4,
  },
  hub: {
    background: "#0b0c10",
    border: "1px solid #1e2130",
    borderRadius: 12,
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: 320,
  },
  hubHeader: {
    background: "#13151c",
    padding: 16,
    borderBottom: "1px solid #1e2130",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 20,
  },
  hubIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "#08090c",
    border: "1px solid #1e2130",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#7af5ca",
    boxShadow: "0 0 10px rgba(122,245,202,0.1)",
  },
  mcpList: {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(30,33,48,0.5)",
    display: "flex",
    gap: 8,
    overflow: "hidden",
  },
  mcpChip: {
    fontSize: 10,
    background: "#08090c",
    border: "1px solid #1e2130",
    color: "#8b8fa6",
    padding: "4px 8px",
    borderRadius: 4,
  },
  mcpChipNew: {
    fontSize: 10,
    background: "rgba(122,245,202,0.1)",
    border: "1px solid rgba(122,245,202,0.5)",
    color: "#7af5ca",
    padding: "4px 8px",
    borderRadius: 4,
    fontWeight: 700,
  },
  telemetry: {
    padding: 16,
    flex: 1,
    background: "#0b0c10",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  telemetryHeader: {
    fontSize: 10,
    color: "#8b8fa6",
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  logArea: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    fontSize: 11,
    overflow: "hidden",
    flex: 1,
    position: "relative",
  },
  logTimeline: {
    position: "absolute",
    top: 0,
    left: 12,
    bottom: 0,
    width: 1,
    background: "rgba(30,33,48,0.5)",
  },
  logRow: {
    display: "flex",
    gap: 12,
    position: "relative",
    paddingLeft: 24,
  },
  logDot: {
    position: "absolute",
    left: -2,
    top: 6,
    width: 6,
    height: 6,
    borderRadius: "50%",
    border: "1px solid #0b0c10",
  },
  logTime: {
    color: "#8b8fa6",
    width: 48,
    flexShrink: 0,
  },
  warnBadge: {
    fontSize: 10,
    color: "#f5c87a",
    background: "rgba(245,200,122,0.1)",
    padding: "2px 6px",
    borderRadius: 4,
    border: "1px solid rgba(245,200,122,0.2)",
  },
  agentLabel: {
    fontSize: 10,
    color: "#8b8fa6",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 8,
    paddingLeft: 8,
    borderLeft: "2px solid #1e2130",
  },
  agentCard: {
    background: "#13151c",
    border: "1px solid #1e2130",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
  },
  agentStripe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 4,
    height: "100%",
  },
  agentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  agentVersion: {
    fontSize: 10,
    background: "#08090c",
    padding: "2px 6px",
    borderRadius: 4,
    border: "1px solid #1e2130",
    color: "#8b8fa6",
  },
  agentBody: {
    fontSize: 12,
    color: "#8b8fa6",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
};
