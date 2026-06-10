import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { metrics } from "@/lib/portfolio-data";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.floor(v)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Metrics() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl glass-strong p-6 sm:p-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="text-center"
              >
                <div className="font-display text-3xl font-semibold text-gradient-primary sm:text-4xl">
                  <Counter to={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-2 text-xs text-muted-foreground sm:text-sm">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
