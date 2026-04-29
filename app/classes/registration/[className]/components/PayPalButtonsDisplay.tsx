import { OnApproveDataOneTimePayments, PayPalGuestPaymentButton, PayPalOneTimePaymentButton, PayPalProvider, VenmoOneTimePaymentButton } from "@paypal/react-paypal-js/sdk-v6";
import createOrder from "./utilities/createOrder";
import onApprove from "./utilities/onApprove";
import { ClassInterface } from "../page";
import './PayPalButtonDisplay.css'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

interface Props {
    classes: ClassInterface[],
    canSubmit: boolean,
    registrationInfo: {
        firstName: string | null, secondName: string | null, phoneNumber: string | null, email: string | null, address: string | null, classes: ClassInterface[], hasAgreed: boolean, recommendation: string | null
    }
}

export default function PayPalButtonsDisplay({ classes, canSubmit, registrationInfo }: Props) {
    const router = useRouter()

    const clientId = process.env.ENVIRONMENT === 'Sandbox' ? 'test' : process.env.CLIENT_ID

    const total = classes.reduce((currentTotal, { cost }) => currentTotal + cost, 0)
    const items = classes.map(({ title, cost }) => {
        return {
            name: title,
            unitAmount: {
                currencyCode: "USD",
                value: `${cost}`,
            },
            quantity: "1",
            description: "",
            sku: title,
        }
    })

    const cart = [
        {
            amount: {
                currencyCode: "USD",
                value: `${total}`,
                breakdown: {
                    itemTotal: {
                        currencyCode: "USD",
                        value: `${total}`,
                    },
                },
            },
            items
        }
    ]

    const onApproveAndRerouteOnSuccess = async (inputData: OnApproveDataOneTimePayments): Promise<void> => {
        const result = await onApprove(inputData)
        if (result) {
            const { status } = await axios.post('/api/register', {
                ...registrationInfo,
                classes: registrationInfo.classes.map(({title}) => title),
                hasPaid: true,
                amount: total
            })

            switch (status) {
                case 201:
                    toast.success("You're Registered!")
                    break;
                default:
                    toast.info(`Status: ${status}`)
            }
            router.push('/classes/welcome')
        }
    }

    return (
        <div className="paypal-buttons">
            <PayPalProvider
                clientId={clientId}
                components={["paypal-payments", "venmo-payments", 'paypal-guest-payments']}
                pageType="checkout"
            >
                <PayPalOneTimePaymentButton
                    createOrder={() => createOrder(cart)}
                    onApprove={onApproveAndRerouteOnSuccess}
                    presentationMode={'auto'}
                    disabled={!canSubmit}
                />
                <VenmoOneTimePaymentButton
                    createOrder={() => createOrder(cart)}
                    onApprove={onApproveAndRerouteOnSuccess}
                    presentationMode={'auto'}
                    disabled={!canSubmit}
                />
                <PayPalGuestPaymentButton
                    createOrder={() => createOrder(cart)}
                    onApprove={onApproveAndRerouteOnSuccess}
                    disabled={!canSubmit}
                />
            </PayPalProvider>
        </div>
    )
}