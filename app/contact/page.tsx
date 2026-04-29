import BackgroundImages from '../components/backgroundImages/backgroundImages'
import RotatingSun from '../homeComponents/rotatingSun/rotatingSun'
import { mhiora } from '../utilities/fonts'
import Image from "next/image";
import './contact.css'

export default function Contact() {
    return (
        <div className="contact-page">
            <BackgroundImages />
            <RotatingSun />
            <div className="contact-card">
                <p className="eyebrow">Questions?</p>
                <h1 className={`${mhiora.className} antialiased`}>Contact</h1>
                <div className="eyebrow">
                    <Image
                        aria-hidden
                        src="/star.png"
                        alt="star"
                        width={35}
                        height={35}
                    />
                </div>

                <div>
                    <h2 className={`${mhiora.className} antialiased`}>Email</h2>
                    <p className='subtitle'>tiarra.stout@gmail.com</p>
                    
                    <h2 className={`${mhiora.className} antialiased`}>Instagram</h2>
                    <p className='subtitle'>tiarra.stout@gmail.com</p>
                </div>
            </div>
        </div>
    )
}