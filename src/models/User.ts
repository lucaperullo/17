import mongoose from "mongoose";
import UserDto from "../routes/authentication/authentication-dto";
import bycript from "bcrypt";
const { Schema } = mongoose;

const validateEmail = (email: string) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema<UserDto>({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "customer",
    enum: ["customer", "shop-manager"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatar: {
    type: String,
    default:
      "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

UserSchema.pre("save", async function (next) {
  const salt = await bycript.genSalt(10);
  this.password = await bycript.hash(this.password, salt);
  next();
});

export default mongoose.model("User", UserSchema);
