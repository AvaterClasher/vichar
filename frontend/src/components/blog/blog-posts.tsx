/** @format */

"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Hash } from "lucide-react";
import { Separator } from "../ui/separator";
import crypto from "crypto";
import { Button } from "../ui/button";
import api from "@/utils/api";
import { Loading } from "../loading";
import { Error } from "../error";
import { useState } from "react";

const fetchPosts = async () => {
	const { data } = await api.get("/posts");
	return data;
};

export default function BlogPosts() {
	const [searchTerm, setSearchTerm] = useState<string>("");

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
		return <Loading />;
	}

	if (error) {
		return <Error message={error.message} />;
	}

	const sortedPosts = posts.sort(
		(a: any, b: any) =>
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);


	const filteredPosts = sortedPosts.filter((post: any) => {
		const matchesSearchTerm =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.User.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(post.tag &&
				post.tag.toLowerCase().includes(searchTerm.toLowerCase()));

		return matchesSearchTerm;
	});

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Latest posts</h2>
			<div className="mb-6">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search posts..."
					className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			{filteredPosts.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-2xl text-xl gap-5 border h-60 w-full">
					No posts available.
					<Button className="text-base">
						<Link href="/dashboard/write">Write one yourself ?</Link>
					</Button>
				</div>
			) : (
				<div className="space-y-4">
					{filteredPosts.map((post: any) => (
						<Link
							key={post.id}
							href={`/blog/${post.id}`}
							className="block p-5 rounded-lg border transition-colors duration-300 ease-in-out hover:bg-secondary/50">
							<div className="flex items-start justify-between mb-3">
								<h3 className="text-base font-semibold">
									{post.title}
								</h3>
								<div className="mb-2 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground h-5">
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
							<div className="flex space-x-2 mt-4">
								{post.tag
									? post.tag.split(",").map((tag: string) => (
											<Badge
												key={tag}
												variant="secondary">
												<Hash className="h-3 w-3" />{" "}
												{tag}
											</Badge>
									  ))
									: null}
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
