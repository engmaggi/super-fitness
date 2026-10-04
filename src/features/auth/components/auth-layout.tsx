
import authBg from "@/assets/auth-bg.webp"
import authImage from "@/features/auth/assets/auth-side-img.webp"
import { Eye, Mail, Lock } from "lucide-react";
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
      <div className="relative z-10 flex items-center justify-center w-full  bg-background/60 backdrop-blur-xl">
       
        <div className="flex flex-col items-center justify-center w-1/2 mx-auto my-auto pt-40 pb-40 border-r-2 border-primary/20 drop-shadow-[0_4px_79.8px_rgba(0,0,0,0.25)] bg-background/20 ">
          <img
            src={authImage}
            alt="Auth Layout"
            className="object-cover w-full max-w-[89.5%]"
          />
        </div>
        <div className=" flex flex-col items-center justify-center w-1/2 mx-auto my-auto text-center">
         <Outlet />
        </div>
      </div>


    </div>
  )
}
