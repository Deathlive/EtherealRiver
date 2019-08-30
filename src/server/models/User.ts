import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { isEmail } from "validator";
import differenceInMinutes from "date-fns/difference_in_minutes";

export interface IUser extends Document {
  email?: string;
  fullname?: string;
  password?: string;
  confirmed?: boolean;
  socialId?: string;
  avatar?: string;
  confirm_hash?: string;
  last_seen?: Date;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: "Email address is required",
      validate: [isEmail, "Invalid email"],
      unique: true
    },
    fullname: {
      type: String,
      required: "Fullname is required"
    },
    password: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    socialId: String,
    avatar: String,
    confirm_hash: String,
    last_seen: {
      type: Date,
      default: new Date()
    }
  },
  {
    timestamps: true
  }
);

UserSchema.virtual("isOnline").get(function(this: any) {
  return differenceInMinutes(new Date().toISOString(), this.last_seen) < 5;
});

UserSchema.set("toJSON", {
  virtuals: true
});

UserSchema.pre("save", function(next) {
  const user: IUser = this;

  if (user.socialId) return next();

  if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10)
      .then((hash: string) => {
        user.password = String(hash);

        bcrypt.hash(user.password, 10)
          .then((confirmHash: any) => {
            user.confirm_hash = String(confirmHash);
            next();
          });
      })
      .catch((err: any) => {
        next(err);
      });
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
