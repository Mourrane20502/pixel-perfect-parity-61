import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Logo } from "./Reveal";
import { AuthForm } from "./AuthForm";

const ids = ["accueil", "saveurs", "histoire", "points-de-vente", "contact"];

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const LangSwitch = (
    <div className="flex rounded-full bg-muted p-1 text-xs font-semibold" role="group" aria-label="Langue">
      {(["fr", "en", "ar"] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={cn("rounded-full px-2.5 py-1 uppercase transition-colors", lang === l ? "bg-foreground text-background" : "hover:text-primary")}>
          {l === "ar" ? "ع" : l}
        </button>
      ))}
    </div>
  );

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled ? "bg-background/90 py-2 shadow-soft backdrop-blur" : "py-5")}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5">
        <a href="#accueil" aria-label="YumYum accueil"><Logo /></a>
        <ul className="hidden items-center gap-7 font-medium lg:flex">
          {t.nav.map((n, i) => (
            <li key={n}><a href={`#${ids[i]}`} className="transition-colors hover:text-primary">{n}</a></li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          {LangSwitch}
          <Button variant="hero" size="lg" onClick={() => setLogin(true)}>{t.login}</Button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="mx-4 mt-3 space-y-4 rounded-3xl bg-card p-6 shadow-soft lg:hidden">
          {t.nav.map((n, i) => (
            <a key={n} href={`#${ids[i]}`} onClick={() => setOpen(false)} className="block font-display text-lg font-medium">{n}</a>
          ))}
          <div className="flex items-center justify-between">
            {LangSwitch}
            <Button variant="hero" size="lg" onClick={() => { setOpen(false); setLogin(true); }}>{t.login}</Button>
          </div>
        </div>
      )}
      <Dialog open={login} onOpenChange={setLogin}>
        <DialogContent className="max-w-3xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Connexion à YumYum</DialogTitle>
          <AuthForm onDone={() => setLogin(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
