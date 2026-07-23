import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const META_PIXEL_ID = "1585607579973708";
const GA4_MEASUREMENT_ID = "G-4Z212ZY2NG";

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

export const viewport = {
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://site.myclinica.online"),
  title: "MyClínica — Sistema de Gestão para Clínicas",
  description: "Prontuário eletrônico, agenda, financeiro e CRM via WhatsApp com IA. 7 dias grátis, sem cartão.",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
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
      <body>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
