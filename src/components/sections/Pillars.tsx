"use client";
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
      body: "From greenfield microservices to dense, multi-million-line legacy repositories — our architecture maintains full contextual awareness where standard context windows fragment and hallucinate. No repo is too large, no dependency graph too tangled.",
      accent: palette.accent,
    },
    {
      num: "02",
      title: "Council of Agents Evaluation",
      body: "A single LLM-as-a-judge is a single point of failure. Our Council convenes multiple specialized evaluator agents that deliberate, cross-examine, and reach consensus — eliminating the consistency drift that plagues generic approaches.",
      accent: palette.warn,
    },
    {
      num: "03",
      title: "Instant Guardrails via SLM",
      body: "An overarching Small Language Model orchestrates the Council and enforces production guardrails in real time. No fine-tuning, no prompt engineering marathons. Deploy protection for any internal AI tool in minutes, not months.",
      accent: "#82aaff",
    },
];

export default function Pillars() {
    return (
        <section style={S.section} id="pillars">
                <Reveal>
                  <div style={S.sectionTag}>How It Works</div>
                  <h2 style={S.sectionH2}>
                    Three pillars. One airtight evaluation pipeline.
                  </h2>
                  <p style={S.sectionSub}>
                    Purpose-built to handle the environments where standard evaluators fail — sprawling monoliths, tangled dependencies, and multi-million-line codebases.
                  </p>
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