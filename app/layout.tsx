import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://site.myclinica.online"),
  title: "MyClínica — Sistema de Gestão para Clínicas",
  description: "Prontuário eletrônico, agenda, financeiro e CRM via WhatsApp com IA. 7 dias grátis, sem cartão.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "MyClínica — Sistema de Gestão para Clínicas",
    description: "Prontuário eletrônico, agenda, financeiro e CRM via WhatsApp com IA. 7 dias grátis, sem cartão.",
    type: "website",
    locale: "pt_BR",
    url: "https://site.myclinica.online",
    siteName: "MyClínica",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyClínica — Sistema de Gestão para Clínicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyClínica — Sistema de Gestão para Clínicas",
    description: "Prontuário eletrônico, agenda, financeiro e CRM via WhatsApp com IA.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
