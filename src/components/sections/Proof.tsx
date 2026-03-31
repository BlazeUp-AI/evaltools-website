"use client";

import { S, palette } from "../../styles/theme";
import { CSSProperties } from "react";
import Reveal from "../ui/Reveal";
import Counter from "../ui/Counter";

export default function Proof() {
    return (
        <section style={S.section} id="proof">
                <Reveal>
                  <div style={S.sectionTag}>The Case for Change</div>
                  <h2 style={S.sectionH2}>
                    Standard LLM evaluators are a liability.{" "}
                    <span style={{ color: palette.textMuted, fontStyle: "italic" }}>Here's the data.</span>
                  </h2>
                </Reveal>
        
                <div style={{ ...S.proofGrid, "@media (maxWidth: 768px)": { gridTemplateColumns: "1fr" } } as CSSProperties}>
                  <Reveal delay={0.05}>
                    <div style={S.proofProblem}>
                      <div style={{ ...S.proofTag, color: "#c0392b", fontSize: "0.85rem" }}>⚠ The Problem</div>
                      <h3 style={{ ...S.proofH3, color: "#1a1a2e", fontSize: "2rem" }}>
                        <Counter end={93} suffix="%" /> of teams hit eval failures
                      </h3>
                      <p style={{ ...S.pillarP, color: "#5c6070", marginBottom: 20, fontSize: "1.05rem" }}>
                        Industry data shows the vast majority of engineering teams experience significant consistency problems when relying on standard LLM-powered evaluations. Outputs drift, hallucinations slip through, and confidence erodes.
                      </p>
                      <div style={{ background: "#fef2f2", borderRadius: 10, padding: "20px 24px", fontSize: "1.02rem", color: "#c0392b", border: "1px solid #fecaca" }}>
                        Elite teams spend <strong>40%+ of dev cycles</strong> hand-tuning evaluation pipelines just to achieve baseline reliability.
                      </div>
                    </div>
                  </Reveal>
        
                  <Reveal delay={0.15}>
                    <div style={{ ...S.proofSolution, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <div style={{ ...S.proofTag, color: "#16a34a", fontSize: "0.85rem" }}>✓ Our Solution</div>
                      <h3 style={{ ...S.proofH3, color: "#15803d", fontSize: "2rem" }}>
                        Multi-judge consensus, productized.
                      </h3>
                      <p style={{ ...S.pillarP, color: "#5c6070", marginBottom: 20, fontSize: "1.05rem" }}>
                        The &quot;Council of Agents&quot; approach takes the multi-judge consensus methodology pioneered by elite AI teams and packages it as a drop-in API. No bespoke infrastructure. No months of fine-tuning.
                      </p>
                      <div style={{ background: "#dcfce7", borderRadius: 10, padding: "20px 24px", fontSize: "1.02rem", color: "#15803d", border: "1px solid #bbf7d0" }}>
                        Get <strong>elite-tier evaluation coverage</strong> out of the box — reclaim that 40% of engineering time.
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>
    );
}