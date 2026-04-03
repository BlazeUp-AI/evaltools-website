"use client";

import { CSSProperties, ReactNode } from "react";
import { palette, S } from "../../styles/theme";

const FONT_MONO: string = "'JetBrains Mono', 'Fira Code', monospace";

export interface CodeProps {
  language?: string;
}

/* Plain-text code snippets per language */
const snippets: Record<string, { file: string; code: string }> = {
  Python: {
    file: "evaluate.py",
    code: `# Route any AI tool's output through the Council
from council_eval import Council

verdict = Council(api_key="sk-...").evaluate(
    prompt=user_query,
    response=agent_output,
    context=codebase_snapshot
)

# verdict.score · verdict.flags · verdict.reasoning`,
  },
  JavaScript: {
    file: "evaluate.js",
    code: `// Route any AI tool's output through the Council
import { Council } from "council-eval";

const verdict = await new Council("sk-...").evaluate({
    prompt: userQuery,
    response: agentOutput,
    context: codebaseSnapshot,
});

// verdict.score · verdict.flags · verdict.reasoning`,
  },
  Go: {
    file: "evaluate.go",
    code: `// Route any AI tool's output through the Council
import "github.com/council/eval-go"

client := council.New("sk-...")
verdict, err := client.Evaluate(ctx, &council.Request{
    Prompt:   userQuery,
    Response: agentOutput,
    Context:  codebaseSnapshot,
})

// verdict.Score · verdict.Flags · verdict.Reasoning`,
  },
  Ruby: {
    file: "evaluate.rb",
    code: `# Route any AI tool's output through the Council
require "council_eval"

verdict = Council.new(api_key: "sk-...").evaluate(
    prompt: user_query,
    response: agent_output,
    context: codebase_snapshot
)

# verdict.score · verdict.flags · verdict.reasoning`,
  },
  Java: {
    file: "Evaluate.java",
    code: `// Route any AI tool's output through the Council
import com.council.eval.Council;

var council = new Council("sk-...");
var verdict = council.evaluate(EvalRequest.builder()
    .prompt(userQuery)
    .response(agentOutput)
    .context(codebaseSnapshot)
    .build());

// verdict.getScore() · verdict.getFlags() · verdict.getReasoning()`,
  },
  "C#": {
    file: "Evaluate.cs",
    code: `// Route any AI tool's output through the Council
using Council.Eval;

var council = new CouncilClient("sk-...");
var verdict = await council.EvaluateAsync(new {
    Prompt = userQuery,
    Response = agentOutput,
    Context = codebaseSnapshot
});

// verdict.Score · verdict.Flags · verdict.Reasoning`,
  },
  PHP: {
    file: "evaluate.php",
    code: `// Route any AI tool's output through the Council
use Council\\Eval\\Council;

$council = new Council('sk-...');
$verdict = $council->evaluate([
    'prompt' => $userQuery,
    'response' => $agentOutput,
    'context' => $codebaseSnapshot,
]);

// $verdict->score · $verdict->flags · $verdict->reasoning`,
  },
};

/* Minimal syntax highlighting by token patterns */
function highlight(code: string, styles: Record<string, CSSProperties>) {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    let node: ReactNode;
    if (line.startsWith("//") || line.startsWith("#")) {
      node = <span style={styles.cm}>{line}</span>;
    } else {
      // Highlight keywords, strings, and the rest
      const parts: ReactNode[] = [];
      const regex = /(\"[^\"]*\"|'[^']*'|\/\/.*|#.*|\b(?:from|import|const|var|await|new|require|use|using)\b)/g;
      let lastIdx = 0;
      let match;
      let key = 0;
      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(<span key={key++} style={styles.vr}>{line.slice(lastIdx, match.index)}</span>);
        }
        const tok = match[0];
        if (tok.startsWith('"') || tok.startsWith("'")) {
          parts.push(<span key={key++} style={styles.str}>{tok}</span>);
        } else if (tok.startsWith("//") || tok.startsWith("#")) {
          parts.push(<span key={key++} style={styles.cm}>{tok}</span>);
        } else {
          parts.push(<span key={key++} style={styles.kw}>{tok}</span>);
        }
        lastIdx = match.index + tok.length;
      }
      if (lastIdx < line.length) {
        parts.push(<span key={key++} style={styles.vr}>{line.slice(lastIdx)}</span>);
      }
      node = <>{parts}</>;
    }
    return <span key={i}>{node}{i < lines.length - 1 ? "\n" : ""}</span>;
  });
}

export default function Code({ language = "Python" }: CodeProps) {
  const styles: Record<string, CSSProperties> = {
    kw: { color: "#c792ea" },
    fn: { color: "#82aaff" },
    str: { color: "#c3e88d" },
    cm: { color: "#545a7a" },
    vr: { color: palette.text },
    pr: { color: palette.accent },
  };

  const current = snippets[language] || snippets["Python"];

  return (
    <div style={S.codeWrap} className="section-dark">
      <div style={S.codeBar}>
        <div style={S.codeDot("#f57a7a")} />
        <div style={S.codeDot("#f5c87a")} />
        <div style={S.codeDot(palette.accent)} />
        <span style={{ marginLeft: 12, fontSize: "0.75rem", color: palette.textMuted, fontFamily: FONT_MONO }}>{current.file}</span>
      </div>
      <pre style={{ ...S.codeBody, textAlign: "left" }}>
        <code>{highlight(current.code, styles)}</code>
      </pre>
    </div>
  );
}
