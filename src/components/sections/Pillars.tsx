import { useState, useEffect, MouseEvent } from "react";
import { S, palette } from "../../styles/theme";
import Reveal from "../ui/Reveal";

interface PillarData {
  num: string;
  title: string;
  body: string;
  accent: string;
}

const pillars: PillarData[] = [
    {
      num: "01",
      title: "Universal Context Mastery",
      body: "Full contextual awareness across multi-million-line repositories, where standard context windows fragment and hallucinate.",
      accent: palette.accent,
    },
    {
      num: "02",
      title: "Council of Agents Evaluation",
      body: "Multiple specialized agents deliberate and reach consensus, eliminating the single-judge failure mode.",
      accent: palette.warn,
    },
    {
      num: "03",
      title: "Instant Guardrails via SLM",
      body: "A Small Language Model orchestrates the Council and enforces guardrails in real time. Deploy in minutes, not months.",
      accent: "#82aaff",
    },
];

export default function Pillars() {
    return (
        <section style={S.section} id="pillars">
                <Reveal>
                  <div style={{ textAlign: "center" }}>
                    <div style={S.sectionTag}>How It Works</div>
                    <h2 style={{ ...S.sectionH2, margin: "0 auto 12px", textAlign: "center" }}>
                      Three pillars. One airtight evaluation pipeline.
                    </h2>
                    <p style={{ ...S.sectionSub, margin: "0 auto", textAlign: "center" }}>
                      Built for the environments where standard evaluators fail: massive codebases, tangled dependencies, zero room for error.
                    </p>
                  </div>
                </Reveal>
        
                <div style={S.pillarsGrid}>
                  {pillars.map((p: PillarData, i: number) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <div
                        style={S.pillarCard}
                        onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
                          e.currentTarget.style.borderColor = p.accent;
                          e.currentTarget.style.transform = "translateY(-4px)";
                        }}
                        onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
                          e.currentTarget.style.borderColor = palette.border;
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: p.accent, opacity: 0, transition: "opacity 0.3s" }}
                          className="pillar-stripe" />
                        <div style={S.pillarNum}>{p.num}</div>
                        <h3 style={S.pillarH3}>{p.title}</h3>
                        <p style={S.pillarP}>{p.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
    );
}