"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema for TVariant
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "Type is required" }),
    value: zod_1.z.string().min(1, { message: "Value is required" }),
});
// Define the Zod schema for TInventory
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .min(0, { message: "Quantity must be a non-negative number" }),
    inStock: zod_1.z.boolean(),
});
// Define the Zod schema for TProduct
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.number().min(0, { message: "Price must be a non-negative number" }),
    category: zod_1.z.string().min(1, { message: "Category is required" }),
    tags: zod_1.z.array(zod_1.z.string().min(1, { message: "Tag cannot be empty" })),
    variants: zod_1.z.array(variantValidationSchema),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
