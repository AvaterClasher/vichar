/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const SignUpSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof SignUpSchema>;

export function SignUpForm() {
	const [error, setError] = useState("");
	const oneDay = 24 * 60 * 60 * 1000;
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(SignUpSchema),
	});

	const mutation = useMutation({
		mutationFn: async (data: SignUpFormData) => {
			const res = await fetch(
				"https://collective-violante-avater-dffc8fee.koyeb.app/api/auth/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!res.ok) {
				const { message } = await res.json();
				throw new Error(message || "Login failed");
			}
			return res.json();
		},
		onSuccess: (data) => {
			setCookie("__vichar_id", data.id, { maxAge: oneDay });
			setCookie("__vichar_token", data.token, { maxAge: oneDay });
			toast.success("Sign-Up successful");
			router.push("/dashboard");
		},
		onError: (err: Error) => {
			setError(err.message);
		},
	});

	const onSubmit = (data: SignUpFormData) => {
		setError("");
		mutation.mutate(data);
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your username below to sign up to Vichar
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="username"
							placeholder="JohnDoe"
							{...register("username")}
						/>
						{errors.username && (
							<span className="text-red-500 text-sm">
								{errors.username.message}
							</span>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="acme@gmail.com"
							{...register("email")}
						/>
						{errors.email && (
							<span className="text-red-500 text-sm">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="grid gap-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
						</div>
						<Input
							id="password"
							type="password"
							{...register("password")}
						/>
						{errors.password && (
							<span className="text-red-500 text-sm">
								{errors.password.message}
							</span>
						)}
					</div>
					{error && (
						<p className="text-white bg-red-500 rounded-lg h-8 flex items-center justify-center text-center text-sm">
							{error}
						</p>
					)}
					<Button
						type="submit"
						className="w-full"
						disabled={mutation.isPending}>
						{mutation.isPending ? "Signing up..." : "Sign Up"}
					</Button>
				</form>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/login" className="underline">
						Login
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
