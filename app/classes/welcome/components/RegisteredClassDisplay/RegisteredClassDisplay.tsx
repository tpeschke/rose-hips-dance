import classInfo from "@/app/utilities/classInfo"
import { mhiora } from "@/app/utilities/fonts"
import './RegisteredClassDisplay.css'

interface Props {
    nameOfClass: string
}

export default function RegisteredClassDisplay({ nameOfClass }: Props) {
    const [info]: {
        title: string;
        image?: string;
        skillLevel: string;
        body: string[];
        prereqs: never[];
        time: string;
        address?: string;
        cost: number;
    }[] = [
        ...classInfo.inPerson,
        ...classInfo.online
    ].filter(singleClassInfo => singleClassInfo.title === nameOfClass)

    if (!info) {
        return <></>
    }

    const { title, time, address } = info

    return (
        <div className="registered-class-display">
            <h3>{title}</h3>
            <p>
                <strong className={`${mhiora.className} antialiased`}>
                    Time:{"\n"}
                </strong>{" "}
                {time}
            </p>
            {address ? (
                <p>
                    <strong className={`${mhiora.className} antialiased`}>
                        Location:{" "}
                    </strong>{" "}
                    {address}
                </p>
            ) : (
                <p>
                    <strong className={`${mhiora.className} antialiased`}>
                        Location:{"\n"}
                    </strong>{" "}
                    Online
                </p>
            )}
        </div>
    )
}