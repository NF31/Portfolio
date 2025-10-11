import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Mes Projets & Réalisations",
  description: "Découvrez mes projets et réalisations : applications web, sites e-commerce, SaaS. Portfolio de développeur fullstack Laravel & Next.js avec exemples concrets de projets réussis.",
  openGraph: {
    title: "Portfolio - Mes Projets & Réalisations | NFDev21",
    description: "Découvrez mes projets et réalisations : applications web, e-commerce, SaaS développés avec Laravel et Next.js.",
    url: "https://nfdev21.com/projets",
  },
};

export default function ProjectsLayout({
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

