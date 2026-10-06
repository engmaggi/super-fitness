import { useTranslation } from "react-i18next";
import LoginForm from "../components/login-form";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <>
      <p className="font-heading text-2xl leading-140">{t("auth.greeting")}</p>
      <h2 className="text-5xl font-extrabold leading-140">{t("auth.welcomeBack")}</h2>
      <LoginForm />
    </>
  );
}
