const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, sparse: true, unique: true },
    password: { type: String, sparse: true ,unique: true },
    role: { type: String, enum: ["traveler", "admin"], default: "traveler" },
  },
  { 
    timestamps: true 
});

const User = mongoose.model("User", userSchema);

User.prototype.getJWTToken = function (expiresIn , jwtSecret){
  return jwt.sign(
    { id: this._id, role: this.role }, 
    jwtSecret, 
    { expiresIn }
  );
}

module.exports = User;
