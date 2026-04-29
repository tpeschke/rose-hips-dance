export function formatPhoneNumber(phoneString: string): string | null {
    const cleaned = ("" + phoneString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        const formattedString = "(" + match[1] + ") " + match[2] + "-" + match[3]
        return formattedString;
    }
    return phoneString;
}

export function validatePhoneNumber(phoneString: string | null): boolean {
    const regex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phoneString) {
        return regex.test(phoneString);
    }
    return false
}