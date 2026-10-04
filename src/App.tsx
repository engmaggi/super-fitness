import { Navigate, Route, Routes } from "react-router-dom"
import AuthLayout from "@/features/auth/components/auth-layout"
import RegisterPage from "@/features/auth/pages/register"
import DesignPage from "@/features/design-system/pages/design"

export default function App() {
  return (
    <Routes>
      <Route path="/design" element={<DesignPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/design" replace />} />
    </Routes>
  )
}
