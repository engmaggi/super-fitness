import { Button } from "@/components/ui/button";
import authImage from "@/features/auth/assets/auth-side-img.webp"
import { Eye, Mail, Lock } from "lucide-react";
import type { ComponentProps } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

function IconField({
  icon: Icon,
  trailing,
  ...props
}: ComponentProps<typeof Input> & {
  icon: typeof Mail
  trailing?: ReactNode
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-font-2" />
      <Input className={cn("pl-11", trailing && "pr-11")} {...props} />
      {trailing ? (
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-font-2">
          {trailing}
        </span>
      ) : null}
    </div>
  )
}
function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </section>
  )
}
export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center bg-foreground w-full py-20 px-auto">
        <Outlet />
      </div>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center justify-center w-1/2 mx-auto my-auto">
          <img
            src={authImage}
            alt="Auth Layout"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 mx-auto my-auto text-center">
        <p className="font-heading text-lg">Hey There</p>
          <Section title="Create an account">
            <div className="max-w-md rounded-auth bg-[rgba(36,36,36,0.1)] px-4 py-6 backdrop-blur-[17.3px]">
              
           
              <div className="mt-6 space-y-4 border border-muted-foreground rounded-auth p-10">
                <p className="text-center font-heading text-2xl font-extrabold">
                  Login
                </p>
                <IconField icon={Mail} placeholder="Email" />
                <IconField  
                  icon={Lock}
                  placeholder="Password"
                  type="password"
                  trailing={<Eye className="size-5" />}
                />
                <div className="flex justify-end">
                  <Button variant="link">Forget Password ?</Button>
                </div>
                <Button
                  variant="cta"
                  className="w-full"
                  onClick={() => toast.success("Register")}
                >
                  Register
                </Button>
                <p className="text-center font-heading text-sm">
                  Dont have an account yet ?{" "}
                  <Button variant="link-accent">Register</Button>
                </p>
              </div>
            </div>
          </Section>
        </div>
      </div>


    </div>
  )
}
