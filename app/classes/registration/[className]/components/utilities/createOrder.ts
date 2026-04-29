import { PurchaseUnitRequest } from "@paypal/paypal-server-sdk";
import axios from "axios";
import { toast } from "react-toastify";

export default async function createOrder(cart: PurchaseUnitRequest[]): Promise<{ orderId: string }> {
    try {
        const { data } = await axios.post(
            "/api/orders/create",
            {
                cart
            }
        );

        const orderData = JSON.parse(data)

        if (orderData.id) {
            return { orderId: orderData.id }
        } else {
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);
            toast.error(`Could not initiate PayPal Checkout\n${errorMessage}`)
            return { orderId: '' }
        }
    } catch (error) {
        toast.error(`Could not initiate PayPal Checkout\n${error}`)
        return { orderId: '' }
    }
}