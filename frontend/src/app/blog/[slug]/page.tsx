/** @format */

"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import { useParams, usePathname } from "next/navigation";
import api from "@/utils/api";

const fetchBlogPost = async (id: string) => {
	const { data } = await api.get(`/posts/${id}`);
	return data;
};

const BlogPost: React.FC = () => {
	const pathname = usePathname();
    console.log(pathname)
    const id = pathname.split("/")[2]

	const {
		data: blogData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["blogPost", id],
		queryFn: () => fetchBlogPost(id as string),
	});
    console.log(blogData)

	if (isLoading) return <p>Loading post...</p>;
	if (isError) return <p>Error: {(error as Error).message}</p>;

	const {
		title,
		content,
		tag,
		createdAt,
		User,
		bannerImageLink,
		description,
	} = blogData;

	return (
		<div className="max-w-3xl mx-auto mt-10">
			<h1 className="text-3xl font-bold mb-4">{title}</h1>
			<div className="flex justify-between text-sm text-gray-500">
				<span>By {User}</span>
				<span>{new Date(createdAt).toLocaleDateString()}</span>
			</div>
			<img
				src={bannerImageLink}
				alt={title}
				className="my-6 w-full rounded-lg"
			/>
			<p className="text-gray-700 mb-6">{description}</p>
			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<ReactMarkdown
					children={content}
					rehypePlugins={[rehypeRaw]}
					components={{
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(
								className || ""
							);
							return !inline && match ? (
								<SyntaxHighlighter
									style={dracula}
									language={match[1]}
									PreTag="div"
									{...props}>
									{String(children).replace(/\n$/, "")}
								</SyntaxHighlighter>
							) : (
								<code className={className} {...props}>
									{children}
								</code>
							);
						},
					}}
				/>
			</div>
			<div className="flex gap-2 mt-6">
				{tag.split(",").map((tagItem) => (
					<span
						key={tagItem}
						className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
						#{tagItem}
					</span>
				))}
			</div>
		</div>
	);
};

export default function Page() {
	return <BlogPost />;
}
