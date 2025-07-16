const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true },
    password: { type: String, unique: true },
    role: { type: String, enum: ["traveler", "admin"], default: "traveler" },
  },
  { 
    timestamps: true 
});

userSchema.methods.getJWTToken = function (expiresIn , jwtSecret){
  return jwt.sign(
    { id: this._id, role: this.role }, 
    jwtSecret, 
    { expiresIn }
  );
}

module.exports = mongoose.model("User", userSchema);
