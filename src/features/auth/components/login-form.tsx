import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { useLocalePath } from "@/lib/use-locale-path";
import facebookIcon from "@/assets/icons/fb-vector.svg";
import googleIcon from "@/assets/icons/Google-vector.svg";
import appleIcon from "@/assets/icons/apple-vector.svg";
import { login } from "../api/login";
import { createLoginSchema, type LoginSchema } from "../utils/login-schema";
import { useAuth } from "../context/use-auth";

export default function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const schema = createLoginSchema(t);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      await login(data);
      await refreshUser();
      toast.success(t("auth.loginSuccess"));
      navigate(localePath("/"));
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (/incorrect email or password/i.test(message)) {
        toast.error(t("auth.errors.incorrectCredentials"));
      } else {
        console.error(err);
        toast.error(t("auth.errors.loginFailed"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mt-4 space-y-4 border border-muted-foreground rounded-auth p-10">
        <p className="text-center font-heading text-2xl font-extrabold">
          {t("auth.login")}
        </p>
        <FieldGroup>
          <Field data-invalid={!!form.formState.errors.email}>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 start-4 size-5 -translate-y-1/2 text-font-2" />
              <Input
                id="email"
                type="email"
                placeholder={t("auth.email")}
                className="ps-11"
                {...form.register("email")}
              />
            </div>
            <FieldError
              errors={[form.formState.errors.email]}
              className="text-start"
            />
          </Field>
          <Field data-invalid={!!form.formState.errors.password}>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 start-4 size-5 -translate-y-1/2 text-font-2" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.password")}
                className="ps-11 pe-11"
                {...form.register("password")}
              />
              <button
                type="button"
                className="absolute top-1/2 end-4 -translate-y-1/2 text-font-2"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword ? t("auth.hidePassword") : t("auth.showPassword")
                }
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            <FieldError
              errors={[form.formState.errors.password]}
              className="text-start"
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-end mb-6">
          <Button
            type="button"
            className="text-base leading-140 cursor-pointer font-bold"
            variant="link"
            onClick={() => navigate(localePath("/auth/reset-password"))}
          >
            {t("auth.forgetPassword")}
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <Separator
            orientation="horizontal"
            className="bg-muted-foreground max-w-1/3"
          />
          <p className="text-center font-heading text-base leading-140 mx-1">
            {t("auth.or")}
          </p>
          <Separator
            orientation="horizontal"
            className="bg-muted-foreground max-w-1/3"
          />
        </div>
        <div className="flex justify-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-background p-3 hover:bg-muted transition-colors duration-300">
            <img src={facebookIcon} alt="facebook" className="size-5" />
          </div>
          <div className="flex items-center justify-center rounded-full bg-background p-3 hover:bg-muted transition-colors duration-300">
            <img src={googleIcon} alt="google" className="size-5" />
          </div>
          <div className="flex items-center justify-center rounded-full bg-background p-3 hover:bg-muted transition-colors duration-300">
            <img src={appleIcon} alt="apple" className="size-5" />
          </div>
        </div>
        <Button
          variant="cta"
          type="submit"
          className="w-full mt-4"
          disabled={isLoading}
        >
          {t("auth.login")}
        </Button>
        <p className="text-center font-heading text-base leading-140">
          {t("auth.noAccountYet")}{" "}
          <Button
            type="button"
            className="text-base leading-140 cursor-pointer"
            variant="link-accent"
            onClick={() => navigate(localePath("/register"))}
          >
            {t("auth.register")}
          </Button>
        </p>
      </div>
    </form>
  );
}
