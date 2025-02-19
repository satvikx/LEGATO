import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LEGATO 🎵",
  description: "The heartbeat of Music culture 💖",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Analytics/>
          <SpeedInsights/>
          <Header />
          <main className="container mx-auto lg:max-w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
