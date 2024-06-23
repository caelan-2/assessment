import { DeleteDecision } from "@/app/db/operations";
export async function POST(request) {
  const req = await request.json();
  const decisions = await DeleteDecision(req._id);
  return Response.json({ data: decisions });
}
