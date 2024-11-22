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
import api from "@/utils/api";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
	const [error, setError] = useState("");
	const oneDay = 24 * 60 * 60 * 1000;
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const mutation = useMutation({
		mutationFn: async (data: LoginFormData) => {
			try {
				const response = await api.post("/auth/login", data);
				return response.data;
			} catch (error: any) {
				if (error.response && error.response.data) {
					throw new Error(
						error.response.data.message || "Login failed"
					);
				} else {
					throw new Error(error.message || "Login failed");
				}
			}
		},
		onSuccess: (data) => {
			setCookie("__vichar_id", data.id, { maxAge: oneDay });
			setCookie("__vichar_token", data.token, { maxAge: oneDay });
			toast.success("Login successful");
			router.push(`/dashboard`);
		},
		onError: (err: Error) => {
			toast.error(err.message);
		},
	});

	const onSubmit = (data: LoginFormData) => {
		setError("");
		mutation.mutate(data);
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
