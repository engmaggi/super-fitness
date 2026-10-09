import type { TFunction } from "i18next";
import { z } from "zod";

export function createLoginSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .min(1, t("auth.errors.verifyEmailRequired"))
      .refine((email) => email.includes("@") && email.includes("."), {
        message: t("auth.errors.emailInvalid"),
      }),
    password: z.string().min(1, t("auth.errors.passwordRequired")),
  });
}

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
