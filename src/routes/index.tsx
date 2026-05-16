import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  FileText,
  Mail,
  Play,
  Send,
  Linkedin,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { SidebarNav, MobileTopBar } from "@/components/SidebarNav";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  profile,
  expertise,
  experience,
  education,
  projects,
  stack,
  heroTechs,
  type Project,
} from "@/lib/portfolio-data";
import { ProjectGenerativeCard } from "@/components/ProjectGenerativeCard";
const nahuelPhoto = "/nahuel.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.title}` },
      {
        name: "description",
        content:
          "Portafolio de Nahuel: Analista de Sistemas y Desarrollador Backend en Buenos Aires. Java, Spring, bases de datos, Docker e integración de IA.",
      },
      { property: "og:title", content: `${profile.name} — ${profile.title}` },
      { property: "og:description", content: profile.intro },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

/* ───────────────── helpers ───────────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ index, kicker, title }: { index: string; kicker: string; title: string }) {
  return (
    <Reveal className="flex items-baseline justify-between mb-12">
      <div>
        <span className="font-mono text-xs text-primary mb-1 block uppercase tracking-widest">
          {index} · {kicker}
        </span>
        <h3 className="text-3xl font-serif font-bold">{title}</h3>
      </div>
    </Reveal>
  );
}

/* ───────────────── hero with rotating tech bg ───────────────── */

function HeroBackdrop({ idx }: { idx: number }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.08]);

  if (!heroTechs.length) return null;

  return (
    <motion.div
      style={{ opacity, scale }}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* layer 1: background images (crossfade) */}
      <AnimatePresence initial={false}>
        <motion.img
          key={idx}
          src={heroTechs[idx].bgImage}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* layer 2: dark overlay for readability */}
      <div className="absolute inset-0 bg-black/45 dark:bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black " />

      <div className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-widest text-white/70">
        bg · {heroTechs[idx].name}
      </div>
    </motion.div>
  );
}

/* ───────────────── project sheet (slides from right) ───────────────── */

const PIE_COLORS = [
  "oklch(0.65 0.15 250)", // Vibrant Blue
  "oklch(0.70 0.20 330)", // Vibrant Pink/Purple
  "oklch(0.75 0.18 150)", // Vibrant Emerald/Green
  "oklch(0.80 0.15 80)",  // Vibrant Gold/Yellow
  "oklch(0.60 0.20 30)",  // Vibrant Coral/Orange
];

function ProjectSheet({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  if (!project) return null;
  const d = project.details;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-[85vw] sm:max-w-2xl overflow-y-auto p-0 border-l border-border"
        >

          <div className="px-8 pt-8 pb-6 border-b border-border bg-paper sticky top-0 z-10">
            <SheetHeader className="text-left space-y-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                {project.ref}
              </span>
              <SheetTitle className="font-serif text-2xl leading-tight">{project.title}</SheetTitle>
              <SheetDescription className="text-base text-muted-foreground leading-relaxed">
                {project.body}
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="px-8 py-8 space-y-10">
            {d?.problem && (
              <Block title="Propósito">
                <p className="text-sm leading-relaxed text-muted-foreground">{d.problem}</p>
              </Block>
            )}

            {d?.useCases?.length ? (
              <Block title="Casos de uso principales">
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                  {d.useCases.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </Block>
            ) : null}

            {d?.metrics?.length ? (
              <Block title="Métricas">
                <div className="grid grid-cols-3 gap-px bg-border border border-border">
                  {d.metrics.map((m) => (
                    <div key={m.label} className="bg-background p-4">
                      <div className="font-serif text-2xl font-bold">{m.value}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Block>
            ) : null}

            {d?.dashboards?.length ? (
              <Block title="Dashboard del modelo">
                <div className="grid sm:grid-cols-2 gap-4">
                  {d.dashboards.map((dash) => (
                    <PieCard key={dash.title} dashboard={dash} />
                  ))}
                </div>
              </Block>
            ) : null}

            {d?.images?.length ? (
              <Block title="Galería">
                <div className="grid sm:grid-cols-2 gap-3">
                  {d.images.map((img) => (
                    <button
                      type="button"
                      key={img.src}
                      onClick={() => setLightbox(img)}
                      className="group relative overflow-hidden border border-border bg-muted"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-widest text-background bg-foreground/80 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition">
                        Ampliar
                      </span>
                    </button>
                  ))}
                </div>
              </Block>
            ) : null}

            {d?.videoUrl && (
              <Block title="Video">
                <div className="aspect-video w-full bg-muted border border-border">
                  {/youtube|youtu\.be/.test(d.videoUrl) ? (
                    <iframe
                      src={d.videoUrl}
                      title={`Video ${project.title}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <video src={d.videoUrl} controls className="w-full h-full" />
                  )}
                </div>
              </Block>
            )}

            {d?.links?.length ? (
              <Block title="Enlaces">
                <div className="flex flex-wrap gap-2">
                  {d.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border font-mono text-xs hover:bg-muted transition"
                    >
                      {l.label} <ExternalLink className="size-3" />
                    </a>
                  ))}
                </div>
              </Block>
            ) : null}
          </div>
      </SheetContent>
      </Sheet>

      <Dialog open={!!lightbox} onOpenChange={(v) => !v && setLightbox(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-5xl p-0 bg-transparent border-0 shadow-none">
          {lightbox && (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-sm"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function PieCard({
  dashboard,
}: {
  dashboard: { title: string; subtitle?: string; data: { name: string; value: number }[] };
}) {
  return (
    <div className="border border-border bg-background p-4 space-y-2">
      <div>
        <h6 className="font-serif font-bold text-sm">{dashboard.title}</h6>
        {dashboard.subtitle && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {dashboard.subtitle}
          </p>
        )}
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dashboard.data}
              dataKey="value"
              nameKey="name"
              innerRadius={36}
              outerRadius={64}
              paddingAngle={2}
              stroke="var(--background)"
              strokeWidth={2}
            >
              {dashboard.data.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--popover-foreground)",
              }}
              itemStyle={{ color: "var(--popover-foreground)" }}
            />
            <Legend 
              iconSize={8} 
              wrapperStyle={{ 
                fontFamily: "var(--font-mono)", 
                fontSize: 10,
                color: "var(--foreground)",
                paddingTop: "12px"
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h5 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {title}
      </h5>
      {children}
    </section>
  );
}

/* ───────────────── contact form + mini calendar ───────────────── */

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [meetingDate, setMeetingDate] = useState<Date | undefined>(undefined);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Contacto desde portafolio — ${name || "sin nombre"}`;
    const dateLine = meetingDate
      ? `\n\nReunión propuesta: ${format(meetingDate, "EEEE d 'de' MMMM yyyy", { locale: es })}`
      : "";
    const body = `Hola Nahuel,\n\n${message}${dateLine}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            Nombre
          </Label>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="rounded-none border-border bg-background"
          />
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vos@correo.com"
            className="rounded-none border-border bg-background"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="message"
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
        >
          Mensaje
        </Label>
        <Textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Contame brevemente sobre el proyecto…"
          className="rounded-none border-border bg-background resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border font-mono text-[11px] uppercase tracking-widest hover:bg-muted transition-all",
                meetingDate && "text-primary border-primary/50",
              )}
            >
              <CalendarDays className="size-3.5" />
              {meetingDate
                ? format(meetingDate, "d MMM yyyy", { locale: es })
                : "Agendar reunión (opcional)"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              locale={es}
              selected={meetingDate}
              onSelect={setMeetingDate}
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:brightness-110 transition-all"
        >
          <Send className="size-3.5" /> {sent ? "Reenviar" : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

/* ───────────────── page ───────────────── */

// const TECH_FILTERS = ["Spring Boot", "Java", "JPA", "MySQL", "Docker", "React", "Python", "IA"];

function projectHaystack(p: Project) {
  return [p.title, p.body, p.ref, ...p.rows.flatMap(([k, v]) => [k, v])].join(" ").toLowerCase();
}

function Index() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [techIdx, setTechIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [activeTechs, setActiveTechs] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const hay = projectHaystack(p);
      if (q && !hay.includes(q)) return false;
      if (activeTechs.length && !activeTechs.every((t) => hay.includes(t.toLowerCase())))
        return false;
      return true;
    });
  }, [query, activeTechs]);

  const toggleTech = (t: string) =>
    setActiveTechs((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  // auto-rotate hero bg every 6s
  useEffect(() => {
    if (heroTechs.length <= 1) return;
    const t = setInterval(() => setTechIdx((i) => (i + 1) % heroTechs.length), 5000);
    return () => clearInterval(t);
  }, []);

  const heroTags = useMemo(() => heroTechs.map((t) => t.name), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />
      <MobileTopBar />

      {/* ── Hero (full-bleed) ── */}
      <section
        id="hero"
        className="relative w-full min-h-[92vh] overflow-hidden flex flex-col justify-center lg:pl-64"
      >
        <HeroBackdrop idx={techIdx} />

        <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 lg:px-24 py-20">
          <Reveal>
            <header className="mb-10">
              <span className="font-mono text-xs text-white/80 mb-3 block uppercase tracking-widest">
                Portafolio · TISERA NAHUEL
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-balance leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
                Desarrollador <i className="font-normal">backend</i> Analista de Sistemas
              </h2>
            </header>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center mt-6">
              <motion.img
                src={nahuelPhoto}
                alt={`Retrato de ${profile.name}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="size-44 md:size-56 lg:size-64 rounded-sm object-cover border border-white/20 shadow-2xl"
              />
              <div className="space-y-5">
                <p className="text-lg text-white/90 text-pretty max-w-[52ch] leading-relaxed">
                  {profile.intro}
                </p>
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/70 space-y-1">
                  <p>{profile.location}</p>
                  {/* <p className="text-white/90">{profile.title}</p> */}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-2">
              {heroTags.map((t, i) => {
                const active = i === techIdx;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTechIdx(i)}
                    className={cn(
                      "px-2.5 py-1 border text-[10px] font-mono uppercase tracking-wider transition-all backdrop-blur",
                      active
                        ? "bg-white text-black border-white"
                        : "bg-black/30 text-white/80 border-white/30 hover:border-white hover:text-white",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <main className="lg:ml-64 px-6 md:px-12 lg:px-24 py-16 lg:py-20 max-w-5xl">
        {/* ── Services ── */}
        <section id="expertise" className="py-28 border-t border-border">
          <SectionHeader index="01" kicker="Qué hago" title="Especialidades" />
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {expertise.map((s, i) => (
              <Reveal key={s.code} delay={i * 0.05}>
                <div className="bg-background p-8 space-y-3 hover:bg-muted/40 transition-colors h-full">
                  <span className="font-mono text-xs text-muted-foreground">{s.code}</span>
                  <h4 className="text-xl font-serif font-bold">{s.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="py-28 border-t border-border">
          <SectionHeader index="02" kicker="Trayectoria" title="Experiencia" />

          <div className="space-y-12">
            {experience.map((e) => (
              <Reveal key={e.role}>
                <div className="grid md:grid-cols-[1fr_280px] gap-8 items-start">
                  <div
                    className={`relative pl-8 border-l ${e.primary ? "border-primary/40" : "border-border"}`}
                  >
                    <div
                      className={`absolute -left-[5px] top-2 size-2.5 ${e.primary ? "bg-primary" : "bg-border"}`}
                    />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1">
                      <h4 className="font-serif font-bold text-xl">{e.role}</h4>
                      <span className="font-mono text-xs text-muted-foreground italic">
                        {e.range}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-primary mb-4">{e.org}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.body}</p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase text-muted-foreground">
                      {e.stack.map((s) => (
                        <span key={s}>· {s}</span>
                      ))}
                    </div>
                  </div>
                  {e.image && (
                    <motion.figure
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="border border-border bg-muted overflow-hidden"
                    >
                      <img
                src={e.image}
                        alt={e.imageAlt ?? e.org}
                        loading="lazy"
                        className="w-full h-44 md:h-full object-cover"
                      />
                      <figcaption className="px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border bg-background">
                        {e.imageAlt ?? e.org}
                      </figcaption>
                    </motion.figure>
                  )}
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="pt-8 mt-8 border-t border-border">
                <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest mb-6 block">
                  Formación
                </span>
                <div className="space-y-6">
                  {education.map((ed) => (
                    <div
                      key={ed.title}
                      className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1"
                    >
                      <div>
                        <h5 className="font-serif font-bold">{ed.title}</h5>
                        <p className="text-sm text-muted-foreground">{ed.org}</p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground italic">
                        {ed.range}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="py-28 border-t border-border">
          <SectionHeader index="03" kicker="Laboratorio" title="Proyectos" />

          {/* Search + filters */}
          <Reveal>
            <div className="mb-10 space-y-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por título, descripción, stack o patrón…"
                className="h-11 font-mono text-xs"
                aria-label="Buscar proyectos"
              />
              {/* <div className="flex flex-wrap gap-1.5">
                {TECH_FILTERS.map((t) => {
                  const active = activeTechs.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleTech(t)}
                      className={cn(
                        "px-2.5 py-1 border rounded-sm text-[11px] font-mono transition-all",
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
                {(activeTechs.length > 0 || query) && (
                  <button
                    onClick={() => {
                      setActiveTechs([]);
                      setQuery("");
                    }}
                    className="px-2.5 py-1 text-[11px] font-mono text-muted-foreground hover:text-primary transition"
                  >
                    Limpiar ✕
                  </button>
                )}
              </div> */}
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Mostrando {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, index) => (
                <ProjectGenerativeCard
                  key={p.ref + p.title}
                  project={p}
                  index={index}
                  onClick={() => setOpenProject(p)}
                />
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="border border-dashed border-border rounded-sm py-16 text-center space-y-2">
                <p className="font-serif text-lg">Sin resultados</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  Probá con otro término o quitá algún filtro.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Stack ── */}
        <section id="stack" className="py-28 border-t border-border">
          <SectionHeader index="04" kicker="Herramientas" title="Stack" />
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(stack).map(([group, items], gi) => (
              <Reveal key={group} delay={gi * 0.05}>
                <div className="space-y-3">
                  <h5 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {group}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((i) => (
                      <span key={i} className="px-2.5 py-1 border border-border text-xs font-mono">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-28 border-t border-border">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <span className="font-mono text-xs text-primary block uppercase tracking-[0.3em]">
                  Contacto
                </span>
                <h3 className="text-4xl md:text-5xl font-serif font-bold italic leading-tight">
                  ¿Construimos algo sólido?
                </h3>
                <p className="text-muted-foreground text-pretty">
                  Disponible para oportunidades backend y colaboración en proyectos
                </p>
              </div>

              <div className="border border-border bg-paper p-6 sm:p-8">
                <ContactForm />
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border font-mono text-[11px] uppercase tracking-widest hover:bg-muted transition-all"
                >
                  <Mail className="size-3.5" /> Enviame un mail
                </a>
                <a
                  href={profile.cvUrl}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border font-mono text-[11px] uppercase tracking-widest hover:bg-muted transition-all"
                >
                  <FileText className="size-3.5" /> Descargar CV
                </a>
                <a
                  href={profile.linkedin}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border font-mono text-[11px] uppercase tracking-widest hover:bg-muted transition-all"
                >
                  <Linkedin className="size-3.5" /> Conectemos por Linkedin
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="pt-16 pb-8 border-t border-border mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <p>
            © 2026 {profile.name} · {profile.shortRole}
          </p>
          <div className="flex gap-6">
            <a href={profile.github} className="hover:text-primary">
              GitHub
            </a>
            <a href={profile.linkedin} className="hover:text-primary">
              LinkedIn
            </a>
            <span>{profile.location}</span>
          </div>
        </footer>
      </main>

      <ProjectSheet
        project={openProject}
        open={!!openProject}
        onOpenChange={(v) => !v && setOpenProject(null)}
      />
    </div>
  );
}
