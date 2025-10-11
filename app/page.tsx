import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        {/* Les autres sections seront ajoutées ici */}
      </main>
    </div>
  );
}
