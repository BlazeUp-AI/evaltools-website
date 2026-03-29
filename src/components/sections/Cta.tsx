"use client";
import { CSSProperties, MouseEvent } from "react";
import { S, palette } from "../../styles/theme";
import Reveal from "../ui/Reveal";

const handleHoverIn = (e: MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = "scale(1.03)";
};
const handleHoverOut = (e: MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = "scale(1)";
};

export default function Cta() {
    return (
        <section style={S.section} id="cta">
                <Reveal>
                  <div style={S.ctaBox}>
                    <div style={{ ...S.sectionTag, marginBottom: 20 }}>Get Started Free</div>
                    <h2 style={{ ...S.sectionH2, margin: "0 auto 16px", textAlign: "center", maxWidth: 600 } as CSSProperties}>
                      Evaluate your first AI tool in under five minutes.
                    </h2>
                    <p style={{ ...S.sectionSub, margin: "0 auto 36px", textAlign: "center" } as CSSProperties}>
                      No credit card. No fine-tuning. Just plug in your tool's output and let the Council deliver a verdict.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                      <button style={S.btnPrimary} onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
                        Start Free Evaluation →
                      </button>
                      <button style={S.btnGhost}>
                        Talk to Sales
                      </button>
                    </div>
                  </div>
                </Reveal>
              </section>
    );
}