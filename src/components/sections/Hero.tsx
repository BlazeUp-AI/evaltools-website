"use client";
import { useState, useEffect, MouseEvent } from "react";    
import { S, palette } from "../../styles/theme";
import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";

const handleHoverIn = (e: MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = "scale(1.03)";
};
  
const handleHoverOut = (e: MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = "scale(1)";
};

export default function Hero() {
    return (
        <section style={{ ...S.section, ...S.hero, position: "relative" }} id="hero">
        <Orb top="-20%" left="-10%" size={700} />
        <Orb top="30%" left="60%" size={400} color="rgba(122,200,245,0.12)" />

        <Reveal>
          <div style={S.heroLabel}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: palette.accent, boxShadow: `0 0 8px ${palette.accent}` }} />
            Zero Fine-Tuning Required
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 style={S.heroH1}>
            Stop AI failures before they reach{" "}
            <span style={{ color: palette.accent, fontStyle: "italic" }}>production</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p style={S.heroSub}>
            Enterprise-grade evaluation and guardrails for every internal AI tool you build — from modern copilots to agents navigating massive legacy codebases. Our Council of Agents delivers multi-judge consensus where single-model evaluators collapse.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div style={S.heroCtas}>
            <button style={S.btnPrimary} onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
              Evaluate Your First AI Tool →
            </button>
            <button style={S.btnGhost}>
              Read the Docs
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.36}>
          <div style={S.heroStats}>
            <div>
              <div style={S.statNum}><Counter end={93} suffix="%" /></div>
              <div style={S.statLabel}>of teams report eval consistency issues</div>
            </div>
            <div>
              <div style={S.statNum}><Counter end={40} suffix="%+" /></div>
              <div style={S.statLabel}>dev time spent on manual evals</div>
            </div>
            <div>
              <div style={S.statNum}>0</div>
              <div style={S.statLabel}>fine-tuning steps required</div>
            </div>
          </div>
        </Reveal>
      </section>
    );
}