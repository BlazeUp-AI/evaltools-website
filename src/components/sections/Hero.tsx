"use client";
import { MouseEvent } from "react";
import { S, palette } from "../../styles/theme";
import Reveal from "../ui/Reveal";
import Orb from "../ui/Orb";
import HeroAnimation from "../animations/HeroAnimation";

const handleHoverIn = (e: MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = "scale(1.03)";
};

const handleHoverOut = (e: MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = "scale(1)";
};

export default function Hero() {
    return (
        <section
          style={{
            ...S.section,
            ...S.hero,
            position: "relative",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "40px"
          }}
          id="hero"
        >
        <Orb top="-20%" left="-10%" size={700} />
        <Orb top="30%" left="60%" size={400} color="rgba(122,200,245,0.12)" />

        {/* LEFT COLUMN: Text Content */}
        <div style={{ flex: "1 1 500px", maxWidth: "55%", zIndex: 10 }}>
          <Reveal delay={0.08}>
            <h1 style={S.heroH1}>
              Stop AI failures before they reach{" "}
              <span style={{ color: palette.accent, fontStyle: "italic" }}>production</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p style={S.heroSub}>
              Multi-judge evaluation and guardrails for every AI tool you ship. Plug in, get a verdict, deploy with confidence.
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
        </div>

        {/* RIGHT COLUMN: The GSAP Animation */}
        <div style={{
          flex: "1 1 400px",
          maxWidth: "45%",
          display: "flex",
          justifyContent: "flex-end",
          zIndex: 10,
          overflow: "hidden",
        }}>
          <Reveal delay={0.4}>
             <HeroAnimation />
          </Reveal>
        </div>

      </section>
    );
}
