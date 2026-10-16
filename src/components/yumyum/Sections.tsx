import { useState } from "react";
import { Leaf, MapPin, Hand, Truck, Star, ChevronLeft, ChevronRight, Instagram, Facebook, Phone, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import heroCone from "@/assets/hero-cone.png";
import flavorsImg from "@/assets/flavors-grid.jpg";
import storyImg from "@/assets/story.jpg";
import { Reveal, Logo } from "./Reveal";

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="accueil" className="relative overflow-hidden pb-20 pt-32 lg:pt-40">
      <div className="zellige absolute inset-0 opacity-50" />
      <div className="blob absolute -end-32 top-10 size-[34rem] bg-primary/15" />
      <div className="blob absolute -start-24 bottom-0 size-72 bg-secondary/30" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold">
            <Sparkles className="size-4 text-accent" /> {t.heroKicker}
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            {t.heroTitle.split(" ").slice(0, -1).join(" ")} <span className="text-primary">{t.heroTitle.split(" ").slice(-1)}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t.heroSub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl"><a href="#saveurs">{t.cta1}</a></Button>
            <Button asChild variant="soft" size="xl"><a href="#points-de-vente"><MapPin /> {t.cta2}</a></Button>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm">
            <div className="flex text-accent">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
            <span><strong>4,9/5</strong> · plus de 12 000 gourmands</span>
          </div>
        </Reveal>
        <div className="relative mx-auto aspect-square w-full max-w-lg">
          <div className="blob absolute inset-8 bg-accent/30" />
          <img src={heroCone} alt="Cornet YumYum fraise, pistache et safran" width={1024} height={1024} className="relative animate-float-slow drop-shadow-2xl" />
          <span className="absolute start-2 top-10 animate-float text-5xl" aria-hidden>🍓</span>
          <span className="absolute end-4 top-1/3 animate-float-slow text-5xl" aria-hidden>🍊</span>
          <span className="absolute bottom-16 start-6 animate-float-slow text-4xl" aria-hidden>🥜</span>
          <span className="absolute bottom-8 end-12 animate-float text-4xl" aria-hidden>🌰</span>
        </div>
      </div>
    </section>
  );
}

const flavors = [
  { name: "Amlou & Amandes", desc: "Amandes torréfiées, huile d'argan et miel de thym du Souss.", badge: "Best-seller", tint: "hover:bg-accent/15" },
  { name: "Fleur d'Oranger", desc: "Crème délicate parfumée à l'eau de fleur d'oranger de Fès.", badge: null, tint: "hover:bg-accent/10" },
  { name: "Menthe Fraîche", desc: "Comme un thé à la menthe glacé, avec éclats de chocolat.", badge: null, tint: "hover:bg-secondary/25" },
  { name: "Dattes de Zagora", desc: "Dattes Mejhoul caramélisées et pointe de cannelle.", badge: "Nouveau", tint: "hover:bg-accent/15" },
  { name: "Pistache", desc: "Pistaches grillées, intensément vertes, généreusement concassées.", badge: "Best-seller", tint: "hover:bg-secondary/25" },
  { name: "Safran & Miel", desc: "Safran de Taliouine et miel d'euphorbe, notre trésor doré.", badge: "Nouveau", tint: "hover:bg-accent/20" },
  { name: "Fraise", desc: "Fraises de Larache cueillies à maturité, rien d'autre.", badge: null, tint: "hover:bg-primary/15" },
  { name: "Chocolat Noir", desc: "Cacao 70% et une touche de ras el hanout.", badge: null, tint: "hover:bg-primary/10" },
];

function FlavorCard({ f, i }: { f: (typeof flavors)[number]; i: number }) {
  const x = (i % 4) * 33.333;
  const y = Math.floor(i / 4) * 100;
  return (
    <article className={cn("group h-full rounded-3xl bg-card p-4 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-pop-lg", f.tint)}>
      <div className="relative overflow-hidden rounded-2xl">
        <div role="img" aria-label={`Glace ${f.name}`} className="aspect-[4/3] transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${flavorsImg})`, backgroundSize: "400% 200%", backgroundPosition: `${x}% ${y}%` }} />
        {f.badge && (
          <span className={cn("absolute start-3 top-3 rounded-full px-3 py-1 text-xs font-bold", f.badge === "Nouveau" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground")}>
            {f.badge}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-xl font-semibold">{f.name}</h3>
      <p className="mt-1 text-muted-foreground">{f.desc}</p>
    </article>
  );
}

export function Flavors() {
  const { t } = useI18n();
  return (
    <section id="saveurs" className="mx-auto max-w-7xl px-5 py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">{t.flavorsTitle}</h2>
        <p className="mt-4 text-lg text-muted-foreground">Huit recettes, huit voyages : du Souss au Rif, chaque boule raconte une région.</p>
      </Reveal>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flavors.map((f, i) => <Reveal key={f.name} delay={(i % 3) * 100}><FlavorCard f={f} i={i} /></Reveal>)}
      </div>
    </section>
  );
}

const features = [
  { icon: Leaf, title: "Ingrédients 100% naturels", text: "Sans colorants ni arômes artificiels. Lait frais de l'Atlas.", c: "bg-secondary/30" },
  { icon: MapPin, title: "Inspirées du terroir", text: "Amlou, safran, dattes, argan : le meilleur du Maroc.", c: "bg-accent/25" },
  { icon: Hand, title: "Fabrication artisanale", text: "Petites séries, barattées chaque matin dans notre atelier.", c: "bg-primary/20" },
  { icon: Truck, title: "Livraison rapide", text: "En moins de 45 min, en box isotherme, dans 6 villes.", c: "bg-secondary/30" },
];

export function Why() {
  const { t } = useI18n();
  return (
    <section className="bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal><h2 className="text-center text-4xl font-bold sm:text-5xl">{t.whyTitle}</h2></Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} className="text-center">
              <div className={cn("blob mx-auto flex size-20 items-center justify-center", f.c)}><f.icon className="size-9" /></div>
              <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 opacity-75">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Story() {
  const { t } = useI18n();
  return (
    <section id="histoire" className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2">
      <Reveal className="relative">
        <div className="blob absolute -inset-4 bg-accent/30" />
        <img src={storyImg} alt="Grand-mère et petite-fille préparant de la glace dans l'atelier familial" width={1024} height={1200} loading="lazy" className="relative rounded-[2.5rem] shadow-soft" />
      </Reveal>
      <Reveal delay={150}>
        <span className="font-semibold text-primary">Notre histoire</span>
        <h2 className="mt-2 text-4xl font-bold sm:text-5xl">{t.storyTitle}</h2>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground">
          <p>Tout commence en 1987 dans la médina de Marrakech, quand Lalla Fatima sert à ses petits-enfants une glace à l'amlou improvisée avec les amandes du jardin.</p>
          <p>Trois générations plus tard, nous barattons toujours ses recettes à la main, avec des producteurs que nous connaissons par leur prénom : le safran de Taliouine, les dattes de Zagora, la fleur d'oranger de Fès.</p>
          <p>YumYum, c'est la mémoire d'un goût d'enfance, partagée une boule à la fois.</p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[["37", "ans de savoir-faire"], ["24", "producteurs locaux"], ["6", "villes"]].map(([n, l]) => (
            <div key={l} className="rounded-2xl bg-card p-4 shadow-soft"><div className="font-display text-3xl font-bold text-primary">{n}</div><div className="text-sm">{l}</div></div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const reviews = [
  { name: "Salma B.", city: "Casablanca", text: "La glace Amlou & Amandes m'a ramenée directement chez ma grand-mère. Incroyable !", c: "bg-primary" },
  { name: "Youssef E.", city: "Rabat", text: "Safran & Miel, une merveille. On sent la qualité des ingrédients à chaque cuillère.", c: "bg-accent" },
  { name: "Claire D.", city: "Marrakech", text: "Découverte pendant mes vacances, je commande dès que je reviens. La fleur d'oranger est divine.", c: "bg-secondary" },
  { name: "Imane K.", city: "Tanger", text: "Livrée en 30 minutes, parfaitement glacée. Mes enfants adorent la fraise !", c: "bg-primary" },
];

export function Testimonials() {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const r = reviews[i]!;
  const go = (d: number) => setI((i + d + reviews.length) % reviews.length);
  return (
    <section className="relative overflow-hidden bg-primary/10 py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal><h2 className="text-4xl font-bold sm:text-5xl">{t.testiTitle}</h2></Reveal>
        <div className="mt-12 rounded-[2rem] bg-card p-8 shadow-soft sm:p-12" aria-live="polite">
          <div className="flex justify-center text-accent">{[...Array(5)].map((_, k) => <Star key={k} className="size-5 fill-current" />)}</div>
          <blockquote className="mt-5 font-display text-2xl leading-snug">« {r.text} »</blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className={cn("flex size-12 items-center justify-center rounded-full font-bold text-card", r.c)}>{r.name[0]}</div>
            <div className="text-start"><div className="font-semibold">{r.name}</div><div className="text-sm text-muted-foreground">{r.city}</div></div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button variant="soft" size="icon" className="size-11" onClick={() => go(-1)} aria-label="Avis précédent"><ChevronLeft className="rtl:rotate-180" /></Button>
          {reviews.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Avis ${k + 1}`} className={cn("h-2.5 rounded-full transition-all", k === i ? "w-8 bg-primary" : "w-2.5 bg-foreground/20")} />
          ))}
          <Button variant="soft" size="icon" className="size-11" onClick={() => go(1)} aria-label="Avis suivant"><ChevronRight className="rtl:rotate-180" /></Button>
        </div>
      </div>
    </section>
  );
}

const cities = [
  { name: "Casablanca", addr: "Bd d'Anfa, Maârif", x: 38, y: 34 },
  { name: "Rabat", addr: "Av. Mohammed V, Agdal", x: 44, y: 26 },
  { name: "Marrakech", addr: "Rue de la Liberté, Guéliz", x: 38, y: 52 },
  { name: "Tanger", addr: "Bd Pasteur, Centre", x: 52, y: 8 },
  { name: "Fès", addr: "Av. Hassan II, Ville Nouvelle", x: 58, y: 26 },
  { name: "Agadir", addr: "Front de mer, Founty", x: 26, y: 66 },
];

export function Stores() {
  const { t } = useI18n();
  const [sel, setSel] = useState(0);
  return (
    <section id="points-de-vente" className="mx-auto max-w-7xl px-5 py-24">
      <Reveal className="text-center"><h2 className="text-4xl font-bold sm:text-5xl">{t.storesTitle}</h2>
        <p className="mt-4 text-lg text-muted-foreground">Ouverts tous les jours de 11h à minuit.</p></Reveal>
      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-3">
          {cities.map((c, i) => (
            <li key={c.name}>
              <button onClick={() => setSel(i)} className={cn("flex w-full items-center gap-4 rounded-2xl p-4 text-start transition-all", sel === i ? "bg-primary text-primary-foreground shadow-pop" : "bg-card shadow-soft hover:-translate-y-0.5")}>
                <MapPin className="size-6 shrink-0" />
                <div><div className="font-display text-lg font-semibold">{c.name}</div><div className="text-sm opacity-80">{c.addr}</div></div>
              </button>
            </li>
          ))}
        </ul>
        <div className="zellige relative min-h-80 overflow-hidden rounded-[2rem] bg-secondary/25" role="img" aria-label="Carte stylisée des points de vente au Maroc">
          <div className="blob absolute inset-[10%] bg-accent/20" />
          {cities.map((c, i) => (
            <button key={c.name} onClick={() => setSel(i)} style={{ left: `${c.x}%`, top: `${c.y}%` }}
              className={cn("absolute flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold shadow-soft transition-all", sel === i ? "scale-110 bg-primary text-primary-foreground" : "bg-card")}>
              <MapPin className="size-4" />{c.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="px-5">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-accent p-10 sm:p-14">
        <div className="blob absolute -end-16 -top-16 size-64 bg-primary/40" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold">-10% sur votre première commande</h2>
            <p className="mt-3 text-lg">Nouvelles saveurs, offres gourmandes et recettes de famille, une fois par mois.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => {
            e.preventDefault();
            if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error("Adresse email invalide"); return; }
            toast.success("Merci ! Votre code -10% arrive par email 🍦"); setEmail("");
          }}>
            <label htmlFor="nl" className="sr-only">Email</label>
            <Input id="nl" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.ma" className="h-14 rounded-full border-0 bg-card px-6 text-base" />
            <Button type="submit" variant="hero" size="xl">Je m'abonne</Button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  const ids = ["accueil", "saveurs", "histoire", "points-de-vente", "contact"];
  return (
    <footer id="contact" className="relative mt-24 overflow-hidden bg-foreground pt-16 pb-8 text-background">
      <div className="zellige absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="text-3xl" />
          <p className="mt-3 max-w-sm opacity-75">Le Maroc, une boule à la fois. Glaces artisanales fabriquées à Marrakech depuis 1987.</p>
          <div className="mt-5 flex gap-3">
            {[{ I: Instagram, l: "Instagram" }, { I: Facebook, l: "Facebook" }].map(({ I, l }) => (
              <a key={l} href="#" aria-label={l} className="flex size-11 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-primary"><I className="size-5" /></a>
            ))}
            <a href="#" aria-label="TikTok" className="flex size-11 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-primary">
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.3 7.3 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Liens rapides</h3>
          <ul className="mt-3 space-y-2 opacity-75">{t.nav.map((n, i) => <li key={n}><a href={`#${ids[i]}`} className="hover:text-primary">{n}</a></li>)}</ul>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 opacity-75">
            <li className="flex items-center gap-2"><Phone className="size-4" /> +212 5 24 00 00 00</li>
            <li className="flex items-center gap-2"><Mail className="size-4" /> bonjour@yumyum.ma</li>
            <li className="flex items-center gap-2"><MapPin className="size-4" /> Guéliz, Marrakech</li>
          </ul>
        </div>
      </div>
      <p className="relative mt-12 text-center text-sm opacity-60">© {new Date().getFullYear()} YumYum. Fait avec ❤️ au Maroc.</p>
    </footer>
  );
}
