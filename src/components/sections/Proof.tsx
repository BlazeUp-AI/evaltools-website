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
                      <div style={{ ...S.proofTag, color: palette.red }}>⚠ The Problem</div>
                      <h3 style={{ ...S.proofH3, color: palette.red }}>
                        <Counter end={93} suffix="%" /> of teams hit eval failures
                      </h3>
                      <p style={{ ...S.pillarP, marginBottom: 20 }}>
                        Industry data shows the vast majority of engineering teams experience significant consistency problems when relying on standard LLM-powered evaluations. Outputs drift, hallucinations slip through, and confidence erodes.
                      </p>
                      <div style={{ background: "rgba(245,122,122,0.08)", borderRadius: 10, padding: "18px 20px", fontSize: "0.88rem", color: palette.red, border: "1px solid rgba(245,122,122,0.12)" }}>
                        Elite teams spend <strong>40%+ of dev cycles</strong> hand-tuning evaluation pipelines just to achieve baseline reliability.
                      </div>
                    </div>
                  </Reveal>
        
                  <Reveal delay={0.15}>
                    <div style={S.proofSolution}>
                      <div style={{ ...S.proofTag, color: palette.accent }}>✓ Our Solution</div>
                      <h3 style={{ ...S.proofH3, color: palette.accent }}>
                        Multi-judge consensus, productized.
                      </h3>
                      <p style={{ ...S.pillarP, marginBottom: 20 }}>
                        The "Council of Agents" approach takes the multi-judge consensus methodology pioneered by elite AI teams and packages it as a drop-in API. No bespoke infrastructure. No months of fine-tuning.
                      </p>
                      <div style={{ background: palette.accentDim, borderRadius: 10, padding: "18px 20px", fontSize: "0.88rem", color: palette.accent, border: `1px solid rgba(122,245,202,0.15)` }}>
                        Get <strong>elite-tier evaluation coverage</strong> out of the box — reclaim that 40% of engineering time.
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>
    );
}