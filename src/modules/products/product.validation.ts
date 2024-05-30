import { z } from "zod";

// Define the Zod schema for TVariant
const variantValidationSchema = z.object({
  type: z.string().min(1, { message: "Type is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});

// Define the Zod schema for TInventory
const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: "Quantity must be a non-negative number" }),
  inStock: z.boolean(),
});

// Define the Zod schema for TProduct
const productValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().min(0, { message: "Price must be a non-negative number" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z.array(z.string().min(1, { message: "Tag cannot be empty" })),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
