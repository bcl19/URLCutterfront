import {
  ArrowRight,
  BarChart3,
  Copy,
  Link2,
  Shield,
  Zap,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/hooks/useLoading";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Instantâneo",
    description:
      "Cole sua URL longa e receba um link curto em segundos — sem cadastro obrigatório.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Acompanhe cliques, origem e desempenho dos seus links em um painel simples.",
  },
  {
    icon: Shield,
    title: "Seguro",
    description:
      "Links verificados e protegidos. Você controla expiração e acesso quando quiser.",
  },
];

const stats = [
  { value: "2M+", label: "URLs encurtadas" },
  { value: "99.9%", label: "Uptime" },
  { value: "<1s", label: "Tempo médio" },
];

function shortenUrl(url: string) {
  const slug = Math.random().toString(36).slice(2, 8);
  const host = url.includes("://") ? new URL(url).hostname : "link";
  return `https://cut.${host.replace("www.", "")}/${slug}`;
}

export const Main = () => {
  const { runWithLoading } = useLoading();
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setCopied(false);

    const trimmed = url.trim();
    if (!trimmed) {
      setError("Cole uma URL para encurtar.");
      return;
    }

    try {
      const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
      if (!parsed.hostname) throw new Error("Invalid URL");

      await runWithLoading(async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setShortUrl(shortenUrl(parsed.href));
      });
    } catch {
      setError("Informe uma URL válida. Ex: https://exemplo.com/pagina");
      setShortUrl("");
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 bg-[#0a0a0b] text-stone-300">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.08),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime-400/90">
              URL simplifier
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Links longos viram{" "}
              <span className="text-lime-400">URLs curtas</span> em um clique.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-400">
              Encurte, compartilhe e acompanhe seus links com uma ferramenta
              rápida, limpa e feita para quem odeia URL gigante.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
          >
            <label htmlFor="url-input" className="sr-only">
              URL para encurtar
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="url-input"
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://seu-site.com/caminho/muito/longo"
                className="h-11 flex-1 border-white/15 bg-[#111113] text-white placeholder:text-stone-500"
              />
              <Button
                type="submit"
                className="h-11 bg-lime-400 px-6 text-stone-950 hover:bg-lime-300"
              >
                Encurtar
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {shortUrl && (
              <div className="mt-4 flex flex-col gap-2 rounded-xl border border-lime-400/20 bg-lime-400/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-lime-400/80">
                    Seu link curto
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-white">
                    {shortUrl}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopy}
                  className="shrink-0 border-white/15 bg-transparent text-stone-200 hover:bg-white/5"
                >
                  <Copy className="size-4" aria-hidden />
                  {copied ? "Copiado!" : "Copiar"}
                </Button>
              </div>
            )}
          </form>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/8 pt-10 sm:max-w-lg">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-semibold text-white">{stat.value}</dt>
                <dd className="mt-1 text-xs text-stone-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-white/8 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
              Recursos
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Tudo que você precisa para compartilhar melhor.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-lime-400/20 hover:bg-white/[0.04]"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lime-400">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="border-b border-white/8 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
                  Preços
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Grátis para começar. Pro quando crescer.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-400">
                  Plano free com links ilimitados básicos. Upgrade para analytics
                  avançado, domínio customizado e API.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="border-white/15 bg-transparent text-stone-200 hover:bg-white/5"
                >
                  Ver planos
                </Button>
                <Button className="bg-lime-400 text-stone-950 hover:bg-lime-300">
                  Começar grátis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
              Sobre
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              URL Cutter nasceu de uma frustração simples.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Links enormes quebram mensagens, arruínam layouts e ninguém
              lembra de copiar. Construímos uma ferramenta direta — colar,
              encurtar, compartilhar — sem ruído visual nem fluxo complicado.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">
            <div className="flex items-center gap-3 border-b border-white/8 pb-4">
              <span className="flex size-9 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400">
                <Link2 className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium text-white">Exemplo ao vivo</p>
                <p className="text-xs text-stone-500">Antes → depois</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 font-mono text-xs">
              <p className="truncate rounded-lg bg-white/5 px-3 py-2 text-stone-500">
                https://exemplo.com/blog/como-encurtar-urls-guia-completo-2026
              </p>
              <p
                className={cn(
                  "truncate rounded-lg border border-lime-400/20 bg-lime-400/5 px-3 py-2 text-lime-400",
                )}
              >
                https://cut.exemplo.com/x7k2m9
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
