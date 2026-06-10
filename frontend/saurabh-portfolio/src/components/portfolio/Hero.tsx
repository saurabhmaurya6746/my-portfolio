import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, FolderGit2 } from "lucide-react";
import portrait from "@/assets/portrait.jpeg";
import { heroStats, RESUME_URL } from "@/lib/portfolio-data";
import { Particles } from "./Particles";
import resumeFile from '../../assets/Saurabh_Maurya.pdf';

const highlights = [
  "GATE 2025 & 2026 Qualified",
  "AIR 7409 · Score 503",
  "TCS Off-Campus Selection",
  "Data Science Intern @ Softpro India",
  "10+ Real-World Projects",
  "Hackathon Winner",
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40">
      <Particles />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.22 270 / 0.6), transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Available for full-time roles · Open to relocation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient">Saurabh</span>{" "}
              <span className="text-gradient-primary">Maurya</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-lg font-medium text-foreground/90"
            >
              AI Engineer · Full-Stack Developer · Data Analyst
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Building AI-powered applications, data-driven solutions, and modern web
              experiences. Passionate about solving real-world problems with Machine
              Learning and scalable engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] glow-primary"
              >
                <FolderGit2 className="h-4 w-4" />
                View Projects
              </a>
              <a
                href={resumeFile}
                download="Saurabh_Maurya_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl glass-strong px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-transparent px-6 py-3 text-sm font-semibold text-foreground/90 transition-colors hover:bg-white/5"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground"
            >
              {highlights.map((h) => (
                <span key={h} className="inline-flex items-center gap-1.5">
                  <span className="text-primary">✓</span> {h}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-2xl"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div className="relative overflow-hidden rounded-[2rem] glass-strong p-2 animate-float">
              <img
                src={portrait}
                alt="Saurabh Maurya — AI Engineer and Full-Stack Developer"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {heroStats.map((s) => (
            <div
              key={s.label}
              className="group rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:glass-strong"
            >
              <div className="font-display text-2xl font-semibold text-gradient-primary sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Scroll
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
