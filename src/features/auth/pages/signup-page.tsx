import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { KycWizard } from "@/features/kyc";
import type { KycData } from "@/features/kyc";
import { signup } from "@/features/kyc";
import { SignupForm } from "@/features/auth/components/signup-form";
import type { SignupFormData } from "@/features/auth/components/signup-form";
import { SignupError } from "@/features/auth/components/signup-error";
import { SignupLoading } from "@/features/auth/components/signup-loading";

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = "form" | "kyc" | "loading" | "done" | "error";

// ─── Page ─────────────────────────────────────────────────────────────────────

export function SignupPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("form");
  const [formData, setFormData] = useState<SignupFormData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  function handleFormSuccess(data: SignupFormData) {
    setFormData(data);
    setPhase("kyc");
  }

  async function handleKycComplete(kyc: KycData) {
    if (!formData) return;
    const payload = { ...formData, ...kyc };
    setPhase("loading");
    try {
      await signup(payload);
      toast.success("Account created! Welcome to Super Fitness 🎉");
      navigate("/auth/login");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setPhase("error");
    }
  }

  return (
    <div className="min-h-svh bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* ── Header ────────────────────────────────────────────────── */}
        {phase !== "kyc" && (
          <div className="mb-8 text-center">
            <p className="font-heading text-lg font-normal text-muted-foreground">
              Hey There
            </p>
            <h1 className="font-heading text-2xl font-extrabold text-foreground">
              Create Account
            </h1>
          </div>
        )}

        {/* ── Signup form ───────────────────────────────────────────── */}
        {phase === "form" && (
          <div className="rounded-auth bg-[rgba(36,36,36,0.1)] px-6 py-8 backdrop-blur-[17px]">
            <p className="mb-6 text-center font-heading text-2xl font-extrabold">
              Register
            </p>
            <SignupForm onSuccess={handleFormSuccess} />
          </div>
        )}

        {/* ── KYC Wizard ───────────────────────────────────────────── */}
        {phase === "kyc" && (
          <div className="flex justify-center">
            <KycWizard
              onComplete={handleKycComplete}
              className="bg-[rgba(36,36,36,0.6)] backdrop-blur-md border border-border"
            />
          </div>
        )}

        {/* ── Loading ──────────────────────────────────────────────── */}
        {phase === "loading" && <SignupLoading />}

        {/* ── Done ─────────────────────────────────────────────────── */}
        {phase === "done" && (
          <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center font-heading text-sm">
            <p className="text-2xl font-extrabold text-foreground">🎉 Welcome!</p>
            <p className="mt-2 text-muted-foreground">Your account is ready.</p>
          </div>
        )}

        {/* ── Error ────────────────────────────────────────────────── */}
        {phase === "error" && (
          <SignupError
            message={errorMsg}
            onRetry={() => setPhase("form")}
          />
        )}

      </div>
    </div>
  );
}

export default SignupPage;
