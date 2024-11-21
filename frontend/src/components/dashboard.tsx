/** @format */

"use client";

import withAuth from "./checkAuth";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { Button } from "./ui/button";
import { Hash, PlusIcon } from "lucide-react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";
import { Separator } from "./ui/separator";
import crypto from "crypto";

const fetchPosts = async (userId: any) => {
	// userId = "867c5aff-8adb-4fad-87fa-596d9aabcedb";
	const response = await api.get(`/posts?author=${userId}`);
	return response.data;
};

function Dashboard() {
	const id = getCookie("__vichar_id");
	console.log(id);
	const {
		data: posts,
		isLoading,
		isError,
		error,
	} = useQuery({ queryKey: ["blog"], queryFn: () => fetchPosts(id) });

	const getAvatar = (email: string, size: number) => {
		const trimmedEmail = email.trim().toLowerCase();
		const hash = crypto
			.createHash("md5")
			.update(trimmedEmail)
			.digest("hex");
		return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
	};

	if (isLoading) {
		return <p>Loading posts...</p>;
	}

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div className="max-w-3xl mx-auto mt-20 py-6">
			<div className="flex justify-between mx-6">
				<h1 className="text-3xl font-bold mb-4">Your Posts</h1>
				<Button className="m-0 px-2 rounded-lg">
					<Link
						href="/dashboard/write"
						className="flex text-sm gap-2 items-center justify-center">
						<PlusIcon />
						Write a Post
					</Link>
				</Button>
			</div>
			<div className="items-center mt-5 mb-6 max-w-3xl mx-5">
				{posts.length > 0 ? (
					`You have written ${posts.length} post(s).`
				) : (
					<div className="max-w-3xl mx-auto px-4">
						<div className="flex flex-col items-center justify-center rounded-2xl text-xl gap-5 border h-60 w-full">
							No posts available.
							<Button className="text-base">
								<Link href="/dashboard/write">
									Write one yourself ?
								</Link>
							</Button>
						</div>
					</div>
				)}
			</div>
			<div className="space-y-4 max-w-3xl mx-5">
				{posts.map((post: any) => (
					<Link
						key={post.id}
						href={`/blog/${post.id}`}
						className="block p-5 rounded-lg border transition-colors duration-300 ease-in-out hover:bg-secondary/50">
						<div className="flex items-start justify-between mb-3">
							<h3 className="text-lg font-semibold">
								{post.title}
							</h3>
							<div className="flex items-cedivr space-x-2 h-5">
								<img
									src={getAvatar(post.User.email, 20)}
									alt={post.User.username}
									className="rounded-full"
								/>
								<Separator orientation="vertical" />
								<span className="text-gray-400 text-sm">
									{formatDistance(
										new Date(post.createdAt),
										new Date(),
										{ addSuffix: true }
									)}
								</span>
								<Separator orientation="vertical" />
								<span className="text-gray-400 text-sm">
									{Math.ceil(
										post.content.split(" ").length / 200
									)}{" "}
									min read
								</span>
							</div>
						</div>
						<p className="text-muted-foreground mb-3 text-sm">
							{post.description.slice(0, 100)}...
						</p>
						<div className="flex space-x-2">
							{post.tag
								? post.tag.split(",").map((tag: string) => (
										<Badge key={tag} variant="secondary">
											<Hash className="h-3 w-3" /> {tag}
										</Badge>
								  ))
								: null}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default withAuth(Dashboard);
