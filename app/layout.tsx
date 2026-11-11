import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider, THEME_INIT_SCRIPT } from "./contexts/ThemeContext";
import StructuredData from "./components/StructuredData";
import CanonicalLink from "./components/CanonicalLink";
import ScrollToTop from "./components/ScrollToTop";
import CustomHead from "./components/Head";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Jean Woto - Étudiant Numérique et Management, développeur full-stack",
    template: "%s | Jean Woto"
  },
  description: "Jean Woto, étudiant en double licence Numérique et Management à Toulouse Capitole et développeur web full-stack. Recherche un stage de mai à août 2027 puis une alternance en Master MIAGE.",
  keywords: ["stage", "alternance", "MIAGE", "Numérique et Management", "développeur fullstack", "Laravel", "Next.js", "React", "développeur web", "Toulouse", "France", "portfolio", "TypeScript", "MongoDB", "développement web", "création site web"],
  authors: [{ name: "Jean Woto" }],
  creator: "Jean Woto",
  publisher: "Jean Woto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Jean Woto - Étudiant Numérique et Management, développeur full-stack",
    description: "Jean Woto, étudiant en double licence Numérique et Management à Toulouse Capitole et développeur web full-stack. Recherche un stage de mai à août 2027 puis une alternance en Master MIAGE.",
    url: "https://www.nfdev.fr",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <meta name="description" content="Jean Woto, étudiant en double licence Numérique et Management à Toulouse Capitole et développeur web full-stack. Recherche un stage de mai à août 2027 puis une alternance en Master MIAGE." />
        <StructuredData />
        <CanonicalLink />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <CustomHead />
          {children}
          <ScrollToTop />
          <Toaster 
            position="top-right"
            richColors
            closeButton
          />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}