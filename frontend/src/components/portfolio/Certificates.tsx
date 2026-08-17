import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { certificates } from "@/lib/portfolio-data";
import { Section } from "./Section";
import { ImageLightboxModal } from "./ImageLightboxModal";

export function Certificates() {
  const [open, setOpen] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setOpen((prev) => (prev !== null ? (prev === 0 ? certificates.length - 1 : prev - 1) : null));
  }, []);

  const handleNext = useCallback(() => {
    setOpen((prev) => (prev !== null ? (prev === certificates.length - 1 ? 0 : prev + 1) : null));
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const current = open !== null ? certificates[open] : null;

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

      <ImageLightboxModal
        isOpen={open !== null && current !== null}
        onClose={handleClose}
        title={current?.title || ""}
        image={current?.image || ""}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={open !== null ? open : undefined}
        totalCount={certificates.length}
      />
    </Section>
  );
}
