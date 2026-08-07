import { ArrowUpRight, Mail } from "lucide-react";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Recursos", href: "#features" },
  { label: "Preços", href: "#pricing" },
  { label: "Sobre", href: "#about" },
];

const socialLinks = [
  { label: "Email", href: "mailto:contatobernado14@gmail.com", icon: Mail },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0a0a0b] text-stone-300">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-8">
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime-400/90">
              URL Cutter / Simplifier
            </p>
            <h2 className="max-w-sm text-3xl font-medium leading-tight tracking-tight text-white">
              Encurtando ideias, uma URL por vez.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-stone-400">
              Ferramenta simples para transformar links longos em URLs curtas,
              rastreáveis e fáceis de compartilhar.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
              Navegar
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-stone-300 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
              Conectar
            </p>
            <ul className="space-y-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm text-stone-300 transition-colors hover:text-lime-400"
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} URL Cutter. Todos os direitos reservados.</p>
          <p className="font-mono tracking-wide">
            Feito com React + Tailwind · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
};
