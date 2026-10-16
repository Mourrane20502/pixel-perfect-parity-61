import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthForm } from "@/components/yumyum/AuthForm";
import { Logo } from "@/components/yumyum/Reveal";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — YumYum" },
      { name: "description", content: "Connectez-vous ou créez votre compte YumYum pour commander vos glaces marocaines préférées." },
      { property: "og:title", content: "Connexion — YumYum" },
      { property: "og:description", content: "Accédez à votre compte YumYum." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="zellige flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
      <Link to="/" aria-label="Retour à l'accueil"><Logo className="text-4xl" /></Link>
      <div className="w-full max-w-4xl shadow-soft rounded-3xl"><AuthForm /></div>
    </main>
  );
}
