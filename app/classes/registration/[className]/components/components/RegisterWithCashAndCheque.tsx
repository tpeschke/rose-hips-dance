import { lemonade } from "@/app/utilities/fonts";
import { useState } from "react";

interface Props {
    disabled: boolean,
    approvedWithoutPaying: (hasPaid: boolean) => void
}

export default function RegisterWithCashAndCheque({ disabled, approvedWithoutPaying }: Props) {
    const [showWarning, setShowWarning] = useState(false)

    if (!showWarning) {
        return <button
            className={`${lemonade.className} antialiased gold`}
            onClick={_ => setShowWarning(true)}
            disabled={disabled}
        >
            Register with Cash or Cheque
        </button>
    }

    return (
        <>
            <p className="warning">The Cash or Cheque is due at the first class. If you're playing with Cash, you must bring the exact amount.</p>
            <button
                className={`${lemonade.className} antialiased gold`}
                onClick={_ => approvedWithoutPaying(false)}
            >
                I Understand
            </button>
            <button
                className={`${lemonade.className} antialiased transparent`}
                onClick={_ => setShowWarning(false)}
            >
                Never Mind Then
            </button>
        </>
    )
}