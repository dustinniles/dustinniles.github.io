import type { Metadata } from "next";
import "./globals.css";
import MenuSlider from "@/components/MenuSlider";

export const metadata: Metadata = {
  title: "Dustin Niles",
  description: "Personal website and portfolio of Dustin Niles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="form-action 'none'" />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen">
          <MenuSlider />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
