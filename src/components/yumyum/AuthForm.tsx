import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import heroCone from "@/assets/hero-cone.png";
import { Logo } from "./Reveal";

const base = {
  email: z.string().trim().min(1, "L'email est requis").email("Adresse email invalide").max(255),
  password: z.string().min(6, "Le mot de passe doit contenir 6 caractères minimum").max(100),
  remember: z.boolean().optional(),
};
const loginSchema = z.object({ ...base, name: z.string().optional(), phone: z.string().optional() });
const signupSchema = z.object({
  ...base,
  name: z.string().trim().min(2, "Veuillez indiquer votre nom complet").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(\+212|0)[5-7]\d{8}$/, "Numéro invalide (ex : 0612345678)"),
});
type Values = z.infer<typeof loginSchema>;

export function AuthForm({ onDone }: { onDone?: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [show, setShow] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(mode === "login" ? loginSchema : signupSchema),
    defaultValues: { email: "", password: "", name: "", phone: "", remember: false },
  });
  const { register, handleSubmit, formState, setValue, watch } = form;
  const e = formState.errors;

  const onSubmit = async (v: Values) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(mode === "login" ? "Bon retour chez YumYum ! 🍦" : `Bienvenue ${v.name} ! Votre compte est créé.`);
    onDone?.();
  };

  const field = (id: keyof Values, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} aria-invalid={!!e[id]} className="h-12 rounded-xl bg-background" {...props} {...register(id)} />
      {e[id] && <p className="text-sm text-destructive" role="alert">{e[id]?.message as string}</p>}
    </div>
  );

  return (
    <div className="grid overflow-hidden rounded-3xl bg-card md:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-8 text-primary-foreground md:flex">
        <div className="zellige absolute inset-0 opacity-60" />
        <Logo className="relative text-primary-foreground [&>span]:text-accent" />
        <img src={heroCone} alt="Cornet YumYum trois boules" width={1024} height={1024} className="relative mx-auto w-56 animate-float drop-shadow-2xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold">Bon retour chez YumYum !</h2>
          <p className="mt-2 opacity-90">Vos saveurs préférées, vos points fidélité et -10% sur votre première commande.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 p-6 sm:p-8">
        <h2 className="text-2xl font-bold">{mode === "login" ? "Se connecter" : "Créer un compte"}</h2>
        {mode === "signup" && (
          <>
            {field("name", "Nom complet", { autoComplete: "name", placeholder: "Salma Benali" })}
            {field("phone", "Téléphone", { type: "tel", autoComplete: "tel", placeholder: "0612345678" })}
          </>
        )}
        {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "vous@exemple.ma" })}
        <div className="space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              aria-invalid={!!e.password}
              className="h-12 rounded-xl bg-background pe-12"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              className="absolute inset-y-0 end-0 flex w-12 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
          {e.password && <p className="text-sm text-destructive" role="alert">{e.password.message}</p>}
        </div>
        {mode === "login" && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox checked={!!watch("remember")} onCheckedChange={(c) => setValue("remember", !!c)} />
              Se souvenir de moi
            </label>
            <a href="#" onClick={(ev) => { ev.preventDefault(); toast("Un lien de réinitialisation vous sera envoyé par email."); }} className="font-medium text-primary hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
        )}
        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting && <Loader2 className="animate-spin" />}
          {mode === "login" ? "Se connecter" : "Créer mon compte"}
        </Button>
        <Button type="button" variant="soft" size="xl" className="w-full" onClick={() => toast("Connexion Google bientôt disponible")}>
          <svg viewBox="0 0 24 24" aria-hidden className="size-5"><path fill="currentColor" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9zM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6z"/></svg>
          Continuer avec Google
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {mode === "login" ? "Pas encore de compte ?" : "Déjà client ?"}{" "}
          <button type="button" className="font-semibold text-primary hover:underline" onClick={() => { setMode(mode === "login" ? "signup" : "login"); form.clearErrors(); }}>
            {mode === "login" ? "Créer un compte" : "Se connecter"}
          </button>
        </p>
      </form>
    </div>
  );
}
