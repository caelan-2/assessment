import { SaveBatch } from "@/app/db/operations";
export async function POST(request) {
  const req = await request.json();
  SaveBatch(req.data);
  return new Response("SUCCESS!");
}
