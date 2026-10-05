
import authBg from "@/assets/auth-bg.webp"
import authImage from "@/features/auth/assets/auth-side-img.webp"
import { Outlet } from "react-router-dom";

// function IconField({
//   icon: Icon,
//   trailing,
//   ...props
// }: ComponentProps<typeof Input> & {
//   icon: typeof Mail
//   trailing?: ReactNode
// }) {
//   return (
//     <div className="relative">
//       <Icon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-font-2" />
//       <Input className={cn("pl-11", trailing && "pr-11")} {...props} />
//       {trailing ? (
//         <span className="absolute top-1/2 right-4 -translate-y-1/2 text-font-2">
//           {trailing}
//         </span>
//       ) : null}
//     </div>
//   )
// }
// function Section({
//   title,
//   children,
// }: {
//   title: string
//   children: ReactNode
// }) {
//   return (
//     <section className="space-y-4">
//       <h2 className="text-2xl">{title}</h2>
//       {children}
//     </section>
//   )
// }
export default function AuthLayout() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full overflow-hidden">
       <div
          className="absolute inset-0 bg-cover bg-center blur-md scale-105"
          style={{ backgroundImage: `url(${authBg})` }}
        ></div>
      <div className="relative z-10 flex flex-col items-center justify-center bg-foreground w-full py-20 px-auto">
       
      </div>
      <div className="relative z-10 flex w-full flex-col items-center justify-center bg-background/60 backdrop-blur-xl xl:flex-row xl:rtl:flex-row-reverse">
        <div className="flex w-full flex-col items-center justify-center border-b-2 border-primary/20 bg-background/20 py-16 drop-shadow-[0_4px_79.8px_rgba(0,0,0,0.25)] xl:w-1/2 xl:border-e-2 xl:border-b-0 xl:py-40">
          <img
            src={authImage}
            alt="Auth Layout"
            className="w-full max-w-[89.5%] object-cover"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center py-10 text-center xl:w-1/2 xl:py-0">
          <Outlet />
        </div>
      </div>


    </div>
  )
}
