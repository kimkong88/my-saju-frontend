import { redirect } from "next/navigation";

export default async function AppHomePage() {
    // Redirect /app to /today as default
    redirect("/today");
}
