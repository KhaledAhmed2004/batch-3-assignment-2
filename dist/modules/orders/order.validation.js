"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    productId: zod_1.z.string().min(1, { message: "Product ID is required" }),
    price: zod_1.z.number().min(0, { message: "Price must be a non-negative number" }),
    quantity: zod_1.z.number().min(1, { message: "Quantity must be at least 1" }),
});
exports.orderValidationSchema = orderValidationSchema;
