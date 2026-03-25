import { redirect } from "next/navigation";

export default async function RegistrationNoClass() {
  redirect("/classes/registration/no-class");

  return <div></div>;
}
