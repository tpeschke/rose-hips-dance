import { OnApproveDataOneTimePayments } from "@paypal/react-paypal-js/sdk-v6";
import axios from "axios";
import { toast } from "react-toastify";

export default async function onApprove(inputData: OnApproveDataOneTimePayments): Promise<boolean | void> {
    try {
        const { data } = await axios.get(
            "/api/orders/" + inputData.orderId
        );

        const orderData = await JSON.parse(data);

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            toast.error(`Declined`)
            throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`
            );
        } else if (errorDetail) {
            toast.error(`${errorDetail.description} (${orderData.debug_id})`)
            throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`
            );
        } else {
            return true
        }
    } catch (error) {
        toast.error(`Sorry, your transaction could not be processed\n${error}`)
    }
}