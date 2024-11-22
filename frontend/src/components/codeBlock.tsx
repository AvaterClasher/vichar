/** @format */

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type MarkdownRendererProps = {
	children: string;
};

export function MarkdownRenderer({
	children: markdown,
}: MarkdownRendererProps) {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ node, inline, className, children, ...props }: any) {
					const match = /language-(\w+)/.exec(className || "");

					return !inline && match ? (
						<SyntaxHighlighter
							style={a11yDark}
							PreTag="div"
							language={match[1]}
							showLineNumbers={true}
							wrapLines={true}
							{...props}>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
			}}>
			{markdown}
		</Markdown>
	);
}
