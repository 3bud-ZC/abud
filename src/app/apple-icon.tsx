import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid rgba(147,51,234,0.5)",
        }}
      >
        <span
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "#c084fc",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size }
  );
}
