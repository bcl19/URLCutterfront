import { Footer } from "../footer/footer";
import { Header } from "../header/header";

import { useState } from "react";

import {
  Copy,
  Link2,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { api } from "@/api/api";

export const ResultPage = () => {
  return (
    <div>
      <Header />
      <Result />
      <Footer />
    </div>
  );
};

interface ShortenResponse {
  urlLong: string;
  urlCompac: string;
}

export default function Result() {
  const [url, setUrl] = useState("");

  const [result, setResult] = useState<ShortenResponse | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);

  /*
   * Monta a URL completa que será acessada pelo usuário.
   *
   * Exemplo:
   * urlCompac = "aB72xK"
   *
   * shortUrl =
   * http://localhost:8080/url/aB72xK
   */
  const shortUrl = result
    ? `http://localhost:8080/url/${result.urlCompac}`
    : "";

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!url.trim()) {
      setError("Digite uma URL.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

    try {
      const response = await api.post<ShortenResponse>(
        "/url",
        {
          urlLong: url.trim(),
        }
      );

      setResult(response.data);
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Não foi possível encurtar essa URL.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result?.urlCompac) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Não foi possível copiar a URL.");
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#0a0a0b] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Cabeçalho */}
        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10">
            <Link2 className="size-7 text-lime-400" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Encurte sua URL
          </h1>

          <p className="mt-3 text-stone-400">
            Transforme links longos em URLs simples e fáceis de compartilhar.
          </p>

        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl"
        >

          <label
            htmlFor="url"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            URL original
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">

            <Input
              id="url"
              type="url"
              placeholder="https://exemplo.com/minha-url-muito-grande"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              disabled={loading}
              className="h-12 border-white/10 bg-black/30 text-white placeholder:text-stone-600"
            />

            <Button
              type="submit"
              disabled={loading}
              className="h-12 bg-lime-400 px-6 text-stone-950 hover:bg-lime-300"
            >

              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Encurtando...
                </>
              ) : (
                <>
                  <Link2 className="mr-2 size-4" />
                  Encurtar
                </>
              )}

            </Button>

          </div>

          {/* Erro */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">

              <AlertCircle className="size-4 shrink-0" />

              {error}

            </div>
          )}

        </form>

        {/* Resultado */}
        {result && (
          <div className="mt-6 rounded-2xl border border-lime-400/20 bg-lime-400/[0.04] p-6">

            {/* URL original */}
            <div className="mb-5">

              <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                URL Original
              </p>

              <p className="mt-1 break-all text-sm text-stone-400">
                {result.urlLong}
              </p>

            </div>

            {/* URL curta */}
            <div>

              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
                URL Encurtada
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">

                <div className="flex min-h-12 flex-1 items-center rounded-lg border border-white/10 bg-black/30 px-4">

                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-lime-400 hover:text-lime-300"
                  >
                    {shortUrl}
                  </a>

                </div>

                <Button
                  type="button"
                  onClick={handleCopy}
                  variant="outline"
                  className="min-h-12 border-white/10 bg-transparent text-stone-200 hover:bg-white/5"
                >

                  {copied ? (
                    <>
                      <Check className="mr-2 size-4 text-lime-400" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 size-4" />
                      Copiar
                    </>
                  )}

                </Button>

              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}