import db from "../src/db.js";

const productSchema = new db.Schema({
  id: Number,
  name: String,
  price: Number,
  tags: Array,
});
userSchema.methods.logDetails = function () {
  console.log(
    `id:${this.id} \nname: ${this.name}\price: ${this.price}\ntags: ${this.tags} `
  );
};

const Product = db.model("Product", productSchema);

export default Product;
