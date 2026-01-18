import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Value Calculator",
  description: "Calculate 1% above and 2% below",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
