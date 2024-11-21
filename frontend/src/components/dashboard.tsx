/** @format */

"use client";

import withAuth from "./checkAuth";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getCookie } from "cookies-next";

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
						href="/write"
						className="flex text-sm gap-2 items-center justify-center">
						<PlusIcon />
						Write a Post
					</Link>
				</Button>
			</div>
			<div className="items-center mt-5 mb-6">
				{posts.length > 0 ? (
					`You have written ${posts.length} post(s).`
				) : (
					<div className="max-w-3xl mx-auto px-4">
						<div className="flex flex-col items-center justify-center rounded-2xl text-xl gap-5 border h-60 w-full">
							No posts available.
							<Button className="text-base">
								<Link href="/write">Write one yourself ?</Link>
							</Button>
						</div>
					</div>
				)}
			</div>
			<div className="space-y-4">
				{posts.map((post: any) => (
					<div
						key={post.id}
						className="p-4 border border-gray-300 rounded-lg shadow-sm">
						<h2 className="text-xl font-semibold">{post.title}</h2>
						<p className="text-gray-700">{post.excerpt}</p>
						<a
							href={`/posts/${post.id}`}
							className="text-blue-500 hover:underline">
							Read More
						</a>
					</div>
				))}
			</div>
		</div>
	);
}

export default withAuth(Dashboard);
