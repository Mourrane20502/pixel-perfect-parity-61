import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en" | "ar";

const dict = {
  fr: {
    nav: ["Accueil", "Saveurs", "Notre histoire", "Points de vente", "Contact"],
    login: "Se connecter",
    heroKicker: "Glaces marocaines artisanales",
    heroTitle: "La glace qui a le goût du Maroc",
    heroSub: "Amlou, fleur d'oranger, dattes de Zagora, safran de Taliouine… Des recettes de famille, barattées chaque matin avec des ingrédients 100% naturels.",
    cta1: "Découvrir nos saveurs",
    cta2: "Trouver un point de vente",
    flavorsTitle: "Nos saveurs du Maroc",
    whyTitle: "Pourquoi YumYum ?",
    storyTitle: "Une passion de famille",
    testiTitle: "Ils ont fondu pour nous",
    storesTitle: "Nos points de vente",
  },
  en: {
    nav: ["Home", "Flavors", "Our story", "Stores", "Contact"],
    login: "Sign in",
    heroKicker: "Artisan Moroccan ice cream",
    heroTitle: "Ice cream that tastes like Morocco",
    heroSub: "Amlou, orange blossom, Zagora dates, Taliouine saffron… Family recipes churned every morning with 100% natural ingredients.",
    cta1: "Discover our flavors",
    cta2: "Find a store",
    flavorsTitle: "Our Moroccan flavors",
    whyTitle: "Why YumYum?",
    storyTitle: "A family passion",
    testiTitle: "They melted for us",
    storesTitle: "Where to find us",
  },
  ar: {
    nav: ["الرئيسية", "النكهات", "قصتنا", "نقاط البيع", "اتصل بنا"],
    login: "تسجيل الدخول",
    heroKicker: "مثلجات مغربية حرفية",
    heroTitle: "مثلجات بطعم المغرب",
    heroSub: "أملو، ماء الزهر، تمور زاكورة، زعفران تالوين… وصفات عائلية تُحضَّر كل صباح بمكونات طبيعية 100٪.",
    cta1: "اكتشف نكهاتنا",
    cta2: "ابحث عن نقطة بيع",
    flavorsTitle: "نكهاتنا المغربية",
    whyTitle: "لماذا يم يم؟",
    storyTitle: "شغف عائلي",
    testiTitle: "آراء زبائننا",
    storesTitle: "نقاط البيع",
  },
};

type Dict = (typeof dict)["fr"];
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "fr",
  setLang: () => {},
  t: dict.fr,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
