import db from "../src/db.js";

const userSchema = new db.Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.methods.logDetails = function () {
  console.log(`Username:${this.username} \nemail: ${this.email} `);
};

const User = db.model("User", userSchema);

export default User;
