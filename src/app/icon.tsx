import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(147,51,234,0.4)",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 900,
            background: "linear-gradient(135deg, #c084fc, #9333ea)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-1px",
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
