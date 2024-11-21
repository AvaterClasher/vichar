"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Hash } from "lucide-react";
import { Separator } from "../ui/separator";
import crypto from "crypto";

const fetchPosts = async () => {
	const { data } = await axios.get(
		"https://collective-violante-avater-dffc8fee.koyeb.app/api/posts"
	);
	return data;
};

export default function BlogPosts() {
	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

	const getAvatar = (email: string, size: number) => {
		const trimmedEmail = email.trim().toLowerCase();
		const hash = crypto
			.createHash("md5")
			.update(trimmedEmail)
			.digest("hex");
		return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error loading posts.</p>;
	}

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Latest posts</h2>
			<div className="space-y-4">
				{posts.map((post: any) => (
					<Link
						key={post.id}
						href={`/blog/${post.id}`}
						className="block p-5 rounded-lg border transition-colors">
						<div className="flex items-start justify-between mb-3">
							<h3 className="text-lg font-semibold">
								{post.title}
							</h3>
							<div className="flex items-center space-x-2 h-5">
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
									3 min read
								</span>
							</div>
						</div>
						<p className="text-muted-foreground mb-3 text-sm">
							{post.content.slice(0, 100)}...
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
