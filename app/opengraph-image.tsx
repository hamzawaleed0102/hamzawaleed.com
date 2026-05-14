import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, #2b2418 0%, #1c1610 55%, #14100b 100%)",
          color: "#f0e3c6",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#1c1610",
              border: "1px solid rgba(240, 227, 198, 0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontStyle: "italic",
              fontSize: "34px",
              color: "#f0e3c6",
              position: "relative",
            }}
          >
            h
            <span
              style={{
                position: "absolute",
                right: "10px",
                bottom: "14px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#e8814f",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "26px",
              color: "#a08c6c",
              fontFamily: "ui-monospace, Menlo, monospace",
              letterSpacing: "0.04em",
            }}
          >
            hamzawaleed.com
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              fontSize: "108px",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              color: "#f0e3c6",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Hamza Waleed
            <span style={{ color: "#e8814f" }}>.</span>
          </div>
          <div
            style={{
              fontSize: "36px",
              lineHeight: 1.25,
              color: "#d0bf9b",
              maxWidth: "900px",
              fontStyle: "italic",
            }}
          >
            {site.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: "22px",
            color: "#a08c6c",
            borderTop: "1px solid rgba(240, 227, 198, 0.16)",
            paddingTop: "24px",
          }}
        >
          <span>Principal Software Engineer</span>
          <span>writing · products · portfolio</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
