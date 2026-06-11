import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Metrics } from "@/components/portfolio/Metrics";
import { Achievements } from "@/components/portfolio/Achievements";
import { Experience } from "@/components/portfolio/Experience";
import { TechStack } from "@/components/portfolio/TechStack";
import { Projects } from "@/components/portfolio/Projects";
import { Education } from "@/components/portfolio/Education";
import { Certificates } from "@/components/portfolio/Certificates";
import { Profiles } from "@/components/portfolio/Profiles";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";


function App() {

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      <Navbar />

      <Hero />

      <About />

      <Metrics />

      <Achievements />

      <Experience />

      <TechStack />

      <Projects />

      <Education />

      <Certificates />

      <Profiles />

      <Contact />

      <Footer />

    </main>
  );
}

export default App;
