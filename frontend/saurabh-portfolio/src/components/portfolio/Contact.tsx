import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Download, Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { contact, RESUME_URL } from "@/lib/portfolio-data";
import { Section } from "./Section";
import resumeFile from '../../assets/Saurabh_Maurya.pdf';

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="grid h-8 w-8 place-items-center rounded-lg border border-border transition-colors hover:bg-white/5"
      aria-label="Copy"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = async (e: FormEvent) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/contact/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    console.log(data);

    setSent(true);

    setForm({
      name: "",
      email: "",
      message: "",
    });

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<span className="text-gradient">Let's build something.</span>}
      description="Open to AI Engineer, Full-Stack, and Data roles. The fastest way to reach me is email."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {[
            { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
            { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
            { icon: Linkedin, label: "LinkedIn", value: "saurabh-maurya-2805m", href: contact.linkedin },
            { icon: Github, label: "GitHub", value: "saurabhmaurya6746", href: contact.github },
          ].map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between rounded-2xl glass p-4"
            >
              <a href={c.href} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="truncate font-medium">{c.value}</div>
                </div>
              </a>
              <CopyButton value={c.value} />
            </motion.div>
          ))}

          <a
            href={resumeFile}
            download="Saurabh_Maurya_Resume.pdf"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] glow-primary"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass-strong p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Name</span>
              <input
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Email</span>
              <input
                required
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Message</span>
            <textarea
              required
              maxLength={1000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Tell me about the role or project…"
            />
          </label>
          <button
  type="submit"
  disabled={loading}
  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
>
  <Send className="h-4 w-4" />

  {loading
    ? "Sending..."
    : sent
    ? "Message Sent ✓"
    : "Send Message"}
</button>
        </motion.form>
      </div>
    </Section>
  );
}
