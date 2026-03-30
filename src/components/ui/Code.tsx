"use client";

import { CSSProperties } from "react";
import { palette, S } from "../../styles/theme";

const FONT_MONO: string = "'JetBrains Mono', 'Fira Code', monospace";

export default function Code() {
  const kw: CSSProperties = { color: "#c792ea" };
  const fn: CSSProperties = { color: "#82aaff" };
  const str: CSSProperties = { color: "#c3e88d" };
  const cm: CSSProperties = { color: "#545a7a" };
  const vr: CSSProperties = { color: palette.text };
  const pr: CSSProperties = { color: palette.accent };
  return (
    <div style={S.codeWrap} className="section-dark">
      <div style={S.codeBar}>
        <div style={S.codeDot("#f57a7a")} />
        <div style={S.codeDot("#f5c87a")} />
        <div style={S.codeDot(palette.accent)} />
        <span style={{ marginLeft: 12, fontSize: "0.75rem", color: palette.textMuted, fontFamily: FONT_MONO }}>evaluate.py</span>
      </div>
      <pre style={S.codeBody}>
        <code>
          <span style={cm}>{"# Route any AI tool's output through the Council"}</span>{"\n"}
          <span style={kw}>from</span> <span style={fn}>council_eval</span> <span style={kw}>import</span> <span style={vr}>Council</span>{"\n\n"}
          <span style={vr}>verdict</span> <span style={pr}>=</span> <span style={vr}>Council</span><span style={pr}>(</span><span style={str}>api_key</span><span style={pr}>=</span><span style={str}>"sk-..."</span><span style={pr}>)</span><span style={pr}>.</span><span style={fn}>evaluate</span><span style={pr}>(</span>{"\n"}
          {"    "}<span style={str}>prompt</span><span style={pr}>=</span><span style={vr}>user_query</span><span style={pr}>,</span>{"\n"}
          {"    "}<span style={str}>response</span><span style={pr}>=</span><span style={vr}>agent_output</span><span style={pr}>,</span>{"\n"}
          {"    "}<span style={str}>context</span><span style={pr}>=</span><span style={vr}>codebase_snapshot</span>{"\n"}
          <span style={pr}>)</span>{"\n\n"}
          <span style={cm}>{"# verdict.score · verdict.flags · verdict.reasoning"}</span>
        </code>
      </pre>
    </div>
  );
}