import heroBg from '@/assets/hero-bg.webp'
import heroImage from '@/assets/hero-img.webp'
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
export default function HeroSection() {
  const targets = [1200, 12, 20];
  const [tickerCount, setTickerCount] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerCount((prev: number[]) => {
        return prev.map((value, index) => {
          const target = targets[index]
          if (value >= target) return value;
          const step = Math.ceil(target / 100);
          return Math.min(value + step, target);
        })
      })
    }, 50);
    return () => clearInterval(interval);

  }, []);

  return (
    <section className="relative flex  w-full flex-col items-center justify-center overflow-hidden bg-center bg-cover  pt-27.5 px-4 md:px-20 md:pt-50"
      style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="absolute inset-0 bg-background/60 backdrop-blur-lg"></div>
      <div className="relative z-10 flex h-full w-full flex-1 flex-col items-center justify-center lg:flex-row lg:rtl:flex-row-reverse lg:justify-between">
        <div className="w-full lg:w-[54.3%]">
          <h1 className="font-heading text-2xl leading-140 font-bold text-text uppercase mb-4 lg:text-6xl lg:leading-140 lg:mb-6">Your body can <span className="text-primary">stand almost</span> anything</h1>
          <div className="w-full lg:w-[84%] border-s-2 border-primary ps-4 mb-4 lg:mb-17">
            <p className="font-sans text-lg leading-[1.6]">It's your mind that needs convincing. Push past your limits, stay committed, and watch as your body transform into powerhouse of strength and resilience. Start your journey today & truly capable of!</p>
          </div>
          <div className="flex flex-col gap-2 mb-4 lg:flex-row lg:gap-8 lg:mb-16">
            <div>
              <p className="font-ticker text-ticker font-bold leading-36 tracking-0" >{tickerCount[0]}+</p>
              <p className="font-sans text-lg leading-[1.6]">Active Members</p>
            </div>
            <div>
              <p className="font-ticker text-ticker font-bold leading-36 tracking-0">{tickerCount[1]}+</p>
              <p className="font-sans text-lg leading-[1.6]">Certified Trainers</p>
            </div>
            <div>
              <p className="font-ticker text-ticker font-bold leading-36 tracking-0">{tickerCount[2]}+</p>
              <p className="font-sans text-lg leading-[1.6]">Year Of Experience</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 lg:flex-row lg:gap-8'>
            <Button className="btn-arrow relative"
              variant="pill">Get Started</Button>
                <Button className="btn-arrow relative bg-transparent text-primary hover:text-primary-foreground border-primary "
              variant="pill">Explore More</Button>
          </div>
          
        </div>
        <div className="w-full lg:w-[36.5%]">
          <img src={heroImage} alt="Hero Image" className=" h-full object-cover" />
        </div>
      </div>
    </section>
  );
}