"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInFormSchema, signUpFormSchhema } from "../validators";
import { signIn, signOut } from "@/auth";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export const signInWithCredentials = async (
	prevState: unknown,
	formData: FormData
) => {
	try {
		const user = signInFormSchema.parse({
			email: formData.get("email"),
			password: formData.get("password"),
		});

		await signIn("credentials", user);

		return { success: true, message: "Signed in Successfully" };
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}

		return { success: false, message: "Invalid credentials" };
	}
};

export const signOutUser = async () => {
	await signOut();
};

export const signUpUser = async (prevState: unknown, formData: FormData) => {
	try {
		const user = signUpFormSchhema.parse({
			name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password"),
			confirmPassword: formData.get("confirmPassword"),
		});

		const plainPassword = user.password;

		user.password = hashSync(user.password, 10);

		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
			},
		});

		await signIn("credentials", {
			email: user.email,
			password: plainPassword,
		});

		return { success: true, message: "User registered Successfully" };
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}

		return { success: false, message: formatError(error) };
	}
};
