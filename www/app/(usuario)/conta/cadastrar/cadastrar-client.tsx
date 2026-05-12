"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";
import { SignUpSchema, type SignUpForm } from "@/lib/schemas";
import { useAuthStore } from "@/stores/authStore";

type Props = {
  nextPath: string;
};

export default function SignUpClient({ nextPath }: Props) {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(SignUpSchema);

  const onSubmit = async (formData: SignUpForm) => {
    await signup(formData.email, formData.password, formData.firstName, formData.lastName);
    router.push(nextPath);
  };

  const signInHref = useMemo(() => {
    const encodedNext = encodeURIComponent(nextPath);
    return nextPath !== "/" ? `/conta/entrar?next=${encodedNext}` : "/conta/entrar";
  }, [nextPath]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Crie sua conta</h2>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            Ou{" "}
            <Link href={signInHref} className="text-primary hover:text-primary/80 font-medium">
              entre na sua conta
            </Link>
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nome"
                  value={data.firstName || ""}
                  onChange={(e) => setValue("firstName", e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Sobrenome"
                  value={data.lastName || ""}
                  onChange={(e) => setValue("lastName", e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <Input
                type="email"
                placeholder="E-mail"
                value={data.email || ""}
                onChange={(e) => setValue("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Senha"
                value={data.password || ""}
                onChange={(e) => setValue("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirmar senha"
                value={data.confirmPassword || ""}
                onChange={(e) => setValue("confirmPassword", e.target.value)}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              Eu concordo com os{" "}
              <Link href="/termos-de-uso" className="text-primary hover:text-primary/80">
                Termos de uso
              </Link>
            </label>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </div>
    </div>
  );
}
