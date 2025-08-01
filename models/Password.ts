import mongoose, { Schema, Document, models } from "mongoose"

export interface IPassword extends Document {
  userId?: string
  title: string
  website?: string
  username?: string
  encryptedPassword: string
}

const PasswordSchema = new Schema<IPassword>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    title: { type: String, required: true },
    website: { type: String, required: false },
    username: { type: String, required: false },
    encryptedPassword: { type: String, required: true },
  },
  { timestamps: true }
)

export const Password =
  models.Password || mongoose.model<IPassword>("Password", PasswordSchema)
