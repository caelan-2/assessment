import Decision from "./models/decision";
import Batch from "./models/batch";
import dbConnect from "./dbConnect";

export async function SaveDecision(decision) {
  await dbConnect();
  const doc = Decision(decision);
  await doc.save();
}
export async function LoadDecision(query) {
  await dbConnect();
  const regex = new RegExp(`^${query["save-name"]}`);
  return await Decision.find({
    "save-name": regex,
    "attributes.model": query.model,
  });
}
export async function SaveBatch(batchInfo) {
  await dbConnect();
  const doc = Batch(batchInfo);
  await doc.save();
}
export async function LoadBatch(query) {
  await dbConnect();
  const regex = new RegExp(`^${query["save-name"]}`);
  return await Batch.find({
    "save-name": regex,
    "attributes.model": query.model,
  });
}
