import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X, Smartphone, Clock, Sparkles } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { Section } from "./Section";

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl glass p-0 text-left transition-all hover:-translate-y-1 hover:glass-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-surface to-background">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">
            <Sparkles className="h-10 w-10 opacity-40" />
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full glass-strong px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-primary">
            {p.status}
          </span>
          {p.responsive && (
            <span className="inline-flex items-center gap-1 rounded-full glass-strong px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
              <Smartphone className="h-3 w-3" /> Responsive
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md border border-border bg-white/5 px-2 py-0.5 text-xs">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-white/5"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Featured Work"
      title={<span className="text-gradient">Selected projects.</span>}
      description="A mix of shipped client work, AI experiments, and full-stack platforms."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} onOpen={() => setOpen(p)} />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl glass-strong"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-lg glass-strong"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              {open.image && (
                <img src={open.image} alt={open.title} className="aspect-[16/8] w-full object-cover" />
              )}
              <div className="p-6 sm:p-8">
                {open.highlight && (
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 px-3 py-1 text-xs text-primary">
                    <Sparkles className="h-3 w-3" /> {open.highlight}
                  </div>
                )}
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">{open.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {open.duration}</span>
                  <span>·</span>
                  <span>{open.status}</span>
                  {open.responsive && (<><span>·</span><span>Responsive</span></>)}
                </div>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">{open.longDescription}</p>

                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider text-primary">Technologies</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {open.tech.map((t) => (
                      <span key={t} className="rounded-md border border-border bg-white/5 px-2.5 py-1 text-xs">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary">Key Features</div>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      {open.features.map((f) => (
                        <li key={f} className="flex gap-2"><span className="text-primary">→</span>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary">Challenges Solved</div>
                    <p className="mt-2 text-sm text-muted-foreground">{open.challenges}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {open.github && (
                    <a href={open.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-white/5">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  )}
                  {open.demo && (
                    <a href={open.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
