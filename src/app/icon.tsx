import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";

function IconSVG({ size }: { size: number }) {
  const radius = Math.round(size * 0.17);
  const fontSize = Math.round(size * 0.52);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `${Math.max(1, Math.round(size * 0.012))}px solid rgba(147,51,234,0.45)`,
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 900,
          color: "#c084fc",
          letterSpacing: "-1px",
          lineHeight: 1,
        }}
      >
        A
      </span>
    </div>
  );
}

export function generateImageMetadata() {
  return [
    { id: "32",  contentType, size: { width: 32,  height: 32  } },
    { id: "192", contentType, size: { width: 192, height: 192 } },
  ];
}

export default function Icon({ id }: { id: string }) {
  const px = id === "192" ? 192 : 32;
  return new ImageResponse(<IconSVG size={px} />, { width: px, height: px });
}
