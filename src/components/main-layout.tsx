import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@/features/home/components/header";
import Footer from "@/features/home/components/footer";
import { SmartCoachWidget } from "@/features/smart-coach";
import { useAuth } from "@/features/auth/context/use-auth";

export default function MainLayout() {
  const { user } = useAuth();
  const userId = user ? String(user.id) : null;
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="relativeflex min-h-svh flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
      <SmartCoachWidget
        key={userId ?? "guest"}
        userId={userId}
        onRequireLogin={() => navigate("/login", { state: { from: location.pathname } })}
      />
    </div>
  );
}
