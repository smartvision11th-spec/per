import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080A0D",
};

export const metadata: Metadata = {
  title: "Perfect Fitness Gym | Built Through Discipline",
  description:
    "Train with purpose. Build strength. Move beyond your limits. Premium strength training facility with cutting-edge equipment and expert coaching.",
  keywords: [
    "gym",
    "fitness",
    "strength training",
    "premium gym",
    "barbell",
    "personal trainer",
    "weight lifting",
  ],
  authors: [{ name: "Perfect Fitness Gym" }],
  openGraph: {
    title: "Perfect Fitness Gym | Built Through Discipline",
    description:
      "Train with purpose. Build strength. Move beyond your limits.",
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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-void antialiased">
        {children}
      </body>
    </html>
  );
}
