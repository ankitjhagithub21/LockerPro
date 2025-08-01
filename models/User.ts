import mongoose, { Schema, Document, models } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// ✅ Pre-save hook to hash password
UserSchema.pre<IUser>("save", async function (next) {
  // Only hash the password if it's new or modified
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err) {
    next(err as Error)
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = models.User || mongoose.model<IUser>("User", UserSchema)
