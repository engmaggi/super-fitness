import footerLogo from "@/assets/footerLogo.png";
import phoneIcon from "@/assets/icons/phoneIcon.png";
import mailIcon from "@/assets/icons/mailIcon.png";
import AutoplayCarousel from "./autoplay-carousel";
export default function Footer() {
  return (
    <footer className="w-full  bg-neutral-950/80">
       <AutoplayCarousel />
      {/* Orange banner/ticker from Figma design */}
      <div className="flex flex-col lg:flex-row items-start justify-between px-4 py-4 lg:px-20 lg:pt-10 lg:pb-20 gap-4 lg:gap-0">
        <div className="flex flex-col ">
          <img src={footerLogo} alt="footerLogo" className="max-w-22 h-auto mb-2" />
          <p className="font-heading text-lg leading-[1.6] text-foreground">Push harder, go further. Your <br />
            fitness journey starts today!
          </p>
        </div>
        <div className="flex flex-col ">
          <p className="font-heading font-bold text-lg leading-[1.6] text-foreground uppercase mb-6">
            contact us
          </p>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center justify-center w-10 h-10 border border-[#3F4553] rounded-full p-2 text-white">
                <img src={phoneIcon} alt="phoneIcon" className="w-4 h-4" />
              </div>
              <p className="font-heading text-lg leading-[1.6] text-foreground">
                +966 555 555 555
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center w-10 h-10 border border-[#3F4553] rounded-full p-2 text-white">
                <img src={mailIcon} alt="mailIcon" className="w-4 h-4" />
              </div>
              <a href="mailto:info@gmail.com" className="font-heading text-lg leading-[1.6] text-foreground hover:underline">
                info@gmail.com
              </a>
            </div>
          </div>


        </div>
        <div className="flex flex-col ">
          <p className="font-heading font-bold text-lg leading-[1.6] text-foreground uppercase mb-6">
            our gym timing          </p>
          <p className="font-heading text-lg leading-[1.6] text-foreground mb-2">Mon - Fri : 08:00 AM - 10:00 PM
          </p>
          <p className="font-heading text-lg leading-[1.6] text-foreground">Mon - Fri : 08:00 AM - 10:00 PM
          </p>
        </div>
        <div className="flex flex-col ">
          <p className="font-heading font-bold text-lg leading-[1.6] text-foreground uppercase mb-6">
          our location         </p>
          <p className="font-heading text-lg leading-[1.6] text-foreground mb-2">2715 Ash Dr. San Jose, South<br/> Dakota 83475 
          </p>
         
        </div>
      </div>

    </footer>
  );
}
