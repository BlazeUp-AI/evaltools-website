"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);
  
  // Refs
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

  // Array ref helpers
  const addAgentLine = (el: HTMLDivElement | null) => { if (el && !agentLines.current.includes(el)) agentLines.current.push(el); };
  const addTrafficDot = (el: HTMLDivElement | null) => { if (el && !trafficDots.current.includes(el)) trafficDots.current.push(el); };
  const addLogEntry = (el: HTMLDivElement | null) => { if (el && !logEntries.current.includes(el)) logEntries.current.push(el); };

  useGSAP(() => {
      const tl = gsap.timeline({ repeat: -1 });

      // Step 0: Strict Initialization
      tl.set([leftTerminal.current, centerHub.current, rightAgents.current], { opacity: 0, y: 15 })
        .set(terminalCmd.current, { width: 0 })
        .set(publishLine.current, { scaleY: 0, transformOrigin: "top center" })
        .set(publishDot.current, { opacity: 0, top: "0%" })
        .set(newMcpBadge.current, { opacity: 0, scale: 0.8, x: -10 })
        .set(agentLines.current, { scaleX: 0, transformOrigin: "left center" })
        .set(trafficDots.current, { opacity: 0, left: "100%" }) // Start at agents, moving to hub
        .set(logEntries.current, { opacity: 0, x: -10 })
        .set(mcpCount.current, { innerText: "12" });

      // Step 1: Register Tool (Terminal Types)
      tl.to(leftTerminal.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(terminalCmd.current, { width: "100%", duration: 1.2, ease: "steps(20)" });

      // Step 2: Hub Appears
      tl.to(centerHub.current, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }, "+=0.2");

      // Step 2.5: Top Connector Animates (Terminal -> Hub vertically)
      tl.to(publishLine.current, { scaleY: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.2")
        .fromTo(publishDot.current, 
            { opacity: 0, top: "0%" }, 
            { opacity: 1, top: "100%", duration: 0.8, ease: "power1.inOut" }, 
            "<" // Sync with line
        )
        .to(publishDot.current, { opacity: 0, duration: 0.1 });

      // Step 2.6: Hub Accepts & Updates
      tl.to(mcpCount.current, { innerText: "13", duration: 0.2, snap: "innerText" })
        .to(newMcpBadge.current, { opacity: 1, scale: 1, x: 0, duration: 0.4, ease: "back.out(2)" })
        .to(centerHub.current, { boxShadow: "0 0 30px rgba(122, 245, 202, 0.1)", duration: 0.4 });

      // Step 3: Agents Connect (Hub <-> Agents)
      tl.to(rightAgents.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "+=0.3")
        .to(agentLines.current, { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power2.inOut" }, "-=0.3")
        
        // Traffic dots flow from Agents to Hub (Requests)
        .fromTo(trafficDots.current, 
            { opacity: 0, left: "100%" }, 
            { opacity: 1, left: "0%", duration: 1, stagger: 0.2, ease: "power1.inOut" }, 
            "-=0.2"
        )
        .to(trafficDots.current, { opacity: 0, duration: 0.1 });

      // Step 4: Observability Kick-in (Logs appear in Hub)
      tl.to(logEntries.current, { opacity: 1, x: 0, duration: 0.4, stagger: 0.25, ease: "power2.out" }, "-=0.5");

      // Step 5: Reset
      tl.to({}, { duration: 4 }) // Hold to read
        .to([leftTerminal.current, centerHub.current, rightAgents.current, agentLines.current, publishLine.current], { 
            opacity: 0, 
            y: -10,
            duration: 0.8, 
            ease: "power2.inOut" 
        });

  }, { scope: container });

  return (
      <div ref={container} className="relative w-full max-w-6xl mx-auto h-[650px] flex items-center justify-center font-mono text-sm overflow-hidden select-none" style={{ color: "#e4e5eb" }}>
          <style>{`
            .cursor-blink { animation: blink 1s step-end infinite; }
            @keyframes blink { 50% { opacity: 0; } }
            .log-scroll::-webkit-scrollbar { width: 4px; }
            .log-scroll::-webkit-scrollbar-track { background: transparent; }
            .log-scroll::-webkit-scrollbar-thumb { background: #1e2130; border-radius: 4px; }
          `}</style>

          {/* Background Grid Elements for Enterprise Feel */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(30,33,48,0.3)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

          {/* Connection Tracks - Pushed down to prevent top cutoff */}
          <div className="absolute inset-0 z-0 flex items-center w-full pointer-events-none translate-y-12">
              {/* Agent Tracks (Center to Right) - Top Agent */}
              <div className="absolute left-[58%] top-[calc(50%-45px)] w-[24%] h-[1px] bg-transparent">
                  <div ref={addAgentLine} className="w-full h-full bg-[#7af5ca]/60 shadow-[0_0_10px_rgba(122,245,202,0.3)]" />
                  <div ref={addTrafficDot} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#7af5ca] shadow-[0_0_10px_#7af5ca] -ml-[4px]" />
              </div>
              
              {/* Agent Tracks (Center to Right) - Bottom Agent */}
              <div className="absolute left-[58%] top-[calc(50%+45px)] w-[24%] h-[1px] bg-transparent">
                  <div ref={addAgentLine} className="w-full h-full bg-[#f5c87a]/60 shadow-[0_0_10px_rgba(245,200,122,0.3)]" />
                  <div ref={addTrafficDot} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#f5c87a] shadow-[0_0_10px_#f5c87a] -ml-[4px]" />
              </div>
          </div>

          {/* Main Layout Grid - Pushed down to prevent top cutoff */}
          <div className="flex justify-between items-stretch w-full z-10 px-8 gap-4 translate-y-12">
              
              {/* 1. Dummy placeholder to maintain identical layout and prevent shifting */}
              <div className="w-[280px] pointer-events-none"></div>

              {/* 2. Observal Hub (Center) and Top Terminal */}
              <div className="w-[380px] flex flex-col justify-center relative">
                  
                  {/* Top Terminal (Platform Eng) - Positioned above the hub */}
                  <div className="absolute bottom-[calc(100%+32px)] left-1/2 -translate-x-1/2 w-[280px]">
                      <div ref={leftTerminal} className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5 shadow-2xl relative">
                          <div className="text-[10px] text-[#8b8fa6] mb-4 tracking-widest uppercase border-b border-[#1e2130]/50 pb-2">Platform Eng</div>
                          <div className="flex gap-1.5 mb-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#1e2130]"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-[#1e2130]"></div>
                          </div>
                          <div className="text-[#e4e5eb] h-10 flex flex-col text-[12px] leading-relaxed">
                              <span className="text-[#8b8fa6]">~/observal-cli</span>
                              <div className="flex items-center mt-1">
                                  <span className="text-[#7af5ca]/80 mr-2">❯</span>
                                  <div ref={terminalCmd} className="overflow-hidden whitespace-nowrap">
                                      <span className="text-[#e4e5eb]">mcp register db-core</span>
                                  </div>
                                  <span className="inline-block w-[6px] h-[12px] bg-[#e4e5eb]/80 ml-1 cursor-blink"></span>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Vertical Publish Connector */}
                  <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 w-[1px] h-[32px] bg-transparent">
                      <div ref={publishLine} className="w-full h-full bg-[#e4e5eb]/60 shadow-[0_0_10px_rgba(228,229,235,0.3)]" />
                      <div ref={publishDot} className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#e4e5eb] shadow-[0_0_10px_#e4e5eb] -mt-[4px]" />
                  </div>

                  {/* Hub Panel */}
                  <div ref={centerHub} className="bg-[#0b0c10] border border-[#1e2130] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[320px]">
                      
                      {/* Hub Header / Registry Stats */}
                      <div className="bg-[#13151c] p-4 border-b border-[#1e2130] flex items-center justify-between relative z-20">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#08090c] border border-[#1e2130] flex items-center justify-center text-[#7af5ca] shadow-[0_0_10px_rgba(122,245,202,0.1)]">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                              </div>
                              <div>
                                  <h3 className="text-[#e4e5eb] font-bold text-[14px]">Observal Hub</h3>
                                  <p className="text-[10px] text-[#8b8fa6] tracking-wide mt-0.5">CENTRAL REGISTRY</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className="text-[20px] font-bold text-[#e4e5eb] leading-none flex items-center justify-end gap-2">
                                  <span ref={mcpCount}>12</span>
                                  <span className="text-[10px] text-[#8b8fa6] font-normal mt-1">MCPs</span>
                              </div>
                          </div>
                      </div>

                      {/* Active MCP List (Visual only) */}
                      <div className="px-4 py-3 border-b border-[#1e2130]/50 flex gap-2 overflow-hidden">
                          <span className="text-[10px] bg-[#08090c] border border-[#1e2130] text-[#8b8fa6] px-2 py-1 rounded">stripe-mcp</span>
                          <span className="text-[10px] bg-[#08090c] border border-[#1e2130] text-[#8b8fa6] px-2 py-1 rounded">git-mcp</span>
                          <span ref={newMcpBadge} className="text-[10px] bg-[#7af5ca]/10 border border-[#7af5ca]/50 text-[#7af5ca] px-2 py-1 rounded font-bold">db-core ✓</span>
                      </div>

                      {/* Telemetry / Observability Panel */}
                      <div className="p-4 flex-1 bg-[#0b0c10] flex flex-col relative">
                          <div className="text-[10px] text-[#8b8fa6] mb-3 flex justify-between tracking-widest uppercase">
                              <span>Live Telemetry</span>
                              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#7af5ca] animate-pulse"></div> Rec</span>
                          </div>
                          
                          <div className="space-y-2.5 text-[11px] log-scroll overflow-hidden flex-1 relative">
                              <div className="absolute top-0 left-3 bottom-0 w-[1px] bg-[#1e2130]/50"></div>
                              
                              <div ref={addLogEntry} className="flex gap-3 relative pl-6">
                                  <div className="absolute left-[-2px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#8b8fa6] border border-[#0b0c10]"></div>
                                  <span className="text-[#8b8fa6] w-12 shrink-0">14:02</span>
                                  <span className="text-[#e4e5eb]">Health check: db-core</span>
                              </div>

                              <div ref={addLogEntry} className="flex gap-3 relative pl-6">
                                  <div className="absolute left-[-2px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#7af5ca] border border-[#0b0c10] shadow-[0_0_5px_#7af5ca]"></div>
                                  <span className="text-[#8b8fa6] w-12 shrink-0">14:03</span>
                                  <span><span className="text-[#e4e5eb]">CodeBot</span> → <span className="text-[#7af5ca]">git-mcp</span> (12ms)</span>
                              </div>

                              <div ref={addLogEntry} className="flex gap-3 relative pl-6">
                                  <div className="absolute left-[-2px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#f5c87a] border border-[#0b0c10] shadow-[0_0_5px_#f5c87a]"></div>
                                  <span className="text-[#8b8fa6] w-12 shrink-0">14:03</span>
                                  <span><span className="text-[#e4e5eb]">SalesBot</span> → <span className="text-[#f5c87a]">stripe-mcp</span></span>
                              </div>
                              
                              {/* Warning detail row */}
                              <div ref={addLogEntry} className="flex gap-3 relative pl-6 mt-1">
                                  <span className="text-[#8b8fa6] w-12 shrink-0"></span>
                                  <span className="text-[10px] text-[#f5c87a] bg-[#f5c87a]/10 px-1.5 py-0.5 rounded border border-[#f5c87a]/20">⚠ Rate Limit Approaching</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* 3. AI Agent Fleet (Right) */}
              <div className="w-[280px] flex flex-col justify-center gap-6">
                  
                  <div ref={rightAgents} className="space-y-4">
                      <div className="text-[10px] text-[#8b8fa6] tracking-widest uppercase mb-2 pl-2 border-l-2 border-[#1e2130]">AI Agent Fleet</div>
                      
                      {/* Agent 1 */}
                      <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-4 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#7af5ca]/50"></div>
                          <div className="flex justify-between items-center mb-2">
                              <span className="text-[13px] font-bold text-[#e4e5eb]">CodeBot Agent</span>
                              <span className="text-[10px] bg-[#08090c] px-1.5 py-0.5 rounded border border-[#1e2130] text-[#8b8fa6]">v2.4</span>
                          </div>
                          <div className="text-[12px] text-[#8b8fa6] space-y-1">
                              <div>Using: <span className="text-[#7af5ca]">git-mcp</span></div>
                              <div>Status: <span className="text-[#e4e5eb]">Processing task...</span></div>
                          </div>
                      </div>

                      {/* Agent 2 */}
                      <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-4 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#f5c87a]/50"></div>
                          <div className="flex justify-between items-center mb-2">
                              <span className="text-[13px] font-bold text-[#e4e5eb]">SalesBot Agent</span>
                              <span className="text-[10px] bg-[#08090c] px-1.5 py-0.5 rounded border border-[#1e2130] text-[#8b8fa6]">v1.1</span>
                          </div>
                          <div className="text-[12px] text-[#8b8fa6] space-y-1">
                              <div>Using: <span className="text-[#f5c87a]">stripe-mcp</span></div>
                              <div>Status: <span className="text-[#f5c87a]">Waiting on rate limit</span></div>
                          </div>
                      </div>
                  </div>

              </div>

          </div>
      </div>
  );
}