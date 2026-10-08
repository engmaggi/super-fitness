import { Outlet } from "react-router-dom";
import Header from "@/features/home/components/header";
import Footer from "@/features/home/components/footer";

export default function MainLayout() {
  return (
    <div className="relativeflex min-h-svh flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
