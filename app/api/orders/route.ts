import { OrdersController, ApiError, Client, LogLevel, CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";
import getEnvironmentVariables from "../utilities/getEnvironmentVariables";

const {
    clientID,
    clientSecret,
    environment
} = getEnvironmentVariables()

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: clientID,
        oAuthClientSecret: clientSecret,
    },
    timeout: 0,
    environment,
    logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
    },
});

const ordersController = new OrdersController(client);

interface Cart {
    intent: CheckoutPaymentIntent
}

interface Request {
    body: {
        cart: Cart
    }
}

const createOrder = async (cart: Cart)
    : Promise<
        {
            jsonResponse: any,
            httpStatusCode: any
        } | undefined
    > => {
    const collect = {
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: "USD",
                        value: "100",
                        breakdown: {
                            itemTotal: {
                                currencyCode: "USD",
                                value: "100",
                            },
                        },
                    },
                    items: [
                        {
                            name: "T-Shirt",
                            unitAmount: {
                                currencyCode: "USD",
                                value: "100",
                            },
                            quantity: "1",
                            description: "Super Fresh Shirt",
                            sku: "sku01",
                        },
                    ],
                },
            ],
        },
        prefer: "return=minimal",
    };


    try {
        const { body, ...httpResponse } = await ordersController.createOrder(
            collect
        );
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return {
            jsonResponse: body,
            httpStatusCode: httpResponse.statusCode,
        };
    } catch (error) {
        if (error instanceof ApiError) {
            // const { statusCode, headers } = error;
            throw new Error(error.message);
        }
    }
};

export async function POST(req: Request) {
    try {
        // use the cart information passed from the front-end to calculate the order amount details
        const { cart } = req.body;
        const response = await createOrder(cart);
        if (response) {
            const { jsonResponse, httpStatusCode } = response
            return new Response(JSON.stringify(jsonResponse), {
                status: httpStatusCode,
                headers: { 'Content-Type': 'application/json' }
            })
        } else {
            return new Response(JSON.stringify({ error: "Failed to create order." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            })
        }
    } catch (error) {
        console.error("Failed to create order:", error);
        return new Response(JSON.stringify({ error: "Failed to create order." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}