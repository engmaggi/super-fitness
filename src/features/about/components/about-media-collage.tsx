import about1 from "@/assets/about-1.png"
import about2 from "@/assets/about-2.png"
import about3 from "@/assets/about-3.png"

export function AboutMediaCollage() {
  return (
    <>
      <div className="w-full space-y-4 sm:space-y-5 lg:hidden">
        <img
          src={about1}
          alt="Athlete holding a kettlebell"
          className="w-full rounded-3xl object-cover shadow-xl aspect-[4/5]"
        />
        <img
          src={about2}
          alt="Personal training session"
          className="w-full rounded-3xl object-cover shadow-xl aspect-[16/10]"
        />
        <img
          src={about3}
          alt="Member working out in the gym"
          className="w-full rounded-3xl object-cover shadow-xl aspect-[4/5]"
        />
      </div>

      <div className="relative hidden h-[46rem] w-full lg:block">
        <img
          src={about1}
          alt="Athlete holding a kettlebell"
          className="absolute top-0 left-0 z-10 h-[30rem] w-[48%] rounded-4xl object-cover shadow-xl"
        />
        <img
          src={about2}
          alt="Personal training session"
          className="absolute top-10 right-0 z-30 h-[10.5rem] w-[44%] rounded-4xl object-cover shadow-xl"
        />
        <img
          src={about3}
          alt="Member working out in the gym"
          className="absolute right-[8%] bottom-0 z-20 h-[31rem] w-[58%] rounded-[2.5rem] object-cover shadow-xl"
        />
      </div>
    </>
  )
}
