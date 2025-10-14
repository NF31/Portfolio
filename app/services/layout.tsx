import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Services de Développement Web",
  description: "Services de développement web fullstack : création d'applications Next.js/React, développement backend Laravel, design UI/UX. Découvrez mes services sur mesure adaptés à vos besoins.",
  keywords: ["services développement web", "Next.js", "React", "Laravel", "développement fullstack", "création site web", "application web", "UI/UX design"],
  openGraph: {
    title: "Services de Développement Web | NFDev21",
    description: "Services de développement web fullstack : applications Next.js/React, backend Laravel, design UI/UX.",
    url: "https://nfdev21.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services de Développement Web | NFDev21",
    description: "Services de développement web fullstack : applications Next.js/React, backend Laravel, design UI/UX.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

