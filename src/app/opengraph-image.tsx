import { ImageResponse } from "next/og";

export const alt = "PlacementSaathi - Placement Preparation for BTech CSE Students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f6f9ff 0%, #ffffff 45%, #ede9fe 100%)",
          padding: "72px 80px",
          color: "#0b1533",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "white",
              fontWeight: 700,
            }}
          >
            PS
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
            Placement<span style={{ color: "#2563eb" }}>Saathi</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.08 }}>
            Your Placement Journey Starts Here
          </div>
          <div style={{ fontSize: 32, color: "#4b5563" }}>DSA · Aptitude · Resume · Interviews · Company Guides</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6d28d9" }}>Free placement prep for BTech CSE students · placementsaathi.in</div>
      </div>
    ),
    size,
  );
}
