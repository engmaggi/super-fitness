import type { ComponentProps, ReactNode } from "react"
import { Eye, Lock, Mail } from "lucide-react"
import { cn } from "cn"
import { Logo } from "@/components/brand/logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { figmaTokens } from "@/lib/tokens"
import { toast } from "sonner"

const colors = [
  { name: "Main", hex: figmaTokens.color.main, className: "bg-primary" },
  {
    name: "Link accent",
    hex: figmaTokens.color.linkAccent,
    className: "bg-link-accent",
  },
  { name: "Font 2", hex: figmaTokens.color.font2, className: "bg-font-2" },
  { name: "Text", hex: figmaTokens.color.text, className: "bg-foreground" },
  {
    name: "Surface",
    hex: figmaTokens.color.surface,
    className: "bg-surface border border-border",
  },
  {
    name: "Border",
    hex: figmaTokens.color.border,
    className: "bg-secondary border border-border",
  },
  { name: "Input", hex: figmaTokens.color.input, className: "bg-input" },
]

const typeSamples = [
  {
    label: "Section 64 / Bold",
    className: "font-heading text-6xl font-bold",
    text: "Workouts",
  },
  {
    label: "Page title — Desktop-6",
    specs:
      "font-family: Baloo Thambi 2; font-size: 40px; font-weight: 500; line-height: 1.4; color: #F3F3F4",
    className: "text-page-title",
    text: "Get to know about us",
  },
  {
    label: "Auth title 24 / ExtraBold",
    className: "font-heading text-2xl font-extrabold",
    text: "Login",
  },
  {
    label: "Welcome 20 / ExtraBold",
    className: "font-heading text-xl font-extrabold uppercase",
    text: "Welcome Back",
  },
  {
    label: "Greeting 18 / Regular",
    className: "font-heading text-lg font-normal",
    text: "Hey There",
  },
  {
    label: "Body 18 / Rubik",
    className: "font-sans text-lg leading-[1.6]",
    text: "Push harder, go further. Your fitness journey starts today.",
  },
  {
    label: "CTA 14–16 / ExtraBold",
    className: "font-heading text-sm font-extrabold sm:text-base",
    text: "Confirm",
  },
  {
    label: "Get Started 16 / Rubik SemiBold",
    className: "font-sans text-base font-semibold",
    text: "Get Started",
  },
  {
    label: "Input 12 / Regular",
    className: "font-heading text-xs font-normal text-font-2",
    text: "Email",
  },
]

const classes = [
  { title: "Chest Exercise", level: "Beginner" as const },
  { title: "Fat Body", level: "Intermediate" as const },
  { title: "Shoulder", level: "Advanced" as const },
  { title: "Legs", level: "Beginner" as const },
]

function levelVariant(level: (typeof classes)[number]["level"]) {
  if (level === "Beginner") return "beginner" as const
  if (level === "Intermediate") return "intermediate" as const
  return "advanced" as const
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

export default function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden gap-6 font-heading text-sm text-muted-foreground sm:flex">
            <span className="text-foreground">Home</span>
            <span>About</span>
            <span>Classes</span>
            <span>Healthy</span>
          </nav>
          <Button variant="pill">Get Started</Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
        <div>
          <p className="font-heading text-sm tracking-[0.2em] text-primary uppercase">
            Design system
          </p>
          <h1 className="mt-2 text-5xl">Super Fitness</h1>
          <p className="mt-3 max-w-2xl font-sans text-lg leading-[1.6] text-muted-foreground">
            Tokens from the Copy file. Named variables are Main and Font 2. The
            rest comes from Login, Register, OTP, About, and Classes layers.
          </p>
        </div>

        <Section title="Color">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {colors.map((color) => (
              <div key={color.name} className="space-y-2">
                <div className={`h-16 rounded-[20px] ${color.className}`} />
                <p className="font-heading text-xs text-foreground">
                  {color.name}
                </p>
                <p className="font-heading text-xs text-muted-foreground">
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <div className="space-y-6">
            {typeSamples.map((sample) => (
              <div key={sample.label}>
                <p className="mb-1 font-heading text-xs text-muted-foreground">
                  {sample.label}
                </p>
                {"specs" in sample && sample.specs ? (
                  <p className="mb-2 font-sans text-xs leading-5 text-font-2">
                    {sample.specs}
                  </p>
                ) : null}
                <p className={sample.className}>{sample.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Radius">
          <div className="flex flex-wrap gap-6">
            <div className="space-y-2">
              <div className="size-20 rounded-[20px] bg-primary" />
              <p className="font-heading text-xs text-muted-foreground">
                Control 20
              </p>
            </div>
            <div className="space-y-2">
              <div className="size-20 rounded-auth bg-primary" />
              <p className="font-heading text-xs text-muted-foreground">
                Auth 50
              </p>
            </div>
            <div className="space-y-2">
              <div className="size-20 rounded-full bg-primary" />
              <p className="font-heading text-xs text-muted-foreground">
                Pill 100
              </p>
            </div>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="cta">Login</Button>
            <Button variant="pill">Get Started</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Forget Password ?</Button>
            <Button variant="link-accent">Register</Button>
          </div>
        </Section>

        <Section title="Auth">
          <div className="max-w-md rounded-auth bg-[rgba(36,36,36,0.1)] px-4 py-6 backdrop-blur-[17.3px]">
            <p className="font-heading text-lg">Hey There</p>
            <p className="font-heading text-xl font-extrabold uppercase">
              Welcome Back
            </p>
            <div className="mt-6 space-y-4">
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
                onClick={() => toast.success("Login")}
              >
                Login
              </Button>
              <p className="text-center font-heading text-sm">
                Dont have an account yet ?{" "}
                <Button variant="link-accent">Register</Button>
              </p>
            </div>
          </div>
        </Section>

        <Section title="OTP">
          <Card className="max-w-md rounded-auth bg-[rgba(36,36,36,0.1)] ring-0 backdrop-blur-[17.3px]">
            <CardHeader>
              <CardTitle className="text-center font-heading text-2xl font-extrabold">
                OTP code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center font-heading text-lg">
                Enter the OTP you have received
              </p>
              <InputOTP maxLength={4} id="otp" containerClassName="justify-center">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                variant="cta"
                className="w-full"
                onClick={() => toast.success("OTP confirmed")}
              >
                Confirm
              </Button>
              <p className="text-center font-heading text-sm text-font-2">
                didn’t receive verification code?
              </p>
              <div className="flex justify-center">
                <Button variant="link-accent">Resend Code</Button>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge variant="beginner">Beginner</Badge>
            <Badge variant="intermediate">Intermediate</Badge>
            <Badge variant="advanced">Advanced</Badge>
            <Badge variant="price">Buy now $45</Badge>
          </div>
        </Section>

        <Section title="Classes">
          <Tabs defaultValue="chest">
            <TabsList>
              <TabsTrigger value="chest">Chest</TabsTrigger>
              <TabsTrigger value="arm">Arm</TabsTrigger>
              <TabsTrigger value="legs">Legs</TabsTrigger>
            </TabsList>
            <TabsContent value="chest" className="pt-4">
              <Carousel className="mx-12">
                <CarouselContent>
                  {classes.map((item) => (
                    <CarouselItem
                      key={item.title}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="rounded-[20px]">
                        <div className="h-36 bg-secondary" />
                        <CardHeader>
                          <Badge variant={levelVariant(item.level)}>
                            {item.level}
                          </Badge>
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
            <TabsContent value="arm" className="pt-4 text-muted-foreground">
              Same card pattern for arm classes.
            </TabsContent>
            <TabsContent value="legs" className="pt-4 text-muted-foreground">
              Same card pattern for legs classes.
            </TabsContent>
          </Tabs>
        </Section>

        <Separator />
        <footer className="bg-primary px-6 py-4 font-heading text-sm font-medium text-primary-foreground">
          Classes / Outdoor & online trainers / Personal trainers / Live classes
        </footer>
      </main>
    </div>
  )
}
