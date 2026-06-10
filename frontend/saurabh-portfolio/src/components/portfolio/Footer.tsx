import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { contact } from "@/lib/portfolio-data";

const quick = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">SM</span>
              Saurabh Maurya
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              AI Engineer · Full-Stack Developer · Data Analyst. Building thoughtful
              products that ship.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Quick Links</div>
            <ul className="mt-3 space-y-2 text-sm">
              {quick.map((q) => (
                <li key={q.href}>
                  <a href={q.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {q.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Connect</div>
            <div className="mt-3 flex gap-2">
              <a href={`mailto:${contact.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-lg glass transition-colors hover:bg-white/10">
                <Mail className="h-4 w-4" />
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-lg glass transition-colors hover:bg-white/10">
                <Github className="h-4 w-4" />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg glass transition-colors hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Saurabh Maurya. Designed & developed by Saurabh Maurya.</div>
          <a href="#top" className="inline-flex items-center gap-1.5 rounded-lg glass px-3 py-1.5 transition-colors hover:bg-white/10">
            <ArrowUp className="h-3.5 w-3.5" /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
