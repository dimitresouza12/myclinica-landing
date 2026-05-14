import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Preview from './components/Preview';
import Plans from './components/Plans';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Preview />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
