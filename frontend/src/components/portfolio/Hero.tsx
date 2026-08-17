import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, FolderGit2 } from "lucide-react";
import portrait from "@/assets/portrait.jpeg";
import { RESUME_URL } from "@/lib/portfolio-data";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import { Particles } from "./Particles";
import resumeFile from '../../assets/Saurabh_Maurya.pdf';

export function Hero() {
  const { heroStats, highlights } = usePortfolioData();

  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40">
      <Particles />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #2563eb 0%, #7c3aed 50%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          {/* Left Hero Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/30 px-3.5 py-1.5 text-xs backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
              <span className="font-semibold text-emerald-400">Available</span>
              <span className="text-slate-400">for full-time roles · Open to relocation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]"
            >
              Saurabh <br />
              <span className="bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                Maurya
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 font-display text-lg font-medium text-slate-200 sm:text-xl"
            >
              AI Engineer · Full-Stack Developer · Data Analyst
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              Building AI-powered applications, data-driven solutions, and modern web
              experiences. Passionate about solving real-world problems with Machine
              Learning and scalable engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-blue-500/35"
              >
                <FolderGit2 className="h-4 w-4" />
                View Projects
              </a>
              <a
                href={resumeFile}
                download="Saurabh_Maurya_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-800/80 hover:border-slate-600"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-800/80 hover:border-slate-600"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-3 text-xs sm:text-sm"
            >
              {highlights.map((h) => (
                <div key={h} className="inline-flex items-center gap-2 text-slate-300">
                  <span className="font-bold text-sky-400">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Hero Portrait with Neon Gradient Border & Blue Backlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px]"
          >
            {/* Outer Ambient Glow */}
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] opacity-40 blur-2xl transition-opacity"
              style={{
                background:
                  "radial-gradient(circle at 75% 35%, rgba(37, 99, 235, 0.6) 0%, rgba(124, 58, 237, 0.35) 50%, transparent 80%)",
              }}
            />

            {/* Neon Gradient Border Card */}
            <div className="relative overflow-hidden rounded-[2rem] p-[1.5px] bg-gradient-to-tr from-[#38bdf8] via-[#6366f1] to-[#c084fc] shadow-[0_0_35px_-5px_rgba(59,130,246,0.3)]">
              <div className="relative aspect-[4/5.1] w-full overflow-hidden rounded-[calc(2rem-1.5px)] bg-[#070b18]">
                {/* Portrait Photo */}
                <img
                  src={portrait}
                  alt="Saurabh Maurya — AI Engineer and Full-Stack Developer"
                  className="h-full w-full object-cover object-top"
                  loading="eager"
                />

                {/* Electric Blue Studio Backlight Overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-screen opacity-95"
                  style={{
                    background:
                      "radial-gradient(circle at 82% 34%, rgba(37, 99, 235, 0.9) 0%, rgba(59, 130, 246, 0.55) 30%, rgba(99, 102, 241, 0.25) 55%, transparent 75%)",
                  }}
                />

                {/* Subtle Left Rim Highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle at 12% 75%, rgba(147, 51, 234, 0.35) 0%, transparent 50%)",
                  }}
                />

                {/* Bottom Shadow Fade */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070b18]/80 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
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
