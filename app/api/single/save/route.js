import { SaveDecision } from "@/app/db/operations";
export async function POST(request) {
  const req = await request.json();
  SaveDecision(req.data);
  return new Response("SUCCESS!");
}
