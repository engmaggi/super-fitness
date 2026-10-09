import type { TFunction } from "i18next";
import { z } from "zod";

export function createRegisterSchema(t: TFunction) {
    return z.object({
        firstName: z.string().min(1, t("auth.errors.firstNameRequired")),
        lastName: z.string().min(1, t("auth.errors.lastNameRequired")),
        email: z
            .string()
            .min(1, t("auth.errors.verifyEmailRequired"))
            .refine((email) => email.includes("@") && email.includes("."), {
                message: t("auth.errors.emailInvalid"),
            }),
        password: z
            .string()
            .min(1, t("auth.errors.passwordRequired"))
            .min(8, t("auth.errors.passwordMin"))
            .regex(/[A-Z]/, t("auth.errors.passwordUppercase"))
            .regex(/[a-z]/, t("auth.errors.passwordLowercase"))
            .regex(/\d/, t("auth.errors.passwordDigit"))
            .regex(/[@$!%*?&]/, t("auth.errors.passwordSpecial")),
        rePassword: z.string().min(1, t("auth.errors.rePasswordRequired")),
        gender: z.string().min(1, t("auth.errors.genderRequired")),
        height: z.coerce
            .number({ error: t("auth.errors.heightRequired") })
            .positive({ error: t("auth.errors.heightInvalid") }),
        weight: z.coerce
            .number({ error: t("auth.errors.weightRequired") })
            .positive({ error: t("auth.errors.weightInvalid") }),
        age: z.coerce
            .number({ error: t("auth.errors.ageRequired") })
            .positive({ error: t("auth.errors.ageInvalid") }),
        goal: z.string().min(1, t("auth.errors.goalRequired")),
        activityLevel: z.string().min(1, t("auth.errors.activityLevelRequired")),
    })
    .refine((data) => data.password === data.rePassword, {
        message: t("auth.errors.passwordsDoNotMatch"),
        path: ["rePassword"],
    });
}
export type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;