import { useState } from "react";
import { createRegisterSchema } from "../utils/register-schema";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterSchema } from "../utils/register-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/lib/use-locale-path";
import { Separator } from "@/components/ui/separator";
import facebookIcon from "@/assets/icons/fb-vector.svg";
import googleIcon from "@/assets/icons/Google-vector.svg";
import appleIcon from "@/assets/icons/apple-vector.svg";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { KycWizard, type KycData } from "../kyc/components/KycWizard";
import { register } from "../api/register";
import { login } from "../api/login";
import { setAuthToken } from "@/lib/auth-token";
import { useAuth } from "../context/use-auth";

export default function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { refreshUser } = useAuth();
  //states
  const [isLoading, setIsLoading] = useState(false);
  // Show/hide toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(0);
  //   For storing kyc data temporarily until form is submitted
  const [kycDraft, setKycDraft] = useState<Partial<KycData>>({});

  const schema = createRegisterSchema(t);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "",
      height: 0,
      weight: 0,
      age: 0,
      goal: "",
      activityLevel: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  const handleNext = async () => {
    const validInputs = await form.trigger([
      "firstName",
      "lastName",
      "email",
      "password",
      "rePassword",
    ]);
    if (validInputs) {
      setStep((prev) => prev + 1);
    } else {
      toast.error(t("auth.errors.invalidInputs"));
    }
  };

  /** RHF submit handler — receives the complete validated form data */
  const onSubmit = async (data: RegisterSchema) => {
    setIsLoading(true);
    try {
      const response = await register(data);

      try {
        if (response.token) {
          setAuthToken(response.token);
        } else {
          await login({ email: data.email, password: data.password });
        }
        await refreshUser();
        toast.success(t("auth.registerSuccess"));
        navigate(localePath("/"));
      } catch (signInError) {
        toast.success(t("auth.registerSuccess"));
        toast.error(t("auth.registrationLoginRequired"));
        navigate(localePath("/login"));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (
        /user already exists/i.test(message) ||
        /email already exists/i.test(message)
      ) {
        toast.error(t("auth.errors.userAlreadyExists"));
      } else {
        console.error(err);
        toast.error(t("auth.errors.signupFailed"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  /** Called by KycWizard when the user finishes all 6 KYC steps */
  const handleSubmit = (kycData: KycData) => {
    form.setValue("gender", kycData.gender);
    form.setValue("age", kycData.age);
    form.setValue("weight", kycData.weight);
    form.setValue("height", kycData.height);
    form.setValue("goal", kycData.goal);
    form.setValue("activityLevel", kycData.activityLevel);
    // Trigger RHF submission with all fields now populated
    form.handleSubmit(onSubmit)();
    // console.log(form.getValues());
  };

  /** Called when user clicks back from KYC to return to step 0 */
  const handleKycBack = (draftData?: KycData) => {
    if (draftData) setKycDraft(draftData);
    setStep(0);
  };

  return (
    <form className="w-full max-w-lg" onSubmit={form.handleSubmit(onSubmit)}>
      {step === 0 && (
        <div className="mt-4 space-y-4 border border-muted-foreground rounded-auth p-10">
          <p className="text-center font-heading text-2xl font-extrabold">
            {t("auth.register")}
          </p>
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.firstName}>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-font-2" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder={t("auth.firstName")}
                  className="ps-11"
                  {...form.register("firstName")}
                />
              </div>
              <FieldError
                errors={[form.formState.errors.firstName]}
                className="text-start"
              />
            </Field>
            <Field data-invalid={!!form.formState.errors.lastName}>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-font-2" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder={t("auth.lastName")}
                  className="ps-11"
                  {...form.register("lastName")}
                />
              </div>
              <FieldError
                errors={[form.formState.errors.lastName]}
                className="text-start"
              />
            </Field>
            <Field data-invalid={!!form.formState.errors.email}>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-font-2" />
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
                <Lock className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-font-2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.password")}
                  className="ps-11 pe-11"
                  {...form.register("password")}
                />
                <button
                  type="button"
                  className="absolute top-1/2 inset-e-4 -translate-y-1/2 text-font-2"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
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
            <Field data-invalid={!!form.formState.errors.rePassword}>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-font-2" />
                <Input
                  id="rePassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("auth.confirmPassword")}
                  className="ps-11 pe-11"
                  {...form.register("rePassword")}
                />
                <button
                  type="button"
                  className="absolute top-1/2 inset-e-4 -translate-y-1/2 text-font-2"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={
                    showConfirmPassword
                      ? t("auth.hidePassword")
                      : t("auth.showPassword")
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              <FieldError
                errors={[form.formState.errors.rePassword]}
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
          <div className="flex justify-center  items-center">
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
            type="button"
            className="w-full mt-4"
            disabled={isLoading}
            onClick={handleNext}
          >
            {t("auth.register")}
          </Button>
          <p className="text-center font-heading text-base leading-140">
            {t("auth.alreadyHaveAccount")}{" "}
            <Button
              className="text-base leading-140 cursor-pointer"
              variant="link-accent"
              onClick={() => navigate(localePath("/login"))}
            >
              {t("auth.login")}
            </Button>
          </p>
        </div>
      )}
      {step === 1 && (
        <div className="flex justify-center">
          <KycWizard
            onComplete={handleSubmit}
            onBack={handleKycBack}
            initialData={kycDraft}
            className="border border-muted-foreground rounded-auth mt-4"
          />
        </div>
      )}
    </form>
  );
}
