import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
      <body className="antialiased">
        <div className="flex">
          <Sidebar />
          <main className="ml-64 flex-1 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
