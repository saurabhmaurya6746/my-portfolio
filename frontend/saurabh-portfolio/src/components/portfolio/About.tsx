import { motion } from "framer-motion";
import portrait from "@/assets/portrait.jpeg";
import { Section } from "./Section";

const facts = [
  { k: "Degree", v: "B.Tech CSE" },
  { k: "University", v: "Dr. APJ Abdul Kalam TU" },
  { k: "CGPA", v: "8.46" },
  { k: "GATE", v: "2025 & 2026 Qualified" },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<span className="text-gradient">Engineer with a builder's mindset.</span>}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-xs"
        >
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2rem] opacity-60 blur-2xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <img
            src={portrait}
            alt="Saurabh Maurya portrait"
            className="aspect-square w-full rounded-[1.5rem] object-cover glass-strong p-2"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          <p>
            I'm a B.Tech Computer Science & Engineering graduate from{" "}
            <span className="text-foreground">Dr. A.P.J. Abdul Kalam Technical University</span>{" "}
            with a CGPA of <span className="text-foreground">8.46</span>, and a qualifier of both{" "}
            <span className="text-foreground">GATE 2025</span> and{" "}
            <span className="text-foreground">GATE 2026</span>.
          </p>
          <p>
            I build at the intersection of <span className="text-foreground">Machine Learning</span>,{" "}
            <span className="text-foreground">Data Analytics</span>, and{" "}
            <span className="text-foreground">Full-Stack Development</span> — shipping
            AI-powered applications, internal tools, and production websites for real clients.
          </p>
          <p>
            Strong foundation in Data Structures & Algorithms, OOPs, Operating Systems and
            Computer Networks. I care deeply about clean systems, fast iteration, and
            measurable outcomes.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-4">
            {facts.map((f) => (
              <div key={f.k} className="rounded-xl glass p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{f.k}</div>
                <div className="mt-1 font-medium text-foreground">{f.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
