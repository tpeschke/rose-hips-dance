import { OnApproveDataOneTimePayments, PayPalGuestPaymentButton, PayPalOneTimePaymentButton, PayPalProvider, VenmoOneTimePaymentButton } from "@paypal/react-paypal-js/sdk-v6";
import createOrder from "./utilities/createOrder";
import onApprove from "./utilities/onApprove";
import { ClassInterface } from "../page";
import './PayPalButtonDisplay.css'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import RegisterWithCashAndCheque from "./components/RegisterWithCashAndCheque";

interface Props {
    classes: ClassInterface[],
    canSubmit: boolean,
    registrationInfo: {
        firstName: string | null, lastName: string | null, phoneNumber: string | null, email: string | null, classes: ClassInterface[], hasAgreed: boolean, recommendation: string | null
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

    const onApproveAndRerouteOnSuccess = async (inputData: OnApproveDataOneTimePayments, hasPaid: boolean): Promise<void> => {
        const result = await onApprove(inputData)
        if (result) {
            approvedWithoutPaying(hasPaid)
        }
    }

    const approvedWithoutPaying = async (hasPaid: boolean) => {
        const classTitles = registrationInfo.classes.map(({ title }) => title)

        const { status } = await axios.post('/api/register', {
            ...registrationInfo,
            classes: classTitles,
            hasPaid,
            amount: total
        })

        switch (status) {
            case 201:
                toast.success("You're Registered!")
                break;
            default:
                toast.info(`Status: ${status}`)
        }
        const params = new URLSearchParams({
            classes: classTitles.join(','),
        });

        router.push('/classes/welcome?' + params.toString())
    }

    return (
        <div className="paypal-buttons">
            <PayPalProvider
                clientId={clientId}
                components={["paypal-payments", "venmo-payments"]}
                pageType="checkout"
            >
                <PayPalOneTimePaymentButton
                    createOrder={() => createOrder(cart)}
                    onApprove={(inputData: OnApproveDataOneTimePayments) => onApproveAndRerouteOnSuccess(inputData, true)}
                    presentationMode={'auto'}
                    disabled={!canSubmit}
                />
                <VenmoOneTimePaymentButton
                    createOrder={() => createOrder(cart)}
                    onApprove={(inputData: OnApproveDataOneTimePayments) => onApproveAndRerouteOnSuccess(inputData, true)}
                    presentationMode={'auto'}
                    disabled={!canSubmit}
                />
            </PayPalProvider>

            <RegisterWithCashAndCheque
                disabled={!canSubmit}
                approvedWithoutPaying={approvedWithoutPaying}
            />
        </div>
    )
}