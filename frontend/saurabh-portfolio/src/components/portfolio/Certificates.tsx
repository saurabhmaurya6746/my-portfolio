import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { certificates } from "@/lib/portfolio-data";
import { Section } from "./Section";

export function Certificates() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section
      id="certificates"
      eyebrow="Certifications"
      title={<span className="text-gradient">Verified credentials.</span>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certificates.map((c, i) => (
          <motion.button
            key={c.title}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group overflow-hidden rounded-2xl glass p-2 text-left transition-all hover:-translate-y-1 hover:glass-strong"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-background">
              <img
                src={c.image}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="px-2 py-3 text-sm font-medium">{c.title}</div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg glass-strong"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              key={certificates[open].image}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={certificates[open].image}
              alt={certificates[open].title}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
