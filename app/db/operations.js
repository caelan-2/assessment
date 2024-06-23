/**
 * This file contains the DB operations.
 */

import Decision from "./models/decision";
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

export async function DeleteDecision(decisionID) {
  await dbConnect();
  await Decision.deleteOne({ _id: decisionID });
}
