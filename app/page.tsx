import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Specialties from './components/Specialties';
import Journey from './components/Journey';
import Preview from './components/Preview';
import Plans from './components/Plans';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyCta from './components/StickyCta';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Specialties />
        <Journey />
        <Preview />
        <Plans />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
