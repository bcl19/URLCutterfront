import { Link2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Recursos", href: "#features" },
  { label: "Preços", href: "#pricing" },
  { label: "Sobre", href: "#about" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-lime-400/30 bg-lime-400/10 text-lime-400 transition-colors group-hover:bg-lime-400/20">
            <Link2 className="size-4" aria-hidden />
          </span>
          <div className="text-left leading-tight">
            <p className="text-sm font-semibold tracking-tight text-white">
              URL Cutter
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500">
              Simplifier
            </p>
          </div>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            className="text-stone-300 hover:bg-white/5 hover:text-white"
          >
            Entrar
          </Button>
          <Button className="bg-lime-400 text-stone-950 hover:bg-lime-300">
            Encurtar URL
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md border border-white/10 text-stone-300 transition-colors hover:bg-white/5 hover:text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="size-4" aria-hidden />
          ) : (
            <Menu className="size-4" aria-hidden />
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-white/8 bg-[#0a0a0b] md:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Navegação mobile"
          className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm text-stone-300 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/8 pt-4">
            <Button
              variant="outline"
              className="w-full border-white/15 bg-transparent text-stone-200 hover:bg-white/5"
            >
              Entrar
            </Button>
            <Button className="w-full bg-lime-400 text-stone-950 hover:bg-lime-300">
              Encurtar URL
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
