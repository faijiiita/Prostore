import { z } from "zod";
import { formalToDecimalPlaces } from "./utils";

const currency = z
	.string()
	.refine(
		(value) =>
			/^\d+(\,\d{2})?$/.test(formalToDecimalPlaces(Number(value))),
		"Price must have exactly 2 decimal places"
	);

export const insertProductSchema = z.object({
	name: z.string().min(3, "Name must be at lease 3 characters"),
	slug: z.string().min(3, "Slug must be at lease 3 characters"),
	category: z.string().min(3, "Category must be at lease 3 characters"),
	description: z
		.string()
		.min(3, "Description must be at lease 3 characters"),
	images: z.array(z.string()).min(1, "Product must have at least one image"),
	price: currency,
	brand: z.string().min(3, "Brand must be at lease 3 characters"),
	stock: z.coerce.number(),
	isFeatured: z.boolean(),
	banner: z.string().nullable(),
});
