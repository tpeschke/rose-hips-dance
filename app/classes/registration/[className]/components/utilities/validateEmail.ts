export default function validateEmail(email: string | null): boolean {
    const regex = /\S+@\S+\.\S+/;
    if (email) {
        return regex.test(email);
    }
    return false
}