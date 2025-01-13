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

export const signInFormSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Passsword must be at least 6 characters long"),
});

export const signUpFormSchhema = z
	.object({
		name: z.string().min(3, "Name must be atleast 3 characters long"),
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters long"),
		confirmPassword: z
			.string()
			.min(6, "Confirm Password must be at least 6 characters long"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
