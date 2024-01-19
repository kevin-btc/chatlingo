import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PolyfireProvider } from "polyfire-js/hooks";
import { SpeechProvider } from "./context/SpeechContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PolyfireProvider project={"test_50"}>
          <SpeechProvider>{children}</SpeechProvider>
        </PolyfireProvider>
      </body>
    </html>
  );
}
