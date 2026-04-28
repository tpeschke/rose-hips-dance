import getEnvironmentVariables from "@/app/api/utilities/getEnvironmentVariables";
import { ApiError, Client, LogLevel, OrdersController } from "@paypal/paypal-server-sdk";

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

const captureOrder = async (orderID: string)
    : Promise<
        {
            jsonResponse: any,
            httpStatusCode: any
        } | undefined
    > => {
    const collect = {
        id: orderID,
        prefer: "return=minimal",
    };

    try {
        const { body, ...httpResponse } = await ordersController.captureOrder(
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

interface Request {
    params: {
        orderID: string
    }
}

interface Response {
    send: Function,
    status: Function
}

export async function POST(req: Request, res: Response) {
    try {
        const { orderID } = req.params;
        const response = await captureOrder(orderID);
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
};