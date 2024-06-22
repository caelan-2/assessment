import { LoadBatch } from "@/app/db/operations";
export async function POST(request) {
  const req = await request.json();
  const batches = await LoadBatch(req);
  return Response.json({ data: batches });
}
