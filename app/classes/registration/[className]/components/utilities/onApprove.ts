import { toast } from "react-toastify";

export default async function onApprove(data: any, actions: any): Promise<any> {
    try {
        const response = await fetch(
            `/api/orders/${data.orderID}/capture`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const orderData = await response.json();

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
        } else if (errorDetail) {
            toast.error(`${errorDetail.description} (${orderData.debug_id})`)
            throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`
            );
        } else {
            const transaction =
                orderData.purchase_units[0].payments
                    .captures[0];
            toast.success(`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`)
            console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
            );
        }
    } catch (error) {
        toast.error(`Sorry, your transaction could not be processed\n${error}`)
    }
}