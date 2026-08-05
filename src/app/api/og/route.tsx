import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 } as const;

const CATEGORY_COLORS: Record<string, { from: string; to: string; accent: string }> = {
  Électricité: { from: "#2563eb", to: "#0ea5e9", accent: "#fbbf24" },
  "Contrôle d'accès": { from: "#f59e0b", to: "#d97706", accent: "#38bdf8" },
  Serrurerie: { from: "#059669", to: "#10b981", accent: "#fbbf24" },
  Métallerie: { from: "#ea580c", to: "#f97316", accent: "#38bdf8" },
  default: { from: "#2563eb", to: "#0ea5e9", accent: "#fbbf24" },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "S Connect France";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "website";
  const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.accent}33, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -250,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "70px 80px",
          }}
        >
          {/* Top: logo + category badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 16,
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.from,
                  fontSize: 42,
                  fontWeight: 900,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                }}
              >
                ⚡
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ color: "white", fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>
                  S Connect France
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, letterSpacing: 2 }}>
                  FRANCE
                </div>
              </div>
            </div>
            {category && (
              <div
                style={{
                  padding: "12px 24px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "white",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                {category}
              </div>
            )}
          </div>

          {/* Middle: title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              maxWidth: 1000,
            }}
          >
            {type === "article" && (
              <div
                style={{
                  color: colors.accent,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                Article
              </div>
            )}
            <div
              style={{
                color: "white",
                fontSize: title.length > 60 ? 58 : 72,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -1.5,
                display: "flex",
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom: footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 30,
              borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              Électricité • Contrôle d&apos;accès • Serrurerie • Métallerie
            </div>
            <div
              style={{
                color: colors.accent,
                fontSize: 20,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              sconnectfrance.fr
            </div>
          </div>
        </div>
      </div>
    ),
    SIZE,
  );
}
