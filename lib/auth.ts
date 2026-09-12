import { cookies } from "next/headers";
import { SessionService } from "@/services/session.service";

export async function getCurrentAdmin() {
	const cookieStore = await cookies();
	const token = cookieStore.get("admin_session")?.value;

	if (!token) return null;

	const result = await SessionService.validateSession(token);
	return result?.admin ?? null;
}
