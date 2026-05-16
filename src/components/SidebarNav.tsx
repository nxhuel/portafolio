// Sidebar navigation and mobile top bar components
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { sections, profile } from "@/lib/portfolio-data";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

/** Detecta la sección activa por scroll real (más robusto que IO con bandas). */
function useActiveSection() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.35; // línea de detección
      let current: string = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - probe <= 0) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function SidebarNav() {
  const active = useActiveSection();
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  // Mover el indicador (línea + punto) a la posición del ítem activo.
  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const li = ul.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!li) return;
    const ulRect = ul.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    setIndicator({ top: liRect.top - ulRect.top, height: liRect.height });
  }, [active]);

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 border-r border-border p-8 hidden lg:flex flex-col justify-between z-50 bg-background/85 backdrop-blur-sm">
      {/* Top section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Portafolio
          </p>
          <h1 className="font-serif text-2xl font-bold tracking-tight">
            {profile.name}
          </h1>
        </div>
        <ul ref={listRef} className="relative space-y-3 font-mono text-xs uppercase tracking-tight">
          {/* Indicador animado */}
          <motion.span
            aria-hidden
            className="absolute -left-2 w-px bg-primary"
            animate={{ top: indicator.top, height: indicator.height }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          />
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} data-id={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`flex items-center gap-3 transition-colors ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  <span className="text-[10px] text-muted-foreground tabular-nums w-5">
                    {s.index}
                  </span>
                  <span>{s.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="active-dash"
                      className="ml-auto block h-px w-4 bg-primary"
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Bottom section */}
      <div>
        <div className="p-3 border border-border bg-paper rounded flex flex-col gap-1 mb-4">
          <span className="font-mono text-[9px] uppercase text-muted-foreground">
            Estado
          </span>
          <span className="flex items-center gap-2 text-[11px] font-mono">
            <span className="size-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
            Disponible para nuevos desafíos
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase text-muted-foreground">
            Tema
          </span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export function MobileTopBar() {
  const [navOpen, setNavOpen] = useState(false);
  const active = useActiveSection();
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  // Update indicator position for mobile drawer
  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const li = ul.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!li) return;
    const ulRect = ul.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    setIndicator({ top: liRect.top - ulRect.top, height: liRect.height });
  }, [active]);

  return (
    <>
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-6 h-14 border-b border-border bg-background/85 backdrop-blur-sm">
        <button
          onClick={() => setNavOpen(true)}
          className="inline-flex items-center justify-center p-2 border border-border"
        >
          <Menu className="size-5" />
        </button>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Portafolio
          </span>
          <h1 className="font-serif text-lg font-bold">{profile.name}</h1>
        </div>
        <ThemeToggle />
      </div>
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="space-y-4 p-8">
            <div className="space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Portafolio
              </p>
              <h1 className="font-serif text-2xl font-bold tracking-tight">
                {profile.name}
              </h1>
            </div>
            <ul ref={listRef} className="relative space-y-3 font-mono text-xs uppercase tracking-tight">
              <motion.span
                aria-hidden
                className="absolute -left-2 w-px bg-primary"
                animate={{ top: indicator.top, height: indicator.height }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              />
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id} data-id={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-center gap-3 transition-colors ${
                        isActive ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                    >
                      <span className="text-[10px] text-muted-foreground tabular-nums w-5">
                        {s.index}
                      </span>
                      <span>{s.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="active-dash"
                          className="ml-auto block h-px w-4 bg-primary"
                          transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            {/* Bottom section inside mobile drawer */}
            <div className="p-3 border border-border bg-paper rounded flex flex-col gap-1 mb-4">
              <span className="font-mono text-[9px] uppercase text-muted-foreground">
                Estado
              </span>
              <span className="flex items-center gap-2 text-[11px] font-mono">
                <span className="size-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
                Disponible para nuevos desafíos
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                Tema
              </span>
              <ThemeToggle />
            </div>
          </div>
          <SheetClose />
        </SheetContent>
      </Sheet>
    </>
  );
}
