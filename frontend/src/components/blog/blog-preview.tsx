/** @format */

"use client";

import { formatDistance } from "date-fns";
import { Hash } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PostPreviewProps {
	title: string;
	content: string;
	tags: string[];
}

export default function PostPreview({
	title,
	content,
	tags,
}: PostPreviewProps) {
	return (
		<div className="rounded-lg border p-5">
			<div className="flex items-start justify-between mb-3">
				<h3 className="text-lg font-semibold">
					{title || "Untitled Post"}
				</h3>
				<div className="flex items-center space-x-2 h-5">
					<span className="text-gray-400 text-sm">
						{formatDistance(new Date(), new Date(), {
							addSuffix: true,
						})}
					</span>
					<Separator orientation="vertical" />
					<span className="text-gray-400 text-sm">
						{Math.ceil(content.split(" ").length / 200)} min read
					</span>
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<Badge key={tag} variant="secondary">
						<Hash className="h-3 w-3 mr-1" />
						{tag}
					</Badge>
				))}
			</div>

			<div className="prose prose-neutral dark:prose-invert max-w-none mt-5">
				<ReactMarkdown
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
									{...rest}
									PreTag="div"
									children={String(children).replace(
										/\n$/,
										""
									)}
									language={match[1]}
									showLineNumbers
									wrapLongLines
									style={atomDark}
								/>
							) : (
								<code {...rest} className={className}>
									{children}
								</code>
							);
						},
					}}>
					{content || "Start writing your post..."}
				</ReactMarkdown>
			</div>
		</div>
	);
}
