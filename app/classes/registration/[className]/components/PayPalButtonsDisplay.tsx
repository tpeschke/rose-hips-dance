import { PayPalGuestPaymentButton, PayPalOneTimePaymentButton, PayPalProvider, VenmoOneTimePaymentButton } from "@paypal/react-paypal-js/sdk-v6";
import createOrder from "./utilities/createOrder";
import onApprove from "./utilities/onApprove";

export default function PayPalButtonsDisplay() {
    const clientId = process.env.ENVIRONMENT === 'Sandbox' ? 'test' : process.env.CLIENT_ID

    return (
        <>
            <PayPalProvider
                clientId={clientId}
                components={["paypal-payments", "venmo-payments", 'paypal-guest-payments']}
                pageType="checkout"
            >
                <PayPalOneTimePaymentButton
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
                <VenmoOneTimePaymentButton
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
                <PayPalGuestPaymentButton
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </PayPalProvider>
        </>
    )
}