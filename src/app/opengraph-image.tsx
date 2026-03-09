import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ABUD Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #050508 0%, #0d0a1a 50%, #050508 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(147,51,234,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "linear-gradient(135deg, #1a0a2e, #0d0d1a)",
            border: "2px solid rgba(147,51,234,0.5)",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: "#c084fc",
              lineHeight: 1,
            }}
          >
            A
          </span>
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#f8f8ff",
            margin: "0 0 16px 0",
            letterSpacing: -2,
          }}
        >
          ABUD Platform
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#a0a0b8",
            margin: 0,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          صانع تقني • باني حلول رقمية • بعقلية سيبرانية
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          {["منتجات رقمية", "ذكاء اصطناعي", "تطوير مواقع", "فريلانس"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                background: "rgba(147,51,234,0.15)",
                border: "1px solid rgba(147,51,234,0.3)",
                color: "#c084fc",
                fontSize: 18,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "#3a3a5c",
            fontSize: 18,
          }}
        >
          abud.fun
        </div>
      </div>
    ),
    { ...size }
  );
}
