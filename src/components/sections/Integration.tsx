"use client";

import { CSSProperties, useState } from "react";
import { S, palette } from "../../styles/theme";
import Reveal from "../ui/Reveal";
import Code from "../ui/Code";

const sdkLanguages: string[] = ["Python", "JavaScript", "Go", "Ruby", "Java", "C#", "PHP"];
const FONT_MONO = "'SF Mono', 'SF Mono Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace";

export default function Integration() {
    const [activeLang, setActiveLang] = useState("Python");

    return (
        <section style={{ ...S.section, textAlign: "center" } as CSSProperties} id="integration">
            <Reveal>
              <div style={S.sectionTag}>Developer Experience</div>
              <h2 style={{ ...S.sectionH2, margin: "0 auto 12px" }}>
                Three lines to a Council verdict.
              </h2>
              <p style={{ ...S.sectionSub, margin: "0 auto" }}>
                Route any internal AI tool&#39;s output through the Council API. Get a multi-agent consensus score, flagged issues, and full reasoning, instantly.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Code language={activeLang} />
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(10px, 3vw, 32px)", marginTop: 36, flexWrap: "wrap" }}>
                {sdkLanguages.map((lang: string) => {
                  const isActive = lang === activeLang;
                  return (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      style={{
                        padding: "8px 20px",
                        borderRadius: 8,
                        border: isActive
                          ? `1px solid ${palette.accent}`
                          : `1px solid ${palette.border}`,
                        background: isActive ? "var(--accent-dim)" : "transparent",
                        fontSize: "0.82rem",
                        color: isActive ? palette.accent : palette.textMuted,
                        fontFamily: FONT_MONO,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </Reveal>
        </section>
    );
}
