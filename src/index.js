import app from "./app.js";
import * as dotenv from "dotenv";
import db from "./db.js";
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});
