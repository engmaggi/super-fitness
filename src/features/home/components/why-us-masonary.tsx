import img1 from "@/assets/whyUs-img-1.webp"
import img2 from "@/assets/whyUs-img-2.webp"
import img3 from "@/assets/whyUs-img-3.webp"
import img4 from "@/assets/whyUs-img-4.webp"

export default function whyUsMasonary() {
    return (
        <div className="grid  grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
            <img src={img1} alt="whyUs-img-1" className=" object-cover" />
            <img src={img2} alt="whyUs-img-2" className=" object-cover" />

            </div>
            <div className="flex flex-col gap-2 justify-end">
            <img src={img3} alt="whyUs-img-3" className=" object-cover" />
            <img src={img4} alt="whyUs-img-4" className=" object-cover" />
            </div>

        </div>
    )
}