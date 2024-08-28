import mongoose, { Schema } from "mongoose";

export interface ICompany {
  _id: string;
  name: string;
  description: string;
  roles: string[];
  requirements: string;
  featured: boolean;
}

const companySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  roles: { type: [String], required: true },
  requirements: { type: String, required: true },
  featured: { type: Boolean, default: false },
});

export default mongoose.models.Company ||
  mongoose.model<ICompany>("Company", companySchema);
