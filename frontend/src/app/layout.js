import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MemeRunner - Cyberpunk Memecoin Tracker",
  description: "Track and bet on the virality of memecoins in a cyberpunk-themed world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-cyberpunkBlack text-cyberpunkYellow font-cyberpunk`}>
        {children}
      </body>
    </html>
  );
}
