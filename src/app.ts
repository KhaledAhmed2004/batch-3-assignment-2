import express from "express";
import { ProductRoute } from "./modules/products/product.route";
import { OrderRoute } from "./modules/orders/order.router";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/products", ProductRoute);
app.use("/api/orders", OrderRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
