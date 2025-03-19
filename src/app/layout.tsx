"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getTitle = (pathname: string) => {
  if (pathname.startsWith("/editpage/")) {
    return "Edit UMKM - Admin Digmar";
  }

  switch (pathname) {
    case "/login":
      return "Login - Admin Digmar";
    case "/dashboard":
      return "Dashboard - Admin Digmar";
    case "/editekatalog":
      return "Edit E-Katalog - Admin Digmar";
    case "/catalog":
      return "Isi E-Katalog - Admin Digmar";
    case "/kontakPersonal":
      return "Kontak Personal - Admin Digmar";
    default:
      return "Admin Digmar";
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Ambil path halaman saat ini
  const title = getTitle(pathname); // Dapatkan title yang sesuai

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content="Sistem Admin Digmar" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
