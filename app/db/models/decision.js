import mongoose from "mongoose";
const decisionSchema = new mongoose.Schema({
  attributes: {
    input: {},
    decision: String,
    "meets-confidence": Boolean,
    model: String,
    timestamp: Date,
    confidence: Number,
  },
  id: String,
  type: String,
  "save-name": String,
});
export default mongoose.models.Decision ||
  mongoose.model("Decision", decisionSchema);
