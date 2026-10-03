import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Pathloom public progress profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return new ImageResponse(<div style={{ background: "#fbfbfd", color: "#1d1d1f", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "72px", width: "100%" }}><div style={{ color: "#0071e3", display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>PATHLOOM</div><div style={{ display: "flex", flexDirection: "column", gap: 20 }}><div style={{ color: "#6e6e73", display: "flex", fontSize: 28 }}>Public progress path</div><div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -4 }}>{`@${username}`}</div><div style={{ color: "#6e6e73", display: "flex", fontSize: 28 }}>A small, honest view of what comes next.</div></div><div style={{ color: "#6e6e73", display: "flex", fontSize: 22 }}>pathloom · career progress that moves with your work</div></div>, { ...size });
}
