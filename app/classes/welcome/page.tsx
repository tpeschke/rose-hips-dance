import './welcome.css'
import { mhiora } from "../../utilities/fonts";
import BackgroundImages from "@/app/components/backgroundImages/backgroundImages";
import RotatingSun from '@/app/homeComponents/rotatingSun/rotatingSun';
import Image from "next/image";

export default function Welcome() {
    return (
        <div className="welcome-page">
            <BackgroundImages />
            <RotatingSun />
            <div className="welcome-card">
                <p className="eyebrow">You're Registered</p>
                <h1 className={`${mhiora.className} antialiased`}>Welcome!</h1>
                <div className="eyebrow">
                    <Image
                        aria-hidden
                        src="/star.png"
                        alt="star"
                        width={35}
                        height={35}
                    />
                </div>
                
                <p>I'm excited to be apart of your healing journey and look forward to getting to know you.</p>

                <h2 className={`${mhiora.className} antialiased eyebrow`}>Next Steps</h2>
                <p>You'll receive an email shortly touching base with information about where the class is taking place.</p>
                <p>In the meantime, sit tight!</p>
                <br/>
                <p>But, if you have further questions, please don't hesitate to reach out at <span>tiarra.stout@gmail.com</span></p>
            </div>
        </div>
    )
}