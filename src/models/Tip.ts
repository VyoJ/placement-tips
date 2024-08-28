import mongoose, { Schema } from "mongoose";

export interface ITip {
  _id: string;
  title: string;
  description: string;
  link: string;
}

const tipSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

export default mongoose.models.Tip || mongoose.model<ITip>("Tip", tipSchema);
