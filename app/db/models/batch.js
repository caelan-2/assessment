import mongoose from "mongoose";
const batchSchema = new mongoose.Schema({
  jobs: [
    {
      filename: String,
      uploaded: Date,
      size: Number,
      progress: Number,
      delimiter: String,
      id: String,
    },
  ],
  "save-name": String,
});

export default mongoose.models.Batch || mongoose.model("Batch", batchSchema);
