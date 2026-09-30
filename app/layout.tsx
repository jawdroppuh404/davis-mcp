import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Davis Heating & Air MCP Server | South Jersey HVAC",
  description:
    "An experimental, read-only MCP endpoint for Davis Heating & Air service areas, published HVAC prices, service information, and booking links in South Jersey.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
