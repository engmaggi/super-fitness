import { useState, type SyntheticEvent } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
}

type FormErrors = Partial<Record<keyof SignupFormData, string>>;

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(data: SignupFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!data.rePassword) {
    errors.rePassword = "Please confirm your password.";
  } else if (data.password !== data.rePassword) {
    errors.rePassword = "Passwords do not match.";
  }

  return errors;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="font-heading text-xs font-medium text-font-2">{label}</p>
      )}
      {children}
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}

// ─── SignupForm ───────────────────────────────────────────────────────────────

export function SignupForm({
  onSuccess,
}: {
  onSuccess: (data: SignupFormData) => void;
}) {
  const [form, setForm] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof SignupFormData, boolean>>>({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function set(field: keyof SignupFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])));
    if (hasErrors) return;
    onSuccess(form);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="First Name" error={touched.firstName ? errors.firstName : undefined}>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-font-2" />
            <Input
              id="signup-first-name"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              className="pl-10"
              autoComplete="given-name"
            />
          </div>
        </Field>
        <Field label="Last Name" error={touched.lastName ? errors.lastName : undefined}>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-font-2" />
            <Input
              id="signup-last-name"
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              className="pl-10"
              autoComplete="family-name"
            />
          </div>
        </Field>
      </div>

      {/* Email */}
      <Field label="Email" error={touched.email ? errors.email : undefined}>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-font-2" />
          <Input
            id="signup-email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="pl-10"
            autoComplete="email"
          />
        </div>
      </Field>

      {/* Password */}
      <Field label="Password" error={touched.password ? errors.password : undefined}>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-font-2" />
          <Input
            id="signup-password"
            type={showPw ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            className="pl-10 pr-11"
            autoComplete="new-password"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </Field>

      {/* Confirm Password */}
      <Field label="Confirm Password" error={touched.rePassword ? errors.rePassword : undefined}>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-font-2" />
          <Input
            id="signup-confirm-password"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={form.rePassword}
            onChange={(e) => set("rePassword", e.target.value)}
            className="pl-10 pr-11"
            autoComplete="new-password"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </Field>

      <Button
        id="signup-submit-btn"
        type="submit"
        variant="cta"
        className="w-full mt-2"
      >
        Continue
      </Button>
    </form>
  );
}
