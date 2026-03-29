"use client";
import { useState, useEffect, MouseEvent } from "react";
import { S, palette } from "../../styles/theme";
import Reveal from "../ui/Reveal";

const FONT_DISPLAY = "'Plus Jakarta Display', sans-serif";

interface PrivacyItem {
  icon: string;
  title: string;
  desc: string;
}

const privacyItems: PrivacyItem[] = [
    { icon: "🔒", title: "Zero Data Retention", desc: "Evaluation inputs are processed in ephemeral, isolated environments and purged immediately after scoring." },
    { icon: "🛡️", title: "No Model Training", desc: "Your proprietary code, prompts, and outputs are never used to train or improve any public or third-party model." },
    { icon: "🏢", title: "SOC 2 Type II", desc: "Enterprise-grade compliance with full audit trails, role-based access control, and encrypted data in transit and at rest." },
    { icon: "☁️", title: "VPC & On-Prem Options", desc: "Deploy within your own cloud boundary or on-premises for teams with the strictest data residency requirements." },
];

export default function Privacy() {
    return (
        <section style={S.section} id="privacy">
        <Reveal>
          <div style={S.sectionTag}>Enterprise Privacy & Security</div>
          <h2 style={S.sectionH2}>
            Your code stays yours. Period.
          </h2>
          <p style={S.sectionSub}>
            We evaluate your AI tools — we never train on your data, expose your proprietary logic, or retain your codebase beyond the evaluation window.
          </p>
        </Reveal>

        <div style={S.privacyGrid}>
          {privacyItems.map((item: PrivacyItem, i: number) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={S.privacyCard}>
                <div style={{ fontSize: "1.6rem", marginBottom: 14 }}>{item.icon}</div>
                <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: "0.9rem", color: palette.textMuted, lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    );
}