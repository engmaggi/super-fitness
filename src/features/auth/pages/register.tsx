import { useTranslation } from "react-i18next";
import RegisterForm from "../components/register-form";

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <>
      <p className="font-heading text-2xl leading-140">{t("auth.greeting")}</p>
      <h2 className="text-5xl font-extrabold leading-140">{t("auth.createAccount")}</h2>
      <RegisterForm />
    </>
  );
}
