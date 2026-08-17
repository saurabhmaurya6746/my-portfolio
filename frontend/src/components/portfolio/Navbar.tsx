import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { RESUME_URL } from "@/lib/portfolio-data";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6 ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 font-display text-base font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
              SM
            </span>
            <span className="hidden sm:inline">Saurabh Maurya</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              download
              className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 sm:inline-flex"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg glass md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-1 rounded-2xl glass-strong p-3 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={RESUME_URL}
              download
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
