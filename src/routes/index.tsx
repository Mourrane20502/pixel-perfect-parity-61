import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/yumyum/Navbar";
import { Hero, Flavors, Why, Story, Testimonials, Stores, Newsletter, Footer } from "@/components/yumyum/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YumYum — La glace qui a le goût du Maroc" },
      { name: "description", content: "Glaces marocaines artisanales : amlou, fleur d'oranger, safran, dattes de Zagora. Ingrédients 100% naturels, livrés dans 6 villes." },
      { property: "og:title", content: "YumYum — La glace qui a le goût du Maroc" },
      { property: "og:description", content: "Glaces marocaines artisanales aux saveurs du terroir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Flavors />
        <Why />
        <Story />
        <Testimonials />
        <Stores />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
