import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string; // Optional for OAuth users
  name: string;
  image?: string; // For profile picture
  provider?: string; // 'credentials' or 'google'
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Невірний формат email",
      },
    },
    password: {
      type: String,
      required: false, // Not required for OAuth users
    },
    provider: {
      type: String,
      default: "credentials",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
