import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export function Shell({
  preview,
  children,
  variant = "primary",
}: {
  preview: string;
  children: React.ReactNode;
  variant?: "primary" | "urgent";
}) {
  const headerBg =
    variant === "urgent"
      ? "linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)"
      : "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)";

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body
          style={{
            backgroundColor: "#f1f5f9",
            fontFamily: "Arial, sans-serif",
            color: "#0f172a",
            margin: 0,
            padding: "24px 0",
          }}
        >
          <Container
            style={{
              maxWidth: 600,
              margin: "0 auto",
              backgroundColor: "#ffffff",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(15,23,42,0.08)",
            }}
          >
            <Section
              style={{
                background: headerBg,
                padding: "32px 24px",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              {React.Children.toArray(children).find((c) => {
                if (!React.isValidElement(c)) return false;
                return (c as React.ReactElement).type === ShellHeader;
              })}
            </Section>
            <Section style={{ padding: "32px 24px" }}>
              {React.Children.toArray(children).filter((c) => {
                if (!React.isValidElement(c)) return true;
                return (c as React.ReactElement).type !== ShellHeader;
              })}
            </Section>
            <Section
              style={{
                padding: "16px 24px",
                textAlign: "center",
                color: "#64748b",
                fontSize: 12,
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <Text style={{ margin: 0 }}>
                S Connect France — Électricité, Contrôle d&apos;accès &amp; Serrurerie
              </Text>
              <Text style={{ margin: 0 }}>Île-de-France · Intervention 24h/24</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export function ShellHeader({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h1" style={{ margin: 0, fontSize: 22, lineHeight: "28px" }}>
      {children}
    </Heading>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Section style={{ marginBottom: 12 }}>
      <Text
        style={{
          margin: "0 0 4px 0",
          fontSize: 12,
          fontWeight: 700,
          color: "#475569",
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </Text>
      <Text style={{ margin: 0, fontSize: 14, color: "#0f172a" }}>{children}</Text>
    </Section>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading
      as="h2"
      style={{
        margin: "24px 0 12px 0",
        fontSize: 16,
        color: "#1e3a8a",
        borderBottom: "2px solid #3b82f6",
        paddingBottom: 4,
      }}
    >
      {children}
    </Heading>
  );
}

export function Callout({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "warning" | "danger" | "success";
}) {
  const palette = {
    info: { bg: "#eff6ff", border: "#3b82f6", color: "#1e3a8a" },
    warning: { bg: "#fef3c7", border: "#f59e0b", color: "#92400e" },
    danger: { bg: "#fee2e2", border: "#dc2626", color: "#991b1b" },
    success: { bg: "#dcfce7", border: "#16a34a", color: "#166534" },
  }[tone];

  return (
    <Section
      style={{
        backgroundColor: palette.bg,
        borderLeft: `4px solid ${palette.border}`,
        padding: 16,
        borderRadius: 6,
        margin: "16px 0",
        color: palette.color,
      }}
    >
      <Text style={{ margin: 0, fontSize: 14 }}>{children}</Text>
    </Section>
  );
}
