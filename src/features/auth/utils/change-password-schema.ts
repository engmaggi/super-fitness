import type { TFunction } from "i18next";
import { z } from "zod";

export function createChangePasswordSchema(t: TFunction) {
  return z
    .object({
      currentPassword: z.string().min(1, t("auth.errors.passwordRequired")),
      newPassword: z
        .string()
        .min(1, t("auth.errors.passwordRequired"))
        .min(8, t("auth.errors.passwordMin"))
        .regex(/[A-Z]/, t("auth.errors.passwordUppercase"))
        .regex(/[a-z]/, t("auth.errors.passwordLowercase"))
        .regex(/\d/, t("auth.errors.passwordDigit"))
        .regex(/[@$!%*?&]/, t("auth.errors.passwordSpecial")),
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("auth.errors.passwordsDoNotMatch"),
      path: ["confirmNewPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: t("auth.errors.newPasswordSameAsCurrent"),
      path: ["newPassword"],
    });
}
