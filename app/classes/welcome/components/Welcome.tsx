import { mhiora } from "../../../utilities/fonts";
import Image from "next/image";
import Link from 'next/link';
import RegisteredClassDisplay from './RegisteredClassDisplay/RegisteredClassDisplay';
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function Welcome() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const registeredClasses = searchParams.get('classes')?.split(',')

    if (!registeredClasses || registeredClasses?.length === 0) {
        router.push('/')
    }
    return (
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

            <p>I'm excited to be a part of your healing journey and look forward to getting to know you.</p>

            <h2 className={`${mhiora.className} antialiased eyebrow`}>Next Steps</h2>
            <p>Save the following information (if you loose it; no worries, you can always reach out via our <Link href='/contact'>Contact Page</Link>).</p>

            <div>
                {registeredClasses?.map((nameOfClass, index) => {
                    return <RegisteredClassDisplay key={index} nameOfClass={nameOfClass} />
                })}
            </div>

            <p>But, if you have further questions, please don't hesitate to reach out at <Link href='/contact'>Contact Page</Link></p>
            <p>Otherwise, I'll see you in class!</p>
        </div>
    )
}