import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.ts";
import productRoute from "./routes/productRoute.ts";
import cartRoute from "./routes/cartRoute.ts";
import { seedIntialProducts } from "./services/productService.ts";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Ecommerce")
  .then(() => console.log("mongo connected!"))
  .catch((err) => console.log("failed to connect ", err));

  //seed the products to database 
  seedIntialProducts();

  app.use('/user', userRoute);
  app.use('/products', productRoute);
  app.use('/cart', cartRoute);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
