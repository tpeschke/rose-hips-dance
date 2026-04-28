import axios from "axios"
import { headers } from "next/headers"

export default async function getAccessToken() {
    const auth = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    const data = 'grant_type=client_credentials'

    const response = await axios.post(
        process.env.PAYPAL_ENDPOINT + '/v1/oauth2/token',
        data,
        {
            headers: {
                'Content-Type': 'application/x-ww-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
            }
        }
    )

    return response.access_token
}