import starIcon from '@/assets/icons/star-icon.png';
import { useTranslation } from 'react-i18next';




export default function AutoplayCarousel() {
    const { t } = useTranslation();
    const items = t("autoplayTicker", { returnObjects: true }) as readonly string[];

    return (
        <div className=" grid w-full min-w-0 grid-cols-1 overflow-hidden bg-primary py-4 lg-py-6">
            <div className=" ticker-track flex w-max gap-5" >
                {[...items, ...items].map((item, index) => (
                    <div key={index} className="flex flex-row items-center justify-center  ms-4 ">
                        <img src={starIcon} alt="" className="w-6 h-6 lg:w-9 lg:h-9"/>
                        <p className="font-ticker text-base lg:text-ticker font-bold leading-36 tracking-0 ms-2 lg:ms-4 ">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
