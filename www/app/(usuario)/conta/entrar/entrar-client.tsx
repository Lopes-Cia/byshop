"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";
import { SignInSchema, type SignInForm } from "@/lib/schemas";
import { MOCK_AUTH_USER, useAuthStore } from "@/stores/authStore";

type Props = {
  nextPath: string;
};

export default function SignInClient({ nextPath }: Props) {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(SignInSchema);
  const [authError, setAuthError] = useState<string | null>(null);
  const hasPrefilled = useRef(false);

  useEffect(() => {
    if (hasPrefilled.current) return;
    setValue("email", MOCK_AUTH_USER.email);
    setValue("password", MOCK_AUTH_USER.password);
    hasPrefilled.current = true;
  }, [setValue]);

  const onSubmit = async (formData: SignInForm) => {
    setAuthError(null);
    try {
      await login(formData.email, formData.password);
      router.push(nextPath);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível entrar.";
      setAuthError(message);
    }
  };

  const signUpHref = useMemo(() => {
    const encodedNext = encodeURIComponent(nextPath);
    return nextPath !== "/" ? `/conta/cadastrar?next=${encodedNext}` : "/conta/cadastrar";
  }, [nextPath]);

  const forgotPasswordHref = useMemo(() => {
    const encodedNext = encodeURIComponent(nextPath);
    return nextPath !== "/" ? `/conta/recuperar-senha?next=${encodedNext}` : "/conta/recuperar-senha";
  }, [nextPath]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Entre na sua conta
          </h2>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            Ou{" "}
            <Link href={signUpHref} className="text-primary hover:text-primary/80 font-medium">
              crie uma conta
            </Link>
          </p>
        </div>

        <Alert>
          <AlertTitle>Credenciais de teste</AlertTitle>
          <AlertDescription>
            <div className="grid gap-1">
              <p>
                <span className="font-medium">Email:</span> {MOCK_AUTH_USER.email}
              </p>
              <p>
                <span className="font-medium">Senha:</span> {MOCK_AUTH_USER.password}
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {authError && (
          <Alert variant="destructive">
            <AlertTitle>Não foi possível entrar</AlertTitle>
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}>
          <div className="space-y-4">
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Lembrar de mim
              </label>
            </div>

            <div className="text-sm">
              <Link href={forgotPasswordHref} className="text-primary hover:text-primary/80 font-medium">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
