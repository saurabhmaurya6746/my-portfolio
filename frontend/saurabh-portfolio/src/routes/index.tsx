import { createFileRoute } from "@tanstack/react-router";
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

const TITLE = "Saurabh Maurya — AI Engineer, Full-Stack Developer & Data Analyst";
const DESCRIPTION =
  "Portfolio of Saurabh Maurya — AI Engineer, Full-Stack Developer and Data Analyst. GATE 2025 & 2026 qualified, TCS offer, 10+ shipped projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Saurabh Maurya",
          jobTitle: "AI Engineer, Full-Stack Developer, Data Analyst",
          email: "saurabhmauryajnp28@gmail.com",
          url: "/",
          sameAs: [
            "https://github.com/saurabhmaurya6746",
            "https://www.linkedin.com/in/saurabh-maurya-2805m/",
            "https://leetcode.com/u/Saurabh_Maurya_67/",
            "https://www.geeksforgeeks.org/profile/saurabhmaurpx2",
          ],
          alumniOf: "Dr. A.P.J. Abdul Kalam Technical University",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
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
