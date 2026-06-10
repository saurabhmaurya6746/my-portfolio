import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import internship from "@/assets/internship.jpeg";
import { experience } from "@/lib/portfolio-data";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<span className="text-gradient">Where I've shipped.</span>}
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl glass-strong p-8"
        >
          <div className="absolute left-8 top-8 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Briefcase className="h-6 w-6" />
          </div>
          <div className="pl-16">
            <div className="text-xs uppercase tracking-wider text-primary">{experience.duration}</div>
            <h3 className="mt-1 font-display text-2xl font-semibold">{experience.role}</h3>
            <div className="mt-1 text-muted-foreground">{experience.company}</div>
            <ul className="mt-6 space-y-3">
              {experience.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        <motion.a
          href={internship}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl glass p-3 transition-all hover:scale-[1.01]"
        >
          <img
            src={internship}
            alt="Softpro India internship certificate"
            className="h-full w-full rounded-2xl object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-3 rounded-2xl bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-sm">
            <div className="font-medium">Internship Certificate</div>
            <div className="text-muted-foreground">Softpro India · Python with DS & ML</div>
          </div>
        </motion.a>
      </div>
    </Section>
  );
}
