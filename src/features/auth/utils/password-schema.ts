import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password should be at least 8 characters long")
      .regex(/[A-Z]/, "Password should contain at least one uppercase letter (A-Z)")
      .regex(/[a-z]/, "Password should contain at least one lowercase letter (a-z)")
      .regex(/\d/, "Password should contain at least one digit (0-9)")
      .regex(/[@$!%*?&]/, "Password should contain at least one special character (e.g., @$!%*?&)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });