import { Environment } from "@paypal/paypal-server-sdk"

interface FunctionReturn {
    environment: Environment,
    clientID: string,
    clientSecret: string,
    endpointURL: string
}

export default function getEnvironmentVariables(): FunctionReturn {
    const environment = process.env.ENVIRONMENT as Environment ?? Environment.Sandbox

    return {
        environment,
        clientID: process.env.CLIENT_ID ?? '',
        clientSecret: process.env.CLIENT_SECRET ?? '',
        endpointURL: environment === Environment.Sandbox ? 'https://sandbox.paypal.com' : 'https://api-m.paypal.com'
    }
}