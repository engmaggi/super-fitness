import type { TFunction } from "i18next";
import { z } from "zod";

export function createPasswordSchema(t: TFunction) {
  return z
    .object({
      password: z
        .string()
        .min(1, t("auth.errors.passwordRequired"))
        .min(8, t("auth.errors.passwordMin"))
        .regex(/[A-Z]/, t("auth.errors.passwordUppercase"))
        .regex(/[a-z]/, t("auth.errors.passwordLowercase"))
        .regex(/\d/, t("auth.errors.passwordDigit"))
        .regex(
          /[@$!%*?&]/,
          t("auth.errors.passwordSpecial"),
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.errors.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });
}
