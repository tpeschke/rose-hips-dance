import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

function getTodaysDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}

export async function POST(request: Request) {
    const body = await request.json();
    const { firstName, secondName, phoneNumber, email, address, classes, hasAgreed, recommendation } = body;

    const canSubmit =
        !!firstName &&
        !!secondName &&
        !!phoneNumber &&
        !!email &&
        !!address &&
        classes.length > 0 &&
        hasAgreed;

    if (!canSubmit) {
        return new Response(JSON.stringify({ registered: false }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: (process.env.GOOGLE_PRIVATE_KEY ?? '').split(String.raw`\n`).join('\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID ?? '', serviceAccountAuth);

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    await sheet.addRow({
        'First Name': firstName,
        'Second Name': secondName,
        'Phone Number': phoneNumber,
        'Email': email,
        'Address': address,
        'Classes': classes.toString(),
        'Agreed to Waiver': hasAgreed,
        'Recommendation Source': recommendation,
        'Paid': true,
        'Date Paid': getTodaysDate()
    })

    return new Response(JSON.stringify({ registered: true }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}