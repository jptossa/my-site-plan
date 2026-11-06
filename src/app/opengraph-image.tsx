import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const alt = `${SITE.name}: ${SITE.tagline}`;
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
          alignItems: "center",
          justifyContent: "space-between",
          background: "#1B2A16",
          color: "#F7F0DA",
          padding: "0 96px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 112, lineHeight: 1, fontFamily: "Georgia, serif" }}>{SITE.name}</div>
          <div style={{ fontSize: 38, marginTop: 28, color: "#CDD6B4" }}>{SITE.tagline}</div>
        </div>
        <svg width="380" height="380" viewBox="0 0 120 120">
          <g fill="none" stroke="#F7F0DA" strokeWidth="5" strokeLinecap="round">
            <path d="M96 92L96 44" />
            <ellipse cx="96" cy="34" rx="9" ry="12" fill="#2B3F24" />
          </g>
          <path d="M60 22c28 0 44 19 44 46 0 26-17 42-44 42S16 94 16 68c0-27 16-46 44-46z" fill="#F4B24A" stroke="#1B2A16" strokeWidth="4" />
          <path d="M38 26c-5-10 4-18 13-14 3-7 15-7 18 0 9-4 18 4 13 14-13-6-31-6-44 0z" fill="#F7F0DA" stroke="#1B2A16" strokeWidth="4" strokeLinejoin="round" />
          <g fill="#1B2A16">
            <circle cx="46" cy="62" r="6" />
            <circle cx="74" cy="62" r="6" />
          </g>
          <path d="M30 76a7 5 0 0 0 12 2M78 78a7 5 0 0 0 12-2" fill="none" stroke="#C8641F" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 78q10 10 20 0" fill="none" stroke="#1B2A16" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
