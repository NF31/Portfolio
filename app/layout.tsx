import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "./contexts/ThemeContext";
import StructuredData from "./components/StructuredData";
import CanonicalLink from "./components/CanonicalLink";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "NFDev21 - Développeur Fullstack Laravel & Next.js | Portfolio",
    template: "%s | NFDev21"
  },
  description: "Développeur web fullstack spécialisé en Laravel, Next.js et React. Création de sites web modernes, applications web performantes et solutions digitales sur mesure. Basé à Paris, disponible en France.",
  keywords: ["développeur fullstack", "Laravel", "Next.js", "React", "développeur web", "Paris", "France", "portfolio", "TypeScript", "MongoDB", "développement web", "création site web"],
  authors: [{ name: "NFDev21" }],
  creator: "NFDev21",
  publisher: "NFDev21",
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
  verification: {
    google: "votre-code-google-search-console",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <StructuredData />
        <CanonicalLink />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
          <Toaster 
            position="top-right"
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
