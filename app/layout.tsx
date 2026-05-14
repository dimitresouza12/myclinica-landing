import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Clínica — Sistema de Gestão para Clínicas",
  description: "Prontuário eletrônico, agendamento, financeiro, CRM e muito mais. Tudo em um só lugar para a sua clínica.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "My Clínica",
    description: "Sistema completo de gestão para clínicas e consultórios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
