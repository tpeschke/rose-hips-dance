import axios from "axios"
import queryString from "query-string"

export default async function getAccessToken() {
    const auth = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`

    const { data } = await axios.post(
        process.env.PAYPAL_ENDPOINT + '/v1/oauth2/token',
        { grant_type: 'client_credentials' },
        {
            headers: {
                'Content-Type': 'application/x-ww-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`,
            }
        }
    )

    return data.access_token
}