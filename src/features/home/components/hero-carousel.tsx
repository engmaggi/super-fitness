import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import starIcon from '@/assets/icons/star-icon.png';
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"



export default function HeroCarousel() {
    const autoplay = useRef(Autoplay({ delay: 0, stopOnInteraction: false }))
    return (
        <div className="w-full">
            <Carousel orientation="horizontal"
                opts={{ loop: true, align: "start" }}
                plugins={[autoplay.current]}>
                <CarouselContent>
                    <CarouselItem className="basis-auto ">
                        <div className="flex flex-row items-center justify-center rtl:flex-row-reverse">
                            <img src={starIcon} alt="Hero Image" />
                            <p className="font-ticker text-ticker font-bold leading-36 tracking-0 ms-4">outdoor & online trainers</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-auto ">
                        <div className="flex flex-row items-center justify-center rtl:flex-row-reverse">
                            <img src={starIcon} alt="Hero Image" />
                            <p className="font-ticker text-ticker font-bold leading-36 tracking-0 ms-4" >personal training</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-auto ">
                        <div className="flex flex-row items-center justify-center rtl:flex-row-reverse">
                            <img src={starIcon} alt="Hero Image" />
                            <p className="font-ticker text-ticker font-bold leading-36 tracking-0 ms-4">live classes</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-auto ">
                        <div className="flex flex-row items-center justify-center rtl:flex-row-reverse">
                            <img src={starIcon} alt="Hero Image" />
                            <p className="font-ticker text-ticker font-bold leading-36 tracking-0 ms-4">personal trainers</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-auto ">
                        <div className="flex flex-row items-center justify-center rtl:flex-row-reverse">
                            <img src={starIcon} alt="Hero Image" />
                            <p className="font-ticker text-ticker font-bold leading-36 tracking-0 ms-4">outdoor & online trainers</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="basis-auto ">
                        <div className="flex flex-row items-center justify-center rtl:flex-row-reverse">
                            <img src={starIcon} alt="Hero Image" />
                            <p className="font-ticker text-ticker font-bold leading-36 tracking-0 ms-4" >personal training</p>
                        </div>
                    </CarouselItem>
                </CarouselContent>


            </Carousel>
        </div>
    )
}
