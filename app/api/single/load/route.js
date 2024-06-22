import { LoadDecision } from "@/app/db/operations";
export async function POST(request) {
  const req = await request.json();
  const decisions = await LoadDecision(req);
  return Response.json({ data: decisions });
}
