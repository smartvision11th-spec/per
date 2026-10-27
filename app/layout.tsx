import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FF5500",
};

export const metadata: Metadata = {
  title: "Perfect Fitness Gym | Elite 24/7 Athletic Facility & Recovery Spa",
  description:
    "Experience state-of-the-art Olympic strength training, cryo-recovery, AI biometrics, and world-class athletic coaching. Open 24/7.",
  keywords: [
    "gym",
    "fitness",
    "athletic training",
    "24/7 gym",
    "cryotherapy",
    "personal trainer",
    "Olympic lifting",
    "recovery spa",
  ],
  authors: [{ name: "Perfect Fitness Gym" }],
  openGraph: {
    title: "Perfect Fitness Gym | Forge Your Peak Potential",
    description:
      "State-of-the-art training zones, cryogenic recovery, and bespoke coaching. Claim your 1-day guest pass.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-slate-100 antialiased selection:bg-brand-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
