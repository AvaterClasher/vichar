/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import api from "@/utils/api";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../ui/badge";
import { Hash, ArrowUp } from "lucide-react";
import { Loading } from "../loading";
import { Error } from "../error";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "../ui/button";

const fetchBlogPost = async (id: string) => {
	const { data } = await api.get(`/posts/${id}`);
	return data;
};

export const BlogPost: React.FC = () => {
	const pathname = usePathname();
	const id = pathname.split("/")[2];

	const {
		data: blogData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["blogPost", id],
		queryFn: () => fetchBlogPost(id as string),
	});

	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (isLoading) return <Loading />;
	if (isError) return <Error message={error.message} />;

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
		<div className="max-w-3xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 relative">
			<img
				src={bannerImageLink}
				alt={title}
				className="my-6 w-full h-64 sm:h-96 object-cover rounded-lg"
			/>

			<div className="flex flex-col items-center text-center gap-y-4">
				<h1 className="text-3xl sm:text-4xl font-bold leading-tight">
					{title}
				</h1>
				<p className="text-muted-foreground text-sm sm:text-base">
					{description}
				</p>

				<div className="flex flex-wrap justify-center items-center text-xs sm:text-sm text-muted-foreground gap-x-2 sm:gap-x-5">
					<span>By {User.username}</span>
					<Separator
						orientation="vertical"
						className="hidden sm:block"
					/>
					<span>{new Date(createdAt).toLocaleDateString()}</span>
					<Separator
						orientation="vertical"
						className="hidden sm:block"
					/>
					<span>
						{Math.ceil(content.split(" ").length / 200)} min read
					</span>
				</div>

				<div className="flex flex-wrap justify-center gap-2 mt-2">
					{tag
						? tag.split(",").map((tag: string) => (
								<Badge
									key={tag}
									variant="secondary"
									className="text-xs px-2 py-1">
									<Hash className="h-3 w-3" /> {tag}
								</Badge>
						  ))
						: null}
				</div>
			</div>

			<div className="mt-8 mb-20 prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base">
				<Markdown
					remarkPlugins={[remarkGfm]}
					components={{
						code(props) {
							const { children, className, node, ...rest } =
								props;
							const match = /language-(\w+)/.exec(
								className || ""
							);
							return match ? (
								<SyntaxHighlighter
									PreTag="div"
									language={match[1]}
									showLineNumbers
									wrapLongLines
									style={atomDark}>
									{String(children).replace(/\n$/, "")}
								</SyntaxHighlighter>
							) : (
								<code {...rest} className={className}>
									{children}
								</code>
							);
						},
					}}>
					{content}
				</Markdown>
			</div>

			{showScrollTop && (
				<Button
					onClick={scrollToTop}
					variant="outline"
					className="fixed bottom-8 hidden w-16 h-16 md:flex items-center justify-center right-8 z-50 p-3 bg-background border border-text-muted text-foreground rounded-full shadow-lg"
					aria-label="Scroll to top">
					<ArrowUp className="h-10 w-10" />
				</Button>
			)}
		</div>
	);
};
