/** @format */

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownRendererProps = {
	children: string;
};

export function MarkdownRenderer({
	children: markdown,
}: MarkdownRendererProps) {
	return <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>;
}
